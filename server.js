// server.js
import express from "express";
import peopleRoutes from "./routes/people.js";
import "./db/dbconnection.js"; 
import cors from "cors";
import enrollmentService from "./routes/enrollmentService.js"
import userService from "./routes/userService.js";
const app = express();
const port = 5000;


app.use(express.json());

const corsOptions = {
  origin: "http://localhost:3000",
};
app.use(cors(corsOptions));

app.use("/api/people", peopleRoutes);
app.use("/api/enrollment", enrollmentService );
app.use("/api/user", userService );

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
