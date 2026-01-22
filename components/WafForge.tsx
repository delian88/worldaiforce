import React, { useState, useEffect, useRef } from 'react';
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
  Play as PlayIcon,
  Film,
  Camera,
  Ghost,
  HelpCircle,
  X,
  Info,
  Command,
  Zap,
  PlayCircle,
  Monitor,
  MousePointer2,
  Download,
  Share2,
  Cpu,
  AlertCircle
} from 'lucide-react';
import Logo from './Logo.tsx';

type ToolType = 'omni' | 'image' | 'content' | 'video' | 'audio';
type AspectRatio = '1:1' | '16:9' | '9:16' | '4:3' | '3:4';
type VideoStyle = 'none' | 'cinematic' | 'documentary' | 'animation';

const VIDEO_STYLES = [
  { id: 'none', label: 'Standard', icon: <Activity className="w-3 h-3" />, prompt: '' },
  { id: 'cinematic', label: 'Cinematic', icon: <Film className="w-3 h-3" />, prompt: 'cinematic style, high production value, dramatic lighting, 8k, master-quality cinematography' },
  { id: 'documentary', label: 'Documentary', icon: <Camera className="w-3 h-3" />, prompt: 'documentary style, raw footage, handheld camera, realistic, natural lighting' },
  { id: 'animation', label: 'Animation', icon: <Ghost className="w-3 h-3" />, prompt: '3d animation style, vibrant colors, stylized characters, high quality render, unreal engine 5 style' }
];

const WafForge: React.FC = () => {
  const [activeTool, setActiveTool] = useState<ToolType>('omni');
  const [prompt, setPrompt] = useState('');
  const [aspectRatio, setAspectRatio] = useState<AspectRatio>('1:1');
  const [videoStyle, setVideoStyle] = useState<VideoStyle>('none');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ type: ToolType; url?: string; text?: string; time?: string; audioData?: string; multiResults?: any } | null>(null);
  const [status, setStatus] = useState('');
  const [hasPersonalKey, setHasPersonalKey] = useState(false);
  const [logMessages, setLogMessages] = useState<string[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [showTutorialVideo, setShowTutorialVideo] = useState(false);
  const [tutorialStep, setTutorialStep] = useState(0);
  const [tutorialProgress, setTutorialProgress] = useState(0);
  const [tutorialTyping, setTutorialTyping] = useState('');

  const tutorialMessages = [
    "Initializing Neural Interface...",
    "Node Selection: OMNI_FORGE active.",
    "Injecting Prompt Synapse...",
    "Matrix Synthesis in progress...",
    "Omni-Asset Successfully Forged."
  ];

  useEffect(() => {
    checkKeyStatus();
    if (!process.env.API_KEY) {
      addLog('> WARN: API_KEY_NOT_FOUND_IN_ENV');
    }
  }, []);

  useEffect(() => {
    let interval: any;
    let typingInterval: any;

    if (showTutorialVideo) {
      interval = setInterval(() => {
        setTutorialStep(prev => (prev + 1) % 4);
        setTutorialProgress(0);
      }, 6000);

      const progInterval = setInterval(() => {
        setTutorialProgress(prev => Math.min(prev + 1.6, 100));
      }, 100);

      if (tutorialStep === 1) {
        const fullText = "Create an image of a futuristic boy and tell his story.";
        let charIdx = 0;
        setTutorialTyping('');
        typingInterval = setInterval(() => {
          if (charIdx < fullText.length) {
            setTutorialTyping(fullText.substring(0, charIdx + 1));
            charIdx++;
          } else {
            clearInterval(typingInterval);
          }
        }, 50);
      }

      return () => {
        clearInterval(interval);
        clearInterval(progInterval);
        clearInterval(typingInterval);
      };
    } else {
      setTutorialStep(0);
      setTutorialProgress(0);
      setTutorialTyping('');
    }
  }, [showTutorialVideo, tutorialStep]);

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

  const forgeOmni = async () => {
    setLoading(true);
    setStatus('Initializing Omni-Synapse Synthesis...');
    addLog('> STARTING_OMNI_FORGE');
    const start = Date.now();
    try {
      if (!process.env.API_KEY) throw new Error("API Key Missing");
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

      setStatus('Parsing Synaptic Data...');
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Analyze this user request: "${prompt}". 
        Create a multi-modal intelligence package.
        Return 3 components clearly labeled:
        [CONTENT]: A short, high-impact description or story related to the request.
        [IMAGE_PROMPT]: A professional, detailed prompt for image generation based on the request.
        [AUDIO_SCRIPT]: A short sentence for voice synthesis.
        Return nothing else.`,
      });

      const textOutput = response.text || "";
      const content = textOutput.match(/\[CONTENT\]([\s\S]*?)\[/)?.[1]?.trim() || textOutput.split('[')[0].trim();
      const imagePrompt = textOutput.match(/\[IMAGE_PROMPT\]([\s\S]*?)\[/)?.[1]?.trim() || textOutput.match(/\[IMAGE_PROMPT\]([\s\S]*)$/)?.[1]?.trim() || prompt;
      const audioScript = textOutput.match(/\[AUDIO_SCRIPT\]([\s\S]*)$/)?.[1]?.trim() || prompt;

      setStatus('Forging Visual & Auditory Assets...');
      addLog('> GENERATING_MODALITIES');
      
      const imageTask = ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: [{ parts: [{ text: `${imagePrompt}, cinematic, hyper-realistic, 8k, detailed` }] }],
        config: { imageConfig: { aspectRatio } }
      });

      const audioTask = ai.models.generateContent({
        model: "gemini-2.5-flash-preview-tts",
        contents: [{ parts: [{ text: audioScript }] }],
        config: {
          // @ts-ignore
          responseModalities: ["AUDIO"],
          speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Kore' } } },
        },
      });

      const [imageRes, audioRes] = await Promise.all([imageTask.catch(e => {
        addLog(`> IMAGE_QUOTA_EXCEEDED: ${e.message}`);
        return null;
      }), audioTask.catch(e => {
        addLog(`> AUDIO_QUOTA_EXCEEDED: ${e.message}`);
        return null;
      })]);

      const imagePart = imageRes?.candidates?.[0]?.content?.parts?.find(p => p.inlineData);
      const audioData = audioRes?.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;

      setResult({
        type: 'omni',
        multiResults: {
          content,
          imageUrl: imagePart ? `data:${imagePart.inlineData.mimeType};base64,${imagePart.inlineData.data}` : null,
          audioData: audioData || null
        },
        time: `${((Date.now() - start) / 1000).toFixed(1)}s`
      });
      setStatus('Omni-Synthesis Complete.');
      addLog('> OMNI_FORGE_SUCCESS');
    } catch (error: any) {
      setStatus('Synthesis Interrupted.');
      addLog(`> ERR: ${error.message}`);
      if (error.message.includes('429')) {
        addLog('> ADVISORY: Free tier quota reached. Please retry in 60s.');
      }
    } finally {
      setLoading(false);
    }
  };

  const forgeImage = async () => {
    setLoading(true);
    setStatus('Transmitting Visual Synapse...');
    addLog('> IMAGE_FORGE_START');
    const start = Date.now();
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: [{ parts: [{ text: `${prompt}, cinematic, masterpiece, highly detailed, 8k resolution` }] }],
        config: { imageConfig: { aspectRatio } }
      });
      const part = response.candidates?.[0]?.content?.parts?.find(p => p.inlineData);
      if (part?.inlineData) {
        setResult({ type: 'image', url: `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`, time: `${((Date.now() - start) / 1000).toFixed(1)}s` });
        setStatus('Visual Forge Complete.');
        addLog('> SYNTH_COMPLETE: IMAGE_ASSET');
      }
    } catch (error: any) { 
      setStatus('Forge Failed.'); 
      addLog(`> ERR: ${error.message}`);
      if (error.message.includes('429')) {
        addLog('> ADVISORY: Free tier quota reached. Please retry in 60s.');
      }
    } finally { setLoading(false); }
  };

  const handleForge = () => {
    if (!prompt.trim()) return;
    setResult(null);
    if (activeTool === 'omni') forgeOmni();
    else if (activeTool === 'image') forgeImage();
    // Add logic for individual content/audio/video if user selects them specifically
  };

  const tutorialSteps = [
    { title: "Select Mode", desc: "OMNI mode synthesizes multiple intelligence assets simultaneously.", icon: <Cpu className="w-8 h-8" /> },
    { title: "Describe Vision", desc: "Type your prompt into the synaptic input field for the WAF engine to parse.", icon: <FileText className="w-8 h-8" /> },
    { title: "Initiate Forge", desc: "Click the Forge button to start the multi-modal synthesis protocol.", icon: <Zap className="w-8 h-8" /> },
    { title: "Deploy Output", desc: "Review your synthesized intelligence. Play audio, view visuals, or read content.", icon: <Sparkles className="w-8 h-8" /> }
  ];

  return (
    <div className="glass rounded-[2rem] md:rounded-[4rem] border-white/10 p-1 relative shadow-3xl bg-slate-900/40 overflow-hidden reveal-on-scroll active">
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
        <div className="absolute top-0 left-0 w-full h-full" style={{ backgroundImage: 'linear-gradient(90deg, #fff 1px, transparent 0), linear-gradient(#fff 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>
      </div>

      <div className="flex flex-wrap items-center justify-between p-6 md:p-8 border-b border-white/5 bg-white/5 relative z-10">
        <div className="flex flex-wrap gap-2 md:gap-4 flex-1 justify-center">
          {[
            { id: 'omni', icon: <Zap className="w-5 h-5" />, label: 'Omni-Forge' },
            { id: 'image', icon: <ImageIcon className="w-5 h-5" />, label: 'Image' },
            { id: 'content', icon: <FileText className="w-5 h-5" />, label: 'Content' },
            { id: 'audio', icon: <Volume2 className="w-5 h-5" />, label: 'Audio' },
            { id: 'video', icon: <VideoIcon className="w-5 h-5" />, label: 'Video' }
          ].map((tool) => (
            <button
              key={tool.id}
              onClick={() => { setActiveTool(tool.id as ToolType); setResult(null); setStatus(''); }}
              className={`flex items-center gap-3 md:gap-4 px-6 md:px-8 py-4 md:py-5 rounded-[1.5rem] md:rounded-[2rem] font-black uppercase tracking-[0.2em] md:tracking-[0.3em] text-[9px] md:text-[10px] transition-all relative group
                ${activeTool === tool.id 
                  ? 'bg-blue-600 text-white shadow-3xl' 
                  : 'bg-white/5 text-slate-500 hover:bg-white/10'}`}
            >
              {tool.icon}
              <span className="hidden xs:inline">{tool.label}</span>
            </button>
          ))}
        </div>
        
        <div className="flex gap-2">
           <button 
            onClick={() => setShowTutorialVideo(true)}
            className="p-3 md:p-4 rounded-full bg-blue-600/10 text-blue-400 hover:bg-blue-600/20 transition-all border border-blue-500/20 group flex items-center gap-2"
          >
            <PlayCircle className="w-5 h-5 md:w-6 md:h-6 group-hover:scale-110 transition-transform" />
            <span className="hidden md:inline text-[9px] font-black uppercase tracking-widest pr-2">Watch Tutorial</span>
          </button>
          <button 
            onClick={() => setShowHelp(true)}
            className="p-3 md:p-4 rounded-full bg-white/5 text-slate-400 hover:bg-white/10 transition-all border border-white/5 group"
          >
            <HelpCircle className="w-5 h-5 md:w-6 md:h-6 group-hover:scale-110 transition-transform" />
          </button>
        </div>
      </div>

      {/* Induction Video Animation Overlay */}
      {showTutorialVideo && (
        <div className="absolute inset-0 z-[1000] bg-slate-950 flex flex-col p-6 md:p-12 animate-in fade-in duration-500 overflow-hidden">
           <div className="flex justify-between items-center mb-8">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-600/20 rounded-2xl flex items-center justify-center text-blue-500">
                <Monitor className="w-6 h-6" />
              </div>
              <h3 className="text-xl md:text-3xl font-display font-bold uppercase tracking-tight">Synaptic <span className="shimmer-text">Forge Induction</span></h3>
            </div>
            <button 
              onClick={() => setShowTutorialVideo(false)}
              className="p-3 bg-white/5 hover:bg-white/10 rounded-full text-slate-400 transition-colors"
            >
              <X className="w-6 h-6 md:w-8 md:h-8" />
            </button>
          </div>

          <div className="flex-1 grid md:grid-cols-2 gap-12 items-center">
            <div className="relative aspect-video bg-black rounded-[3rem] border border-white/10 overflow-hidden shadow-3xl flex items-center justify-center">
               <div className="absolute inset-0 bg-[linear-gradient(rgba(18,24,38,0)_0%,rgba(18,24,38,0.8)_100%)] z-10"></div>
               <div className="w-[85%] h-[80%] glass rounded-3xl border border-white/5 p-6 flex flex-col gap-4 relative z-0">
                  <div className="flex items-center justify-between">
                    <div className="flex gap-2">
                       <div className={`w-3 h-3 rounded-full ${tutorialStep === 0 ? 'bg-blue-600' : 'bg-white/10'}`}></div>
                       <div className={`w-3 h-3 rounded-full ${tutorialStep === 1 ? 'bg-blue-600' : 'bg-white/10'}`}></div>
                       <div className={`w-3 h-3 rounded-full ${tutorialStep === 2 ? 'bg-blue-600' : 'bg-white/10'}`}></div>
                       <div className={`w-3 h-3 rounded-full ${tutorialStep === 3 ? 'bg-blue-600' : 'bg-white/10'}`}></div>
                    </div>
                    <div className="text-[8px] font-mono text-slate-500">{tutorialMessages[tutorialStep]}</div>
                  </div>
                  <div className="flex-1 bg-white/5 rounded-2xl p-4 overflow-hidden relative">
                     {tutorialStep === 0 && <div className="absolute inset-0 flex items-center justify-center"><div className="w-16 h-16 bg-blue-600/30 rounded-2xl border-2 border-blue-500/60 flex items-center justify-center"><Cpu className="w-8 h-8 text-blue-400" /></div></div>}
                     {tutorialStep === 1 && <div className="p-4 bg-slate-900/50 rounded-xl text-blue-400 font-mono text-xs">{tutorialTyping}</div>}
                     {tutorialStep === 2 && <div className="absolute inset-0 flex items-center justify-center"><Loader2 className="w-20 h-20 text-blue-500 animate-spin" /></div>}
                     {tutorialStep === 3 && <div className="absolute inset-0 flex items-center justify-center"><Sparkles className="w-24 h-24 text-blue-400 animate-pulse" /></div>}
                  </div>
               </div>
               <div className="absolute inset-0 pointer-events-none opacity-20 overflow-hidden"><div className="w-full h-1 bg-blue-500 animate-[scan_3s_linear_infinite]"></div></div>
               <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'linear-gradient(90deg, #fff 1px, transparent 0), linear-gradient(#fff 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>
            </div>

            <div className="space-y-8">
               <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-black uppercase tracking-widest">
                  PHRASE {tutorialStep + 1}
               </div>
               <div key={tutorialStep} className="animate-in slide-in-from-bottom-4 duration-700">
                  <h4 className="text-4xl md:text-6xl font-display font-bold text-white mb-6 flex items-center gap-6">
                     {tutorialSteps[tutorialStep].icon}
                     {tutorialSteps[tutorialStep].title}
                  </h4>
                  <p className="text-slate-400 text-lg md:text-2xl font-light leading-relaxed">
                     {tutorialSteps[tutorialStep].desc}
                  </p>
               </div>
               <div className="relative h-1 w-full bg-white/5 rounded-full overflow-hidden">
                  <div className="absolute h-full bg-blue-600 shadow-[0_0_15px_rgba(59,130,246,0.8)] transition-all duration-100 ease-linear" style={{ width: `${tutorialProgress}%` }}></div>
               </div>
            </div>
          </div>

          <div className="mt-12 flex justify-center gap-6">
             <button onClick={() => { setTutorialStep(0); setTutorialProgress(0); }} className="px-8 py-5 glass border-white/10 text-slate-300 rounded-full font-black uppercase tracking-widest text-[10px] hover:bg-white/10 transition-all">Restart induction</button>
             <button onClick={() => setShowTutorialVideo(false)} className="px-12 py-5 bg-blue-600 text-white rounded-full font-black uppercase tracking-[0.4em] hover:bg-blue-500 transition-all text-[10px] shadow-2xl">Return to terminal</button>
          </div>
        </div>
      )}

      <div className="p-6 md:p-12 lg:p-16 relative z-10">
        <div className="flex flex-col lg:flex-row gap-10 md:gap-12">
          <div className="lg:w-1/2 space-y-8">
            <div className="relative">
               <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder={`Describe your vision for World AI Force intelligence... (e.g., "A story of a future boy with a robot friend")`}
                className="w-full bg-slate-950/70 border border-white/10 rounded-[1.5rem] md:rounded-[2.5rem] p-6 md:p-10 h-48 md:h-72 focus:border-blue-500/50 outline-none transition-all text-white text-base md:text-lg font-light resize-none shadow-inner"
              />
              <div className="absolute bottom-4 left-6 flex gap-2">
                 <Radio className="w-3 h-3 text-blue-500 animate-pulse" />
                 <span className="text-[7px] font-black text-blue-500 uppercase tracking-widest">WAF Signal: Linked</span>
              </div>
            </div>

            <div className="p-4 rounded-3xl bg-slate-950 border border-white/5 font-mono text-[8px] md:text-[9px] text-slate-500 h-24 overflow-hidden flex flex-col justify-end">
               {logMessages.map((log, i) => <div key={i} className={i === 0 ? 'text-blue-400' : ''}>{log}</div>)}
               {!logMessages.length && <div>&gt; AWAITING_SYNAPTIC_INPUT...</div>}
            </div>

            <button 
              onClick={handleForge} 
              disabled={loading || !prompt.trim()} 
              className="w-full py-6 md:py-8 bg-blue-600 text-white rounded-[1.5rem] md:rounded-[2rem] font-black uppercase tracking-[0.3em] md:tracking-[0.4em] hover:bg-blue-500 transition-all flex items-center justify-center gap-5 text-[11px] md:text-sm shadow-2xl group active:scale-95"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Sparkles className="w-5 h-5 group-hover:scale-125 transition-transform" />}
              {loading ? 'Synthesizing...' : `Forge ${activeTool.toUpperCase()}`}
            </button>
          </div>

          <div className="lg:w-1/2">
            <div className="h-full min-h-[400px] bg-slate-950/50 rounded-[1.5rem] md:rounded-[3rem] border border-white/10 flex items-center justify-center overflow-hidden relative shadow-2xl">
              {!result && !loading && (
                <div className="text-center opacity-10">
                  <Logo size={120} />
                  <p className="mt-6 font-black text-[9px] uppercase tracking-[0.8em]">Awaiting Link</p>
                </div>
              )}
              
              {loading && <div className="text-center"><Loader2 className="w-16 h-16 animate-spin text-blue-500 mx-auto" /><p className="mt-4 text-[10px] font-black uppercase tracking-widest text-blue-400">Processing Matrix...</p></div>}
              
              {result && !loading && (
                <div className="w-full h-full p-6 overflow-y-auto custom-scrollbar">
                  {result.type === 'omni' && result.multiResults && (
                    <div className="space-y-8 animate-in fade-in duration-700">
                      <div className="flex items-center gap-4 text-blue-400 border-b border-white/10 pb-4">
                        <Zap className="w-6 h-6" />
                        <h4 className="font-display font-bold text-xl uppercase tracking-tighter">Omni-Synthesis Output</h4>
                      </div>
                      
                      <div className="space-y-4">
                        <p className="text-xs font-black uppercase tracking-widest text-slate-500">Intelligence Synapse</p>
                        <p className="text-slate-300 font-light leading-relaxed italic border-l-2 border-blue-500/30 pl-6 text-lg">"{result.multiResults.content}"</p>
                      </div>

                      {result.multiResults.imageUrl ? (
                        <div className="space-y-4">
                           <p className="text-xs font-black uppercase tracking-widest text-slate-500">Visual Reconstruction</p>
                           <img src={result.multiResults.imageUrl} className="w-full rounded-3xl shadow-2xl border border-white/10 hover:scale-[1.02] transition-transform" alt="Omni forge" />
                        </div>
                      ) : (
                        <div className="p-8 bg-red-600/5 rounded-3xl border border-red-500/20 flex items-center gap-4">
                           <AlertCircle className="w-6 h-6 text-red-500" />
                           <span className="text-[10px] font-black uppercase tracking-widest text-red-400">Visual Reconstruction Quota Reached</span>
                        </div>
                      )}

                      {result.multiResults.audioData ? (
                        <div className="p-8 bg-blue-600/5 rounded-3xl border border-blue-500/20 flex items-center justify-between group">
                          <div className="flex items-center gap-4">
                            <Volume2 className={`w-8 h-8 text-blue-500 ${isPlaying ? 'animate-pulse' : ''}`} />
                            <span className="text-[10px] font-black uppercase tracking-widest text-blue-400">Vocal Synapse Ready</span>
                          </div>
                          <button onClick={() => playForgedAudio(result.multiResults.audioData)} className="p-4 bg-blue-600 rounded-full text-white hover:scale-110 transition-transform">
                            {isPlaying ? <Loader2 className="w-4 h-4 animate-spin" /> : <PlayIcon className="w-4 h-4 fill-current" />}
                          </button>
                        </div>
                      ) : (
                        <div className="p-8 bg-red-600/5 rounded-3xl border border-red-500/20 flex items-center gap-4">
                           <AlertCircle className="w-6 h-6 text-red-500" />
                           <span className="text-[10px] font-black uppercase tracking-widest text-red-400">Vocal Synapse Quota Reached</span>
                        </div>
                      )}
                    </div>
                  )}
                  {result.type === 'image' && <img src={result.url} className="w-full rounded-3xl shadow-2xl border border-white/10" />}
                  <button onClick={() => setResult(null)} className="absolute top-6 right-6 p-2 bg-red-600/20 rounded-full text-red-500"><X className="w-4 h-4" /></button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <style>{`
        @keyframes scan { 0% { top: -10%; } 100% { top: 110%; } }
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(59, 130, 246, 0.2); border-radius: 10px; }
      `}</style>
    </div>
  );
};

export default WafForge;