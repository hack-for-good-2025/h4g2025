const express = require("express");
const authRoutes = require("./routes/auth");
const meetingsRoutes = require("./routes/meetings");
const app = express();
const port = 8000;
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config({ path: './config.env' });
// Implement CORS
app.use(cors());
app.options("*", cors());

app.use(express.json());

app.use("/auth", authRoutes);
app.use("/meetings", meetingsRoutes);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
