import React from 'react';
import { ElectionData } from '../types';

interface Props {
  data: ElectionData;
}

export function ElectoralCount({ data }: Props) {
  const counts = Object.values(data).reduce(
    (acc, state) => {
      if (state.winner === 'democrat') {
        acc.democrat += state.electoralVotes;
      } else if (state.winner === 'republican') {
        acc.republican += state.electoralVotes;
      }
      return acc;
    },
    { democrat: 0, republican: 0 }
  );

  return (
    <div className="grid grid-cols-2 gap-4 text-center">
      <div className="bg-blue-100 p-4 rounded-lg">
        <h2 className="text-xl font-bold text-blue-700">Democratic</h2>
        <p className="text-3xl font-bold text-blue-600">{counts.democrat}</p>
      </div>
      <div className="bg-red-100 p-4 rounded-lg">
        <h2 className="text-xl font-bold text-red-700">Republican</h2>
        <p className="text-3xl font-bold text-red-600">{counts.republican}</p>
      </div>
    </div>
  );
}