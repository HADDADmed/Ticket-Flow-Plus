import { format } from "date-fns";
import e from "express";

const express = require("express");
const router = express.Router();
const connection = require("../DataBaseManager/dbConnection"); // Adjust the path as needed
const verifyToken = require("../middleware/authJWT");

// Get all statuses

router.get("/", (req: any, res: any) => {
     const selectQuery = `SELECT ts.createdAt,s.name as status_name, u.fullName as changedByUser_name
                        FROM ticketstatus ts
                        JOIN status s ON ts.status_id = s.id
                        JOIN user u ON ts.changedByUser_id = u.id
                        ORDER BY ts.createdAt DESC;`;
     connection.query(selectQuery, (err: any, results: any) => {
          if (err) {
               console.error("Error executing query:", err);
               res.status(500).json({ error: "Internal server error" });
               return;
          }
          res.status(200).json(results);
     });
});

// Get all ticketstatuses by tickt_id

router.get("/:ticketid", (req: any, res: any) => {
     console.log("Get all statuses by ticket id");
     const ticketId = req.params.ticketid;
     const selectQuery = `SELECT ts.createdAt,s.status as status_name, u.fullName as changedByUser_name
                        FROM ticketstatus ts
                        JOIN status s ON ts.status_id = s.id
                        JOIN user u ON ts.changedByUser_id = u.id
                        WHERE ts.ticket_id = ?
                        ORDER BY ts.createdAt DESC;`;
     connection.query(selectQuery, [ticketId], (err: any, results: any) => {
          if (err) {
               console.error("Error executing query:", err);
               res.status(500).json({ error: "Internal server error" });
               return;
          }

          res.status(200).json(results);
     });
});


// add new status to ticketstatus table

router.post("/", (req: any, res: any) => {
     if (req.user.role != "ADMIN" || req.user.role != "RESPONSIBLE") {
          const ticketId = req.body.ticket_id;
          const changedByUserId = req.user.id;
          const statusId = req.body.status_id;
          const d = new Date();
          const date = format(d, "yyyy-MM-dd HH:mm:ss");

          const insertQuery =
               "INSERT INTO ticketstatus (ticket_id, status_id,changedByUser_id,createdAt) VALUES (?, ?, ?, ?)";
          connection.query(
               insertQuery,
               [ticketId, statusId, changedByUserId, date],
               (err: any, results: any) => {
                    if (err) {
                         console.error("Error executing query:", err);
                         res.status(500).json({
                              error: "Internal server error",
                         });
                         return;
                    }

                    res.status(200).json(results);
               }
          );
     }  else {
            res.status(401).json({ error: "Unauthorized" });
         }       
});



router.get("current/:id", (req: any, res: any) => {
     const ticketId = req.params.id;
     const selectQuery = `SELECT s.status as current_status
                         FROM ticketstatus ts     
                         JOIN status s ON ts.status_id = s.id
                         WHERE ts.ticket_id = ?
                         ORDER BY ts.createdAt DESC
                         LIMIT 1;`;
     connection.query(selectQuery, [ticketId], (err: any, results: any) => {
          if (err) {
               console.error("Error executing query:", err);
               res.status(500).json({ error: "Internal server error" });
               return;
          }
          res.status(200).json(results);
     });
});


                         
export const statusRouter = router;
