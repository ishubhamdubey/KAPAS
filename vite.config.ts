import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  // Base public path when served from GitHub Pages under a repository path.
  // Set this to `/${repoName}/` where repoName is the GitHub repo name.
  base: '/KAPAS/',
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
