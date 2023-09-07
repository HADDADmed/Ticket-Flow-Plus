import express, { Application, Request, Response } from "express";
import bodyParser from "body-parser";
import { ticketsRouter } from "./routers/tickets.router";
import { usersRouter } from "./routers/users.router";
import { categoriesRouter } from "./routers/categories.router";
import { commentsRouter } from "./routers/comments.router";
import { statusRouter } from "./routers/ticketStatuses.router";
import { dashboardRouter } from "./routers/dashboard.router";
import { authRouter } from "./routers/auth.router";

const connection = require("./DataBaseManager/dbConnection"); // Adjust the path as needed
const app: Application = express();
const corsConf = require("../config/corsConf");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const cors = require("cors"); // Import the cors package
const port = process.env.SERVER_PORT || 8000;


// Add Access Control Allow Origin headers
const allowedOrigins = ['http://localhost:8000/','http://192.168.1.107:5173', 'http://localhost:5173'];
app.use(cors({
  origin: function (origin:any, callback:any) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
}));

connection.connect(function (err: any) {
     if (err) throw err;
     console.log("Connected successfuly to MySql !");
});


const verifyToken = require('./middleware/authJWT');

app.use("/api/tickets",verifyToken,ticketsRouter);
app.use("/api/users",verifyToken, usersRouter);
app.use("/api/categories",verifyToken,categoriesRouter);
app.use("/api/comments", verifyToken,commentsRouter);
app.use("/api/statuses", verifyToken,statusRouter);
app.use("/api/dashboard",verifyToken, dashboardRouter);
app.use("/auth", authRouter);


const PORT = process.env.SERVER_PORT || 8000;
app.listen(PORT, () => {
     console.log(`Server is running on PORT ${PORT}`);
});
