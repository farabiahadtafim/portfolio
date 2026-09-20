import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
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
