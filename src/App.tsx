import React, { useState } from 'react';
import { PartyPopper } from 'lucide-react';
import { ElectoralCount } from './components/ElectoralCount';
import { StateList } from './components/StateList';
import { USMap } from './components/USMap';
import { electionData } from './data/electionData';
import type { ElectionData } from './types';

export function App() {
  const [data, setData] = useState<ElectionData>(electionData);

  const handleStateClick = (stateId: string) => {
    setData(prev => {
      const state = prev[stateId];
      let newWinner = state.winner === 'undecided' 
        ? 'democrat' 
        : state.winner === 'democrat' 
          ? 'republican' 
          : 'undecided';

      return {
        ...prev,
        [stateId]: { ...state, winner: newWinner }
      };
    });
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
              2024 Election Tracker
              <PartyPopper className="w-8 h-8 text-yellow-500" />
            </h1>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8">
          <ElectoralCount data={data} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3 bg-white rounded-lg shadow-md p-4">
            <div className="w-full h-[500px]">
              <USMap
                data={data}
                onStateClick={handleStateClick}
              />
            </div>
          </div>
          <div>
            <StateList
              data={data}
              onStateClick={handleStateClick}
            />
          </div>
        </div>
      </main>
    </div>
  );
}