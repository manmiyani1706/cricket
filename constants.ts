
export const DEFAULT_CONFIG = {
  totalTeams: 2,
  wicketsPerInnings: 10,
  oversPerInnings: 20,
};

export const RUN_BUTTONS = [
  { label: '0', value: 0, color: 'bg-slate-200 text-slate-800 hover:bg-slate-300' },
  { label: '1', value: 1, color: 'bg-blue-500 text-white hover:bg-blue-600' },
  { label: '2', value: 2, color: 'bg-blue-600 text-white hover:bg-blue-700' },
  { label: '3', value: 3, color: 'bg-blue-700 text-white hover:bg-blue-800' },
  { label: '4', value: 4, color: 'bg-emerald-300 text-slate-900 font-bold hover:bg-emerald-400' },
  { label: '6', value: 6, color: 'bg-emerald-800 text-white font-bold hover:bg-emerald-900' },
];

export const EXTRA_BUTTONS = [
  { label: 'Wicket', type: 'wicket', color: 'bg-rose-600 text-white ring-rose-200 hover:bg-rose-700' },
  { label: 'No Ball', type: 'noball', color: 'bg-amber-500 text-white ring-amber-200 hover:bg-amber-600' },
  { label: 'Dead Ball', type: 'deadball', color: 'bg-slate-500 text-white ring-slate-200 hover:bg-slate-600' },
  { label: 'Wide', type: 'wide', color: 'bg-cyan-500 text-white ring-cyan-200 hover:bg-cyan-600' },
];
