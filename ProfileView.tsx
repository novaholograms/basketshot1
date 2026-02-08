import React from 'react';
import { Settings, Shield, HelpCircle, LogOut, Trash2, ChevronRight, Star, Mail, Edit2 } from 'lucide-react';

const FAVORITE_DRILLS = [
  {
    id: 1,
    title: "3-Point Shooting",
    duration: "20 min",
    intensity: "High"
  },
  {
    id: 3,
    title: "Handles",
    duration: "30 min",
    intensity: "Med"
  }
];

export const ProfileView: React.FC = () => {
  return (
    <div className="pb-24 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Header */}
      <div className="mt-2 px-1 flex justify-between items-end mb-6">
         <div>
            <h3 className="text-2xl font-extrabold tracking-tight mb-2">My Profile</h3>
            <p className="text-muted text-sm font-medium">Manage your account & stats</p>
         </div>
         <button className="w-10 h-10 rounded-full bg-surface border border-white/10 flex items-center justify-center hover:bg-white/5 transition-colors">
            <Settings size={20} className="text-white" />
         </button>
      </div>

      {/* Profile Card */}
      <section className="mb-8">
        <div className="bg-surface rounded-3xl p-6 border border-white/5 relative overflow-hidden">
          
          {/* Edit Button - Top Right */}
          <button className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white hover:bg-primary hover:text-black transition-colors z-20">
             <Edit2 size={16} />
          </button>

          <div className="flex flex-col items-center text-center relative z-10">
            <div className="relative mb-4">
                <div className="w-24 h-24 rounded-full p-1 border-2 border-primary/50">
                    <img 
                        src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80" 
                        alt="Profile" 
                        className="w-full h-full rounded-full object-cover"
                    />
                </div>
            </div>
            
            <h2 className="text-2xl font-extrabold tracking-tight mb-1">Jordan Carter</h2>
            <div className="flex items-center gap-2 text-muted text-sm font-medium mb-4">
                <Mail size={14} />
                <span>jordan.carter@example.com</span>
            </div>

            <div className="flex gap-2">
                <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                    Pro Member
                </span>
            </div>
          </div>
        </div>
      </section>

      {/* Favorite Drills */}
      <section className="mb-8">
        <h4 className="text-lg font-bold mb-4 px-1 flex items-center gap-2">
            <Star size={18} className="text-primary" fill="currentColor" />
            Favorite Drills
        </h4>
        <div className="space-y-3">
            {FAVORITE_DRILLS.map((drill) => (
                <div key={drill.id} className="bg-surface p-4 rounded-2xl border border-white/5 flex items-center justify-between group cursor-pointer hover:border-primary/30 transition-colors">
                    <div>
                        <h5 className="font-bold text-sm mb-1">{drill.title}</h5>
                        <div className="flex items-center gap-2 text-[10px] text-muted font-bold uppercase tracking-wider">
                            <span>{drill.duration}</span>
                            <span className="w-1 h-1 rounded-full bg-white/20"></span>
                            <span>{drill.intensity} Intensity</span>
                        </div>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-primary group-hover:text-black transition-colors">
                        <ChevronRight size={16} />
                    </div>
                </div>
            ))}
        </div>
      </section>

      {/* Settings & Support */}
      <section className="mb-8">
        <h4 className="text-lg font-bold mb-4 px-1">Privacy & Support</h4>
        <div className="bg-surface rounded-3xl overflow-hidden border border-white/5">
            <button className="w-full p-4 flex items-center justify-between hover:bg-white/5 transition-colors border-b border-white/5 text-left">
                <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-blue-500/10 text-blue-500 flex items-center justify-center">
                        <Shield size={20} />
                    </div>
                    <span className="font-bold text-sm">Privacy Policy</span>
                </div>
                <ChevronRight size={16} className="text-muted" />
            </button>
            <button className="w-full p-4 flex items-center justify-between hover:bg-white/5 transition-colors text-left">
                <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-purple-500/10 text-purple-500 flex items-center justify-center">
                        <HelpCircle size={20} />
                    </div>
                    <span className="font-bold text-sm">Help & Support</span>
                </div>
                <ChevronRight size={16} className="text-muted" />
            </button>
        </div>
      </section>

      {/* Account Actions */}
      <section>
        <div className="space-y-3">
            <button className="w-full p-4 rounded-2xl border border-white/5 flex items-center justify-between hover:bg-white/5 transition-colors group text-left">
                <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-white/5 text-white flex items-center justify-center group-hover:text-red-400 transition-colors">
                        <LogOut size={20} />
                    </div>
                    <span className="font-bold text-sm group-hover:text-red-400 transition-colors">Log Out</span>
                </div>
            </button>

            <button className="w-full p-4 rounded-2xl border border-red-500/10 flex items-center justify-between hover:bg-red-500/10 transition-colors group text-left">
                <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-red-500/10 text-red-500 flex items-center justify-center">
                        <Trash2 size={20} />
                    </div>
                    <div className="flex flex-col">
                        <span className="font-bold text-sm text-red-500">Delete Account</span>
                        <span className="text-[10px] text-muted font-medium">This action cannot be undone</span>
                    </div>
                </div>
            </button>
        </div>
      </section>

    </div>
  );
};