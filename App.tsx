import React, { useState, useEffect } from 'react';
import { AppStep, MatchConfig, MatchState, Team, UserRole } from './types';
import Home from './components/Home';
import MatchSetup from './components/MatchSetup';
import PlayerSetup from './components/PlayerSetup';
import ScoringDashboard from './components/ScoringDashboard';
import Summary from './components/Summary';
import { Trophy, ShieldCheck, Eye, Wifi } from 'lucide-react';

const App: React.FC = () => {
  const [step, setStep] = useState<AppStep>('HOME');
  const [matchConfig, setMatchConfig] = useState<MatchConfig | null>(null);
  const [matchState, setMatchState] = useState<MatchState | null>(null);

  const handleStartMatch = (teams: Team[], role: UserRole = 'scorer') => {
    if (matchConfig) {
      setMatchState({
        config: matchConfig,
        teams,
        currentInnings: 0,
        strikerIndex: 0,
        nonStrikerIndex: 1,
        bowlerIndex: 0,
        isMatchOver: false,
        history: [],
        role: role,
        battingTeamIndex: 0,
        bowlingTeamIndex: 1,
        isSuperOver: false,
        superOverCount: 0,
        completedSegments: [],
      });
      setStep('SCORING');
    }
  };

  const resetApp = () => {
    setStep('HOME');
    setMatchConfig(null);
    setMatchState(null);
  };

  const handleJoinMatch = (roomKey: string) => {
    setMatchConfig({ roomKey, totalTeams: 2, wicketsPerInnings: 10, oversPerInnings: 20 });
    
    const mockTeams: Team[] = [
      { 
        id: 't1', 
        name: 'Warriors XI', 
        totalRuns: 156, 
        totalWickets: 4, 
        totalOvers: 20, 
        totalBalls: 120,
        players: Array.from({ length: 11 }, (_, i) => ({
          id: `p1-${i}`, name: `Warrior ${i+1}`, runs: i === 0 ? 45 : (i === 1 ? 22 : 0), balls: i === 0 ? 30 : (i === 1 ? 15 : 0), 
          fours: 0, sixes: 0, isOut: i > 1 && i < 6, wickets: 0, runsConceded: 0, oversBowled: 0, maidens: 0
        }))
      },
      { 
        id: 't2', 
        name: 'Strikers CC', 
        totalRuns: 84, 
        totalWickets: 2, 
        totalOvers: 12, 
        totalBalls: 74,
        players: Array.from({ length: 11 }, (_, i) => ({
          id: `p2-${i}`, name: `Striker ${i+1}`, runs: i === 0 ? 35 : (i === 1 ? 40 : 0), balls: i === 0 ? 30 : (i === 1 ? 38 : 0), 
          fours: 0, sixes: 0, isOut: false, wickets: 0, runsConceded: 12, oversBowled: 2, maidens: 0
        }))
      }
    ];

    setMatchState({
      config: { roomKey, totalTeams: 2, wicketsPerInnings: 10, oversPerInnings: 20 },
      teams: mockTeams,
      currentInnings: 1,
      strikerIndex: 0,
      nonStrikerIndex: 1,
      bowlerIndex: 0,
      isMatchOver: false,
      history: [],
      role: 'viewer',
      battingTeamIndex: 1,
      bowlingTeamIndex: 0,
      isSuperOver: false,
      superOverCount: 0,
      completedSegments: [],
    });
    setStep('SCORING');
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <header className="cricket-gradient text-white p-4 shadow-lg sticky top-0 z-50 border-b-4 border-black/10">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3 cursor-pointer group" onClick={resetApp}>
            <div className="bg-white/20 p-2 rounded-xl group-hover:scale-110 transition-transform">
              <Trophy className="w-8 h-8 text-yellow-400 fill-yellow-400" />
            </div>
            <h1 className="text-2xl font-black tracking-tighter">CRIC<span className="text-yellow-400">PRO</span></h1>
          </div>
          {matchState && (
            <div className="flex items-center gap-4">
              <div className="hidden md:flex items-center gap-2 bg-black/40 px-4 py-1.5 rounded-full border border-white/10 shadow-inner">
                {matchState.role === 'scorer' ? (
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                ) : (
                  <Wifi className="w-4 h-4 text-blue-400 animate-pulse" />
                )}
                <span className="text-[10px] font-black uppercase tracking-[0.2em]">
                  {matchState.role === 'scorer' ? 'Official Scorer' : 'Live Viewer'}
                </span>
              </div>
              <div className="bg-white text-slate-900 px-5 py-1.5 rounded-full text-xs font-black shadow-lg border-2 border-white/20">
                ROOM: {matchState.config.roomKey}
              </div>
            </div>
          )}
        </div>
      </header>

      <main className="flex-1 w-full max-w-6xl mx-auto p-4 md:p-8">
        {step === 'HOME' && (
          <Home 
            onCreateRoom={(key) => {
              setMatchConfig({ roomKey: key, totalTeams: 2, wicketsPerInnings: 10, oversPerInnings: 20 });
              setStep('CONFIG');
            }}
            onJoinRoom={handleJoinMatch}
          />
        )}

        {step === 'CONFIG' && matchConfig && (
          <MatchSetup 
            config={matchConfig} 
            onUpdateConfig={(updated) => setMatchConfig(updated)}
            onNext={() => setStep('PLAYERS')}
          />
        )}

        {step === 'PLAYERS' && matchConfig && (
          <PlayerSetup 
            config={matchConfig}
            onComplete={(teams) => handleStartMatch(teams, 'scorer')}
          />
        )}

        {step === 'SCORING' && matchState && (
          <ScoringDashboard 
            matchState={matchState} 
            setMatchState={setMatchState}
            onFinish={() => setStep('SUMMARY')}
          />
        )}

        {step === 'SUMMARY' && matchState && (
          <Summary matchState={matchState} onRestart={resetApp} />
        )}
      </main>

      <footer className="bg-white border-t p-6 text-center text-slate-400 text-[10px] font-black uppercase tracking-[0.3em]">
        CricPro © {new Date().getFullYear()} • Professional Match Engine
      </footer>
    </div>
  );
};

export default App;
