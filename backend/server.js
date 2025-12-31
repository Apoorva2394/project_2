
const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

app.get("/api/users", async (req, res) => {
  try {
    const response = await axios.get("https://jsonplaceholder.typicode.com/users");
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Backend running on port ${PORT}`);
});
