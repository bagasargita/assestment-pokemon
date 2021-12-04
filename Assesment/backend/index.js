import express from "express";
import bodyParser from "body-parser";
import db from "./config/database.js";
import cors from "cors";

import productsRoutes from "./routes/index.js";
const app = express();
const PORT = 5000;
try {
  await db.authenticate();
  console.log("db connect success");
} catch (error) {
  console.log("db connect error: " + error);
}
/* Error handler middleware */
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({ message: err.message });
  return;
});
app.use(cors());
app.use(bodyParser.json());
app.listen(PORT, () => {
  console.log(`Server Running on Port: http://localhost:${PORT}`);
});

app.use("/myapp", productsRoutes);
