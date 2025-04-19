const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const scrapeRoutes = require("./routes/scrapeRoutes");
const dataRoutes = require("./routes/dataRoutes");
const { startCronJobs } = require("./utils/cronJobs");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

connectDB();
startCronJobs();

app.use("/api", scrapeRoutes);
app.use("/api/data", dataRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
