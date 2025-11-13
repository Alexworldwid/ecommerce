export const getCachedData = <T>(key: string): T[] => {
  if (typeof window === 'undefined') return []; // avoid SSR error
  const data = localStorage.getItem(key);
  return data ? (JSON.parse(data)) : [];
};

export const setCachedData = <T = unknown>(key: string, value: T[]): void => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(key, JSON.stringify(value));
};
