async function fetcher(url, tokenHeaders) {
  try {
    const res = await fetch(url, {
      method: "GET",
      body: null,
      headers: tokenHeaders ? tokenHeaders.headers : "",
    });
    const data = await res.json();
    if (data.animal) {
      return data.animal;
    }
    if (data.animals) {
      return data.animals[0];
    }
  } catch (e) {
    return null;
  }
}

export { fetcher };
