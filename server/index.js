const express = require("express");
const pools = require("./mockData/data");
const cors = require("cors");

const app = express();
const port = 8000;

app.use(cors());

/**
 * GET /api/mining-pools
 * Returns the list of available mining pools (without details).
 */
app.get("/api/mining-pools", (req, res) => {
  try {
    const list = pools.map(({ details, ...basic }) => basic);
    res.status(200).json(list);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch mining pools." });
  }
});

/**
 * GET /api/mining-pools/:id
 * Returns the detailed info for a specific mining pool.
 */
app.get("/api/mining-pools/:id", (req, res) => {
  try {
    const pool = pools.find((p) => p.id === req.params.id);

    if (!pool) {
      return res.status(404).json({
        error: "Not Found",
        message: `Mining pool with id "${req.params.id}" does not exist.`,
      });
    }
    if (!pool.details) {
      return res.status(500).json({
        error: "Missing data",
        message: `Details not defined for pool "${pool.id}"`,
      });
    }

    res.status(200).json(pool.details);
  } catch (error) {
    res.status(500).json({
      error: "Internal Server Error",
      message: "Failed to fetch pool details.",
    });
  }
});

/**
 * Global catch-all for unknown routes
 */
app.use((req, res) => {
  res.status(404).json({
    error: "Not Found",
    message: "The requested resource was not found on this server.",
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
