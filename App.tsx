import React, { useState } from 'react';
import { Header } from './components/Header';
import { StatCard } from './components/StatCard';
import { ActionBanner } from './components/ActionBanner';
import { SessionList } from './components/SessionList';
import { BottomNav } from './components/BottomNav';
import { DrillsView } from './components/DrillsView';
import { FormView } from './components/FormView';
import { ProfileView } from './components/ProfileView';
import { AddView } from './components/AddView';
import { Session, ViewType } from './types';

// Mock Data
const recentSessions: Session[] = [
  {
    id: '1',
    title: 'Three-Point Drill',
    timestamp: '15M AGO',
    score: '82%',
    accuracy: 82
  },
  {
    id: '2',
    title: 'Free Throw Practice',
    timestamp: '2H AGO',
    score: '94%',
    accuracy: 94
  },
  {
    id: '3',
    title: 'Mid-Range Shooting',
    timestamp: 'YESTERDAY',
    score: '68%',
    accuracy: 68
  }
];

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewType>('home');

  const renderContent = () => {
    switch (currentView) {
      case 'add':
        return <AddView onNavigate={setCurrentView} />;
      case 'profile':
        return <ProfileView />;
      case 'drills':
        return <DrillsView />;
      case 'form':
        return <FormView />;
      case 'home':
      default:
        return (
          <div className="animate-in fade-in duration-500">
            {/* Performance Header */}
            <div className="flex items-center justify-between mb-6 mt-2">
              <h3 className="text-2xl font-extrabold tracking-tight">Today's Performance</h3>
              <span className="text-xs text-primary font-black uppercase tracking-widest bg-primary/10 px-3 py-1 rounded-full">Oct 24</span>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4">
              <StatCard 
                label="Accuracy" 
                value="74" 
                unit="%" 
                highlight={true} 
                fullWidth={true} 
              />
              <StatCard 
                label="Goals" 
                value="8" 
                subValue="/10" 
              />
              <StatCard 
                label="Time" 
                value="45" 
                unit="M" 
              />
            </div>

            <ActionBanner />

            <SessionList sessions={recentSessions} />
          </div>
        );
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-background text-white max-w-md mx-auto shadow-2xl overflow-hidden relative">
      
      {currentView === 'home' && <Header />}

      <main className={`flex-1 px-6 overflow-y-auto no-scrollbar pb-24 ${currentView !== 'home' ? 'pt-8' : ''}`}>
        {renderContent()}
      </main>

      <BottomNav currentView={currentView} onNavigate={setCurrentView} />
      
    </div>
  );
};

export default App;