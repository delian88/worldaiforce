
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
    <div className="glass rounded-[3.5rem] border-white/10 p-1 relative shadow-3xl bg-slate-900/20 overflow-hidden">
      <div className="flex flex-wrap items-center justify-center gap-2 p-6 border-b border-white/5 bg-white/5">
        {[
          { id: 'image', icon: <ImageIcon className="w-4 h-4" />, label: 'Vision Node' },
          { id: 'content', icon: <FileText className="w-4 h-4" />, label: 'Lexicon Node' },
          { id: 'video', icon: <VideoIcon className="w-4 h-4" />, label: 'Motion Node' }
        ].map((tool) => (
          <button
            key={tool.id}
            onClick={() => { setActiveTool(tool.id as ToolType); setResult(null); setStatus(''); }}
            className={`flex items-center gap-3 px-6 py-3 md:px-10 md:py-5 rounded-[1.8rem] font-black uppercase tracking-[0.2em] text-[9px] md:text-[10px] transition-all
              ${activeTool === tool.id ? 'bg-blue-600 text-white shadow-2xl shadow-blue-500/30' : 'bg-white/5 text-slate-500 hover:bg-white/10'}`}
          >
            {tool.icon}
            <span className="hidden sm:inline">{tool.label}</span>
          </button>
        ))}
      </div>

      <div className="p-6 md:p-10 lg:p-14">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-16">
          <div className="lg:w-1/2 space-y-6">
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder={`Envision ${activeTool === 'image' ? 'a visual' : activeTool === 'content' ? 'a story' : 'motion'}...`}
              className="w-full bg-slate-950/50 border border-white/10 rounded-[2rem] p-6 h-48 focus:border-blue-500 outline-none transition-all text-white text-base font-light resize-none"
            />
            {activeTool === 'image' && (
              <div className="flex flex-wrap gap-2">
                {(['1:1', '16:9', '9:16', '4:3', '3:4'] as AspectRatio[]).map((r) => (
                  <button key={r} onClick={() => setAspectRatio(r)} className={`px-3 py-1.5 rounded-lg text-[9px] font-bold border ${aspectRatio === r ? 'bg-blue-600 border-blue-600 text-white' : 'border-white/10 text-slate-500'}`}>{r}</button>
                ))}
              </div>
            )}
            <button onClick={handleForge} disabled={loading || !prompt.trim()} className="w-full py-6 bg-blue-600 text-white rounded-[1.5rem] font-black uppercase tracking-[0.4em] hover:bg-blue-500 shadow-xl shadow-blue-500/30 flex items-center justify-center gap-4 text-xs">
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
              {loading ? 'Forging...' : 'Initiate Synthesis'}
            </button>
            {status && (
              <div className="p-4 rounded-xl bg-blue-500/5 border border-blue-500/10 text-blue-400 text-center text-[10px] font-bold uppercase tracking-widest flex items-center justify-center gap-3">
                <Info className="w-3 h-3" /> {status}
                {status.includes('Sync') && <button onClick={handleSyncGrid} className="ml-2 px-2 py-1 bg-blue-600 text-white rounded text-[8px] hover:bg-blue-500">Sync</button>}
              </div>
            )}
          </div>
          <div className="lg:w-1/2">
            <div className="h-full min-h-[350px] bg-slate-950 rounded-[2rem] border border-white/10 flex items-center justify-center overflow-hidden relative group">
              {!result && !loading && (
                <div className="text-center opacity-10 group-hover:opacity-20 transition-opacity">
                  <Wand2 className="w-16 h-16 mx-auto mb-4" />
                  <p className="font-black text-[10px] uppercase tracking-widest">Neural Link Idle</p>
                </div>
              )}
              {loading && (
                <div className="text-center">
                  <Loader2 className="w-10 h-10 animate-spin text-blue-600 mx-auto mb-4" />
                  <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">Processing...</p>
                </div>
              )}
              {result && !loading && (
                <div className="w-full h-full animate-in fade-in zoom-in-95 duration-500">
                  {result.type === 'image' && (
                    <div className="relative group w-full h-full flex items-center justify-center">
                      <img src={result.url} className="max-w-full max-h-full object-contain" alt="Result" />
                      <a href={result.url} download="forge.png" className="absolute top-4 right-4 p-3 bg-blue-600/80 hover:bg-blue-600 rounded-xl text-white shadow-2xl opacity-0 group-hover:opacity-100 transition-opacity"><Download className="w-4 h-4" /></a>
                    </div>
                  )}
                  {result.type === 'content' && (
                    <div className="p-8 h-full overflow-y-auto custom-scrollbar">
                       <div className="flex justify-between items-center mb-4 pb-2 border-b border-white/10">
                          <span className="text-[9px] font-black text-blue-400 uppercase tracking-widest">Lexicon Output</span>
                          <button onClick={() => { navigator.clipboard.writeText(result.text || ''); setStatus('Copied to clipboard'); }} className="text-[9px] text-slate-500 uppercase hover:text-white">Copy</button>
                       </div>
                       <div className="prose prose-invert max-w-none text-slate-300 leading-relaxed text-sm">{result.text}</div>
                    </div>
                  )}
                  {result.type === 'video' && <video src={result.url} className="w-full h-full object-contain" controls autoPlay loop />}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <style>{`.custom-scrollbar::-webkit-scrollbar { width: 3px; } .custom-scrollbar::-webkit-scrollbar-thumb { background: #3b82f633; border-radius: 10px; }`}</style>
    </div>
  );
};

export default WafForge;
