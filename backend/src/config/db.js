import pkg from "pg";
const { Pool } = pkg;

const pool = new Pool({
    user: process.env.USER,
    host: process.env.HOST,
    database: process.env.DATABASE,
    port: process.env.DBPORT,
    password: process.env.PASSWORD
});

pool.on("connect", () => {
    console.log("Connection pool established with Database");
});


export default pool;