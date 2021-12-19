async function fetcher(url, tokenHeaders) {
  try {
    const res = await fetch(url, {
      method: "GET",
      body: null,
      headers: tokenHeaders ? tokenHeaders.headers : "",
    });
    if (!res.ok) {
      const error = new Error("An error ocurred while fetching the data");
      error.info = await res.json();
      error.status = res.status;
      throw error;
    }
    return await res.json();
  } catch (e) {
    return null;
  }
}

export { fetcher };
