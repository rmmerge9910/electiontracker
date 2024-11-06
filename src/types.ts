export type Winner = 'democrat' | 'republican' | 'undecided';

export interface StateData {
  name: string;
  electoralVotes: number;
  winner: Winner;
}

export interface ElectionData {
  [stateId: string]: StateData;
}