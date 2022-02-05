const express = require("express");
const path = require("path");
const app = express();
const cors = require("cors");
const routes = require("./routes");
require("dotenv").config();
const PORT = process.env.PORT || 3001;
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(routes);
// get driver connection
const dbo = require("./db/conn");

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));
}

dbo.once("open", () => {
  app.listen(PORT, () => console.log(`🌍 Now listening on localhost:${PORT}`));
});
