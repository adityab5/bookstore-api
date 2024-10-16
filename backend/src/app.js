import express from "express";
import bookRoutes from "./routes/bookRoutes.js";
import errorHandler from "./middleware/errorHandler.js";

import dotenv from "dotenv";
dotenv.config();



const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true })); 

app.use("/ping", (req, res) => {
  res.send("pong");
});

// Routes
app.use("/api/comic-books", bookRoutes);

// Error middleware
app.use(errorHandler)

app.use("*", (req, res) => {
  res.status(404).send("OPPS! Page not found!");
});

export default app;
