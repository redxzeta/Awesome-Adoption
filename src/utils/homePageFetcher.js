async function fetcher(url, tokenHeaders) {
  try {
    const res = await fetch(url, {
      method: "GET",
      body: null,
      headers: tokenHeaders ? tokenHeaders.headers : "",
    });
    const data = await res.json();
    return data.animals;
  } catch (e) {
    return e.message;
  }
}

export { fetcher };
