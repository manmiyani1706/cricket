export interface Player {
  id: string;
  name: string;
  runs: number;
  balls: number;
  fours: number;
  sixes: number;
  isOut: boolean;
  wickets: number;
  runsConceded: number;
  oversBowled: number;
  maidens: number;
}

export interface Team {
  id: string;
  name: string;
  players: Player[];
  totalRuns: number;
  totalWickets: number;
  totalOvers: number;
  totalBalls: number;
}

export interface MatchConfig {
  roomKey: string;
  totalTeams: number;
  wicketsPerInnings: number;
  oversPerInnings: number;
}

export type UserRole = 'scorer' | 'viewer';

export interface MatchSegment {
  name: string;
  teams: Team[];
  history: BallEvent[];
  config: MatchConfig;
}

export interface MatchState {
  config: MatchConfig;
  teams: Team[];
  currentInnings: number; // 0 or 1
  strikerIndex: number;
  nonStrikerIndex: number;
  bowlerIndex: number;
  isMatchOver: boolean;
  history: BallEvent[];
  role: UserRole;
  battingTeamIndex: number;
  bowlingTeamIndex: number;
  isSuperOver: boolean;
  superOverCount: number;
  completedSegments: MatchSegment[];
}

export interface BallEvent {
  type: 'run' | 'wicket' | 'noball' | 'wide' | 'deadball';
  value: number;
  batsmanId: string;
  bowlerId: string;
  over: number;
  ball: number;
  isLegal: boolean;
}

export type AppStep = 'HOME' | 'CONFIG' | 'PLAYERS' | 'TOSS' | 'SCORING' | 'SUMMARY';
