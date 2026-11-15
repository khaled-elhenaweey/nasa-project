const http = require("http");
const mongoose = require("mongoose");
const app = require("./app");
const { loadPlanetsData } = require("./models/planets.model");
const PORT = process.env.PORT || 8000;
const { MONGODB_URI } = require("../../atlas-credentials.env");

const server = http.createServer(app);
mongoose.connection.on("open", () => {
  console.log("MongoDB connection ready!");
});
mongoose.connection.on("error", (err) => {
  console.error(err);
});
async function startServer() {
  await mongoose.connect(MONGODB_URI);
  await loadPlanetsData();

  server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}
startServer();
