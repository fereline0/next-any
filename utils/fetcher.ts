export default (url: string, init?: RequestInit) => {
  return fetch(url, init).then((r) => {
    if (r.status === 204) {
      return null;
    }
    return r.json();
  });
};
