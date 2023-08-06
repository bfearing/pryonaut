export async function getAstros() {
  const options = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const requestUrl = `http://api.open-notify.org/astros.json`;

  const response = await fetch(requestUrl, options);
  const astros = await response.json();

  return astros;
}
