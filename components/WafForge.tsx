
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
  ShieldAlert,
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
  const [isProMode, setIsProMode] = useState(false);

  // Video and Pro Image generation requires special key selection
  const handleKeySelection = async () => {
    // @ts-ignore
    if (window.aistudio && typeof window.aistudio.openSelectKey === 'function') {
      await window.aistudio.openSelectKey();
      setStatus('Neural link established. Protocol ready.');
    }
  };

  const handleErrorMessage = (error: any) => {
    console.error(error);
    const msg = error.message || '';
    if (msg.includes('429') || msg.toLowerCase().includes('quota') || msg.toLowerCase().includes('exhausted')) {
      return 'Quota exceeded (429). Switch to Pro Mode or wait for reset.';
    }
    if (msg.includes('entity was not found')) {
      return 'Configuration Error: Resetting key selection suggested.';
    }
    return `Synthesis Error: ${msg.substring(0, 50)}...`;
  };

  const generateImage = async () => {
    setLoading(true);
    setStatus(isProMode ? 'Engaging Pro Visionary (gemini-3-pro)...' : 'Initializing Visionary model...');
    
    try {
      // In Pro mode, we assume the user has selected their key.
      // Instructions: For gemini-3-pro-image-preview, users MUST select their own API key.
      if (isProMode) {
        // @ts-ignore
        const hasKey = window.aistudio && typeof window.aistudio.hasSelectedApiKey === 'function' 
          ? await window.aistudio.hasSelectedApiKey() 
          : true;
        if (!hasKey) {
          setStatus('Critical: Pro Mode requires a paid API key.');
          setLoading(false);
          return;
        }
      }

      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const enhancedPrompt = `${prompt}, photorealistic, high quality, highly detailed, professional photography, 8k resolution`;

      const response = await ai.models.generateContent({
        model: isProMode ? 'gemini-3-pro-image-preview' : 'gemini-2.5-flash-image',
        contents: { parts: [{ text: enhancedPrompt }] },
        config: {
          imageConfig: {
            aspectRatio: aspectRatio,
            // Pro model supports imageSize
            ...(isProMode ? { imageSize: '1K' } : {})
          },
          // Pro model supports google_search
          ...(isProMode ? { tools: [{ googleSearch: {} }] } : {})
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
        setStatus('Model returned no visual data. Check your prompt.');
      }
    } catch (error: any) {
      setStatus(handleErrorMessage(error));
    } finally {
      setLoading(false);
    }
  };

  const generateContent = async () => {
    setLoading(true);
    setStatus('Synthesizing lexicon...');
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: { parts: [{ text: prompt }] },
        config: {
          systemInstruction: "You are the WAF Forge Lexicon. Generate professional, tech-forward, and high-impact content. Use markdown formatting where appropriate."
        }
      });
      setResult({ type: 'content', text: response.text });
      setStatus('Lexicon synthesized.');
    } catch (error) {
      setStatus(handleErrorMessage(error));
    } finally {
      setLoading(false);
    }
  };

  const generateVideo = async () => {
    // @ts-ignore
    const hasKey = window.aistudio && typeof window.aistudio.hasSelectedApiKey === 'function' 
      ? await window.aistudio.hasSelectedApiKey() 
      : true;

    if (!hasKey) {
      setStatus('Critical: Motion synthesis requires a paid API Key.');
      setLoading(false);
      return;
    }

    setLoading(true);
    setStatus('Establishing neural motion pipeline...');
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      let operation = await ai.models.generateVideos({
        model: 'veo-3.1-fast-generate-preview',
        prompt: prompt,
        config: { numberOfVideos: 1, resolution: '720p', aspectRatio: '16:9' }
      });

      const reassuringMessages = [
        'Calculating physics vectors...',
        'Synthesizing temporal consistency...',
        'Applying global illumination...',
        'Finalizing motion paths...'
      ];

      let msgIdx = 0;
      while (!operation.done) {
        setStatus(reassuringMessages[msgIdx % reassuringMessages.length]);
        msgIdx++;
        await new Promise(resolve => setTimeout(resolve, 10000));
        operation = await ai.operations.getVideosOperation({ operation: operation });
      }

      const downloadLink = operation.response?.generatedVideos?.[0]?.video?.uri;
      const response = await fetch(`${downloadLink}&key=${process.env.API_KEY}`);
      const blob = await response.blob();
      setResult({ type: 'video', url: URL.createObjectURL(blob) });
      setStatus('Motion render complete.');
    } catch (error: any) {
      setStatus(handleErrorMessage(error));
    } finally {
      setLoading(false);
    }
  };

  const handleForge = () => {
    if (!prompt.trim()) return;
    setResult(null);
    if (activeTool === 'image') generateImage();
    if (activeTool === 'content') generateContent();
    if (activeTool === 'video') generateVideo();
  };

  return (
    <section id="forge" className="py-32 relative bg-slate-950 overflow-hidden">
      <div className="absolute inset-0 bg-blue-600/5 -z-10 blur-[150px] animate-pulse"></div>
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 reveal-on-scroll">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Wand2 className="text-blue-500 animate-bounce" />
            <span className="text-xs font-black uppercase tracking-[0.4em] text-blue-400">Production Suite</span>
          </div>
          <h2 className="font-display text-4xl md:text-6xl font-bold mb-6">WAF <span className="shimmer-text">Forge</span></h2>
          <p className="text-slate-400 max-w-xl mx-auto text-lg font-light">
            Deploy advanced intelligence to create global-scale assets in real-time.
          </p>
        </div>

        <div className="glass rounded-[3rem] border-white/10 p-1 relative">
          {/* Tool Navigation */}
          <div className="flex flex-wrap items-center justify-center gap-4 p-6 border-b border-white/5 bg-white/5 rounded-t-[2.9rem]">
            {[
              { id: 'image', icon: <ImageIcon className="w-4 h-4" />, label: 'Visionary' },
              { id: 'content', icon: <FileText className="w-4 h-4" />, label: 'Lexicon' },
              { id: 'video', icon: <VideoIcon className="w-4 h-4" />, label: 'Motion' }
            ].map((tool) => (
              <button
                key={tool.id}
                onClick={() => { setActiveTool(tool.id as ToolType); setResult(null); setStatus(''); }}
                className={`flex items-center gap-3 px-8 py-4 rounded-2xl font-bold uppercase tracking-widest text-[10px] transition-all
                  ${activeTool === tool.id 
                    ? 'bg-blue-600 text-white shadow-xl shadow-blue-500/20' 
                    : 'bg-white/5 text-slate-500 hover:bg-white/10'}`}
              >
                {tool.icon}
                {tool.label}
              </button>
            ))}
          </div>

          <div className="p-8 md:p-12">
            <div className="flex flex-col lg:flex-row gap-12">
              {/* Input Area */}
              <div className="lg:w-1/2 space-y-8">
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <label className="block text-[10px] uppercase tracking-[0.4em] text-slate-500 font-black">Transmission Prompt</label>
                    {activeTool === 'image' && (
                      <button 
                        onClick={() => setIsProMode(!isProMode)}
                        className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest transition-all ${
                          isProMode ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30' : 'bg-white/5 text-slate-500'
                        }`}
                      >
                        <Zap className={`w-3 h-3 ${isProMode ? 'animate-pulse' : ''}`} />
                        {isProMode ? 'Pro Mode Active' : 'Enable Pro Mode'}
                      </button>
                    )}
                  </div>
                  <textarea
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder={
                      activeTool === 'image' ? "Describe the vision... (e.g. A hyper-realistic portrait of an AI guardian)" :
                      activeTool === 'content' ? "Describe the text required... (e.g. A manifesto for universal intelligence)" :
                      "Describe the cinematic sequence..."
                    }
                    className="w-full bg-slate-900/50 border border-white/10 rounded-3xl px-8 py-6 h-48 focus:border-blue-500 outline-none transition-all text-white placeholder:text-slate-600 resize-none font-light"
                  />
                </div>

                {activeTool === 'image' && (
                  <div>
                    <label className="block text-[10px] uppercase tracking-[0.4em] text-slate-500 font-black mb-4">Aspect Ratio</label>
                    <div className="flex flex-wrap gap-2">
                      {(['1:1', '16:9', '9:16', '4:3', '3:4'] as AspectRatio[]).map((ratio) => (
                        <button
                          key={ratio}
                          onClick={() => setAspectRatio(ratio)}
                          className={`px-4 py-2 rounded-xl text-[10px] font-bold border transition-all ${
                            aspectRatio === ratio 
                              ? 'bg-blue-600 border-blue-600 text-white' 
                              : 'bg-white/5 border-white/10 text-slate-500 hover:border-white/20'
                          }`}
                        >
                          {ratio}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {(activeTool === 'video' || isProMode) && (
                  <div className="p-6 rounded-2xl bg-blue-500/5 border border-blue-500/20 flex items-start gap-4">
                    <AlertCircle className="w-6 h-6 text-blue-400 shrink-0" />
                    <div>
                      <p className="text-xs text-blue-300 mb-3 leading-relaxed">
                        {activeTool === 'video' ? 'Motion synthesis' : 'Pro Visionary'} requires a paid API key to bypass global usage limits.
                      </p>
                      <div className="flex items-center gap-4">
                        <button 
                          onClick={handleKeySelection}
                          className="flex items-center gap-2 px-4 py-2 bg-blue-600/20 border border-blue-500/30 rounded-xl text-[10px] font-black uppercase text-blue-400 hover:bg-blue-600 hover:text-white transition-all"
                        >
                          <Key className="w-3 h-3" />
                          Select Account
                        </button>
                        <a 
                          href="https://ai.google.dev/gemini-api/docs/billing" 
                          target="_blank" 
                          className="text-[10px] text-slate-500 hover:text-white underline decoration-blue-500/30"
                        >
                          Billing Docs
                        </a>
                      </div>
                    </div>
                  </div>
                )}

                <button
                  onClick={handleForge}
                  disabled={loading || !prompt.trim()}
                  className={`w-full py-6 rounded-3xl font-black uppercase tracking-[0.3em] flex items-center justify-center gap-4 transition-all
                    ${loading ? 'bg-slate-800 text-slate-500 cursor-not-allowed' : 'bg-blue-600 text-white hover:bg-blue-500 shadow-2xl shadow-blue-500/20 active:scale-95'}`}
                >
                  {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : <Sparkles className="w-6 h-6" />}
                  {loading ? 'Forging Assets...' : `Initiate ${activeTool.toUpperCase()}`}
                </button>

                {status && (
                  <div className={`p-4 rounded-2xl text-center flex items-center justify-center gap-3 ${status.includes('429') || status.includes('Error') ? 'bg-red-500/10 border border-red-500/20 text-red-400' : 'text-blue-400'}`}>
                    {status.includes('429') && <ShieldAlert className="w-4 h-4" />}
                    <p className="text-[10px] uppercase tracking-widest font-bold">
                      {status}
                    </p>
                  </div>
                )}
              </div>

              {/* Result Preview */}
              <div className="lg:w-1/2 min-h-[400px]">
                <div className="h-full siren-border-outer rounded-[2.5rem] p-1">
                  {loading && <div className="siren-border-inner"></div>}
                  <div className="relative z-10 w-full h-full bg-slate-900 rounded-[2.4rem] border border-white/5 flex items-center justify-center overflow-hidden min-h-[400px]">
                    {!result && !loading && (
                      <div className="text-center p-12">
                        <div className="w-20 h-20 rounded-full glass border-white/10 flex items-center justify-center mx-auto mb-6 text-slate-700">
                          {activeTool === 'image' && <ImageIcon className="w-8 h-8" />}
                          {activeTool === 'content' && <FileText className="w-8 h-8" />}
                          {activeTool === 'video' && <VideoIcon className="w-8 h-8" />}
                        </div>
                        <p className="text-slate-600 font-black uppercase tracking-widest text-[10px]">Awaiting Transmission</p>
                      </div>
                    )}

                    {loading && (
                      <div className="text-center animate-in zoom-in duration-500 px-6">
                        <Loader2 className="w-16 h-16 animate-spin text-blue-600 mx-auto mb-8" />
                        <h4 className="text-white font-display text-2xl font-bold mb-2">Engaging Core</h4>
                        <p className="text-slate-500 text-xs uppercase tracking-[0.4em]">{status}</p>
                      </div>
                    )}

                    {result && !loading && (
                      <div className="w-full h-full animate-in fade-in duration-700 flex flex-col">
                        {result.type === 'image' && (
                          <div className="relative group w-full h-full flex items-center justify-center bg-black/20">
                            <img src={result.url} className="max-w-full max-h-[600px] object-contain shadow-2xl" alt="Forged Vision" />
                            <div className="absolute top-4 right-4 flex gap-2">
                              <a href={result.url} download="waf-forge-vision.png" className="p-3 bg-blue-600 text-white rounded-xl hover:scale-110 transition-transform shadow-xl">
                                <Download className="w-5 h-5" />
                              </a>
                            </div>
                          </div>
                        )}
                        {result.type === 'content' && (
                          <div className="p-10 h-full overflow-y-auto font-light leading-relaxed text-slate-300">
                            <div className="flex justify-between items-center mb-6 border-b border-white/5 pb-4">
                              <span className="text-[10px] font-black uppercase tracking-widest text-blue-400">Lexicon Output</span>
                              <button onClick={() => {
                                navigator.clipboard.writeText(result.text || '');
                                setStatus('Copied to clipboard');
                              }} className="text-[10px] font-bold uppercase hover:text-white transition-colors">Copy Text</button>
                            </div>
                            <pre className="whitespace-pre-wrap font-sans text-lg">{result.text}</pre>
                          </div>
                        )}
                        {result.type === 'video' && (
                          <div className="relative w-full h-full">
                            <video src={result.url} className="w-full h-full object-cover" controls autoPlay loop />
                            <a href={result.url} download="waf-motion.mp4" className="absolute top-4 right-4 p-3 bg-blue-600 text-white rounded-xl hover:scale-110 transition-transform shadow-xl z-20">
                              <Download className="w-5 h-5" />
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
    </section>
  );
};

export default WafForge;
