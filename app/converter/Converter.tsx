"use client";
import React from "react";
import "./style.css";
import useConvert from "./useConvert";
import { Rate } from "./types";

const Converter = ({ rates }: { rates: Rate[] }) => {
  const {
    convertRes,
    formatRates,
    setCurrencyTo,
    setCurrenciesTo,
    removeSelectedRate,
    currenciesFrom,
    setCurrenciesFrom,
    currenciesTo,
    convertCurrency,
    currencyTo,
    currencyFrom,
    setCurrencyFrom,
    amountToConvert,
    setamountToConvert,
  } = useConvert({ rates });
  const from = currencyFrom.short_code;
  const to = currencyTo.short_code;
  return (
    <div className="converter">
      {amountToConvert && convertRes ? (
        <h1 className="mb-3 result">
          {amountToConvert} {from} to {to} = <strong>{convertRes}</strong>
          {}
        </h1>
      ) : (
        ""
      )}
      <h2>From:</h2>
      <select
        onChange={async (e) => {
          const value = e.target.value;
          const rate = formatRates.filter((rate) => rate.id === Number(value));
          setCurrencyFrom(rate[0]);
          setCurrenciesTo(removeSelectedRate(Number(value)));
          setamountToConvert(NaN);
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
          setamountToConvert(NaN);
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
      <input
        type="number"
        value={amountToConvert}
        onChange={(e) => {
          const amount = Number(e.target.value);
          const from = currencyFrom.short_code;
          const to = currencyTo.short_code;
          setamountToConvert(amount);
          convertCurrency({
            from,
            to,
            amount: amount,
          });
        }}
      />
      {amountToConvert && convertRes ? (
        <h2 className="mb-1 result-label">{convertRes}</h2>
      ) : (
        ""
      )}
    </div>
  );
};

export default Converter;
