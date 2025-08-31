const fetch = require("node-fetch");

module.exports = async (req, res) => {
  const q = req.query.q;

  try {
    const response = await fetch(
      `https://suggestqueries.google.com/complete/search?client=firefox&ds=yt&q=${q}`
    );

    const data = await response.json();

    res.setHeader("Access-Control-Allow-Origin", "*"); // allow browser
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch suggestions" });
  }
};
