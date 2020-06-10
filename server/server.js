const express = require("express");
const port = 5000;
const app = express();

app.use(express.json());

const Instagram = require("./routes/routes");
app.use("/Instagram", Instagram);

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
