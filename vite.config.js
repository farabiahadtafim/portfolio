/// <reference types="node" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';
var fileUploadMiddleware = function () { return ({
    name: 'file-upload',
    configureServer: function (server) {
        server.middlewares.use('/api/upload', function (req, res, next) {
            if (req.method === 'POST') {
                var body_1 = '';
                req.on('data', function (chunk) {
                    body_1 += chunk.toString();
                });
                req.on('end', function () {
                    try {
                        var data = JSON.parse(body_1);
                        if (data.base64 && data.filename) {
                            var base64Data = data.base64.replace(/^data:image\/\w+;base64,/, "");
                            var buffer = Buffer.from(base64Data, 'base64');
                            var targetDir = path.resolve(process.cwd(), 'public/image/projects/Carousel Posts Main Page');
                            if (!fs.existsSync(targetDir)) {
                                fs.mkdirSync(targetDir, { recursive: true });
                            }
                            if (data.oldFileUrl && data.oldFileUrl.startsWith('/image/')) {
                                var oldFilePath = path.join(process.cwd(), 'public', decodeURIComponent(data.oldFileUrl));
                                if (fs.existsSync(oldFilePath)) {
                                    try {
                                        fs.unlinkSync(oldFilePath);
                                    }
                                    catch (e) {
                                        console.error('Failed to delete old file:', e);
                                    }
                                }
                            }
                            var filePath = path.join(targetDir, data.filename);
                            fs.writeFileSync(filePath, buffer);
                            res.setHeader('Content-Type', 'application/json');
                            res.end(JSON.stringify({ success: true, url: "/image/projects/Carousel Posts Main Page/".concat(data.filename) }));
                        }
                        else {
                            res.statusCode = 400;
                            res.end(JSON.stringify({ success: false, error: 'Missing base64 or filename' }));
                        }
                    }
                    catch (e) {
                        res.statusCode = 500;
                        res.end(JSON.stringify({ success: false, error: e.message }));
                    }
                });
            }
            else {
                next();
            }
        });
    }
}); };
var adminPortalLogger = function () { return ({
    name: 'admin-portal-logger',
    configureServer: function (server) {
        var _a;
        (_a = server.httpServer) === null || _a === void 0 ? void 0 : _a.once('listening', function () {
            var _a;
            var address = (_a = server.httpServer) === null || _a === void 0 ? void 0 : _a.address();
            var port = typeof address === 'object' && address ? address.port : 5173;
            setTimeout(function () {
                console.log("  \u001B[32m\u279C\u001B[0m  \u001B[1mAdmin:\u001B[0m   \u001B[36mhttp://localhost:".concat(port, "/portfolio/admin.html\u001B[0m"));
            }, 50);
        });
    },
}); };
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
