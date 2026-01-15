
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
  Terminal,
  Cpu,
  Fingerprint,
  Radio
} from 'lucide-react';
// Import the missing Logo component
import Logo from './Logo.tsx';

type ToolType = 'image' | 'content' | 'video';
type AspectRatio = '1:1' | '16:9' | '9:16' | '4:3' | '3:4';

const WafForge: React.FC = () => {
  const [activeTool, setActiveTool] = useState<ToolType>('image');
  const [prompt, setPrompt] = useState('');
  const [aspectRatio, setAspectRatio] = useState<AspectRatio>('1:1');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ type: ToolType; url?: string; text?: string; time?: string } | null>(null);
  const [status, setStatus] = useState('');
  const [hasPersonalKey, setHasPersonalKey] = useState(false);
  const [logMessages, setLogMessages] = useState<string[]>([]);

  useEffect(() => {
    checkKeyStatus();
  }, []);

  const addLog = (msg: string) => {
    setLogMessages(prev => [msg, ...prev].slice(0, 5));
  };

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
        addLog('> AUTH_SUCCESS: GRID_LINKED');
      } catch (e) {
        console.error("Link failed", e);
      }
    }
  };

  const forgeImage = async () => {
    setLoading(true);
    setStatus('Transmitting Visionary Request...');
    addLog('> INITIATING_VISION_FORGE');
    const start = Date.now();
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: { parts: [{ text: `${prompt}, cinematic masterpiece, ultra-detailed, professional digital art` }] },
        config: { imageConfig: { aspectRatio } }
      });
      const part = response.candidates?.[0]?.content?.parts?.find(p => p.inlineData);
      if (part?.inlineData) {
        setResult({ 
          type: 'image', 
          url: `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`,
          time: `${((Date.now() - start) / 1000).toFixed(1)}s`
        });
        setStatus('Vision forged.');
        addLog('> SYNTH_COMPLETE: VISION_ASSET');
      } else setStatus('Vision node returned empty.');
    } catch (error) { setStatus('Transmission Interrupted.'); } finally { setLoading(false); }
  };

  const forgeContent = async () => {
    setLoading(true);
    setStatus('Synthesizing Lexicon...');
    addLog('> PARSING_LEXICON_SYNAPSES');
    const start = Date.now();
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: { parts: [{ text: prompt }] },
        config: { systemInstruction: "WAF Lexicon Node. High-impact output." }
      });
      setResult({ 
        type: 'content', 
        text: response.text,
        time: `${((Date.now() - start) / 1000).toFixed(1)}s`
      });
      setStatus('Lexicon forged.');
      addLog('> SYNTH_COMPLETE: LEXICON_STREAM');
    } catch (error) { setStatus('Transmission Interrupted.'); } finally { setLoading(false); }
  };

  const forgeVideo = async () => {
    if (!hasPersonalKey) { setStatus('Sync required for Motion Synthesis.'); return; }
    setLoading(true);
    setStatus('Motion Sequence Initiated...');
    addLog('> TEMPORAL_SEQUENCE_START');
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      let operation = await ai.models.generateVideos({
        model: 'veo-3.1-fast-generate-preview',
        prompt: prompt,
        config: { numberOfVideos: 1, resolution: '720p', aspectRatio: '16:9' }
      });
      while (!operation.done) {
        await new Promise(r => setTimeout(r, 8000));
        addLog(`> RENDERING_FRAME_SET: ${Math.floor(Math.random() * 99)}%`);
        operation = await ai.operations.getVideosOperation({ operation: operation });
      }
      const downloadLink = operation.response?.generatedVideos?.[0]?.video?.uri;
      const response = await fetch(`${downloadLink}&key=${process.env.API_KEY}`);
      const blob = await response.blob();
      setResult({ type: 'video', url: URL.createObjectURL(blob) });
      setStatus('Motion sequence forged.');
      addLog('> SYNTH_COMPLETE: MOTION_ASSET');
    } catch (error) { setStatus('Motion Error.'); } finally { setLoading(false); }
  };

  const handleForge = () => {
    if (!prompt.trim()) return;
    setResult(null);
    if (activeTool === 'image') forgeImage();
    if (activeTool === 'content') forgeContent();
    if (activeTool === 'video') forgeVideo();
  };

  return (
    <div className="glass rounded-[4rem] border-white/10 p-1 relative shadow-3xl bg-slate-900/40 overflow-hidden">
      {/* High-Tech Grid Overlays */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
        <div className="absolute top-0 left-0 w-full h-full" style={{ backgroundImage: 'linear-gradient(90deg, #fff 1px, transparent 0), linear-gradient(#fff 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-4 p-8 border-b border-white/5 bg-white/5 relative z-10">
        {[
          { id: 'image', icon: <ImageIcon className="w-5 h-5" />, label: 'Vision' },
          { id: 'content', icon: <FileText className="w-5 h-5" />, label: 'Lexicon' },
          { id: 'video', icon: <VideoIcon className="w-5 h-5" />, label: 'Motion' }
        ].map((tool) => (
          <button
            key={tool.id}
            onClick={() => { setActiveTool(tool.id as ToolType); setResult(null); setStatus(''); }}
            className={`flex items-center gap-4 px-10 py-5 rounded-[2rem] font-black uppercase tracking-[0.3em] text-[10px] transition-all relative group
              ${activeTool === tool.id 
                ? 'bg-blue-600 text-white shadow-3xl' 
                : 'bg-white/5 text-slate-500 hover:bg-white/10'}`}
          >
            {tool.icon}
            <span>{tool.label}</span>
          </button>
        ))}
      </div>

      <div className="p-8 lg:p-16 relative z-10">
        <div className="flex flex-col lg:flex-row gap-12">
          <div className="lg:w-1/2 space-y-10">
            <div className="relative">
               <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder={`Describe your ${activeTool} synaptic output...`}
                className="w-full bg-slate-950/70 border border-white/10 rounded-[2.5rem] p-10 h-72 focus:border-blue-500/50 outline-none transition-all text-white text-lg font-light resize-none shadow-inner"
              />
              <div className="absolute bottom-6 left-10 flex gap-2">
                 <Radio className="w-4 h-4 text-blue-500 animate-pulse" />
                 <span className="text-[8px] font-black text-blue-500 uppercase tracking-widest">Signal: Established</span>
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-slate-950 border border-white/5 font-mono text-[9px] text-slate-500 h-32 overflow-hidden flex flex-col justify-end">
               {logMessages.map((log, i) => (
                 <div key={i} className={i === 0 ? 'text-blue-400' : ''}>{log}</div>
               ))}
               {!logMessages.length && <div>> AWAITING_INPUT...</div>}
            </div>

            <button 
              onClick={handleForge} 
              disabled={loading || !prompt.trim()} 
              className="w-full py-8 bg-blue-600 text-white rounded-[2rem] font-black uppercase tracking-[0.4em] hover:bg-blue-500 transition-all flex items-center justify-center gap-5 text-sm shadow-2xl group active:scale-95"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Sparkles className="w-5 h-5 group-hover:scale-125 transition-transform" />}
              {loading ? 'Synthesizing...' : 'Forging Asset'}
            </button>
          </div>

          <div className="lg:w-1/2">
            <div className="h-full min-h-[450px] bg-slate-950/50 rounded-[3rem] border border-white/10 flex items-center justify-center overflow-hidden relative shadow-2xl">
              {!result && !loading && (
                <div className="text-center opacity-10">
                  <Logo size={150} />
                  <p className="mt-6 font-black text-[10px] uppercase tracking-[0.8em]">Awaiting Synapse</p>
                </div>
              )}
              
              {loading && (
                <div className="text-center">
                  <Loader2 className="w-12 h-12 animate-spin text-blue-500 mx-auto mb-4" />
                  <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.5em] animate-pulse">Computing Matrix...</p>
                </div>
              )}
              
              {result && !loading && (
                <div className="w-full h-full animate-in fade-in zoom-in-95 relative p-6">
                  {result.type === 'image' && <img src={result.url} className="w-full h-full object-contain rounded-2xl" />}
                  {result.type === 'content' && <div className="p-10 text-slate-300 font-light leading-relaxed prose prose-invert max-w-none">{result.text}</div>}
                  {result.type === 'video' && <video src={result.url} className="w-full h-full object-contain rounded-2xl" controls autoPlay loop />}
                  
                  <div className="absolute top-10 right-10 flex gap-2">
                     <div className="px-4 py-2 bg-slate-900/80 rounded-full border border-white/10 text-[9px] font-black uppercase tracking-widest text-blue-400">Time: {result.time}</div>
                     <button onClick={() => setResult(null)} className="p-2 bg-red-600/20 hover:bg-red-600/40 rounded-full text-red-500 transition-colors">
                        <Radio className="w-3 h-3 rotate-45" />
                     </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WafForge;
