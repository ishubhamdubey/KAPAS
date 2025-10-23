import { Product } from './supabase';
import { newArrivalsSamples, bestSellersSamples, categorySamples } from './sampleData';

// Simple in-memory TF-IDF recommender using sample data. Non-destructive.

type Index = {
  docs: Product[];
  vocab: string[];
  idf: Record<string, number>;
  vectors: number[][]; // TF-IDF vectors aligned with docs
};

let INDEX: Index | null = null;

const DEFAULT_STOPWORDS = new Set([
  'the', 'and', 'a', 'an', 'of', 'in', 'on', 'for', 'with', 'to', 'is', 'are', 'by', 'this', 'that', 'it', 'as', 'at'
]);

function tokenize(text: string): string[] {
  return (
    text
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, ' ')
      .split(/\s+/)
      .filter((t) => t && !DEFAULT_STOPWORDS.has(t))
  );
}

function buildDocs(): Product[] {
  const docs: Product[] = [];
  docs.push(...newArrivalsSamples);
  docs.push(...bestSellersSamples);
  for (const arr of Object.values(categorySamples)) {
    docs.push(...arr);
  }
  // dedupe by id while preserving order
  const seen = new Set<string>();
  return docs.filter((d) => {
    if (seen.has(d.id)) return false;
    seen.add(d.id);
    return true;
  });
}

function buildVocab(docs: Product[]): string[] {
  const set = new Set<string>();
  for (const d of docs) {
    const text = [d.name, d.description ?? '', d.category].join(' ');
    for (const t of tokenize(text)) set.add(t);
  }
  return Array.from(set);
}

function tf(tokens: string[]): Record<string, number> {
  const m: Record<string, number> = {};
  for (const t of tokens) m[t] = (m[t] || 0) + 1;
  const len = tokens.length || 1;
  for (const k of Object.keys(m)) m[k] = m[k] / len;
  return m;
}

function dot(a: number[], b: number[]) {
  let s = 0;
  for (let i = 0; i < a.length; i++) s += a[i] * b[i];
  return s;
}

function norm(a: number[]) {
  return Math.sqrt(a.reduce((s, v) => s + v * v, 0));
}

export function trainIndex() {
  const docs = buildDocs();
  const vocab = buildVocab(docs);
  const V = vocab.length;

  // compute tf for each doc and doc frequency
  const docTfs: Record<string, Record<string, number>> = {};
  const df: Record<string, number> = {};
  for (const d of docs) {
    const text = [d.name, d.description ?? '', d.category].join(' ');
    const tokens = tokenize(text);
    const tfs = tf(tokens);
    docTfs[d.id] = tfs;
    for (const t of Object.keys(tfs)) df[t] = (df[t] || 0) + 1;
  }

  const idf: Record<string, number> = {};
  for (const term of vocab) {
    idf[term] = Math.log((docs.length + 1) / ((df[term] || 0) + 1)) + 1;
  }

  const vectors: number[][] = docs.map((d) => {
    const vec = new Array(V).fill(0);
    const tfs = docTfs[d.id] || {};
    for (let i = 0; i < V; i++) {
      const term = vocab[i];
      vec[i] = (tfs[term] || 0) * (idf[term] || 0);
    }
    const n = norm(vec) || 1;
    return vec.map((v) => v / n);
  });

  INDEX = { docs, vocab, idf, vectors };
  return INDEX;
}

function ensureIndex() {
  if (!INDEX) return trainIndex();
  return INDEX;
}

export function recommendForProduct(productId: string, topK = 8) {
  const idx = ensureIndex();
  const i = idx.docs.findIndex((d) => d.id === productId);
  if (i === -1) return [];
  const q = idx.vectors[i];
  const sims = idx.vectors.map((v, j) => ({ id: idx.docs[j].id, score: dot(q, v) }));
  const sorted = sims
    .filter((s) => s.id !== productId)
    .sort((a, b) => b.score - a.score)
    .slice(0, topK);
  return sorted.map((s) => {
    const prod = idx.docs.find((d) => d.id === s.id)!;
    return { product: prod, score: s.score };
  });
}

export function recommendForQuery(query: string, topK = 8) {
  const idx = ensureIndex();
  const tokens = tokenize(query);
  const tfs = tf(tokens);
  const V = idx.vocab.length;
  const qvec = new Array(V).fill(0);
  for (let i = 0; i < V; i++) {
    const term = idx.vocab[i];
    qvec[i] = (tfs[term] || 0) * (idx.idf[term] || 0);
  }
  const nq = norm(qvec) || 1;
  const qnorm = qvec.map((v) => v / nq);
  const sims = idx.vectors.map((v, j) => ({ id: idx.docs[j].id, score: dot(qnorm, v) }));
  const sorted = sims.sort((a, b) => b.score - a.score).slice(0, topK);
  return sorted.map((s) => ({ product: idx.docs.find((d) => d.id === s.id)!, score: s.score }));
}

// Expose a helper to get a flat list of candidate products (for UI integration)
export function getAllIndexedProducts() {
  const idx = ensureIndex();
  return idx.docs.slice();
}

export default { trainIndex, recommendForProduct, recommendForQuery, getAllIndexedProducts };
