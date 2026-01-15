
import React, { useState, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";
import { 
  Image as ImageIcon, 
  FileText, 
  Video as VideoIcon, 
  Wand2, 
  Loader2, 
  Sparkles, 
  Download,
  Key,
  RefreshCw,
  Info,
  ShieldCheck,
  Globe,
  Plus,
  Zap,
  Layers,
  Activity,
  Maximize2,
  Terminal
} from 'lucide-react';

type ToolType = 'image' | 'content' | 'video';
type AspectRatio = '1:1' | '16:9' | '9:16' | '4:3' | '3:4';

const WafForge: React.FC = () => {
  const [activeTool, setActiveTool] = useState<ToolType>('image');
  const [prompt, setPrompt] = useState('');
  const [aspectRatio, setAspectRatio] = useState<AspectRatio>('1:1');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ type: ToolType; url?: string; text?: string } | null>(null);
  const [status, setStatus] = useState('');
  const [hasPersonalKey, setHasPersonalKey] = useState(false);

  useEffect(() => {
    checkKeyStatus();
  }, []);

  const checkKeyStatus = async () => {
    // @ts-ignore
    if (window.aistudio && typeof window.aistudio.hasSelectedApiKey === 'function') {
      // @ts-ignore
      const linked = await window.aistudio.hasSelectedApiKey();
      setHasPersonalKey(linked);
    }
  };

  const handleSyncGrid = async () => {
    // @ts-ignore
    if (window.aistudio && typeof window.aistudio.openSelectKey === 'function') {
      try {
        // @ts-ignore
        await window.aistudio.openSelectKey();
        setHasPersonalKey(true);
        setStatus('Neural Link Synchronized.');
      } catch (e) {
        console.error("Link failed", e);
      }
    }
  };

  const handleApiError = (error: any) => {
    const msg = error.message || "";
    console.error("Forge Error:", error);
    if (msg.includes('429') || msg.toLowerCase().includes('quota')) return "Global Node Congested. Please re-sync.";
    return `Transmission Interrupted: ${msg.slice(0, 40)}...`;
  };

  const forgeImage = async () => {
    setLoading(true);
    setStatus('Transmitting Visionary Request...');
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: { parts: [{ text: `${prompt}, cinematic masterpiece, ultra-detailed, 8k resolution, professional digital art` }] },
        config: { imageConfig: { aspectRatio } }
      });
      const part = response.candidates?.[0]?.content?.parts?.find(p => p.inlineData);
      if (part?.inlineData) {
        setResult({ type: 'image', url: `data:${part.inlineData.mimeType};base64,${part.inlineData.data}` });
        setStatus('Vision forged.');
      } else setStatus('Vision node returned empty.');
    } catch (error) { setStatus(handleApiError(error)); } finally { setLoading(false); }
  };

  const forgeContent = async () => {
    setLoading(true);
    setStatus('Synthesizing Lexicon...');
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: { parts: [{ text: prompt }] },
        config: { systemInstruction: "You are the WAF Lexicon Forge. Generate high-impact professional content in Markdown." }
      });
      setResult({ type: 'content', text: response.text });
      setStatus('Lexicon forged.');
    } catch (error) { setStatus(handleApiError(error)); } finally { setLoading(false); }
  };

  const forgeVideo = async () => {
    if (!hasPersonalKey) { setStatus('Sync required for Motion Synthesis.'); return; }
    setLoading(true);
    setStatus('Temporal Sequence Initiated...');
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      let operation = await ai.models.generateVideos({
        model: 'veo-3.1-fast-generate-preview',
        prompt: prompt,
        config: { numberOfVideos: 1, resolution: '720p', aspectRatio: '16:9' }
      });
      while (!operation.done) {
        await new Promise(r => setTimeout(r, 8000));
        operation = await ai.operations.getVideosOperation({ operation: operation });
      }
      const downloadLink = operation.response?.generatedVideos?.[0]?.video?.uri;
      const response = await fetch(`${downloadLink}&key=${process.env.API_KEY}`);
      const blob = await response.blob();
      setResult({ type: 'video', url: URL.createObjectURL(blob) });
      setStatus('Motion sequence forged.');
    } catch (error) { setStatus(handleApiError(error)); } finally { setLoading(false); }
  };

  const handleForge = () => {
    if (!prompt.trim()) return;
    setResult(null);
    if (activeTool === 'image') forgeImage();
    if (activeTool === 'content') forgeContent();
    if (activeTool === 'video') forgeVideo();
  };

  return (
    <div className="glass rounded-[4rem] border-white/10 p-1 relative shadow-3xl bg-slate-900/40 overflow-hidden reveal-on-scroll">
      {/* Dynamic Background Grid Decor */}
      <div className="absolute inset-0 pointer-events-none opacity-5">
        <div className="absolute top-0 left-0 w-full h-full" style={{ backgroundImage: 'radial-gradient(circle, #3b82f6 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-4 p-8 border-b border-white/5 bg-white/5 relative z-10">
        {[
          { id: 'image', icon: <ImageIcon className="w-5 h-5" />, label: 'Vision Node', color: 'blue' },
          { id: 'content', icon: <FileText className="w-5 h-5" />, label: 'Lexicon Node', color: 'purple' },
          { id: 'video', icon: <VideoIcon className="w-5 h-5" />, label: 'Motion Node', color: 'emerald' }
        ].map((tool) => (
          <button
            key={tool.id}
            onClick={() => { setActiveTool(tool.id as ToolType); setResult(null); setStatus(''); }}
            className={`flex items-center gap-4 px-8 py-4 md:px-12 md:py-6 rounded-[2rem] font-black uppercase tracking-[0.3em] text-[9px] md:text-[11px] transition-all relative overflow-hidden group
              ${activeTool === tool.id 
                ? 'bg-blue-600 text-white shadow-[0_0_30px_rgba(59,130,246,0.5)] scale-105' 
                : 'bg-white/5 text-slate-500 hover:bg-white/10 hover:text-slate-300'}`}
          >
            {activeTool === tool.id && (
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            )}
            {tool.icon}
            <span className="hidden sm:inline">{tool.label}</span>
          </button>
        ))}
      </div>

      <div className="p-8 md:p-12 lg:p-20 relative z-10">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
          <div className="lg:w-1/2 space-y-10">
            <div className="relative group">
               <div className="absolute -top-3 -left-3 flex gap-2">
                  <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
                  <div className="w-2 h-2 rounded-full bg-slate-700"></div>
               </div>
               <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder={`Input synaptic instructions for ${activeTool === 'image' ? 'a visual masterpiece' : activeTool === 'content' ? 'complex lexicon' : 'motion synthesis'}...`}
                className="w-full bg-slate-950/70 border border-white/10 rounded-[2.5rem] p-10 h-64 focus:border-blue-500/50 outline-none transition-all text-white text-lg font-light resize-none shadow-inner"
              />
              <div className="absolute bottom-6 right-8 flex items-center gap-4 text-[9px] font-black uppercase tracking-widest text-slate-600 pointer-events-none">
                 <Terminal className="w-3 h-3" /> System_Forge_Ready
              </div>
            </div>

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              {activeTool === 'image' && (
                <div className="flex flex-wrap gap-2">
                  {(['1:1', '16:9', '9:16', '4:3', '3:4'] as AspectRatio[]).map((r) => (
                    <button 
                      key={r} 
                      onClick={() => setAspectRatio(r)} 
                      className={`px-5 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest border transition-all
                        ${aspectRatio === r 
                          ? 'bg-blue-600 border-blue-600 text-white shadow-lg' 
                          : 'border-white/10 text-slate-500 hover:border-white/20'}`}
                    >
                      {r}
                    </button>
                  ))}
                </div>
              )}
              <div className="flex-1"></div>
            </div>

            <button 
              onClick={handleForge} 
              disabled={loading || !prompt.trim()} 
              className="w-full py-8 bg-blue-600 text-white rounded-[2rem] font-black uppercase tracking-[0.5em] hover:bg-blue-500 transition-all shadow-[0_20px_50px_rgba(37,99,235,0.3)] flex items-center justify-center gap-5 text-sm group transform active:scale-95"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Sparkles className="w-5 h-5 group-hover:scale-125 transition-transform" />}
              {loading ? 'Processing Synapses...' : 'Initiate Neural Synthesis'}
            </button>
            
            {status && (
              <div className="p-5 rounded-3xl bg-white/5 border border-white/10 text-blue-400 text-center text-[11px] font-black uppercase tracking-[0.2em] flex items-center justify-center gap-4 animate-in fade-in slide-in-from-top-2">
                <Activity className="w-4 h-4 animate-pulse" /> {status}
                {status.includes('Sync') && (
                  <button onClick={handleSyncGrid} className="ml-4 px-4 py-2 bg-blue-600 text-white rounded-full text-[9px] hover:bg-blue-500 transition-colors">
                    Re-Sync Node
                  </button>
                )}
              </div>
            )}
          </div>

          <div className="lg:w-1/2">
            <div className="h-full min-h-[450px] bg-slate-950/50 rounded-[3rem] border border-white/10 flex items-center justify-center overflow-hidden relative group shadow-2xl">
              {/* Scanline Effect Overlay */}
              <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-10 bg-[length:100%_4px,3px_100%]"></div>
              
              {!result && !loading && (
                <div className="text-center opacity-20 group-hover:opacity-30 transition-all duration-700 flex flex-col items-center">
                  <div className="w-24 h-24 rounded-full border border-dashed border-white/20 flex items-center justify-center mb-6 animate-spin-slow">
                     <Layers className="w-10 h-10" />
                  </div>
                  <p className="font-black text-[12px] uppercase tracking-[0.8em]">Awaiting Link</p>
                </div>
              )}
              
              {loading && (
                <div className="text-center relative z-20">
                  <div className="relative mb-8">
                     <div className="absolute inset-0 bg-blue-600/20 blur-xl animate-pulse"></div>
                     <Loader2 className="w-12 h-12 animate-spin text-blue-500 mx-auto" />
                  </div>
                  <p className="text-slate-500 text-[11px] font-black uppercase tracking-[0.6em] animate-pulse">Synthesizing Asset...</p>
                </div>
              )}
              
              {result && !loading && (
                <div className="w-full h-full animate-in fade-in zoom-in-95 duration-700 relative z-20">
                  {result.type === 'image' && (
                    <div className="relative group w-full h-full flex items-center justify-center p-4">
                      <img src={result.url} className="max-w-full max-h-full rounded-2xl shadow-2xl border border-white/10" alt="Neural Synthesis Result" />
                      <div className="absolute top-8 right-8 flex gap-3 opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0">
                         <a href={result.url} download="waf-forge-output.png" className="p-4 bg-blue-600/90 hover:bg-blue-600 rounded-2xl text-white shadow-2xl transition-all">
                            <Download className="w-5 h-5" />
                         </a>
                         <button className="p-4 bg-white/10 hover:bg-white/20 rounded-2xl text-white backdrop-blur-xl border border-white/10 transition-all">
                            <Maximize2 className="w-5 h-5" />
                         </button>
                      </div>
                    </div>
                  )}
                  {result.type === 'content' && (
                    <div className="p-12 h-full overflow-y-auto custom-scrollbar bg-slate-900/40">
                       <div className="flex justify-between items-center mb-10 pb-4 border-b border-white/10">
                          <div className="flex items-center gap-3">
                             <div className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_10px_#3b82f6]"></div>
                             <span className="text-[11px] font-black text-blue-400 uppercase tracking-[0.4em]">Lexicon Stream</span>
                          </div>
                          <button 
                            onClick={() => { navigator.clipboard.writeText(result.text || ''); setStatus('Lexicon Copied to Neural Buffer'); }} 
                            className="text-[10px] font-black text-slate-500 uppercase tracking-widest hover:text-white transition-colors"
                          >
                            Copy Payload
                          </button>
                       </div>
                       <div className="prose prose-invert max-w-none text-slate-300 leading-relaxed text-base font-light font-sans selection:bg-blue-600/30">
                          {result.text}
                       </div>
                    </div>
                  )}
                  {result.type === 'video' && (
                    <div className="w-full h-full flex items-center justify-center p-4">
                       <video src={result.url} className="max-w-full max-h-full rounded-2xl shadow-2xl border border-white/10" controls autoPlay loop />
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; } 
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(59, 130, 246, 0.2); border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(59, 130, 246, 0.4); }
        .animate-spin-slow { animation: spin 12s linear infinite; }
      `}</style>
    </div>
  );
};

export default WafForge;
