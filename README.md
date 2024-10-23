# Crypto Price Tracker

This project is a cryptocurrency price tracker, built to display real-time prices directly in **Notion** using the **CoinGecko API**.

## Features

- Fetches real-time cryptocurrency prices.
- Integrates seamlessly with Notion for data display.
- Supports a wide range of cryptocurrencies through the CoinGecko API.
- Automates regular data fetching using cron jobs.

## Tech Stack

- **Node.js**: Server-side JavaScript runtime.
- **Express**: Web framework for Node.js, used to handle API requests.
- **CoinGecko API**: Provides real-time cryptocurrency price data.
- **Notion API**: Integrates the price data into Notion.
- **dotenv**: Loads environment variables from a `.env` file.
- **node-cron**: Schedules automatic updates of cryptocurrency prices.
