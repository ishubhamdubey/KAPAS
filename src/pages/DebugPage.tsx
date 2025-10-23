import { useState } from 'react';
import { supabase } from '../lib/supabase';

type CheckResult = {
  name: string;
  ok: boolean;
  detail?: string;
};

const DebugPage = () => {
  const [running, setRunning] = useState(false);
  const [results, setResults] = useState<CheckResult[]>([]);

  const supabaseUrl = import.meta.env?.VITE_SUPABASE_URL as string | undefined;
  const anonKeyPresent = Boolean(import.meta.env?.VITE_SUPABASE_ANON_KEY);

  const projectRef = (() => {
    if (!supabaseUrl) return undefined;
    const m = supabaseUrl.match(/https?:\/\/([a-z0-9]+)\.supabase\.co/i);
    return m?.[1];
  })();

  const runChecks = async () => {
    setRunning(true);
    const checks: CheckResult[] = [];
    try {
      // 1) Auth: get current session
      const { data: sessionData, error: sessionErr } = await supabase.auth.getSession();
      checks.push({
        name: 'Auth: getSession()',
        ok: !sessionErr,
        detail: sessionErr ? sessionErr.message : sessionData.session ? 'Session exists' : 'No session',
      });

      // 2) Simple query against products (can fail if table missing)
      const { error: prodErr } = await supabase
        .from('products')
        .select('id', { head: true, count: 'exact' })
        .limit(1);
      checks.push({
        name: 'DB: products table accessible',
        ok: !prodErr,
        detail: prodErr ? prodErr.message : 'OK',
      });
    } catch (e: unknown) {
      const error = e as Error;
      checks.push({ name: 'Unexpected error', ok: false, detail: error?.message || String(e) });
    }
    setResults(checks);
    setRunning(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow p-6 space-y-6">
        <h1 className="text-2xl font-bold">Supabase Debug</h1>
        <div className="space-y-2 text-sm">
          <div>
            <span className="font-semibold">Supabase URL:</span>{' '}
            <span className="text-gray-700">{supabaseUrl || '(missing)'}</span>
          </div>
          <div>
            <span className="font-semibold">Project Ref:</span>{' '}
            <span className="text-gray-700">{projectRef || '(unknown)'}</span>
          </div>
          <div>
            <span className="font-semibold">Anon key present:</span>{' '}
            <span className="text-gray-700">{anonKeyPresent ? 'yes' : 'no'}</span>
          </div>
          <p className="text-gray-600">
            If URL or anon key is missing, stop the dev server and start it again to reload .env.
          </p>
        </div>

        <button
          onClick={runChecks}
          disabled={running}
          className="bg-[#ff6b81] hover:bg-[#ff8fa3] text-white px-4 py-2 rounded-lg font-semibold disabled:opacity-60"
        >
          {running ? 'Running checks…' : 'Run checks'}
        </button>

        {results.length > 0 && (
          <div className="space-y-3">
            {results.map((r, i) => (
              <div key={i} className={`p-3 rounded border ${r.ok ? 'border-green-300 bg-green-50' : 'border-red-300 bg-red-50'}`}>
                <div className="font-semibold">{r.name}: {r.ok ? 'OK' : 'FAIL'}</div>
                {r.detail && <div className="text-sm text-gray-700 mt-1">{r.detail}</div>}
              </div>
            ))}
          </div>
        )}

        <div className="text-sm text-gray-600">
          Tips:
          <ul className="list-disc ml-5 mt-2 space-y-1">
            <li>Use the project whose URL contains the shown Project Ref in your Supabase dashboard.</li>
            <li>Run your SQL migrations if the products table check fails.</li>
            <li>After updating .env, restart the dev server to apply changes.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DebugPage;
