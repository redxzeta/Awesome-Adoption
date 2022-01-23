async function fetcher(url, tokenHeaders) {
  const res = await fetch(url, {
    method: "GET",
    body: null,
    headers: tokenHeaders ? tokenHeaders.headers : "",
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

export { fetcher };
