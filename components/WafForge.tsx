
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
  Globe
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
  const [quotaExceeded, setQuotaExceeded] = useState(false);

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
        setQuotaExceeded(false);
        setStatus('Neural Link Synchronized. High-Bandwidth Access Granted.');
      } catch (e) {
        console.error("Link failed", e);
      }
    }
  };

  const handleApiError = (error: any) => {
    const msg = error.message || "";
    console.error("Forge Error:", error);
    
    if (msg.includes('429') || msg.toLowerCase().includes('quota') || msg.toLowerCase().includes('exhausted')) {
      setQuotaExceeded(true);
      return "Global Node Congested. Please re-sync or wait.";
    }
    
    if (msg.includes('entity was not found')) {
      setHasPersonalKey(false);
      return "Neural Link Broken. Please Re-sync.";
    }

    return `Transmission Interrupted: ${msg.slice(0, 50)}...`;
  };

  const forgeImage = async () => {
    setLoading(true);
    setStatus('Transmitting to Visionary Node...');
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: { parts: [{ text: `${prompt}, cinematic lighting, photorealistic, ultra-detailed, 8k resolution, professional digital art` }] },
        config: {
          imageConfig: { aspectRatio }
        }
      });
      
      const part = response.candidates?.[0]?.content?.parts?.find(p => p.inlineData);
      if (part?.inlineData) {
        setResult({
          type: 'image',
          url: `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`
        });
        setStatus('Vision successfully forged.');
      } else {
        setStatus('Vision node returned empty.');
      }
    } catch (error: any) {
      setStatus(handleApiError(error));
    } finally {
      setLoading(false);
    }
  };

  const forgeContent = async () => {
    setLoading(true);
    setStatus('Synthesizing Lexicon Stream...');
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: { parts: [{ text: prompt }] },
        config: {
          systemInstruction: "You are the WAF Lexicon Forge. Generate high-impact, professional content. Use clean Markdown formatting."
        }
      });
      setResult({ type: 'content', text: response.text });
      setStatus('Lexicon synthesis complete.');
    } catch (error) {
      setStatus(handleApiError(error));
    } finally {
      setLoading(false);
    }
  };

  const forgeVideo = async () => {
    if (!hasPersonalKey) {
      setStatus('Motion Synthesis requires a synchronized Neural Link.');
      setQuotaExceeded(true);
      return;
    }

    setLoading(true);
    setStatus('Initiating Temporal Motion Pipeline...');
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      let operation = await ai.models.generateVideos({
        model: 'veo-3.1-fast-generate-preview',
        prompt: prompt,
        config: { numberOfVideos: 1, resolution: '720p', aspectRatio: '16:9' }
      });

      const calming = ["Solving temporal vectors...", "Calculating fluid dynamics...", "Rendering neural frames...", "Finalizing global illumination..."];
      let i = 0;
      while (!operation.done) {
        setStatus(calming[i % calming.length]);
        i++;
        await new Promise(resolve => setTimeout(resolve, 8000));
        operation = await ai.operations.getVideosOperation({ operation: operation });
      }

      const downloadLink = operation.response?.generatedVideos?.[0]?.video?.uri;
      const response = await fetch(`${downloadLink}&key=${process.env.API_KEY}`);
      const blob = await response.blob();
      setResult({ type: 'video', url: URL.createObjectURL(blob) });
      setStatus('Motion sequence forged.');
    } catch (error: any) {
      setStatus(handleApiError(error));
    } finally {
      setLoading(false);
    }
  };

  const handleForge = () => {
    if (!prompt.trim()) return;
    setResult(null);
    if (activeTool === 'image') forgeImage();
    if (activeTool === 'content') forgeContent();
    if (activeTool === 'video') forgeVideo();
  };

  return (
    <section id="forge" className="py-32 relative bg-slate-950 overflow-hidden">
      <div className="absolute inset-0 bg-blue-600/5 -z-10 blur-[150px] animate-pulse"></div>
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 reveal-on-scroll">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Globe className="text-blue-500 w-5 h-5 animate-spin-slow" />
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-400">Universal Forge Node</span>
          </div>
          <h2 className="font-display text-4xl md:text-6xl font-bold mb-6">WAF <span className="shimmer-text">Forge</span></h2>
          <p className="text-slate-400 max-w-xl mx-auto text-lg font-light">
            High-performance AI tools for creators. Universal intelligence at your command.
          </p>
        </div>

        <div className="glass rounded-[3.5rem] border-white/10 p-1 relative shadow-3xl">
          <div className="flex flex-wrap items-center justify-center gap-2 p-6 border-b border-white/5 bg-white/5 rounded-t-[3.4rem]">
            {[
              { id: 'image', icon: <ImageIcon className="w-4 h-4" />, label: 'Vision Node' },
              { id: 'content', icon: <FileText className="w-4 h-4" />, label: 'Lexicon Node' },
              { id: 'video', icon: <VideoIcon className="w-4 h-4" />, label: 'Motion Node' }
            ].map((tool) => (
              <button
                key={tool.id}
                onClick={() => { setActiveTool(tool.id as ToolType); setResult(null); setStatus(''); }}
                className={`flex items-center gap-3 px-10 py-5 rounded-[1.8rem] font-black uppercase tracking-[0.2em] text-[10px] transition-all
                  ${activeTool === tool.id 
                    ? 'bg-blue-600 text-white shadow-2xl shadow-blue-500/30 scale-105' 
                    : 'bg-white/5 text-slate-500 hover:bg-white/10'}`}
              >
                {tool.icon}
                {tool.label}
              </button>
            ))}
          </div>

          <div className="p-8 md:p-14">
            <div className="flex flex-col lg:flex-row gap-16">
              {/* Input Area */}
              <div className="lg:w-1/2 space-y-10">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <label className="text-[10px] uppercase tracking-[0.4em] text-slate-500 font-black">Transmission Input</label>
                    <div className="flex items-center gap-2 text-[10px] text-blue-500/50 font-bold uppercase tracking-widest">
                      <RefreshCw className={`w-3 h-3 ${loading ? 'animate-spin' : ''}`} />
                      {loading ? 'Decrypting...' : 'Awaiting Data'}
                    </div>
                  </div>
                  <textarea
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder={
                      activeTool === 'image' ? "Envision the future... (e.g. A cybernetic garden in space)" :
                      activeTool === 'content' ? "Synthesize a professional transmission... (e.g. A manifesto for AI equity)" :
                      "Cinematic motion sequence details..."
                    }
                    className="w-full bg-slate-900/40 border border-white/10 rounded-[2.5rem] px-8 py-8 h-56 focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/5 outline-none transition-all text-white placeholder:text-slate-700 resize-none font-light text-lg"
                  />
                </div>

                {activeTool === 'image' && (
                  <div className="space-y-4">
                    <label className="text-[10px] uppercase tracking-[0.4em] text-slate-500 font-black">Spatial Ratio</label>
                    <div className="flex flex-wrap gap-3">
                      {(['1:1', '16:9', '9:16', '4:3', '3:4'] as AspectRatio[]).map((ratio) => (
                        <button
                          key={ratio}
                          onClick={() => setAspectRatio(ratio)}
                          className={`px-5 py-3 rounded-2xl text-[10px] font-black uppercase border transition-all ${
                            aspectRatio === ratio 
                              ? 'bg-blue-600 border-blue-600 text-white shadow-lg scale-110' 
                              : 'bg-white/5 border-white/10 text-slate-500 hover:border-white/20'
                          }`}
                        >
                          {ratio}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <button
                  onClick={handleForge}
                  disabled={loading || !prompt.trim()}
                  className={`w-full py-8 rounded-[2rem] font-black uppercase tracking-[0.5em] flex items-center justify-center gap-4 transition-all text-[11px]
                    ${loading 
                      ? 'bg-slate-800 text-slate-500 cursor-not-allowed' 
                      : 'bg-blue-600 text-white hover:bg-blue-500 shadow-3xl shadow-blue-500/40 active:scale-[0.98]'}`}
                >
                  {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : <Sparkles className="w-6 h-6" />}
                  {loading ? 'Synthesizing...' : `Forge ${activeTool.toUpperCase()}`}
                </button>

                {status && (
                  <div className={`flex items-center justify-center gap-3 p-5 rounded-2xl border transition-all animate-in slide-in-from-top-2 duration-300 ${status.includes('Congested') || status.includes('Broken') || status.includes('Interrupted') ? 'bg-red-500/10 border-red-500/20 text-red-400' : 'bg-blue-500/5 border-blue-500/10 text-blue-400'}`}>
                    <Info className="w-5 h-5" />
                    <p className="text-[11px] uppercase tracking-[0.1em] font-black text-center leading-tight">{status}</p>
                    {status.includes('Congested') && (
                       <button onClick={handleSyncGrid} className="ml-2 px-3 py-1 bg-blue-600 text-white rounded-lg text-[9px] uppercase font-black hover:bg-blue-500 transition-colors">Sync</button>
                    )}
                  </div>
                )}
              </div>

              {/* Result Area */}
              <div className="lg:w-1/2">
                <div className="h-full siren-border-outer rounded-[3rem] p-1 bg-white/5 min-h-[500px]">
                  {loading && <div className="siren-border-inner"></div>}
                  <div className="relative z-10 w-full h-full bg-slate-950 rounded-[2.9rem] border border-white/10 flex items-center justify-center overflow-hidden">
                    {!result && !loading && (
                      <div className="text-center p-16 group">
                        <div className="relative mb-8">
                          <div className="absolute inset-0 bg-blue-500/5 blur-3xl rounded-full group-hover:bg-blue-500/10 transition-all"></div>
                          <Wand2 className="w-24 h-24 mx-auto text-blue-900 group-hover:text-blue-600 transition-colors relative z-10" />
                        </div>
                        <p className="text-[11px] font-black uppercase tracking-[0.6em] text-slate-700 group-hover:text-blue-400/50 transition-colors">Awaiting Grid Transmission</p>
                      </div>
                    )}

                    {loading && (
                      <div className="text-center p-12">
                        <div className="relative mb-12">
                          <div className="absolute inset-0 bg-blue-600/30 blur-3xl animate-pulse"></div>
                          <Loader2 className="w-20 h-20 animate-spin text-blue-600 mx-auto relative z-10" />
                        </div>
                        <h4 className="text-3xl font-display font-bold text-white mb-2">Neural Forging</h4>
                        <p className="text-[11px] uppercase tracking-[0.3em] text-slate-500 font-bold">{status}</p>
                      </div>
                    )}

                    {result && !loading && (
                      <div className="w-full h-full animate-in fade-in duration-1000 flex flex-col">
                        {result.type === 'image' && (
                          <div className="relative group w-full h-full flex items-center justify-center">
                            <img src={result.url} className="max-w-full max-h-[600px] object-contain shadow-3xl" alt="Forged Vision" />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                              <a href={result.url} download="waf-forge-result.png" className="p-6 bg-blue-600 text-white rounded-[2rem] hover:scale-110 transition-transform shadow-2xl">
                                <Download className="w-10 h-10" />
                              </a>
                            </div>
                          </div>
                        )}
                        {result.type === 'content' && (
                          <div className="p-12 h-full overflow-y-auto custom-scrollbar">
                            <div className="flex justify-between items-center mb-8 pb-4 border-b border-white/10">
                              <span className="text-[10px] font-black uppercase tracking-widest text-blue-400">Lexicon Transmision</span>
                              <button 
                                onClick={() => { navigator.clipboard.writeText(result.text || ''); setStatus('Synthesis Copied to Buffer'); }} 
                                className="text-[10px] font-black uppercase text-slate-500 hover:text-white transition-colors"
                              >
                                Copy Buffer
                              </button>
                            </div>
                            <div className="prose prose-invert max-w-none text-slate-300 font-light leading-relaxed text-lg">
                              {result.text}
                            </div>
                          </div>
                        )}
                        {result.type === 'video' && (
                          <div className="relative w-full h-full flex items-center justify-center bg-black">
                            <video src={result.url} className="w-full h-full object-contain" controls autoPlay loop />
                            <a href={result.url} download="waf-motion-forge.mp4" className="absolute top-8 right-8 p-5 bg-blue-600 text-white rounded-2xl hover:scale-110 transition-transform shadow-3xl z-20">
                              <Download className="w-8 h-8" />
                            </a>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .animate-spin-slow { animation: spin 12s linear infinite; }
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(59, 130, 246, 0.2); border-radius: 10px; }
      `}</style>
    </section>
  );
};

export default WafForge;
