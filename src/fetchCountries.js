function fetchCountries(name) {
  if ((name === '')) {
    return;
  }

  return fetch(
    `https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages`
  ).then(res => res.json());
}

export {fetchCountries};
