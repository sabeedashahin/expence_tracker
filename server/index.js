const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const db = require("./config/db");
const bodyParser = require("body-parser");
const auth = require("./routes/userRoute");
const fetchuser = require("./routes/fetchuserRoute");
const group = require("./routes/groupRoute");
const expenses = require("./routes/Expence");
const allexpense = require("./routes/allExpenceRoute");
const invite = require("./routes/sendMailRoute");
const app = express();

require("dotenv").config();

const PORT = process.env.PORT || 3005;

db();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use("/auth", auth);
app.use("/api", fetchuser);
app.use("/api/group", group);
app.use("/api/expenses", expenses);
app.use("/api/allexpense", allexpense);
app.use("/api/invite", invite);

app.listen(PORT, () => {
  console.log(`Server is running on port${PORT}`);
});
