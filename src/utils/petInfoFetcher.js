async function fetcher(url, tokenHeaders) {
  try {
    const res = await fetch(url, {
      method: "GET",
      body: null,
      headers: tokenHeaders ? tokenHeaders.headers : "",
    });
    const data = await res.json();
    return data.animal;
  } catch (e) {
    return null;
  }
}

export { fetcher };
