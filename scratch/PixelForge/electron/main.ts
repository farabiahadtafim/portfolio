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
    filters: [{ name: 'Images', extensions: ['jpg', 'jpeg', 'png', 'webp', 'gif'] }]
  })
  if (canceled) return []
  return filePaths
})

const fs = require('fs');
let sharp: any;
try {
  sharp = require('sharp');
} catch (e) {
  console.error("Failed to load sharp", e);
}

ipcMain.handle('get-file-info', async (e, filePath: string) => {
  try {
    const stat = fs.statSync(filePath);
    return { size: stat.size };
  } catch (err) {
    return { size: 0 };
  }
});

ipcMain.handle('compress-estimate', async (e, { filePath, format, quality }: { filePath: string, format: string, quality: number }) => {
  if (!sharp) return { size: 0, error: 'Sharp not installed' };
  try {
    let s = sharp(filePath);
    const fmt = format.toLowerCase();
    if (fmt === 'webp') s = s.webp({ quality });
    else if (fmt === 'jpeg') s = s.jpeg({ quality });
    else if (fmt === 'png') s = s.png({ quality: Math.min(100, Math.max(1, quality)) });
    
    const buffer = await s.toBuffer();
    return { size: buffer.length };
  } catch (err: any) {
    return { size: 0, error: err.message };
  }
});