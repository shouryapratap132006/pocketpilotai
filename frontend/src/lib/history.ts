export interface HistoryEntry {
  id: string;
  date: string;
  income: number;
  expenses: Record<string, number>;
  goal: string;
  savings: number;
  analysis: string;
  advice: string;
  savings_plan: string;
}

const STORAGE_KEY = 'pocketpilot_history';

export function getHistory(): HistoryEntry[] {
  if (typeof window === 'undefined') return [];
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
}

export function saveToHistory(entry: Omit<HistoryEntry, 'id' | 'date'>): HistoryEntry {
  const history = getHistory();
  const newEntry: HistoryEntry = {
    ...entry,
    id: Date.now().toString(),
    date: new Date().toISOString(),
  };
  history.push(newEntry);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
  return newEntry;
}

export function deleteHistoryEntry(id: string): void {
  const history = getHistory();
  const filtered = history.filter(entry => entry.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
}

export function clearHistory(): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify([]));
}

export function formatDate(isoString: string): string {
  const date = new Date(isoString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}
