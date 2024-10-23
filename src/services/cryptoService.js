import axios from "axios";

export const fetchCryptoPrices = async () => {
  const cryptoSymbols = ["bitcoin", "ethereum", "solana"];

  const BASE_URL = "https://api.coingecko.com/api/v3";

  const API_KEY = process.env.COINGECKO_API_KEY;

  const url = `${BASE_URL}/v3/simple/price`;

  const params = {
    ids: cryptoSymbols.join(","),

    vs_currencies: "usd",

    include_market_cap: true,
  };

  const headers = {
    "x-cg-demo-api-key": API_KEY,
  };

  try {
    const response = await axios.get(url, { params, headers });

    return response.data;
  } catch (error) {
    console.error("Error fetching data from CoinGecko:", error);

    throw error;
  }
};
