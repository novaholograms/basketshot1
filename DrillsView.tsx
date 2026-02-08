import React, { useState } from 'react';
import { Sparkles, Play, ChevronRight, Loader2, Bot, Timer, Zap, X, Minus, Plus } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

const PRESET_DRILLS = [
  {
    title: "3-Point Shooting",
    image: "https://images.unsplash.com/photo-1505666287802-931dc83948e9?auto=format&fit=crop&w=600&q=80",
    duration: "20 min"
  },
  {
    title: "Weak Hand",
    image: "https://images.unsplash.com/photo-1533596773223-9366ebf0945a?auto=format&fit=crop&w=600&q=80",
    duration: "15 min"
  },
  {
    title: "Handles",
    image: "https://images.unsplash.com/photo-1574623452334-1e0ac2b3ccb4?auto=format&fit=crop&w=600&q=80",
    duration: "30 min"
  },
  {
    title: "Dunking",
    image: "https://images.unsplash.com/photo-1509027572446-af8401acfdc3?auto=format&fit=crop&w=600&q=80",
    duration: "45 min"
  },
  {
    title: "Layups",
    image: "https://images.unsplash.com/photo-1543796076-eb34c16a3c6d?auto=format&fit=crop&w=600&q=80",
    duration: "10 min"
  },
  {
    title: "Mid-Range",
    image: "https://images.unsplash.com/photo-1546519638-68e109498ee3?auto=format&fit=crop&w=600&q=80",
    duration: "25 min"
  }
];

const INTENSITIES = ['Low', 'Med', 'High'];

export const DrillsView: React.FC = () => {
  const [showGenerator, setShowGenerator] = useState(false);
  const [prompt, setPrompt] = useState('');
  const [duration, setDuration] = useState(30); // Default 30 min
  const [intensity, setIntensity] = useState('Med');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedDrill, setGeneratedDrill] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    
    setIsGenerating(true);
    setGeneratedDrill(null);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Create a ${intensity} intensity basketball drill plan for exactly ${duration} minutes focusing on: ${prompt}. 
        Format as a structured markdown list:
        - **Objective**
        - **Warm-up** (Time)
        - **Drill Phase 1** (Time & Details)
        - **Drill Phase 2** (Time & Details)
        - **Cool Down**
        Keep it concise and actionable.`,
      });
      setGeneratedDrill(response.text);
    } catch (error) {
      console.error("Error generating drill", error);
    } finally {
      setIsGenerating(false);
    }
  };

  const openDrillSetup = (drillTitle: string, drillDuration: string) => {
    setPrompt(drillTitle);
    setDuration(parseInt(drillDuration));
    setGeneratedDrill(null);
    setShowGenerator(true);
  };

  const closeGenerator = () => {
    setShowGenerator(false);
    setGeneratedDrill(null);
    setPrompt('');
  };

  return (
    <div className="space-y-8 pb-24 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Header */}
      <div className="mt-2 px-1">
         <h3 className="text-2xl font-extrabold tracking-tight mb-2">Drills</h3>
         <p className="text-muted text-sm font-medium">What do you want to work on today?</p>
      </div>

      {/* AI Generator Trigger Card */}
      <section>
        <div 
          onClick={() => setShowGenerator(true)}
          className="bg-gradient-to-r from-surface to-[#1a1a1a] rounded-3xl p-6 border border-primary/20 relative overflow-hidden group cursor-pointer hover:border-primary/50 transition-all shadow-lg hover:shadow-primary/5"
        >
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <Sparkles size={100} />
          </div>
          
          <div className="relative z-10 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary shadow-[0_0_15px_rgba(249,128,6,0.3)]">
                <Bot size={24} />
              </div>
              <div>
                <h2 className="text-xl font-extrabold tracking-tight">Generate Drill with AI</h2>
                <p className="text-xs text-muted font-medium">Customized plans based on your needs</p>
              </div>
            </div>
            <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-primary group-hover:text-black transition-colors">
              <Play size={18} fill="currentColor" />
            </div>
          </div>
        </div>
      </section>

      {/* Preset Drills Horizontal Scroll */}
      <section>
        <div className="flex items-center justify-between mb-4 px-1">
          <h3 className="text-lg font-bold">Trending Drills</h3>
          <span className="text-xs text-muted font-semibold cursor-pointer">View All</span>
        </div>
        
        <div className="flex overflow-x-auto gap-4 pb-4 -mx-6 px-6 no-scrollbar snap-x snap-mandatory">
          {PRESET_DRILLS.map((drill, index) => (
            <div 
              key={index}
              onClick={() => openDrillSetup(drill.title, drill.duration)}
              className="relative min-w-[160px] h-[220px] rounded-3xl overflow-hidden snap-start border border-white/5 group cursor-pointer"
            >
              <img 
                src={drill.image} 
                alt={drill.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
              
              <div className="absolute bottom-0 left-0 p-4 w-full">
                <span className="text-[10px] bg-primary/90 text-black font-bold px-2 py-0.5 rounded-full mb-2 inline-block">
                  {drill.duration}
                </span>
                <h4 className="text-sm font-extrabold leading-tight mb-1">{drill.title}</h4>
                
                <div className="flex items-center gap-1 text-muted group-hover:text-primary transition-colors mt-1">
                  <span className="text-[10px] font-bold uppercase tracking-wide">Customize</span>
                  <ChevronRight size={12} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Categories / Grid */}
      <section>
        <h3 className="text-lg font-bold mb-4 px-1">Categories</h3>
        <div className="grid grid-cols-2 gap-3">
            {['Shooting', 'Defense', 'Agility', 'Plyometrics'].map((cat) => (
                <div key={cat} className="bg-surface p-4 rounded-2xl border border-white/5 flex items-center justify-between cursor-pointer hover:border-primary/30 transition-colors">
                    <span className="text-sm font-bold">{cat}</span>
                    <ChevronRight size={16} className="text-muted" />
                </div>
            ))}
        </div>
      </section>

      {/* Generator Modal Overlay */}
      {showGenerator && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={closeGenerator}></div>
          
          <div className="relative bg-[#141414] w-full max-w-lg rounded-3xl border border-white/10 p-6 shadow-2xl animate-in zoom-in-95 fade-in duration-300 max-h-[85vh] overflow-y-auto no-scrollbar">
            
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2 text-primary">
                <Sparkles size={20} />
                <h3 className="font-extrabold text-lg tracking-tight">Coach AI</h3>
              </div>
              <button onClick={closeGenerator} className="p-2 bg-white/5 rounded-full hover:bg-white/10">
                <X size={20} />
              </button>
            </div>

            {!generatedDrill ? (
              <div className="space-y-6">
                
                {/* Duration Slider */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <label className="text-xs font-bold text-muted uppercase tracking-wider flex items-center gap-1">
                      <Timer size={14} /> Duration
                    </label>
                    <span className="text-primary font-extrabold text-xl">{duration} min</span>
                  </div>
                  <input 
                    type="range" 
                    min="15" 
                    max="90" 
                    step="5"
                    value={duration}
                    onChange={(e) => setDuration(parseInt(e.target.value))}
                    className="w-full h-2 bg-surface rounded-lg appearance-none cursor-pointer accent-primary hover:accent-primary/80"
                  />
                  <div className="flex justify-between text-[10px] text-muted font-semibold px-1">
                    <span>15m</span>
                    <span>90m</span>
                  </div>
                </div>

                {/* Intensity Selector */}
                <div className="space-y-3">
                  <label className="text-xs font-bold text-muted uppercase tracking-wider flex items-center gap-1">
                    <Zap size={14} /> Intensity
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {INTENSITIES.map((i) => (
                      <button
                        key={i}
                        onClick={() => setIntensity(i)}
                        className={`py-3 rounded-xl text-sm font-bold transition-all border ${
                          intensity === i 
                            ? 'bg-white text-black border-white shadow-lg scale-105' 
                            : 'bg-surface text-muted border-white/5 hover:bg-white/5'
                        }`}
                      >
                        {i}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Prompt Input */}
                <div className="space-y-3">
                  <label className="text-xs font-bold text-muted uppercase tracking-wider">Focus Area</label>
                  <textarea 
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="E.g. Improve my off-ball movement and catch-and-shoot release time..."
                    className="w-full bg-surface border border-white/10 rounded-2xl p-4 text-sm focus:border-primary focus:outline-none resize-none h-32 placeholder:text-muted/50"
                  />
                </div>

                <button 
                  onClick={handleGenerate}
                  disabled={isGenerating || !prompt}
                  className="w-full bg-primary text-black font-extrabold text-lg py-4 rounded-2xl flex items-center justify-center gap-2 hover:bg-primary/90 transition-all active:scale-[0.98] disabled:opacity-50 disabled:scale-100 shadow-[0_0_20px_rgba(249,128,6,0.2)]"
                >
                  {isGenerating ? <Loader2 size={24} className="animate-spin" /> : <Sparkles size={24} />}
                  {isGenerating ? 'Analyzing & Building...' : 'Generate Workout'}
                </button>
              </div>
            ) : (
              <div className="animate-in fade-in zoom-in-95 duration-300">
                <div className="bg-surface rounded-2xl p-5 border border-white/10 max-h-[60vh] overflow-y-auto mb-4">
                   <div className="flex items-center gap-3 mb-4 border-b border-white/5 pb-4">
                      <div className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                        {duration} Min
                      </div>
                      <div className="bg-white/10 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                        {intensity} Intensity
                      </div>
                   </div>
                  <div className="prose prose-invert prose-sm text-sm">
                    {generatedDrill.split('\n').map((line, i) => (
                      <p key={i} className={`leading-relaxed ${line.startsWith('**') ? 'mt-4 mb-2 text-white font-bold text-base' : 'mb-1 text-gray-400'}`}>
                        {line.replace(/\*\*/g, '')}
                      </p>
                    ))}
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <button 
                    onClick={() => setGeneratedDrill(null)}
                    className="flex-1 py-3.5 rounded-xl bg-surface hover:bg-white/5 text-sm font-bold text-white border border-white/10 transition-colors"
                  >
                    Adjust
                  </button>
                  <button 
                    onClick={closeGenerator}
                    className="flex-1 py-3.5 rounded-xl bg-primary text-black text-sm font-bold shadow-lg shadow-primary/20 hover:bg-primary/90 transition-colors"
                  >
                    Start Drill
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
};