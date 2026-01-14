
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
  // Added Zap to imports to fix the missing name error
  Zap
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
    <section className="pt-40 pb-32 bg-slate-950 relative overflow-hidden min-h-screen">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-600/10 border border-blue-600/20 text-blue-400 text-[10px] font-black uppercase tracking-widest mb-6">
            <Zap className="w-3 h-3 animate-pulse" />
            Neural Forge v4.2
          </div>
          <h1 className="text-5xl md:text-7xl font-display font-bold mb-6">WAF <span className="shimmer-text">Forge</span></h1>
          <p className="text-slate-400 text-xl font-light">Unlimited AI generation for the global grid.</p>
        </div>

        <div className="glass rounded-[3.5rem] border-white/10 p-1 relative shadow-3xl bg-slate-900/20">
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
                  ${activeTool === tool.id ? 'bg-blue-600 text-white shadow-2xl shadow-blue-500/30' : 'bg-white/5 text-slate-500 hover:bg-white/10'}`}
              >
                {tool.icon}
                {tool.label}
              </button>
            ))}
          </div>

          <div className="p-8 md:p-14">
            <div className="flex flex-col lg:flex-row gap-16">
              <div className="lg:w-1/2 space-y-8">
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Envision something grand... (e.g. A futuristic city in the clouds)"
                  className="w-full bg-slate-900 border border-white/10 rounded-[2.5rem] p-8 h-64 focus:border-blue-500 outline-none transition-all text-white text-lg font-light resize-none"
                />
                {activeTool === 'image' && (
                  <div className="flex gap-2">
                    {(['1:1', '16:9', '9:16', '4:3', '3:4'] as AspectRatio[]).map((r) => (
                      <button key={r} onClick={() => setAspectRatio(r)} className={`px-4 py-2 rounded-xl text-[10px] font-bold border ${aspectRatio === r ? 'bg-blue-600 border-blue-600 text-white' : 'border-white/10 text-slate-500'}`}>{r}</button>
                    ))}
                  </div>
                )}
                <button onClick={handleForge} disabled={loading || !prompt.trim()} className="w-full py-8 bg-blue-600 text-white rounded-[2rem] font-black uppercase tracking-[0.5em] hover:bg-blue-500 shadow-3xl shadow-blue-500/30 flex items-center justify-center gap-4">
                  {loading ? <Loader2 className="animate-spin" /> : <Sparkles />}
                  {loading ? 'Forging...' : 'Initiate Synthesis'}
                </button>
                {status && (
                  <div className="p-5 rounded-2xl bg-blue-500/5 border border-blue-500/10 text-blue-400 text-center text-[11px] font-bold uppercase tracking-widest flex items-center justify-center gap-3">
                    <Info className="w-4 h-4" /> {status}
                    {status.includes('Sync') && <button onClick={handleSyncGrid} className="px-3 py-1 bg-blue-600 text-white rounded-lg text-[9px] hover:bg-blue-500">Sync Now</button>}
                  </div>
                )}
              </div>
              <div className="lg:w-1/2">
                <div className="h-full min-h-[500px] bg-slate-950 rounded-[3rem] border border-white/10 flex items-center justify-center overflow-hidden relative">
                  {!result && !loading && (
                    <div className="text-center opacity-20">
                      <Wand2 className="w-24 h-24 mx-auto mb-6" />
                      <p className="font-black uppercase tracking-widest">Awaiting Synthesis</p>
                    </div>
                  )}
                  {loading && (
                    <div className="text-center">
                      <Loader2 className="w-16 h-16 animate-spin text-blue-600 mx-auto mb-6" />
                      <p className="text-slate-500 font-bold uppercase tracking-widest">Forging Neurons</p>
                    </div>
                  )}
                  {result && !loading && (
                    <div className="w-full h-full animate-in fade-in duration-500">
                      {result.type === 'image' && (
                        <div className="relative group w-full h-full flex items-center justify-center">
                          <img src={result.url} className="max-w-full max-h-full object-contain" alt="Result" />
                          <a href={result.url} download="forge.png" className="absolute top-6 right-6 p-4 bg-blue-600 rounded-2xl text-white shadow-2xl opacity-0 group-hover:opacity-100 transition-opacity"><Download /></a>
                        </div>
                      )}
                      {result.type === 'content' && (
                        <div className="p-12 h-full overflow-y-auto custom-scrollbar">
                           <div className="flex justify-between items-center mb-6 pb-4 border-b border-white/10">
                              <span className="text-[10px] font-black text-blue-400 uppercase tracking-widest">Lexicon Output</span>
                              <button onClick={() => { navigator.clipboard.writeText(result.text || ''); setStatus('Copied to clipboard'); }} className="text-[10px] text-slate-500 uppercase hover:text-white">Copy</button>
                           </div>
                           <div className="prose prose-invert max-w-none text-slate-300 leading-relaxed text-lg">{result.text}</div>
                        </div>
                      )}
                      {result.type === 'video' && <video src={result.url} className="w-full h-full object-contain" controls autoPlay loop />}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <style>{`.custom-scrollbar::-webkit-scrollbar { width: 4px; } .custom-scrollbar::-webkit-scrollbar-thumb { background: #3b82f644; border-radius: 10px; }`}</style>
    </section>
  );
};

export default WafForge;
