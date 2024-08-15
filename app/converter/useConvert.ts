import { useState } from "react";
import { Rate } from "./types";

function useConvert({ rates }: { rates: Rate[] }) {
  async function convertCurrency({
    from,
    to,
    amount,
  }: {
    from: string;
    to: string;
    amount: number;
  }) {
    const url = `https://api.currencybeacon.com/v1/convert?api_key=NHKNUhI53ZApF4IXCOX1DpUj2YTSl2U1&from=${from}&to=${to}&amount=${amount}`;

    try {
      const response = await fetch(url);
      // Check if the response is ok (status in the range 200-299)
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      // Parse the JSON response
      const data = await response.json();
      const res = data.value.toFixed(4) || NaN;
      setConvertRes(res);
      return data;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  let keys = Object.keys(rates);
  keys = keys.filter((key) => Number(key) > -1);
  const formatRates = keys.map((key) => rates[Number(key)]);
  const removeSelectedRate = (id: number) => {
    const result = formatRates.filter((rate) => rate.id !== id);
    return result;
  };
  const [convertRes, setConvertRes] = useState<string>();
  const [currencyFrom, setCurrencyFrom] = useState<Rate>(rates[0]);
  const [currencyTo, setCurrencyTo] = useState<Rate>(rates[1]);
  const [amountToConvert, setamountToConvert] = useState<number>();
  removeSelectedRate(currencyFrom.id);
  const [currenciesFrom, setCurrenciesFrom] = useState<Rate[]>(
    removeSelectedRate(currencyFrom.id)
  );
  const [currenciesTo, setCurrenciesTo] = useState<Rate[]>(
    removeSelectedRate(currencyTo.id)
  );
  return {
    convertRes,
    convertCurrency,
    formatRates,
    setCurrencyTo,
    setCurrenciesTo,
    removeSelectedRate,
    currenciesFrom,
    setCurrenciesFrom,
    currenciesTo,
    useConvert,
    currencyTo,
    currencyFrom,
    setCurrencyFrom,
    amountToConvert,
    setamountToConvert,
  };
}

export default useConvert;
