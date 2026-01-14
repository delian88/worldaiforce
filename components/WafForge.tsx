
import React, { useState } from 'react';
import { GoogleGenAI } from "@google/genai";
import { 
  Image as ImageIcon, 
  FileText, 
  Video as VideoIcon, 
  Wand2, 
  Loader2, 
  Sparkles, 
  AlertCircle,
  Download,
  Key,
  Zap,
  RefreshCw,
  Info
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
  const [isQuotaExceeded, setIsQuotaExceeded] = useState(false);

  // Opens the AI Studio key selection dialog to bypass limits
  const handleConnectPersonalKey = async () => {
    // @ts-ignore
    if (window.aistudio && typeof window.aistudio.openSelectKey === 'function') {
      try {
        await window.aistudio.openSelectKey();
        setIsQuotaExceeded(false);
        setStatus('Neural link upgraded. High-quota transmission enabled.');
      } catch (e) {
        console.error("Key selection failed", e);
      }
    }
  };

  const handleApiError = (error: any) => {
    console.error("Forge Error:", error);
    const errorMsg = error.message || "";
    
    if (errorMsg.includes('429') || errorMsg.includes('quota') || errorMsg.includes('limit')) {
      setIsQuotaExceeded(true);
      return "Global quota exhausted. Link personal account for unlimited forge.";
    }
    
    if (errorMsg.includes('not found')) {
      return "Entity mismatch. Please re-link your API account.";
    }

    return `Transmission failed: ${errorMsg.slice(0, 40)}...`;
  };

  const forgeImage = async () => {
    setLoading(true);
    setStatus('Transmitting vision data...');
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: { parts: [{ text: `${prompt}, cinematic lighting, photorealistic, 8k, masterwork` }] },
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
        setStatus('Synthesizer returned null. Try a different prompt.');
      }
    } catch (error: any) {
      setStatus(handleApiError(error));
    } finally {
      setLoading(false);
    }
  };

  const forgeContent = async () => {
    setLoading(true);
    setStatus('Decoding Lexicon...');
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: { parts: [{ text: prompt }] },
        config: {
          systemInstruction: "You are the WAF Forge Lexicon. Generate high-impact, professional content. Use Markdown."
        }
      });
      setResult({ type: 'content', text: response.text });
      setStatus('Lexicon generated.');
    } catch (error) {
      setStatus(handleApiError(error));
    } finally {
      setLoading(false);
    }
  };

  const forgeVideo = async () => {
    // @ts-ignore
    const hasKey = window.aistudio && typeof window.aistudio.hasSelectedApiKey === 'function' 
      ? await window.aistudio.hasSelectedApiKey() 
      : false;

    if (!hasKey) {
      setStatus('Personal Neural Link required for Motion Synthesis.');
      setIsQuotaExceeded(true);
      return;
    }

    setLoading(true);
    setStatus('Initiating Motion Pipeline...');
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      let operation = await ai.models.generateVideos({
        model: 'veo-3.1-fast-generate-preview',
        prompt: prompt,
        config: { numberOfVideos: 1, resolution: '720p', aspectRatio: '16:9' }
      });

      while (!operation.done) {
        await new Promise(resolve => setTimeout(resolve, 10000));
        operation = await ai.operations.getVideosOperation({ operation: operation });
      }

      const downloadLink = operation.response?.generatedVideos?.[0]?.video?.uri;
      const response = await fetch(`${downloadLink}&key=${process.env.API_KEY}`);
      const blob = await response.blob();
      setResult({ type: 'video', url: URL.createObjectURL(blob) });
      setStatus('Motion Forge complete.');
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
            <Zap className="text-blue-500 w-5 h-5 animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-400">Advanced Transmissions</span>
          </div>
          <h2 className="font-display text-4xl md:text-6xl font-bold mb-6">WAF <span className="shimmer-text">Forge</span></h2>
          <p className="text-slate-400 max-w-xl mx-auto text-lg font-light">
            Unlimited AI toolsets. Built for global innovators, accessible to everyone.
          </p>
        </div>

        {/* Global Alert for Quota */}
        {isQuotaExceeded && (
          <div className="mb-12 max-w-3xl mx-auto p-8 rounded-[2rem] bg-blue-600/10 border border-blue-500/20 backdrop-blur-xl animate-in zoom-in-95 duration-500">
            <div className="flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
              <div className="w-16 h-16 rounded-full bg-blue-600 flex items-center justify-center shrink-0 shadow-[0_0_30px_rgba(37,99,235,0.5)]">
                <Key className="text-white w-8 h-8" />
              </div>
              <div className="flex-1">
                <h4 className="text-xl font-bold text-white mb-2 uppercase tracking-tight">Personal Neural Link Required</h4>
                <p className="text-slate-400 text-sm leading-relaxed mb-4">
                  The global public quota has been exhausted. To continue forging without limits, link your own project account.
                </p>
                <div className="flex flex-wrap gap-4 items-center">
                  <button 
                    onClick={handleConnectPersonalKey}
                    className="px-6 py-3 bg-blue-600 text-white text-[11px] font-black uppercase tracking-widest rounded-xl hover:bg-blue-500 transition-all shadow-xl shadow-blue-500/20"
                  >
                    Upgrade Neural Link
                  </button>
                  <a 
                    href="https://ai.google.dev/gemini-api/docs/billing" 
                    target="_blank" 
                    className="text-[10px] text-slate-500 hover:text-white uppercase tracking-widest font-bold flex items-center gap-2"
                  >
                    <Info className="w-3 h-3" />
                    How it works
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="glass rounded-[3.5rem] border-white/10 p-1 relative shadow-3xl">
          <div className="flex flex-wrap items-center justify-center gap-2 p-6 border-b border-white/5 bg-white/5 rounded-t-[3.4rem]">
            {[
              { id: 'image', icon: <ImageIcon className="w-4 h-4" />, label: 'Vision' },
              { id: 'content', icon: <FileText className="w-4 h-4" />, label: 'Lexicon' },
              { id: 'video', icon: <VideoIcon className="w-4 h-4" />, label: 'Motion' }
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
                    <label className="text-[10px] uppercase tracking-[0.4em] text-slate-500 font-black">Synthesis Input</label>
                    <div className="flex items-center gap-2 text-[10px] text-blue-500/50 font-bold uppercase tracking-widest">
                      <RefreshCw className={`w-3 h-3 ${loading ? 'animate-spin' : ''}`} />
                      Transmitting...
                    </div>
                  </div>
                  <textarea
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder={
                      activeTool === 'image' ? "Envision something grand..." :
                      activeTool === 'content' ? "Describe the text to synthesize..." :
                      "Motion sequence prompt..."
                    }
                    className="w-full bg-slate-900/40 border border-white/10 rounded-[2.5rem] px-8 py-8 h-56 focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/5 outline-none transition-all text-white placeholder:text-slate-700 resize-none font-light text-lg"
                  />
                </div>

                {activeTool === 'image' && (
                  <div className="space-y-4">
                    <label className="text-[10px] uppercase tracking-[0.4em] text-slate-500 font-black">Geometric Ratio</label>
                    <div className="flex flex-wrap gap-3">
                      {(['1:1', '16:9', '9:16', '4:3', '3:4'] as AspectRatio[]).map((ratio) => (
                        <button
                          key={ratio}
                          onClick={() => setAspectRatio(ratio)}
                          className={`px-5 py-3 rounded-2xl text-[10px] font-black uppercase border transition-all ${
                            aspectRatio === ratio 
                              ? 'bg-blue-600 border-blue-600 text-white shadow-lg' 
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
                  className={`w-full py-7 rounded-[2rem] font-black uppercase tracking-[0.4em] flex items-center justify-center gap-4 transition-all text-xs
                    ${loading 
                      ? 'bg-slate-800 text-slate-500 cursor-not-allowed' 
                      : 'bg-blue-600 text-white hover:bg-blue-500 shadow-3xl shadow-blue-500/30 active:scale-[0.98]'}`}
                >
                  {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Sparkles className="w-5 h-5" />}
                  {loading ? 'Transmitting...' : `Forge ${activeTool}`}
                </button>

                {status && (
                  <div className={`flex items-center justify-center gap-3 p-4 rounded-2xl border transition-all ${status.includes('exhausted') || status.includes('failed') ? 'bg-red-500/10 border-red-500/20 text-red-400' : 'bg-blue-500/5 border-blue-500/10 text-blue-400'}`}>
                    {status.includes('link') ? <Key className="w-4 h-4 animate-bounce" /> : <Info className="w-4 h-4" />}
                    <p className="text-[10px] uppercase tracking-[0.2em] font-black text-center">{status}</p>
                  </div>
                )}
              </div>

              {/* Result Area */}
              <div className="lg:w-1/2">
                <div className="h-full siren-border-outer rounded-[3rem] p-1 bg-white/5 min-h-[450px]">
                  {loading && <div className="siren-border-inner"></div>}
                  <div className="relative z-10 w-full h-full bg-slate-950 rounded-[2.9rem] border border-white/10 flex items-center justify-center overflow-hidden">
                    {!result && !loading && (
                      <div className="text-center p-16 opacity-20">
                        <Wand2 className="w-24 h-24 mx-auto mb-8 text-blue-500" />
                        <p className="text-[11px] font-black uppercase tracking-[0.6em] text-blue-400">Void Awaiting Synthesis</p>
                      </div>
                    )}

                    {loading && (
                      <div className="text-center p-12">
                        <div className="relative mb-12">
                          <div className="absolute inset-0 bg-blue-600/30 blur-3xl animate-pulse"></div>
                          <Loader2 className="w-20 h-20 animate-spin text-blue-600 mx-auto relative z-10" />
                        </div>
                        <h4 className="text-2xl font-display font-bold text-white mb-2">Processing Neurons</h4>
                        <p className="text-[10px] uppercase tracking-widest text-slate-500">{status}</p>
                      </div>
                    )}

                    {result && !loading && (
                      <div className="w-full h-full animate-in fade-in duration-1000 flex flex-col">
                        {result.type === 'image' && (
                          <div className="relative group w-full h-full flex items-center justify-center">
                            <img src={result.url} className="max-w-full max-h-[600px] object-contain shadow-3xl" alt="Forged Vision" />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                              <a href={result.url} download="waf-forge-result.png" className="p-5 bg-blue-600 text-white rounded-3xl hover:scale-110 transition-transform shadow-2xl">
                                <Download className="w-8 h-8" />
                              </a>
                            </div>
                          </div>
                        )}
                        {result.type === 'content' && (
                          <div className="p-12 h-full overflow-y-auto custom-scrollbar">
                            <div className="flex justify-between items-center mb-8 pb-4 border-b border-white/10">
                              <span className="text-[10px] font-black uppercase tracking-widest text-blue-400">Lexicon Protocol Output</span>
                              <button 
                                onClick={() => { navigator.clipboard.writeText(result.text || ''); setStatus('Copied to clipboard'); }} 
                                className="text-[10px] font-black uppercase text-slate-500 hover:text-white transition-colors"
                              >
                                Copy Transmission
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
                            <a href={result.url} download="waf-motion-forge.mp4" className="absolute top-6 right-6 p-4 bg-blue-600 text-white rounded-2xl hover:scale-110 transition-transform shadow-3xl z-20">
                              <Download className="w-6 h-6" />
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
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(59, 130, 246, 0.2); border-radius: 10px; }
      `}</style>
    </section>
  );
};

export default WafForge;
