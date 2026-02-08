import React, { useState, useRef } from 'react';
import { Target, ArrowUpCircle, Activity, CircleDashed, Camera, Image as ImageIcon, ChevronLeft, Info, X, Play, CheckCircle2, Smartphone } from 'lucide-react';

const SHOT_TYPES = [
  {
    id: '3pt',
    title: '3-Pointer',
    icon: CircleDashed,
    desc: 'Deep range mechanics'
  },
  {
    id: 'ft',
    title: 'Free Throw',
    icon: ArrowUpCircle,
    desc: 'Routine & consistency'
  },
  {
    id: 'layup',
    title: 'Layup',
    icon: Activity,
    desc: 'Finishing at the rim'
  },
  {
    id: 'mid',
    title: 'Mid-Range',
    icon: Target,
    desc: 'Pull-up jump shot'
  },
];

export const FormView: React.FC = () => {
  const [selectedShot, setSelectedShot] = useState<typeof SHOT_TYPES[0] | null>(null);
  const [showTips, setShowTips] = useState(false);
  
  const cameraInputRef = useRef<HTMLInputElement>(null);
  const galleryInputRef = useRef<HTMLInputElement>(null);

  const handleCardClick = (shot: typeof SHOT_TYPES[0]) => {
    setSelectedShot(shot);
  };

  const handleSourceSelect = (source: 'camera' | 'gallery') => {
    if (source === 'camera') {
      cameraInputRef.current?.click();
    } else {
      galleryInputRef.current?.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      // Logic to handle the file would go here
      console.log("File selected for:", selectedShot?.title);
    }
  };

  const handleBack = () => {
    setSelectedShot(null);
  };

  // RENDER: Upload Page (Sub-view)
  if (selectedShot) {
    return (
      <div className="pb-24 animate-in slide-in-from-right duration-300">
        {/* Hidden Inputs */}
        <input 
          type="file" 
          ref={cameraInputRef}
          accept="video/*"
          capture="environment"
          className="hidden"
          onChange={handleFileChange}
        />
        <input 
          type="file" 
          ref={galleryInputRef}
          accept="video/*"
          className="hidden"
          onChange={handleFileChange}
        />

        {/* Header Navigation */}
        <div className="flex items-center gap-4 mb-8 mt-2">
          <button 
            onClick={handleBack}
            className="w-10 h-10 rounded-full bg-surface border border-white/10 flex items-center justify-center hover:bg-white/5 active:scale-95 transition-all"
          >
            <ChevronLeft size={24} />
          </button>
          <div>
            <h3 className="text-xl font-extrabold tracking-tight">Upload Gameplay</h3>
            <p className="text-xs text-muted font-bold uppercase tracking-wider">{selectedShot.title}</p>
          </div>
        </div>

        {/* Main Selection Area */}
        <div className="space-y-4">
          <button 
            onClick={() => handleSourceSelect('camera')}
            className="w-full bg-surface border border-white/10 rounded-3xl p-8 flex items-center justify-between group active:scale-[0.98] transition-all hover:border-primary/50"
          >
            <div className="flex items-center gap-5">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-black transition-colors">
                <Camera size={32} />
              </div>
              <div className="text-left">
                <h4 className="text-xl font-bold mb-1">Record Video</h4>
                <p className="text-xs text-muted font-medium">Use camera to record shot</p>
              </div>
            </div>
          </button>

          <button 
            onClick={() => handleSourceSelect('gallery')}
            className="w-full bg-surface border border-white/10 rounded-3xl p-8 flex items-center justify-between group active:scale-[0.98] transition-all hover:border-primary/50"
          >
            <div className="flex items-center gap-5">
              <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center text-white group-hover:bg-white group-hover:text-black transition-colors">
                <ImageIcon size={32} />
              </div>
              <div className="text-left">
                <h4 className="text-xl font-bold mb-1">Choose from Gallery</h4>
                <p className="text-xs text-muted font-medium">Upload existing footage</p>
              </div>
            </div>
          </button>
        </div>

        {/* Instructions / Tip */}
        <div className="mt-8 p-6 rounded-2xl bg-blue-500/5 border border-blue-500/10">
          <h5 className="text-sm font-bold text-blue-400 mb-2">Pro Tip</h5>
          <p className="text-xs text-muted leading-relaxed">
            For the best analysis, ensure your full body is visible in the frame and record from a side or front angle.
          </p>
        </div>

      </div>
    );
  }

  // RENDER: Main Selection Carousel
  return (
    <div className="pb-24 animate-in fade-in duration-500 min-h-[80vh]">
      <div className="mt-2 px-1">
         <h3 className="text-2xl font-extrabold tracking-tight mb-2">Analyze Form</h3>
         <p className="text-muted text-sm font-medium mb-6">Select a shot type to begin analysis</p>
         
         {/* Carousel */}
         <div className="flex overflow-x-auto gap-4 pb-8 -mx-6 px-6 no-scrollbar snap-x snap-mandatory">
            {SHOT_TYPES.map((type) => {
              return (
                <div 
                  key={type.id}
                  onClick={() => handleCardClick(type)}
                  className={`
                    relative min-w-[200px] h-[280px] rounded-3xl p-6 flex flex-col justify-between snap-center cursor-pointer transition-all duration-300 border
                    bg-surface border-white/10 hover:border-primary/50 hover:bg-white/5 active:scale-95
                  `}
                >
                  <div className="w-14 h-14 rounded-full flex items-center justify-center bg-white/5 text-white">
                     <type.icon size={28} />
                  </div>

                  <div>
                    <h4 className="text-3xl font-extrabold leading-none mb-3 text-white">
                      {type.title}
                    </h4>
                    <p className="text-xs font-bold uppercase tracking-wider text-muted">
                      {type.desc}
                    </p>
                  </div>
                </div>
              );
            })}
         </div>

         {/* Recording Tips Button */}
         <div className="mt-4 px-1">
            <button 
              onClick={() => setShowTips(true)}
              className="w-full bg-[#1a1a1a] border border-white/5 rounded-2xl p-4 flex items-center justify-between group hover:bg-white/5 hover:border-primary/30 transition-all"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-blue-500/10 text-blue-500 flex items-center justify-center">
                  <Info size={20} />
                </div>
                <div className="text-left">
                  <h4 className="font-bold text-sm text-white">Recording Tips</h4>
                  <p className="text-[10px] text-muted font-bold uppercase tracking-wide">How to get accurate results</p>
                </div>
              </div>
              <ChevronLeft size={16} className="rotate-180 text-muted group-hover:text-white transition-colors" />
            </button>
         </div>
      </div>

      {/* Recording Tips Modal */}
      {showTips && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setShowTips(false)}></div>
          
          <div className="relative bg-[#141414] w-full max-w-lg rounded-3xl border border-white/10 p-6 shadow-2xl animate-in zoom-in-95 fade-in duration-300 max-h-[90vh] overflow-y-auto no-scrollbar">
            
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-extrabold text-lg tracking-tight flex items-center gap-2">
                <Camera size={20} className="text-primary" />
                Recording Tips
              </h3>
              <button onClick={() => setShowTips(false)} className="p-2 bg-white/5 rounded-full hover:bg-white/10">
                <X size={20} />
              </button>
            </div>

            {/* Example Video Simulation */}
            <div className="relative w-full aspect-video bg-black rounded-2xl overflow-hidden mb-6 border border-white/10 group cursor-pointer">
               <img 
                 src="https://images.unsplash.com/photo-1519861531473-92002639313a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                 alt="Basketball Form Example" 
                 className="w-full h-full object-cover opacity-60 group-hover:opacity-40 transition-opacity"
               />
               <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-primary/90 text-black flex items-center justify-center shadow-[0_0_30px_rgba(249,128,6,0.4)] transition-transform group-hover:scale-110">
                    <Play size={24} fill="currentColor" />
                  </div>
               </div>
               <div className="absolute bottom-3 right-3 bg-black/80 px-2 py-1 rounded text-[10px] font-bold">0:15 Example</div>
            </div>

            {/* Checklist */}
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="mt-1">
                  <CheckCircle2 size={20} className="text-green-500" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-white">Full Body Visibility</h4>
                  <p className="text-xs text-muted mt-1 leading-relaxed">Ensure the camera captures you from head to toe, including the jump and landing.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="mt-1">
                  <CheckCircle2 size={20} className="text-green-500" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-white">Side Profile Angle</h4>
                  <p className="text-xs text-muted mt-1 leading-relaxed">Record from a 90-degree side angle for the best analysis of your release point and elbow alignment.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="mt-1">
                  <CheckCircle2 size={20} className="text-green-500" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-white">Stable Camera</h4>
                  <p className="text-xs text-muted mt-1 leading-relaxed">Prop your phone against a water bottle or use a tripod. Shaky footage reduces accuracy.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="mt-1">
                  <Smartphone size={20} className="text-primary" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-white">Vertical or Horizontal?</h4>
                  <p className="text-xs text-muted mt-1 leading-relaxed">Either works, but vertical is usually easier for full-body framing when solo.</p>
                </div>
              </div>
            </div>

            <button 
              onClick={() => setShowTips(false)}
              className="w-full mt-8 bg-surface border border-white/10 hover:bg-white/5 text-white font-bold py-3.5 rounded-xl transition-colors text-sm"
            >
              Got it
            </button>

          </div>
        </div>
      )}
    </div>
  );
};