import dotenv from "dotenv";

import app from "./app.js";

import connectionToDB from "./db/dbConnection.js";

dotenv.config({
  path: ".env",
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, async () => {
  await connectionToDB();
  console.log(`The App is listing to the port https:localhost:${PORT}`);
});
