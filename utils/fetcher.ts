export default async (
  url: string,
  searchParams?: URLSearchParams,
  init?: RequestInit,
): Promise<Response> => {
  const fullUrl = searchParams ? `${url}?${searchParams.toString()}` : url;
  return fetch(fullUrl, init);
};
