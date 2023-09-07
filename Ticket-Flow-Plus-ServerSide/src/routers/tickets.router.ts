const express = require("express");
const router = express.Router();
const connection = require("../DataBaseManager/dbConnection"); // Adjust the path as needed
import { format } from "date-fns"; // Import the format function from the 'date-fns' library
// Get all ticket

router.get("/", (req: any, res: any) => {

     const user_id_tickets = req.query.user_id_tickets;
     if (req.user.role === "ADMIN" || req.user.role === "RESPONSIBLE") {
          if((user_id_tickets == 'null')){               
               const selectQuery = `
                              SELECT 
                                   t.*,
                                   s.status,
                                   u.fullName AS user_fullName,
                                   c.name as category_name,
                                   COALESCE(tc.comment_count, 0) AS comment_count
                              FROM ticket t
                              LEFT JOIN (
                                   SELECT ts.ticket_id, s.status
                                   FROM ticketstatus ts
                                   JOIN status s ON ts.status_id = s.id
                                   WHERE ts.createdAt = (
                                   SELECT MAX(createdAt)
                                   FROM ticketstatus
                                   WHERE ticket_id = ts.ticket_id
                                   )
                              ) s ON t.id = s.ticket_id
                              LEFT JOIN user u ON t.user_id = u.id
                              LEFT JOIN category c ON t.category_id = c.id
                              LEFT JOIN (
                                   SELECT ticket_id, COUNT(*) AS comment_count
                                   FROM comment
                                   GROUP BY ticket_id
                              ) tc ON t.id = tc.ticket_id
                              ORDER BY t.createdAt DESC;
                         `;
                         connection.query(selectQuery, (err: any, results: any) => {
                              if (err) {
                                   console.error("Error executing query:", err);
                                   res.status(500).json({ error: "Internal server error" });
                                   return;
                              }
                              const tickets = results;
                              res.status(200).json(tickets);
                         });
                    }
                         else{
                              const selectQuery = `
                              SELECT 
                                   t.*,
                                   s.status,
                                   u.fullName AS user_fullName,
                                   c.name as category_name,
                                   COALESCE(tc.comment_count, 0) AS comment_count
                              FROM ticket t
                              LEFT JOIN (
                                   SELECT ts.ticket_id, s.status
                                   FROM ticketstatus ts
                                   JOIN status s ON ts.status_id = s.id
                                   WHERE ts.createdAt = (
                                   SELECT MAX(createdAt)
                                   FROM ticketstatus
                                   WHERE ticket_id = ts.ticket_id
                                   )
                              ) s ON t.id = s.ticket_id
                              LEFT JOIN user u ON t.user_id = u.id
                              LEFT JOIN category c ON t.category_id = c.id
                              LEFT JOIN (
                                   SELECT ticket_id, COUNT(*) AS comment_count
                                   FROM comment
                                   GROUP BY ticket_id
                              ) tc ON t.id = tc.ticket_id
                              WHERE t.user_id = ?
                              ORDER BY t.createdAt DESC;
                         `;
                         connection.query(selectQuery,[user_id_tickets], (err: any, results: any) => {
                              if (err) {
                                   console.error("Error executing query:", err);
                                   res.status(500).json({ error: "Internal server error" });
                                   return;
                              }
                              const tickets = results;
                              res.status(200).json(tickets);
                         });
                         }
     } else if (req.user.role == "USER") {
          const selectQuery = `
               SELECT 
                    t.*,
                    s.status,
                    u.fullName AS user_fullName,
                    c.name as category_name,
                    COALESCE(tc.comment_count, 0) AS comment_count
               FROM ticket t
               LEFT JOIN (
                    SELECT ts.ticket_id, s.status
                    FROM ticketstatus ts
                    JOIN status s ON ts.status_id = s.id
                    WHERE ts.createdAt = (
                         SELECT MAX(createdAt)
                         FROM ticketstatus
                         WHERE ticket_id = ts.ticket_id
                    )
               ) s ON t.id = s.ticket_id
               LEFT JOIN user u ON t.user_id = u.id
               LEFT JOIN category c ON t.category_id = c.id
               LEFT JOIN (
                    SELECT ticket_id, COUNT(*) AS comment_count
                    FROM comment
                    GROUP BY ticket_id
               ) tc ON t.id = tc.ticket_id
               WHERE t.user_id = ?
               ORDER BY t.createdAt DESC;
     `;
          connection.query(
               selectQuery,
               [req.user.id],
               (err: any, results: any) => {
                    if (err) {
                         console.error("Error executing query:", err);
                         res.status(500).json({
                              error: "Internal server error",
                         });
                         return;
                    }
                    const tickets = results;
                    res.status(200).json(tickets);
               }
          );
     } else {
          res.status(403).json({ error: "Forbidden" });
     }
});

// Get  ticket with all comments 
router.get("/ticket/:ticketid", (req: any, res: any) => {
     console.log(
          "Get the ticket name by ticket id and all comments by ticket id and all ticketStatus by ticket id"
     );
     const ticketId = req.params.ticketid;
     const selectQuery = `
                SELECT t.id AS ticket_id, t.Title AS ticket_title ,t.Description AS ticket_description,
                t.createdAt AS ticket_createdAt,s.status,u.fullName AS user_fullName,cat.name AS Category_name ,
                c.id AS comment_id,c.commentContent AS comment_content,c.commentedAt AS comment_createdAt,
                uu.fullName AS comment_user_fullName,uu.role AS comment_user_role
                FROM ticket t
                LEFT JOIN (
                    SELECT ts.ticket_id, s.status
                    FROM ticketstatus ts
                    JOIN status s ON ts.status_id = s.id
                    WHERE ts.createdAt = (
                        SELECT MAX(createdAt)
                        FROM ticketstatus
                        WHERE ticket_id = ts.ticket_id
                    )
                ) s ON t.id = s.ticket_id
                LEFT JOIN user u ON t.user_id = u.id
                LEFT JOIN category cat ON t.category_id = cat.id
                LEFT JOIN comment c ON t.id = c.ticket_id
                LEFT JOIN user uu ON c.user_id = uu.id
                WHERE t.id = ?;        
                `;
     connection.query(selectQuery, [ticketId], (err: any, results: any) => {
          if (err) {
               console.error("Error executing query:", err);
               res.status(500).json({ error: "Internal server error" });
               return;
          }

          res.status(200).json(results);
     });
});


// CREATE A NEW TICKET AND CREAT NEW STATUS FOR IT

router.post("/", (req: any, res: any) => {
     
          const title = req.body.title;
          const description = req.body.content;
          const category_id = req.body.category_id;
          const userId = req.user.id;
          // create a query that insert a new ticket and create a new status for it
          const insertQuery1 =
               "INSERT INTO ticket (title, description, category_id, user_id) VALUES (?, ?, ?, ?)";
          const insertQuery2 =
               "INSERT INTO ticketstatus (ticket_id, status_id, changedByUser_id) VALUES (?, ?,?)";
          connection.query(
               insertQuery1,
               [title, description, category_id, userId],
               (err: any, ticketInsertResult: any) => {
                    if (err) {
                         console.error("Error executing query:", err);
                         res.status(500).json({
                              error: "Internal server error",
                         });
                         return;
                    }
                    const ticketId = ticketInsertResult.insertId;

                    const statusId = 1;
                    connection.query(
                         insertQuery2,
                         [ticketId, statusId, userId],
                         (err: any, results: any) => {
                              if (err) {
                                   console.error("Error executing query:", err);
                                   res.status(500).json({
                                        error: "Internal server error",
                                   });
                                   return;
                              }
                              res.status(200).json({
                                   ticketInserted: ticketInsertResult,
                                   ticketStatusInserted: results,
                                   id: ticketId,
                              });
                         }
                    );
               }
          );
     
});


router.delete("/:id", (req: any, res: any) => {
     // Delete all statuses with this ticket id and comments with this ticket id then delete the ticket
     console.log("Delete ticket by id");
     const ticketId = req.params.id;
     const deleteQuery = "DELETE FROM ticket WHERE id = ?";
     const deleteQuery2 = "DELETE FROM ticketstatus WHERE ticket_id = ?";
     const deleteQuery3 = "DELETE FROM comment WHERE ticket_id = ?";
     connection.query(deleteQuery2, [ticketId], (err: any, results: any) => {
          if (err) {
               console.error("Error executing query:", err);
               res.status(500).json({ error: "Internal server error" });
               return;
          }
          console.log("ticket statuses deleted succesfuly");
          console.log(results);
          connection.query(
               deleteQuery3,
               [ticketId],
               (err: any, results: any) => {
                    if (err) {
                         console.error("Error executing query:", err);
                         res.status(500).json({
                              error: "Internal server error",
                         });
                         return;
                    }
                    console.log("ticket comments deleted succesfuly");
                    console.log(results);
                    connection.query(
                         deleteQuery,
                         [ticketId],
                         (err: any, results: any) => {
                              if (err) {
                                   console.error("Error executing query:", err);
                                   res.status(500).json({
                                        error: "Internal server error",
                                   });
                                   return;
                              }
                              console.log("ticket deleted succesfuly");
                              console.log(results);
                              res.status(200).json(results);
                         }
                    );
               }
          );
     });
});

//Delete More than One Ticket the ids are in the body of the request in a array
router.post("/delete", (req: any, res: any) => {
     // Delete all statuses with this ticket id and comments with this ticket id then delete the ticket
     console.log("Delete tickets by ids");
     const ticketIds = req.body;
     const deleteQuery = "DELETE FROM ticket WHERE id = ?";
     const deleteQuery2 = "DELETE FROM ticketstatus WHERE ticket_id = ?";
     const deleteQuery3 = "DELETE FROM comment WHERE ticket_id = ?";
     ticketIds.forEach((ticketId: any) => {
          connection.query(
               deleteQuery2,
               [ticketId],
               (err: any, results: any) => {
                    if (err) {
                         console.error("Error executing query:", err);
                         res.status(500).json({
                              error: "Internal server error",
                         });
                         return;
                    }
                    console.log("ticket statuses deleted succesfuly");
                    console.log(results);
                    connection.query(
                         deleteQuery3,
                         [ticketId],
                         (err: any, results: any) => {
                              if (err) {
                                   console.error("Error executing query:", err);
                                   res.status(500).json({
                                        error: "Internal server error",
                                   });
                                   return;
                              }
                              console.log("ticket comments deleted succesfuly");
                              console.log(results);
                              connection.query(
                                   deleteQuery,
                                   [ticketId],
                                   (err: any, results: any) => {
                                        if (err) {
                                             console.error(
                                                  "Error executing query:",
                                                  err
                                             );
                                             res.status(500).json({
                                                  error: "Internal server error",
                                             });
                                             return;
                                        }
                                        console.log(
                                             "ticket deleted succesfuly"
                                        );
                                        console.log(results);
                                   }
                              );
                         }
                    );
               }
          );
     });
     res.status(200).json({ message: "tickets deleted" });
});

router.get("/ticket/:id", (req: any, res: any) => {
     console.log("Get ticket by id");

     const ticketId = req.params.id;

     const selectQuery = "SELECT * FROM ticket WHERE id = ?";
     const selectQuery2 =
          "SELECT * FROM ticketstatus WHERE ticket_id = ? ORDER BY createdAt DESC LIMIT 1";

     connection.query(
          selectQuery,
          [ticketId],
          (err: any, ticketResults: any) => {
               if (err) {
                    console.error("Error executing query:", err);
                    res.status(500).json({ error: "Internal server error" });
                    return;
               }

               connection.query(
                    selectQuery2,
                    [ticketId],
                    (err: any, statusResults: any) => {
                         if (err) {
                              console.error("Error executing query:", err);
                              res.status(500).json({
                                   error: "Internal server error",
                              });
                              return;
                         }
                         const status = statusResults[0]
                              ? statusResults[0].status_id
                              : "unknown";
                         console.log("status : ");
                         console.log(statusResults[0]);
                         const ticket = {
                              id: ticketResults[0].id,
                              title: ticketResults[0].title,
                              description: ticketResults[0].description,
                              status_id: status,
                              category_id: ticketResults[0].category_id,
                              user_id: ticketResults[0].user_id,
                              createdAt: ticketResults[0].createdAt,
                              historyOfStatus: ticketResults[0].historyOfStatus,
                         };
                         console.log(ticket);
                         console.log("Success ticket id");
                         res.status(200).json(ticket);
                    }
               );
          }
     );
});

// get The Last = status of a ticket by ticket id
router.get("/status/:id", (req: any, res: any) => {
     console.log("Get ticket status by id");

     const ticketId = req.params.id;

     const selectQuery =
          "SELECT status_id FROM ticketstatus WHERE ticket_id = ? ORDER BY createdAt DESC LIMIT 1";

     // get the status by status id
     const selectQuery2 = "SELECT status FROM status WHERE id = ?";

     connection.query(selectQuery, [ticketId], (err: any, results: any) => {
          if (err) {
               console.error("Error executing query:", err);
               res.status(500).json({ error: "Internal server error" });
               return;
          }

          const statusId = results[0].status_id;

          connection.query(
               selectQuery2,
               [statusId],
               (err: any, results: any) => {
                    if (err) {
                         console.error("Error executing query:", err);
                         res.status(500).json({
                              error: "Internal server error",
                         });
                         return;
                    }

                    res.status(200).json(results[0]);
               }
          );
     });
});

export const ticketsRouter = router;
