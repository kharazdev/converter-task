"use client";
import React, { useState } from "react";
import "./style.css";

interface Rate {
  name: string;
  id: number;
}
const Converter = ({ rates }: { rates: Rate[] }) => {
  let keys = Object.keys(rates);
  keys = keys.filter((key) => Number(key) > -1);

  const formatRates = keys.map((key) => rates[Number(key)]);

  const removeSelectedRate = (id: number) => {
    const result = formatRates.filter((rate) => rate.id !== id);
    return result;
  };

  const [currencyFrom, setCurrencyfrom] = useState<Rate>(rates[0]);
  const [currencyTo, setCurrencyTo] = useState<Rate>(rates[1]);
  removeSelectedRate(currencyFrom.id);
  const [currenciesFrom, setCurrenciesFrom] = useState<Rate[]>(
    removeSelectedRate(currencyFrom.id)
  );
  const [currenciesTo, setCurrenciesTo] = useState<Rate[]>(
    removeSelectedRate(currencyTo.id)
  );

  console.log(
    1,
    formatRates.filter((rate) => rate.id === 161)
  );

  return (
    <div className="converter">
      <h2>From:</h2>
      <select
        onChange={async (e) => {
          const value = e.target.value;
          const rate = formatRates.filter((rate) => rate.id === Number(value));
          setCurrencyTo(rate[0]);
          setCurrenciesTo(removeSelectedRate(Number(value)));
        }}
      >
        {currenciesFrom.map((rate: any) => {
          return (
            <option key={rate.id} value={rate.id}>
              {rate.name}
            </option>
          );
        })}
      </select>
      <h2 className="mt-3">To:</h2>
      <select
        onChange={async (e) => {
          const value = e.target.value;
          const rate = formatRates.filter((rate) => rate.id === Number(value));
          setCurrencyTo(rate[0]);
          setCurrenciesFrom(removeSelectedRate(Number(value)));
        }}
      >
        {currenciesTo.map((rate: any) => {
          return (
            <option key={rate.id} value={rate.id}>
              {rate.name}
            </option>
          );
        })}
      </select>

      <h2 className="mt-3">Amount:</h2>
      <input type="number" />
    </div>
  );
};

export default Converter;
