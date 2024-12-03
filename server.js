const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();

const routes = require("./routes/api");

const port = process.env.PORT || 5500;

// Enable all request
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  })
); //server allows access from frontend with port 5173

app.options("*", cors()); // Enable preflight requests for all routes

// parsing application/json
app.use(express.json());
// parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.use("/openai", routes);

app.listen(port, () => {
  console.log(`Server running at port http://localhost:${port}!`);
});
