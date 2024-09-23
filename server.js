// server.js
import express from "express";
import peopleRoutes from "./routes/people.js";
import "./db/dbconnection.js"; 
import cors from "cors";

const app = express();
const port = 5000;


app.use(express.json());

const corsOptions = {
  origin: "http://localhost:3000",
};
app.use(cors(corsOptions));

// Use people routes
app.use("/api/people", peopleRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
