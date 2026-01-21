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
  Share2
} from 'lucide-react';
import Logo from './Logo.tsx';

type ToolType = 'image' | 'content' | 'video' | 'audio';
type AspectRatio = '1:1' | '16:9' | '9:16' | '4:3' | '3:4';
type VideoStyle = 'none' | 'cinematic' | 'documentary' | 'animation';

const VIDEO_STYLES = [
  { id: 'none', label: 'Standard', icon: <Activity className="w-3 h-3" />, prompt: '' },
  { id: 'cinematic', label: 'Cinematic', icon: <Film className="w-3 h-3" />, prompt: 'cinematic style, high production value, dramatic lighting, 8k, master-quality cinematography' },
  { id: 'documentary', label: 'Documentary', icon: <Camera className="w-3 h-3" />, prompt: 'documentary style, raw footage, handheld camera, realistic, natural lighting' },
  { id: 'animation', label: 'Animation', icon: <Ghost className="w-3 h-3" />, prompt: '3d animation style, vibrant colors, stylized characters, high quality render, unreal engine 5 style' }
];

const WafForge: React.FC = () => {
  const [activeTool, setActiveTool] = useState<ToolType>('image');
  const [prompt, setPrompt] = useState('');
  const [aspectRatio, setAspectRatio] = useState<AspectRatio>('1:1');
  const [videoStyle, setVideoStyle] = useState<VideoStyle>('none');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ type: ToolType; url?: string; text?: string; time?: string; audioData?: string } | null>(null);
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
    "Node Selection: IMAGE_FORGE active.",
    "Injecting Prompt Synapse...",
    "Matrix Synthesis in progress...",
    "Asset Successfully Forged."
  ];

  useEffect(() => {
    checkKeyStatus();
    if (!process.env.API_KEY) {
      addLog('> WARN: API_KEY_NOT_FOUND_IN_ENV');
    }
  }, []);

  // Tutorial Logic: Step Sequencer
  useEffect(() => {
    let interval: any;
    let typingInterval: any;

    if (showTutorialVideo) {
      // Step Timer
      interval = setInterval(() => {
        setTutorialStep(prev => (prev + 1) % 4);
        setTutorialProgress(0);
      }, 6000);

      // Progress bar within step
      const progInterval = setInterval(() => {
        setTutorialProgress(prev => Math.min(prev + 1.6, 100));
      }, 100);

      // Typing simulation for Step 2
      if (tutorialStep === 1) {
        const fullText = "Sovereign AI core floating in a nebula, 8k master-quality";
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
      
      const selectedStyle = VIDEO_STYLES.find(s => s.id === videoStyle);
      const finalPrompt = selectedStyle?.prompt ? `${prompt}. ${selectedStyle.prompt}` : prompt;

      let operation = await ai.models.generateVideos({
        model: 'veo-3.1-fast-generate-preview',
        prompt: finalPrompt,
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

  const tutorialSteps = [
    { title: "Select Node", desc: "Choose your output modality: Image, Content, Audio, or Video.", icon: <Monitor className="w-8 h-8" /> },
    { title: "Input Prompt", desc: "Describe your vision with high specificity for maximum synaptic fidelity.", icon: <FileText className="w-8 h-8" /> },
    { title: "Forge Asset", desc: "Initiate the WAF synthesis protocol to begin real-time asset generation.", icon: <Zap className="w-8 h-8" /> },
    { title: "Deploy Output", desc: "Your intelligence asset is synthesized. Download or share with the global mesh.", icon: <Sparkles className="w-8 h-8" /> }
  ];

  return (
    <div className="glass rounded-[2rem] md:rounded-[4rem] border-white/10 p-1 relative shadow-3xl bg-slate-900/40 overflow-hidden reveal-on-scroll active">
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
        <div className="absolute top-0 left-0 w-full h-full" style={{ backgroundImage: 'linear-gradient(90deg, #fff 1px, transparent 0), linear-gradient(#fff 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>
      </div>

      <div className="flex flex-wrap items-center justify-between p-6 md:p-8 border-b border-white/5 bg-white/5 relative z-10">
        <div className="flex flex-wrap gap-2 md:gap-4 flex-1 justify-center">
          {[
            { id: 'image', icon: <ImageIcon className="w-5 h-5" />, label: 'Image' },
            { id: 'content', icon: <FileText className="w-5 h-5" />, label: 'Content' },
            { id: 'audio', icon: <Volume2 className="w-5 h-5" />, label: 'Audio' },
            { id: 'video', icon: <VideoIcon className="w-5 h-5" />, label: 'Video' }
          ].map((tool) => (
            <button
              key={tool.id}
              onClick={() => { setActiveTool(tool.id as ToolType); setResult(null); setStatus(''); }}
              className={`flex items-center gap-3 md:gap-4 px-6 md:px-10 py-4 md:py-5 rounded-[1.5rem] md:rounded-[2rem] font-black uppercase tracking-[0.2em] md:tracking-[0.3em] text-[9px] md:text-[10px] transition-all relative group
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

      {/* Tutorial Video Animation Overlay */}
      {showTutorialVideo && (
        <div className="absolute inset-0 z-[120] bg-slate-950 flex flex-col p-6 md:p-12 animate-in fade-in duration-500 overflow-hidden">
           <div className="flex justify-between items-center mb-8">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-600/20 rounded-2xl flex items-center justify-center text-blue-500">
                <Monitor className="w-6 h-6" />
              </div>
              <h3 className="text-xl md:text-3xl font-display font-bold uppercase tracking-tight">Forge <span className="shimmer-text">Induction Sequence</span></h3>
            </div>
            <button 
              onClick={() => setShowTutorialVideo(false)}
              className="p-3 bg-white/5 hover:bg-white/10 rounded-full text-slate-400 transition-colors"
            >
              <X className="w-6 h-6 md:w-8 md:h-8" />
            </button>
          </div>

          <div className="flex-1 grid md:grid-cols-2 gap-12 items-center">
            {/* "Animated Video" Simulation Component */}
            <div className="relative aspect-video bg-black rounded-[3rem] border border-white/10 overflow-hidden shadow-3xl flex items-center justify-center group/vid">
               <div className="absolute inset-0 bg-[linear-gradient(rgba(18,24,38,0)_0%,rgba(18,24,38,0.8)_100%)] z-10"></div>
               
               {/* High-Tech HUD Elements */}
               <div className="absolute top-8 left-8 text-[9px] font-mono text-blue-500/50 uppercase tracking-widest z-20">
                  <div className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse"></div> SIGNAL: ENCRYPTED</div>
                  <div>COORD: 38.8951° N, 77.0364° W</div>
               </div>

               {/* Tutorial UI Mockup Animation */}
               <div className="w-[85%] h-[80%] glass rounded-3xl border border-white/5 p-6 flex flex-col gap-4 relative z-0">
                  <div className="flex items-center justify-between">
                    <div className="flex gap-2">
                       <div className={`w-3 h-3 rounded-full transition-colors duration-1000 ${tutorialStep === 0 ? 'bg-blue-600' : 'bg-white/10'}`}></div>
                       <div className={`w-3 h-3 rounded-full transition-colors duration-1000 ${tutorialStep === 1 ? 'bg-blue-600' : 'bg-white/10'}`}></div>
                       <div className={`w-3 h-3 rounded-full transition-colors duration-1000 ${tutorialStep === 2 ? 'bg-blue-600' : 'bg-white/10'}`}></div>
                       <div className={`w-3 h-3 rounded-full transition-colors duration-1000 ${tutorialStep === 3 ? 'bg-blue-600' : 'bg-white/10'}`}></div>
                    </div>
                    <div className="text-[8px] font-mono text-slate-500">{tutorialMessages[tutorialStep]}</div>
                  </div>

                  <div className="flex-1 bg-white/5 rounded-2xl p-4 overflow-hidden relative border border-white/5">
                     {tutorialStep === 0 && (
                        <div className="absolute inset-0 flex items-center justify-center animate-in zoom-in-95 fade-in duration-1000">
                           <div className="grid grid-cols-2 gap-6 scale-125">
                              <div className="w-16 h-16 bg-blue-600/30 rounded-2xl border-2 border-blue-500/60 flex items-center justify-center shadow-2xl shadow-blue-500/20"><ImageIcon className="w-8 h-8 text-blue-400" /></div>
                              <div className="w-16 h-16 bg-white/5 rounded-2xl border border-white/10"></div>
                              <div className="w-16 h-16 bg-white/5 rounded-2xl border border-white/10"></div>
                              <div className="w-16 h-16 bg-white/5 rounded-2xl border border-white/10"></div>
                           </div>
                           <MousePointer2 className="w-8 h-8 text-white absolute bottom-12 right-12 animate-bounce" />
                        </div>
                     )}
                     {tutorialStep === 1 && (
                        <div className="absolute inset-0 flex flex-col p-6 animate-in slide-in-from-left-4 duration-1000">
                           <div className="p-4 bg-slate-900/50 rounded-xl border border-white/10 min-h-[100px] text-blue-400 font-mono text-sm leading-relaxed">
                              {tutorialTyping}<span className="animate-pulse">|</span>
                           </div>
                           <div className="mt-auto flex justify-center">
                              <div className="px-8 py-3 bg-blue-600/20 border border-blue-500 rounded-full text-[10px] font-bold text-blue-400 animate-pulse">
                                 [ CLICK_FORGE ]
                              </div>
                           </div>
                        </div>
                     )}
                     {tutorialStep === 2 && (
                        <div className="absolute inset-0 flex items-center justify-center animate-in fade-in duration-1000">
                           <div className="relative">
                              <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-3xl animate-ping"></div>
                              <Loader2 className="w-24 h-24 text-blue-500 animate-spin" />
                              <Zap className="w-10 h-10 text-blue-300 absolute inset-0 m-auto animate-pulse" />
                           </div>
                        </div>
                     )}
                     {tutorialStep === 3 && (
                        <div className="absolute inset-0 flex items-center justify-center animate-in zoom-in-110 duration-1000 p-8">
                           <div className="w-full h-full bg-blue-600/20 rounded-3xl border-2 border-blue-500/40 flex flex-col items-center justify-center shadow-3xl overflow-hidden relative">
                              <Sparkles className="w-24 h-24 text-blue-400 mb-6 drop-shadow-[0_0_20px_rgba(59,130,246,0.6)]" />
                              <div className="flex gap-4">
                                <div className="p-2 bg-white/10 rounded-lg"><Download className="w-4 h-4 text-blue-400" /></div>
                                <div className="p-2 bg-white/10 rounded-lg"><Share2 className="w-4 h-4 text-blue-400" /></div>
                              </div>
                              <div className="absolute bottom-0 left-0 w-full h-1 bg-blue-500 animate-[loading_2s_infinite]"></div>
                           </div>
                        </div>
                     )}
                  </div>
               </div>
               
               {/* Scanning Line */}
               <div className="absolute inset-0 pointer-events-none z-30 opacity-20 overflow-hidden">
                <div className="w-full h-1 bg-blue-500/50 blur-sm animate-[scan_3s_linear_infinite]"></div>
               </div>

               {/* Grid Overlay */}
               <div className="absolute inset-0 opacity-10 pointer-events-none z-20" style={{ backgroundImage: 'linear-gradient(90deg, #fff 1px, transparent 0), linear-gradient(#fff 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>
            </div>

            <div className="space-y-8">
               <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] md:text-[11px] font-black uppercase tracking-widest">
                  <span className="animate-pulse">●</span> PHRASE {tutorialStep + 1}
               </div>
               <div className="animate-in slide-in-from-bottom-4 duration-700" key={tutorialStep}>
                  <h4 className="text-4xl md:text-6xl font-display font-bold text-white mb-6 flex items-center gap-6">
                     <span className="text-blue-500">{tutorialSteps[tutorialStep].icon}</span>
                     {tutorialSteps[tutorialStep].title}
                  </h4>
                  <p className="text-slate-400 text-lg md:text-2xl font-light leading-relaxed max-w-xl">
                     {tutorialSteps[tutorialStep].desc}
                  </p>
               </div>
               
               <div className="relative h-1 w-full bg-white/5 rounded-full overflow-hidden">
                  <div 
                    className="absolute h-full bg-blue-600 shadow-[0_0_15px_rgba(59,130,246,0.8)] transition-all duration-100 ease-linear"
                    style={{ width: `${tutorialProgress}%` }}
                  ></div>
               </div>

               <div className="flex gap-2">
                  {tutorialSteps.map((_, i) => (
                     <div key={i} className={`h-1.5 flex-1 rounded-full transition-all duration-700 ${i <= tutorialStep ? 'bg-blue-600 shadow-[0_0_10px_rgba(59,130,246,0.5)]' : 'bg-white/10'}`}></div>
                  ))}
               </div>
            </div>
          </div>

          <div className="mt-12 flex justify-center gap-6">
             <button 
              onClick={() => { setTutorialStep(0); setTutorialProgress(0); }}
              className="px-8 py-5 glass border-white/10 text-slate-300 rounded-full font-black uppercase tracking-widest text-[10px] hover:bg-white/10 transition-all"
             >
               Restart Tutorial
             </button>
             <button 
              onClick={() => setShowTutorialVideo(false)}
              className="px-12 py-5 bg-blue-600 text-white rounded-full font-black uppercase tracking-[0.4em] hover:bg-blue-500 transition-all text-[10px] shadow-2xl active:scale-95"
             >
               Enter Terminal
             </button>
          </div>
        </div>
      )}

      {/* Help Modal */}
      {showHelp && (
        <div className="absolute inset-0 z-[110] bg-slate-950/90 backdrop-blur-2xl flex flex-col p-8 md:p-16 animate-in fade-in zoom-in-95 duration-500 overflow-y-auto">
          <div className="flex justify-between items-center mb-10 md:mb-12">
            <div className="flex items-center gap-4">
              <Command className="w-6 h-6 md:w-8 md:h-8 text-blue-500" />
              <h3 className="text-2xl md:text-3xl font-display font-bold uppercase tracking-tight">Forge <span className="shimmer-text">Protocol</span></h3>
            </div>
            <button 
              onClick={() => setShowHelp(false)}
              className="p-3 bg-white/5 hover:bg-white/10 rounded-full text-slate-400 transition-colors"
            >
              <X className="w-6 h-6 md:w-8 md:h-8" />
            </button>
          </div>

          <div className="grid md:grid-cols-2 gap-6 md:gap-8 max-w-5xl mx-auto">
            <div className="space-y-6">
              <div className="p-6 md:p-8 rounded-[1.5rem] md:rounded-[2rem] bg-white/5 border border-white/10 group hover:border-blue-500/30 transition-all">
                <div className="flex items-center gap-4 mb-3 md:mb-4">
                  <ImageIcon className="w-5 h-5 md:w-6 md:h-6 text-blue-500" />
                  <h4 className="font-black uppercase tracking-widest text-[9px] md:text-[10px]">Image Forge</h4>
                </div>
                <p className="text-slate-400 text-xs md:text-sm font-light leading-relaxed">
                  Generate visual assets. Use descriptive prompts like "Sovereign AI core floating in a nebula, cinematic lighting, 8k".
                </p>
              </div>

              <div className="p-6 md:p-8 rounded-[1.5rem] md:rounded-[2rem] bg-white/5 border border-white/10 group hover:border-blue-500/30 transition-all">
                <div className="flex items-center gap-4 mb-3 md:mb-4">
                  <FileText className="w-5 h-5 md:w-6 md:h-6 text-blue-500" />
                  <h4 className="font-black uppercase tracking-widest text-[9px] md:text-[10px]">Content Forge</h4>
                </div>
                <p className="text-slate-400 text-xs md:text-sm font-light leading-relaxed">
                  Synthesize high-impact professional text. Optimized for WAF manifestos and technical documentation.
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="p-6 md:p-8 rounded-[1.5rem] md:rounded-[2rem] bg-white/5 border border-white/10 group hover:border-blue-500/30 transition-all">
                <div className="flex items-center gap-4 mb-3 md:mb-4">
                  <Volume2 className="w-5 h-5 md:w-6 md:h-6 text-blue-500" />
                  <h4 className="font-black uppercase tracking-widest text-[9px] md:text-[10px]">Audio Forge</h4>
                </div>
                <p className="text-slate-400 text-xs md:text-sm font-light leading-relaxed">
                  Convert text into authoritative voice streams. Perfect for community announcements and global messaging.
                </p>
              </div>

              <div className="p-6 md:p-8 rounded-[1.5rem] md:rounded-[2rem] bg-white/5 border border-white/10 group hover:border-blue-500/30 transition-all">
                <div className="flex items-center gap-4 mb-3 md:mb-4">
                  <VideoIcon className="w-5 h-5 md:w-6 md:h-6 text-blue-500" />
                  <h4 className="font-black uppercase tracking-widest text-[9px] md:text-[10px]">Video Forge</h4>
                </div>
                <p className="text-slate-400 text-xs md:text-sm font-light leading-relaxed">
                   Personal API Link required. Choose between Cinematic, Documentary, or Animation presets.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-12 md:mt-16 text-center">
             <button 
              onClick={() => setShowHelp(false)}
              className="px-12 md:px-16 py-5 md:py-6 bg-blue-600 text-white rounded-full font-black uppercase tracking-[0.3em] md:tracking-[0.4em] hover:bg-blue-500 transition-all text-[9px] md:text-[10px]"
             >
               Initialize Synapse
             </button>
          </div>
        </div>
      )}

      <div className="p-6 md:p-12 lg:p-16 relative z-10">
        <div className="flex flex-col lg:flex-row gap-10 md:gap-12">
          <div className="lg:w-1/2 space-y-8 md:space-y-10">
            <div className="relative">
               <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder={`Describe your World AI Force synaptic output...`}
                className="w-full bg-slate-950/70 border border-white/10 rounded-[1.5rem] md:rounded-[2.5rem] p-6 md:p-10 h-48 md:h-72 focus:border-blue-500/50 outline-none transition-all text-white text-base md:text-lg font-light resize-none shadow-inner"
              />
              <div className="absolute bottom-4 md:bottom-6 left-6 md:left-10 flex gap-2">
                 <Radio className="w-3 h-3 md:w-4 md:h-4 text-blue-500 animate-pulse" />
                 <span className="text-[7px] md:text-[8px] font-black text-blue-500 uppercase tracking-widest">Signal: Active</span>
              </div>
            </div>

            {activeTool === 'video' && (
              <div className="space-y-4 animate-in fade-in slide-in-from-top-2 duration-500">
                <div className="flex items-center gap-2 ml-4">
                  <p className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.4em] text-slate-500">Temporal Presets</p>
                  <Info className="w-3 h-3 text-slate-600" />
                </div>
                <div className="flex flex-wrap gap-2 md:gap-3">
                  {VIDEO_STYLES.map((style) => (
                    <button
                      key={style.id}
                      onClick={() => setVideoStyle(style.id as VideoStyle)}
                      className={`flex items-center gap-2 px-4 md:px-6 py-2 md:py-3 rounded-full text-[9px] md:text-[10px] font-black uppercase tracking-widest transition-all border
                        ${videoStyle === style.id 
                          ? 'bg-blue-600/20 border-blue-500 text-blue-400 shadow-lg shadow-blue-500/10' 
                          : 'bg-white/5 border-white/10 text-slate-500 hover:border-white/20'}`}
                    >
                      {style.icon}
                      {style.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="p-4 md:p-6 rounded-2xl md:rounded-3xl bg-slate-950 border border-white/5 font-mono text-[8px] md:text-[9px] text-slate-500 h-24 md:h-32 overflow-hidden flex flex-col justify-end">
               {logMessages.map((log, i) => (
                 <div key={i} className={i === 0 ? 'text-blue-400' : ''}>{log}</div>
               ))}
               {!logMessages.length && <div>&gt; AWAITING_SYNAPSE_INPUT...</div>}
            </div>

            <button 
              onClick={handleForge} 
              disabled={loading || !prompt.trim()} 
              className="w-full py-6 md:py-8 bg-blue-600 text-white rounded-[1.5rem] md:rounded-[2rem] font-black uppercase tracking-[0.3em] md:tracking-[0.4em] hover:bg-blue-500 transition-all flex items-center justify-center gap-5 text-[11px] md:text-sm shadow-2xl group active:scale-95"
            >
              {loading ? <Loader2 className="w-4 h-4 md:w-5 md:h-5 animate-spin" /> : <Sparkles className="w-4 h-4 md:w-5 md:h-5 group-hover:scale-125 transition-transform" />}
              {loading ? 'Synthesizing...' : `Forge ${activeTool.charAt(0).toUpperCase() + activeTool.slice(1)}`}
            </button>

            {status && !loading && status.includes('Sync') && (
              <button 
                onClick={handleSyncGrid}
                className="w-full flex items-center justify-center gap-2 text-[8px] md:text-[10px] font-black text-blue-400 uppercase tracking-widest hover:text-white transition-colors"
              >
                <Terminal className="w-3 h-3 md:w-4 md:h-4" /> Resolve Global Link Status
              </button>
            )}
          </div>

          <div className="lg:w-1/2">
            <div className="h-full min-h-[350px] md:min-h-[450px] bg-slate-950/50 rounded-[1.5rem] md:rounded-[3rem] border border-white/10 flex items-center justify-center overflow-hidden relative shadow-2xl group">
              <div className="absolute inset-0 pointer-events-none z-30 opacity-20 overflow-hidden">
                <div className="w-full h-1 bg-blue-500/50 blur-sm animate-[scan_3s_linear_infinite]"></div>
              </div>

              {!result && !loading && (
                <div className="text-center opacity-10 group-hover:opacity-20 transition-opacity">
                  <Logo size={100} mdSize={150} />
                  <p className="mt-6 font-black text-[8px] md:text-[10px] uppercase tracking-[0.8em]">Awaiting Synapse</p>
                </div>
              )}
              
              {loading && (
                <div className="text-center relative z-40 p-6">
                  <div className="relative mb-6">
                    <Loader2 className="w-12 h-12 md:w-16 md:h-16 animate-spin text-blue-500 mx-auto shadow-[0_0_20px_rgba(59,130,246,0.3)]" />
                    <Zap className="absolute inset-0 m-auto w-5 h-5 md:w-6 md:h-6 text-blue-400 animate-pulse" />
                  </div>
                  <p className="text-slate-500 text-[9px] md:text-[10px] font-black uppercase tracking-[0.4em] md:tracking-[0.5em] animate-pulse">Computing Matrix...</p>
                </div>
              )}
              
              {result && !loading && (
                <div className="w-full h-full animate-in fade-in zoom-in-95 relative p-4 md:p-6 flex items-center justify-center">
                  {result.type === 'image' && <img src={result.url} className="max-w-full max-h-[300px] md:max-h-[400px] object-contain rounded-2xl shadow-2xl border border-white/10" alt="Forged image" />}
                  {result.type === 'content' && (
                    <div className="p-6 md:p-10 text-slate-300 font-light leading-relaxed prose prose-invert max-w-none overflow-y-auto max-h-[300px] md:max-h-[400px] custom-scrollbar selection:bg-blue-600/30 whitespace-pre-wrap text-sm md:text-base">
                      {result.text}
                    </div>
                  )}
                  {result.type === 'video' && <video src={result.url} className="max-w-full max-h-[300px] md:max-h-[400px] object-contain rounded-2xl shadow-2xl border border-white/10" controls autoPlay loop />}
                  {result.type === 'audio' && result.audioData && (
                    <div className="flex flex-col items-center gap-6 md:gap-8">
                       <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-blue-600/20 border border-blue-500/30 flex items-center justify-center">
                          <Volume2 className={`w-10 h-10 md:w-12 md:h-12 text-blue-500 ${isPlaying ? 'animate-pulse' : ''}`} />
                       </div>
                       <button 
                         onClick={() => playForgedAudio(result.audioData!)}
                         className={`px-8 md:px-12 py-4 md:py-5 rounded-full font-black uppercase tracking-widest text-[10px] md:text-xs flex items-center gap-3 transition-all ${isPlaying ? 'bg-slate-800 text-slate-500 cursor-not-allowed' : 'bg-blue-600 text-white hover:bg-blue-500'}`}
                        >
                         {isPlaying ? <Loader2 className="w-4 h-4 animate-spin" /> : <PlayIcon className="w-4 h-4 fill-current" />}
                         {isPlaying ? 'Streaming...' : 'Play Audio'}
                       </button>
                    </div>
                  )}
                  
                  <div className="absolute top-4 md:top-10 right-4 md:right-10 flex gap-2">
                     <div className="px-3 md:px-4 py-1.5 md:py-2 bg-slate-900/90 backdrop-blur-md rounded-full border border-white/10 text-[7px] md:text-[9px] font-black uppercase tracking-widest text-blue-400">Node_{Math.random().toString(36).substr(2, 4).toUpperCase()}</div>
                     <button onClick={() => { setResult(null); addLog('> CACHE_CLEARED'); setIsPlaying(false); }} className="p-2 bg-red-600/20 hover:bg-red-600/40 rounded-full text-red-500 transition-colors">
                        <X className="w-3 h-3 md:w-4 md:h-4" />
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
        @keyframes loading {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        @keyframes move {
          0% { transform: translate(0, 0); }
          50% { transform: translate(120px, 60px); }
          100% { transform: translate(0, 0); }
        }
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(59, 130, 246, 0.2); border-radius: 10px; }
        @media (max-width: 480px) {
          .xs\:inline { display: inline; }
        }
      `}</style>
    </div>
  );
};

export default WafForge;