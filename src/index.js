import express from "express";
import dotenv from "dotenv";
import { updateCryptoPrices } from "./api/notionService.js";

dotenv.config();

const app = express();

app.get("/", async (req, res) => {
  try {
    await updateCryptoPrices();
    res.status(200).json({ message: "Portfolio updated successfully" });
  } catch (error) {
    console.error("Error updating crypto prices:", error);
    res.status(500).send("Error updating crypto prices.");
  }
});

// Export the app for Vercel
export default app;
