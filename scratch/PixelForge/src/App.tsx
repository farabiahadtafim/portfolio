import { useState, useEffect } from 'react';
import { UploadCloud, Image as ImageIcon, Download, Settings2, X, ChevronRight } from 'lucide-react';
import { ipcRenderer } from 'electron';

type FileItem = {
  path: string;
  format: string;
  quality: number;
};

export default function App() {
  const [files, setFiles] = useState<FileItem[]>([]);
  const [globalFormat, setGlobalFormat] = useState('WebP');
  const [globalQuality, setGlobalQuality] = useState(80);
  const [fileStats, setFileStats] = useState<Record<string, { original: number, compressed: number | null }>>({});
  const [expandedFile, setExpandedFile] = useState<string | null>(null);

  const handleSelectFiles = async () => {
    try {
      const selected = await ipcRenderer.invoke('dialog:openFile');
      if (selected && selected.length > 0) {
        setFiles(prev => {
          const newFiles = [...prev];
          selected.forEach((f: string) => { 
            if (!newFiles.find(x => x.path === f)) {
              newFiles.push({ path: f, format: globalFormat, quality: globalQuality });
            }
          });
          return newFiles;
        });
      }
    } catch (e) { console.error(e); }
  };

  const handleGlobalFormatChange = (val: string) => {
    setGlobalFormat(val);
    setFiles(prev => prev.map(f => ({ ...f, format: val })));
  };

  const handleGlobalQualityChange = (val: number) => {
    setGlobalQuality(val);
    setFiles(prev => prev.map(f => ({ ...f, quality: val })));
  };

  const updateFileSetting = (path: string, key: keyof FileItem, value: any) => {
    setFiles(prev => prev.map(f => f.path === path ? { ...f, [key]: value } : f));
  };

  const removeFile = (path: string) => {
    setFiles(prev => prev.filter(f => f.path !== path));
  };

  useEffect(() => {
    const updateStats = async () => {
      const newStats = { ...fileStats };
      for (const file of files) {
        if (!newStats[file.path]) {
          const info = await ipcRenderer.invoke('get-file-info', file.path);
          newStats[file.path] = { original: info.size, compressed: null };
        }
        const est = await ipcRenderer.invoke('compress-estimate', { filePath: file.path, format: file.format, quality: file.quality });
        if (est && est.size) {
          newStats[file.path].compressed = est.size;
        }
      }
      setFileStats(newStats);
    };
    updateStats();
  }, [files]);

  const formatSize = (bytes: number) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getPercentage = (original: number, compressed: number) => {
    if (original === 0) return 0;
    return (100 - (compressed / original) * 100).toFixed(1);
  };

  return (
    <div className="h-screen w-screen flex flex-col bg-neutral-900 font-sans">
      <div className="h-10 bg-neutral-950 flex items-center px-4 app-region-drag border-b border-neutral-800 shrink-0">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
          <span className="ml-4 text-xs font-semibold text-neutral-400 tracking-wider">PIXELFORGE</span>
        </div>
      </div>
      
      <div className="flex-1 flex overflow-hidden">
        <div className="w-64 bg-neutral-900 border-r border-neutral-800 p-4 flex flex-col gap-6 shrink-0 overflow-y-auto">
          <div>
            <h2 className="text-xs font-bold text-neutral-500 uppercase tracking-widest mb-3">Global Settings</h2>
            <div className="space-y-4">
              <div>
                <label className="text-xs text-neutral-400 block mb-1">Format</label>
                <select 
                  value={globalFormat} 
                  onChange={(e) => handleGlobalFormatChange(e.target.value)}
                  className="w-full bg-neutral-800 text-sm p-2 rounded border border-neutral-700 outline-none text-white"
                >
                  <option>WebP</option>
                  <option>JPEG</option>
                  <option>PNG</option>
                </select>
              </div>
              <div>
                <label className="text-xs text-neutral-400 block mb-1">Quality ({globalQuality}%)</label>
                <input 
                  type="range" 
                  min="1" 
                  max="100" 
                  value={globalQuality} 
                  onChange={(e) => handleGlobalQualityChange(parseInt(e.target.value))}
                  className="w-full accent-blue-500" 
                />
              </div>
            </div>
          </div>
          
          <div className="mt-auto">
            <button className="w-full bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium py-2.5 rounded shadow-lg transition-colors flex items-center justify-center gap-2">
              <Download size={16} /> Compress Images
            </button>
          </div>
        </div>
        
        <div className="flex-1 bg-neutral-950 p-8 overflow-y-auto">
          {files.length === 0 ? (
            <div 
              className="w-full h-full border-2 border-dashed border-neutral-700 rounded-xl flex flex-col items-center justify-center text-neutral-500 hover:border-blue-500 hover:text-blue-400 transition-colors cursor-pointer"
              onClick={handleSelectFiles}
              onDragOver={(e) => { e.preventDefault(); e.stopPropagation(); }}
              onDragEnter={(e) => { e.preventDefault(); e.stopPropagation(); }}
              onDrop={(e) => {
                e.preventDefault();
                e.stopPropagation();
                const droppedFiles = Array.from(e.dataTransfer.files).map(f => f.path);
                if (droppedFiles.length > 0) {
                  setFiles(prev => {
                    const newFiles = [...prev];
                    droppedFiles.forEach((f) => { 
                      if (!newFiles.find(x => x.path === f)) newFiles.push({ path: f, format: globalFormat, quality: globalQuality }); 
                    });
                    return newFiles;
                  });
                }
              }}
            >
              <UploadCloud size={48} className="mb-4" />
              <p className="text-lg font-medium text-white mb-1">Drop images here</p>
              <p className="text-sm">or click to browse files</p>
            </div>
          ) : (
            <div className="max-w-4xl mx-auto space-y-4 pb-12">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-white">{files.length} Images Queued</h2>
                <button onClick={handleSelectFiles} className="text-sm text-blue-400 hover:text-blue-300 font-medium">+ Add More</button>
              </div>
              {files.map((file, i) => {
                const stats = fileStats[file.path];
                const original = stats?.original || 0;
                const compressed = stats?.compressed || 0;
                const pct = getPercentage(original, compressed);
                const isBetter = original > compressed;
                const isExpanded = expandedFile === file.path;

                return (
                  <div key={i} className="bg-[#1C1C1E] rounded-lg p-3 flex flex-col hover:bg-[#252528] transition-colors group">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-neutral-800 rounded flex items-center justify-center shrink-0 overflow-hidden text-neutral-400">
                        <img src={`file://${file.path}`} className="w-full h-full object-cover" alt="Thumbnail" />
                      </div>
                      <div className="flex-1 w-full truncate">
                        <p className="text-[13px] font-semibold text-neutral-200 truncate leading-tight">{file.path.split('\\').pop()}</p>
                        <p className="text-[11px] text-neutral-500 mt-0.5">
                          {formatSize(original)} - {file.path.split('.').pop()?.toUpperCase()} Image
                          {compressed > 0 && <span className="ml-2 text-green-400">→ {formatSize(compressed)} (-{pct}%)</span>}
                        </p>
                      </div>
                      <div className="shrink-0 flex items-center gap-3 opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="flex items-center gap-1.5 text-xs text-neutral-300 hover:text-white transition-colors">
                          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/><path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16"/><path d="M16 21v-5h5"/></svg>
                          Convert
                        </button>
                        
                        <div className="flex items-center bg-[#2A2A2D] rounded border border-[#3A3A3D] text-xs">
                          <div className="flex items-center gap-1.5 px-2.5 py-1.5 text-neutral-300 border-r border-[#3A3A3D]">
                            <ImageIcon size={12} /> {file.path.split('.').pop()?.toUpperCase()}
                          </div>
                          <span className="px-2 text-neutral-500">→</span>
                          <select 
                             value={file.format} 
                             onChange={(e) => updateFileSetting(file.path, 'format', e.target.value)}
                             className="bg-transparent text-neutral-200 text-xs py-1.5 pl-2 pr-6 outline-none appearance-none cursor-pointer"
                             style={{ background: 'url("data:image/svg+xml;utf8,<svg fill=%27%23888%27 height=%2724%27 viewBox=%270 0 24 24%27 width=%2724%27 xmlns=%27http://www.w3.org/2000/svg%27><path d=%27M7 10l5 5 5-5z%27/></svg>") no-repeat right 4px center' }}
                           >
                             <option className="bg-[#2A2A2D]">WebP</option>
                             <option className="bg-[#2A2A2D]">JPEG</option>
                             <option className="bg-[#2A2A2D]">PNG</option>
                           </select>
                        </div>

                        <button 
                          onClick={() => setExpandedFile(isExpanded ? null : file.path)}
                          className={`flex items-center gap-1.5 px-3 py-1.5 rounded border text-xs font-medium transition-colors ${isExpanded ? 'bg-blue-500/10 border-blue-500/30 text-blue-400' : 'bg-transparent border-[#3A3A3D] text-neutral-300 hover:bg-[#3A3A3D]'}`}
                        >
                          <Settings2 size={13} /> Options
                        </button>
                        <button onClick={() => removeFile(file.path)} className="text-neutral-500 hover:text-red-400 transition-colors ml-1">
                          <X size={16} />
                        </button>
                      </div>
                    </div>
                    
                    {isExpanded && (
                      <div className="mt-3 p-4 bg-[#141415] rounded-md border border-[#2A2A2D] flex flex-col gap-4 animate-in fade-in slide-in-from-top-2">
                        <div>
                           <div className="flex justify-between mb-1.5">
                             <label className="text-[11px] text-neutral-400 uppercase tracking-wider font-semibold">Extra Quality Reduction</label>
                             <span className="text-xs text-blue-400 font-medium">{100 - file.quality}%</span>
                           </div>
                           <input 
                             type="range" 
                             min="1" 
                             max="100" 
                             value={100 - file.quality} 
                             onChange={(e) => updateFileSetting(file.path, 'quality', 100 - parseInt(e.target.value))}
                             className="w-full accent-blue-500 h-1.5 bg-neutral-800 rounded-full appearance-none cursor-pointer" 
                           />
                           <p className="text-[10px] text-neutral-500 mt-1.5">Move slider to right to heavily reduce file size (lower quality).</p>
                        </div>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}