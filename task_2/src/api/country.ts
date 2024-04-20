export async function getUserCountryName() {
  const response = await fetch('https://get.geojs.io/v1/ip/geo.json');
  if (!response) return null;
  const result = await response.json();
  return result.country;
}

export async function getCurrencyOfCountry(countryName: string) {
  const response = await fetch(
    `https://restcountries.com/v3.1/name/${countryName}`
  );
  if (!response) return null;
  const result = await response.json();
  return Object.keys(result[0].currencies)[0];
}
