<script lang="ts">
  import { onMount } from 'svelte';
  import { getCurrencyOfCountry, getUserCountryName } from './api/country';
  import { getCurrenciesList, getRates } from './api/currency';
  import type { Currencies, CurrencyRates } from './currency';
  import { round } from './utils/round';

  function calculate(id: string) {
    if (id === 'amount') {
      const digits = currencies[currency2].decimal_digits;
      amount2 = round(amount1 * rates[currency2].value, digits);
    } else {
      const digits = currencies[currency1].decimal_digits;
      amount1 = round(amount2 / rates[currency2].value, digits);
    }
  }

  let amount1 = 0;
  let amount2 = 0;
  let currency1: string;
  let currency2: string;
  let currencies: Currencies = {};
  let rates: CurrencyRates = {};

  onMount(async () => {
    const country = await getUserCountryName();

    currencies = await getCurrenciesList();
    if (!currencies) return;
    currency1 =
      ((await getCurrencyOfCountry(country)) as string) || currencies[0].code;
    currency2 = 'USD';
    rates = await getRates(currency1);
  });

  const callbacks = {
    handleAmount: (event: Event) => {
      const inputElement = event.target as HTMLInputElement;
      calculate(inputElement.id);
    },
    handleCurrency: async (event: Event) => {
      const inputElement = event.target as HTMLInputElement;
      if (inputElement.id === 'curr1') {
        rates = await getRates(currency1);
      }
      calculate(inputElement.id);
    },
  };
</script>

<h1>Currency converter</h1>
<form class="exchange-form">
  <fieldset class="form-group">
    <label class="label" for="amount">Currency 1:</label>
    <select
      class="combobox"
      id="curr1"
      name="curr1"
      bind:value={currency1}
      on:change={callbacks.handleCurrency}
    >
      {#each Object.values(currencies) as currency}
        <option value={currency.code}>{currency.code} - {currency.name}</option>
      {/each}
    </select>
    <span class="symbol">{currencies[currency1]?.symbol}</span>
    <input
      class="input"
      type="number"
      id="amount"
      name="amount"
      min="0"
      bind:value={amount1}
      on:input={callbacks.handleAmount}
    />
  </fieldset>
  <fieldset class="form-group">
    <label class="label" for="amount2">Currency 2:</label>
    <select
      class="combobox"
      id="curr2"
      name="curr2"
      bind:value={currency2}
      on:change={callbacks.handleCurrency}
    >
      {#each Object.values(currencies) as currency}
        <option value={currency.code}>{currency.code} - {currency.name}</option>
      {/each}
    </select>
    <span class="symbol">{currencies[currency2]?.symbol}</span>
    <input
      class="input"
      type="number"
      id="amount2"
      name="amount2"
      min="0"
      bind:value={amount2}
      on:input={callbacks.handleAmount}
    />
  </fieldset>
</form>

<style>
  .label {
    margin-right: 20px;
  }

  .combobox {
    min-width: 300px;
  }

  .exchange-form {
    display: flex;
    flex-direction: column;
  }

  .form-group {
    border: none;
    margin-bottom: 0.5rem;
  }

  .symbol {
    display: inline-block;
    width: 50px;
  }
</style>
