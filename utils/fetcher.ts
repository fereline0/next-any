export const fetcher = (url: string, init?: RequestInit) => {
  return fetch(url, init).then((r) => r.json());
};
