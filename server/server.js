const express = require("express");
const path = require("path");
const app = express();
const cors = require("cors");
require("dotenv").config({ path: "./config.env" });
const PORT = process.env.PORT || 5000;
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(require("./routes"));
// get driver connection
const dbo = require("./db/conn");



if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));
}

dbo.once("open", () => {
<<<<<<< HEAD
  app.listen(PORT, () => console.log(`🌍 Now listening on localhost:${PORT}`));
=======
  app.listen(port, () => console.log(`🌍 Now listening on localhost:${port}`));

>>>>>>> 9f712ba33a890deb143c7231407c7d9a870fdca0
});
