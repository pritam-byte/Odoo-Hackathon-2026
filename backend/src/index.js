import dotenv from "dotenv"
import express from "express"
import cors from "cors"
import pool from "./config/db.js";

import errorHandling from "./midllewares/errorHandler.js";

import userRoutes from "./routes/userRoutes.js";



dotenv.config()

const app = express();
const port = process.env.PORT || 3001;


//middlewares
app.use(express.json());
app.use(cors());

//Routes
app.use("/api", userRoutes)

//Error handling middleware
app.use(errorHandling);

//Testing POSTGRES Connection
app.get(("/"), async (req, res) => {
    console.log("Start");
    const result = await pool.query("SELECT current_database()");
    console.log("end");
    res.send(`The database name is : ${result.rows[0].current_database}`);

});



//Server running
app.listen(port, () => {
    console.log(`Server is listening on http://localhost:${port}`);
});