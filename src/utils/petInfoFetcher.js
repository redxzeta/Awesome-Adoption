async function fetcher(url, tokenHeaders) {
  const res = await fetch(url, {
    method: "GET",
    body: null,
    ...tokenHeaders,
  });
  if (!res.ok) {
    const error = new Error("An error occurred while fetching the data.");
    // Attach extra info to the error object.
    error.info = await res.json();
    error.status = res.status;
    throw error;
  }
  const data = await res.json();
  if (data.animal) {
    return data.animal;
  }
  if (data.animals) {
    return data.animals[0];
  }
}
const multipleFetcher = (urls, tokenHeaders) => {
  if (urls.length === 0) return [];
  if (urls.length > 1) {
    return Promise.all(urls.map((u) => fetcher(u, tokenHeaders)));
  }
  return [fetcher(urls, tokenHeaders)];
};

export { fetcher, multipleFetcher };
