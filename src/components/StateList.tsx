import React from 'react';
import { ElectionData } from '../types';

interface Props {
  data: ElectionData;
  onStateClick: (stateId: string) => void;
}

export function StateList({ data, onStateClick }: Props) {
  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h2 className="text-xl font-bold mb-4">States</h2>
      <div className="space-y-2 max-h-[440px] overflow-y-auto">
        {Object.entries(data).map(([id, state]) => (
          <button
            key={id}
            onClick={() => onStateClick(id)}
            className={`w-full text-left p-2 rounded-md transition-colors ${
              state.winner === 'democrat'
                ? 'bg-blue-100 hover:bg-blue-200'
                : state.winner === 'republican'
                ? 'bg-red-100 hover:bg-red-200'
                : 'bg-gray-100 hover:bg-gray-200'
            }`}
          >
            <div className="font-medium">{state.name}</div>
            <div className="text-sm text-gray-600">
              {state.electoralVotes} electoral votes
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}