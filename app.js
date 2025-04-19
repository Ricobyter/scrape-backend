const express = require("express");
const cors = require("cors");
const scrapedMaterialRoutes = require("./routes/scrapeMaterialRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", scrapedMaterialRoutes);

module.exports = app;
