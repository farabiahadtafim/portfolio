/// <reference types="node" />
import { defineConfig, Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';

const fileUploadMiddleware = (): Plugin => ({
  name: 'file-upload',
  configureServer(server) {
    server.middlewares.use('/api/upload', (req: any, res: any, next) => {
      if (req.method === 'POST') {
        let body = '';
        req.on('data', (chunk: any) => {
          body += chunk.toString();
        });
        req.on('end', () => {
          try {
            const data = JSON.parse(body);
            if (data.base64 && data.filename) {
              const base64Data = data.base64.replace(/^data:image\/\w+;base64,/, "");
              const buffer = Buffer.from(base64Data, 'base64');
              const targetDir = path.resolve(process.cwd(), 'public/image/projects/Carousel Posts Main Page');
              if (!fs.existsSync(targetDir)) {
                fs.mkdirSync(targetDir, { recursive: true });
              }
              
              if (data.oldFileUrl && data.oldFileUrl.startsWith('/image/')) {
                const oldFilePath = path.join(process.cwd(), 'public', decodeURIComponent(data.oldFileUrl));
                if (fs.existsSync(oldFilePath)) {
                  try {
                    fs.unlinkSync(oldFilePath);
                  } catch (e) {
                    console.error('Failed to delete old file:', e);
                  }
                }
              }
              const filePath = path.join(targetDir, data.filename);
              fs.writeFileSync(filePath, buffer);
              
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ success: true, url: `/image/projects/Carousel Posts Main Page/${data.filename}` }));
            } else {
              res.statusCode = 400;
              res.end(JSON.stringify({ success: false, error: 'Missing base64 or filename' }));
            }
          } catch (e: any) {
            res.statusCode = 500;
            res.end(JSON.stringify({ success: false, error: e.message }));
          }
        });
      } else {
        next();
      }
    });
  }
});

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
  plugins: [react(), adminPortalLogger(), fileUploadMiddleware()],
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

