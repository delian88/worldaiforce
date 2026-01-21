import React, { useState, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";
import { 
  Image as ImageIcon, 
  FileText, 
  Video as VideoIcon, 
  Loader2, 
  Sparkles, 
  Layers, 
  Activity, 
  Terminal, 
  Radio,
  Volume2,
  Play as PlayIcon
} from 'lucide-react';
import Logo from './Logo.tsx';

type ToolType = 'image' | 'content' | 'video' | 'audio';
type AspectRatio = '1:1' | '16:9' | '9:16' | '4:3' | '3:4';

const WafForge: React.FC = () => {
  const [activeTool, setActiveTool] = useState<ToolType>('image');
  const [prompt, setPrompt] = useState('');
  const [aspectRatio, setAspectRatio] = useState<AspectRatio>('1:1');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ type: ToolType; url?: string; text?: string; time?: string; audioData?: string } | null>(null);
  const [status, setStatus] = useState('');
  const [hasPersonalKey, setHasPersonalKey] = useState(false);
  const [logMessages, setLogMessages] = useState<string[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    checkKeyStatus();
    if (!process.env.API_KEY) {
      addLog('> WARN: API_KEY_NOT_FOUND_IN_ENV');
    }
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
        setStatus('World AI Force Link Synchronized.');
        addLog('> AUTH_SUCCESS: GRID_LINKED');
      } catch (e) {
        console.error("Link failed", e);
      }
    }
  };

  // Audio decoding helpers for headerless PCM
  function decode(base64: string) {
    const binaryString = atob(base64);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes;
  }

  async function decodeAudioData(
    data: Uint8Array,
    ctx: AudioContext,
    sampleRate: number,
    numChannels: number,
  ): Promise<AudioBuffer> {
    const dataInt16 = new Int16Array(data.buffer);
    const frameCount = dataInt16.length / numChannels;
    const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);

    for (let channel = 0; channel < numChannels; channel++) {
      const channelData = buffer.getChannelData(channel);
      for (let i = 0; i < frameCount; i++) {
        channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
      }
    }
    return buffer;
  }

  const playForgedAudio = async (base64Data: string) => {
    if (isPlaying) return;
    setIsPlaying(true);
    try {
      const outputAudioContext = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
      const audioBuffer = await decodeAudioData(
        decode(base64Data),
        outputAudioContext,
        24000,
        1,
      );
      const source = outputAudioContext.createBufferSource();
      source.buffer = audioBuffer;
      source.connect(outputAudioContext.destination);
      source.onended = () => setIsPlaying(false);
      source.start();
    } catch (error) {
      console.error("Audio playback error:", error);
      setIsPlaying(false);
    }
  };

  const forgeImage = async () => {
    setLoading(true);
    setStatus('Transmitting World AI Force Request...');
    addLog('> INITIATING_IMAGE_FORGE');
    const start = Date.now();
    try {
      if (!process.env.API_KEY) throw new Error("API Key Missing");
      
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: [{ parts: [{ text: `${prompt}, cinematic, masterpiece, highly detailed, 8k resolution` }] }],
        config: { 
          imageConfig: { aspectRatio } 
        }
      });

      const part = response.candidates?.[0]?.content?.parts?.find(p => p.inlineData);
      if (part?.inlineData) {
        setResult({ 
          type: 'image', 
          url: `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`,
          time: `${((Date.now() - start) / 1000).toFixed(1)}s`
        });
        setStatus('Image forged.');
        addLog('> SYNTH_COMPLETE: IMAGE_ASSET');
      } else {
        setStatus('World AI Force node returned text or empty.');
        addLog('> ERROR: NO_IMAGE_DATA');
      }
    } catch (error: any) { 
      setStatus('Transmission Interrupted.'); 
      addLog(`> CRITICAL_ERR: ${error.message || 'SYNAPTIC_FAIL'}`);
    } finally { setLoading(false); }
  };

  const forgeContent = async () => {
    setLoading(true);
    setStatus('Synthesizing Content...');
    addLog('> PARSING_CONTENT_SYNAPSES');
    const start = Date.now();
    try {
      if (!process.env.API_KEY) throw new Error("API Key Missing");

      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
        config: { 
          systemInstruction: "You are the WAF Content Node. Provide high-impact, professional, concise, and inspiring content based on the prompt.",
          temperature: 0.8
        }
      });
      
      if (response.text) {
        setResult({ 
          type: 'content', 
          text: response.text,
          time: `${((Date.now() - start) / 1000).toFixed(1)}s`
        });
        setStatus('Content forged.');
        addLog('> SYNTH_COMPLETE: CONTENT_STREAM');
      }
    } catch (error: any) { 
      setStatus('Transmission Interrupted.'); 
      addLog(`> ERROR: ${error.message || 'CONTENT_OVERLOAD'}`);
    } finally { setLoading(false); }
  };

  const forgeAudio = async () => {
    setLoading(true);
    setStatus('Synthesizing Audio...');
    addLog('> INITIATING_AUDIO_SYNAPSES');
    const start = Date.now();
    try {
      if (!process.env.API_KEY) throw new Error("API Key Missing");
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash-preview-tts",
        contents: [{ parts: [{ text: `Say with power and clarity: ${prompt}` }] }],
        config: {
          // @ts-ignore - Modality mapping
          responseModalities: ["AUDIO"],
          speechConfig: {
            voiceConfig: {
              prebuiltVoiceConfig: { voiceName: 'Kore' },
            },
          },
        },
      });

      const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
      if (base64Audio) {
        setResult({ 
          type: 'audio', 
          audioData: base64Audio,
          time: `${((Date.now() - start) / 1000).toFixed(1)}s`
        });
        setStatus('Audio forged.');
        addLog('> SYNTH_COMPLETE: AUDIO_STREAM');
      }
    } catch (error: any) {
      setStatus('Audio Synthesis Failed.');
      addLog(`> ERROR: ${error.message || 'AUDIO_FAIL'}`);
    } finally { setLoading(false); }
  };

  const forgeVideo = async () => {
    if (!hasPersonalKey) { 
      setStatus('Sync required for World AI Force Synthesis.'); 
      addLog('> ERR: KEY_NOT_FOUND');
      return; 
    }
    setLoading(true);
    setStatus('Video Sequence Initiated...');
    addLog('> TEMPORAL_VIDEO_START');
    try {
      if (!process.env.API_KEY) throw new Error("API Key Missing");

      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      let operation = await ai.models.generateVideos({
        model: 'veo-3.1-fast-generate-preview',
        prompt: prompt,
        config: { numberOfVideos: 1, resolution: '720p', aspectRatio: '16:9' }
      });
      
      while (!operation.done) {
        await new Promise(r => setTimeout(r, 8000));
        addLog(`> RENDERING_FRAME_SET: ${Math.floor(Math.random() * 20 + 10 * Math.random())}%...`);
        operation = await ai.operations.getVideosOperation({ operation: operation });
      }
      
      const downloadLink = operation.response?.generatedVideos?.[0]?.video?.uri;
      const response = await fetch(`${downloadLink}&key=${process.env.API_KEY}`);
      const blob = await response.blob();
      setResult({ type: 'video', url: URL.createObjectURL(blob) });
      setStatus('Video sequence forged.');
      addLog('> SYNTH_COMPLETE: VIDEO_ASSET');
    } catch (error: any) { 
      setStatus('Video Synthesis Error.'); 
      addLog(`> ERROR: ${error.message || 'TEMPORAL_BREAK'}`);
    } finally { setLoading(false); }
  };

  const handleForge = () => {
    if (!prompt.trim()) return;
    setResult(null);
    if (activeTool === 'image') forgeImage();
    if (activeTool === 'content') forgeContent();
    if (activeTool === 'video') forgeVideo();
    if (activeTool === 'audio') forgeAudio();
  };

  return (
    <div className="glass rounded-[4rem] border-white/10 p-1 relative shadow-3xl bg-slate-900/40 overflow-hidden reveal-on-scroll active">
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
        <div className="absolute top-0 left-0 w-full h-full" style={{ backgroundImage: 'linear-gradient(90deg, #fff 1px, transparent 0), linear-gradient(#fff 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-4 p-8 border-b border-white/5 bg-white/5 relative z-10">
        {[
          { id: 'image', icon: <ImageIcon className="w-5 h-5" />, label: 'Image' },
          { id: 'content', icon: <FileText className="w-5 h-5" />, label: 'Content' },
          { id: 'audio', icon: <Volume2 className="w-5 h-5" />, label: 'Audio' },
          { id: 'video', icon: <VideoIcon className="w-5 h-5" />, label: 'Video' }
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
                placeholder={`Describe your World AI Force synaptic output...`}
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
               {!logMessages.length && <div>&gt; AWAITING_INPUT...</div>}
            </div>

            <button 
              onClick={handleForge} 
              disabled={loading || !prompt.trim()} 
              className="w-full py-8 bg-blue-600 text-white rounded-[2rem] font-black uppercase tracking-[0.4em] hover:bg-blue-500 transition-all flex items-center justify-center gap-5 text-sm shadow-2xl group active:scale-95"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Sparkles className="w-5 h-5 group-hover:scale-125 transition-transform" />}
              {loading ? 'Synthesizing...' : `Forge ${activeTool.charAt(0).toUpperCase() + activeTool.slice(1)}`}
            </button>

            {status && !loading && status.includes('Sync') && (
              <button 
                onClick={handleSyncGrid}
                className="w-full flex items-center justify-center gap-2 text-[10px] font-black text-blue-400 uppercase tracking-widest hover:text-white transition-colors"
              >
                <Terminal className="w-4 h-4" /> Resolve World AI Force Link Status
              </button>
            )}
          </div>

          <div className="lg:w-1/2">
            <div className="h-full min-h-[450px] bg-slate-950/50 rounded-[3rem] border border-white/10 flex items-center justify-center overflow-hidden relative shadow-2xl group">
              <div className="absolute inset-0 pointer-events-none z-30 opacity-20 overflow-hidden">
                <div className="w-full h-1 bg-blue-500/50 blur-sm animate-[scan_3s_linear_infinite]"></div>
              </div>

              {!result && !loading && (
                <div className="text-center opacity-10 group-hover:opacity-20 transition-opacity">
                  <Logo size={150} />
                  <p className="mt-6 font-black text-[10px] uppercase tracking-[0.8em]">Awaiting Synapse</p>
                </div>
              )}
              
              {loading && (
                <div className="text-center relative z-40">
                  <Loader2 className="w-12 h-12 animate-spin text-blue-500 mx-auto mb-4 shadow-[0_0_15px_rgba(59,130,246,0.5)]" />
                  <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.5em] animate-pulse">Computing Matrix...</p>
                </div>
              )}
              
              {result && !loading && (
                <div className="w-full h-full animate-in fade-in zoom-in-95 relative p-6 flex items-center justify-center">
                  {result.type === 'image' && <img src={result.url} className="max-w-full max-h-[400px] object-contain rounded-2xl shadow-2xl border border-white/10" alt="Forged image" />}
                  {result.type === 'content' && (
                    <div className="p-10 text-slate-300 font-light leading-relaxed prose prose-invert max-w-none overflow-y-auto max-h-[400px] custom-scrollbar selection:bg-blue-600/30 whitespace-pre-wrap">
                      {result.text}
                    </div>
                  )}
                  {result.type === 'video' && <video src={result.url} className="max-w-full max-h-[400px] object-contain rounded-2xl shadow-2xl border border-white/10" controls autoPlay loop />}
                  {result.type === 'audio' && result.audioData && (
                    <div className="flex flex-col items-center gap-8">
                       <div className="w-32 h-32 rounded-full bg-blue-600/20 border border-blue-500/30 flex items-center justify-center">
                          <Volume2 className={`w-12 h-12 text-blue-500 ${isPlaying ? 'animate-pulse' : ''}`} />
                       </div>
                       <button 
                         onClick={() => playForgedAudio(result.audioData!)}
                         className={`px-12 py-5 rounded-full font-black uppercase tracking-widest text-xs flex items-center gap-3 transition-all ${isPlaying ? 'bg-slate-800 text-slate-500 cursor-not-allowed' : 'bg-blue-600 text-white hover:bg-blue-500'}`}
                        >
                         {isPlaying ? <Loader2 className="w-4 h-4 animate-spin" /> : <PlayIcon className="w-4 h-4 fill-current" />}
                         {isPlaying ? 'Streaming...' : 'Play Forged Audio'}
                       </button>
                    </div>
                  )}
                  
                  <div className="absolute top-10 right-10 flex gap-2">
                     <div className="px-4 py-2 bg-slate-900/90 backdrop-blur-md rounded-full border border-white/10 text-[9px] font-black uppercase tracking-widest text-blue-400">Node_ID: {Math.random().toString(36).substr(2, 6).toUpperCase()}</div>
                     <button onClick={() => { setResult(null); addLog('> CACHE_CLEARED'); setIsPlaying(false); }} className="p-2 bg-red-600/20 hover:bg-red-600/40 rounded-full text-red-500 transition-colors">
                        <Radio className="w-3 h-3 rotate-45" />
                     </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <style>{`
        @keyframes scan {
          0% { top: -10%; }
          100% { top: 110%; }
        }
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(59, 130, 246, 0.2); border-radius: 10px; }
      `}</style>
    </div>
  );
};

export default WafForge;