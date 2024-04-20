export async function getRates(base: string = '') {
  const url = `https://api.currencyapi.com/v3/latest?apikey=cur_live_ikSgIX3s0TnO3Ky9dxe406oxBcYu4GyYECWy8TXF&base_currency=${base}`;
  const response = await fetch(url, {
    headers: {
      apiKey: 'cur_live_ikSgIX3s0TnO3Ky9dxe406oxBcYu4GyYECWy8TXF',
    },
  });
  if (!response.ok) return null;
  const result = await response.json();
  return result.data;
}

export async function getCurrenciesList() {
  const response = await fetch('https://api.currencyapi.com/v3/currencies', {
    headers: {
      apiKey: 'cur_live_ikSgIX3s0TnO3Ky9dxe406oxBcYu4GyYECWy8TXF',
    },
  });
  if (!response.ok) return [];
  const result = await response.json();
  return result.data;
}
