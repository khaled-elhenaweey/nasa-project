const path = require("path");
require("dotenv").config({
  path: path.resolve(__dirname, "../../atlas-credentials.env"),
});

const http = require("http");
const mongoose = require("mongoose");
const app = require("./app");
const { loadPlanetsData } = require("./models/planets.model");
const PORT = process.env.PORT || 8000;
const MONGO_URL = process.env.MONGODB_URI;

const server = http.createServer(app);
mongoose.connection.on("open", () => {
  console.log("MongoDB connection ready!");
});
mongoose.connection.on("error", (err) => {
  console.error(err);
});
async function startServer() {
  await mongoose.connect(MONGO_URL);
  await loadPlanetsData();

  server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}
startServer();
