import Converter from "./Converter";

export default async function Page() {
  const res = await fetch(
    "https://api.currencybeacon.com/v1/currencies?api_key=NHKNUhI53ZApF4IXCOX1DpUj2YTSl2U1"
  );
  const rates = await res.json();

  return (
    <div>
      <Converter rates={rates} />
    </div>
  );
}
