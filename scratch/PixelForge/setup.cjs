const fs = require('fs');
const path = require('path');
const dir = path.join(__dirname);
const write = (file, content) => {
  const fullPath = path.join(dir, file);
  fs.mkdirSync(path.dirname(fullPath), { recursive: true });
  fs.writeFileSync(fullPath, content.trim());
};

write('package.json', `
{
  "name": "pixelforge",
  "version": "1.0.0",
  "main": "dist-electron/main.js",
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build && electron-builder",
    "make": "electron-packager . PixelForge --platform=win32 --arch=x64 --out=release --overwrite"
  },
  "dependencies": {
    "framer-motion": "^10.16.4",
    "lucide-react": "^0.292.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "sharp": "^0.32.6"
  },
  "devDependencies": {
    "@types/react": "^18.2.15",
    "@types/react-dom": "^18.2.7",
    "@vitejs/plugin-react": "^4.0.3",
    "autoprefixer": "^10.4.16",
    "electron": "^28.0.0",
    "electron-packager": "^17.1.2",
    "postcss": "^8.4.31",
    "tailwindcss": "^3.3.5",
    "typescript": "^5.0.2",
    "vite": "^4.4.5",
    "vite-plugin-electron": "^0.15.4",
    "vite-plugin-electron-renderer": "^0.14.5"
  }
}
`);

write('vite.config.ts', `
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import electron from 'vite-plugin-electron'
import renderer from 'vite-plugin-electron-renderer'

export default defineConfig({
  plugins: [
    react(),
    electron([
      { entry: 'electron/main.ts' },
      { entry: 'electron/preload.ts', onstart(options) { options.reload() } }
    ]),
    renderer()
  ],
})
`);

write('tsconfig.json', `
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["src", "electron"]
}
`);

write('tailwind.config.js', `
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: { extend: {} },
  plugins: [],
}
`);

write('postcss.config.js', `
export default { plugins: { tailwindcss: {}, autoprefixer: {} } }
`);

write('index.html', `
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>PixelForge</title>
  </head>
  <body class="bg-neutral-900 text-white overflow-hidden">
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
`);

write('electron/main.ts', `
import { app, BrowserWindow, ipcMain, dialog } from 'electron'
import path from 'path'

let win: BrowserWindow | null = null;

function createWindow() {
  win = new BrowserWindow({
    width: 1024,
    height: 768,
    titleBarStyle: 'hidden',
    titleBarOverlay: { color: '#171717', symbolColor: '#ffffff' },
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    },
  })
  
  if (process.env.VITE_DEV_SERVER_URL) {
    win.loadURL(process.env.VITE_DEV_SERVER_URL)
  } else {
    win.loadFile(path.join(__dirname, '../dist/index.html'))
  }
}

app.whenReady().then(createWindow)

ipcMain.handle('dialog:openFile', async () => {
  if(!win) return [];
  const { canceled, filePaths } = await dialog.showOpenDialog(win, {
    properties: ['openFile', 'multiSelections'],
    filters: [{ name: 'Images', extensions: ['jpg', 'png', 'webp', 'gif'] }]
  })
  if (canceled) return []
  return filePaths
})
`);

write('electron/preload.ts', `
console.log('Preload loaded');
`);

write('src/index.css', `
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer utilities {
  .app-region-drag { -webkit-app-region: drag; }
  .app-region-no-drag { -webkit-app-region: no-drag; }
}
`);

write('src/main.tsx', `
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
`);

write('src/App.tsx', `
import { useState } from 'react';
import { UploadCloud, Image as ImageIcon, Settings, Download } from 'lucide-react';
import { ipcRenderer } from 'electron';

export default function App() {
  const [files, setFiles] = useState<string[]>([]);

  const handleSelectFiles = async () => {
    try {
      const selected = await ipcRenderer.invoke('dialog:openFile');
      if (selected && selected.length > 0) {
        setFiles(prev => [...prev, ...selected]);
      }
    } catch (e) { console.error(e); }
  };

  return (
    <div className="h-screen w-screen flex flex-col bg-neutral-900 font-sans">
      {/* Titlebar */}
      <div className="h-10 bg-neutral-950 flex items-center px-4 app-region-drag border-b border-neutral-800">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
          <span className="ml-4 text-xs font-semibold text-neutral-400 tracking-wider">PIXELFORGE</span>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <div className="w-64 bg-neutral-900 border-r border-neutral-800 p-4 flex flex-col gap-6">
          <div>
            <h2 className="text-xs font-bold text-neutral-500 uppercase tracking-widest mb-3">Settings</h2>
            <div className="space-y-4">
              <div>
                <label className="text-xs text-neutral-400 block mb-1">Format</label>
                <select className="w-full bg-neutral-800 text-sm p-2 rounded border border-neutral-700 outline-none">
                  <option>WebP</option>
                  <option>JPEG</option>
                  <option>PNG</option>
                </select>
              </div>
              <div>
                <label className="text-xs text-neutral-400 block mb-1">Quality (80%)</label>
                <input type="range" min="1" max="100" defaultValue="80" className="w-full accent-blue-500" />
              </div>
            </div>
          </div>
          
          <div className="mt-auto">
            <button className="w-full bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium py-2.5 rounded shadow-lg transition-colors flex items-center justify-center gap-2">
              <Download size={16} /> Compress Images
            </button>
          </div>
        </div>
        
        {/* Dropzone / File List */}
        <div className="flex-1 bg-neutral-950 p-8 overflow-y-auto">
          {files.length === 0 ? (
            <div 
              className="w-full h-full border-2 border-dashed border-neutral-700 rounded-xl flex flex-col items-center justify-center text-neutral-500 hover:border-blue-500 hover:text-blue-400 transition-colors cursor-pointer"
              onClick={handleSelectFiles}
            >
              <UploadCloud size={48} className="mb-4" />
              <p className="text-lg font-medium text-white mb-1">Drop images here</p>
              <p className="text-sm">or click to browse files</p>
            </div>
          ) : (
            <div className="space-y-2">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-white">{files.length} Images Queued</h2>
                <button onClick={handleSelectFiles} className="text-sm text-blue-400 hover:text-blue-300">+ Add More</button>
              </div>
              {files.map((file, i) => (
                <div key={i} className="bg-neutral-900 border border-neutral-800 p-3 rounded-lg flex items-center gap-4">
                  <div className="w-10 h-10 bg-neutral-800 rounded flex items-center justify-center">
                    <ImageIcon size={20} className="text-neutral-500" />
                  </div>
                  <div className="flex-1 truncate">
                    <p className="text-sm font-medium text-white truncate">{file.split('\\').pop()}</p>
                    <p className="text-xs text-neutral-500">Ready to compress</p>
                  </div>
                  <div className="text-xs text-neutral-400 bg-neutral-800 px-2 py-1 rounded">Pending</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
`);
console.log('Files generated successfully.');
