import { defineConfig, Plugin } from 'vite';
import react from '@vitejs/plugin-react';

const adminPortalLogger = (): Plugin => ({
  name: 'admin-portal-logger',
  configureServer(server) {
    server.httpServer?.once('listening', () => {
      const address = server.httpServer?.address();
      const port = typeof address === 'object' && address ? address.port : 5173;
      setTimeout(() => {
        console.log(`  \x1b[32m➜\x1b[0m  \x1b[1mAdmin:\x1b[0m   \x1b[36mhttp://localhost:${port}/portfolio/admin.html\x1b[0m`);
      }, 50);
    });
  },
});

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), adminPortalLogger()],
  base: '/portfolio/',
  build: {
    rollupOptions: {
      input: {
        main: './index.html',
        work: './work.html',
        admin: './admin.html',
      },
    },
  },
});

