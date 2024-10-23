import { Client } from "@notionhq/client";
import { fetchCryptoPrices } from "./cryptoService.js";

export const updateCryptoPrices = async () => {
  const notion = new Client({
    auth: process.env.NOTION_API_KEY,
  });

  const databaseId = process.env.NOTION_DATABASE_ID;
  const prices = await fetchCryptoPrices();
  const defaultHoldings = {
    bitcoin: 2,
    ethereum: 4,
    solana: 25,
  };

  const purchasePrices = {
    bitcoin: 30000, // Hardcoded purchase price for Bitcoin
    ethereum: 2000, // Hardcoded purchase price for Ethereum
    solana: 120, // Hardcoded purchase price for Solana
  };

  for (const [symbol, priceData] of Object.entries(prices)) {
    const price = priceData.usd;
    const marketCap = priceData?.usd_market_cap;
    const quantity = defaultHoldings[symbol] || 0;
    const currentValue = (price * quantity).toFixed(2);
    const purchasePrice = purchasePrices[symbol] || 0;
    const purchaseValue = (purchasePrice * quantity).toFixed(2);
    const pAndL = (currentValue - purchaseValue).toFixed(2);

    const response = await notion.databases.query({
      database_id: databaseId,
      filter: {
        property: "Symbol",
        rich_text: {
          equals: symbol.toUpperCase(),
        },
      },
    });

    const page = response.results[0];

    if (page) {
      await notion.pages.update({
        page_id: page.id,
        properties: {
          "Current Price (USD)": {
            number: parseFloat(price.toFixed(2)),
          },
          "Current Value (USD)": {
            number: parseFloat(currentValue),
          },
          "Market Cap (USD)": {
            number: parseFloat(marketCap.toFixed(2)),
          },
          Quantity: {
            number: quantity,
          },
          "Purchase Price (USD)": {
            number: parseFloat(purchasePrice.toFixed(2)),
          },
          "Purchase Value (USD)": {
            number: parseFloat(purchaseValue),
          },
          "P&L (USD)": {
            number: parseFloat(pAndL),
          },
        },
      });
    }
  }
};
