import { format } from "date-fns";

const express = require("express");
const router = express.Router();
const connection = require("../DataBaseManager/dbConnection"); // Adjust the path as needed
const verifyToken = require("../middleware/authJWT");

// get All comments By ticket id

router.get("/:ticketid", (req: any, res: any) => {

     console.log("Get all comments by ticket id");
     const ticketId = req.params.ticketid;
     const selectQuery = "SELECT * FROM comment WHERE ticket_id = ?";

     connection.query(selectQuery, [ticketId], (err: any, results: any) => {
          if (err) {
               console.error("Error executing query:", err);
               res.status(500).json({ error: "Internal server error" });
               return;
          }

          res.status(200).json(results);
     });
});



// add comment to ticket
router.post("/", (req: any, res: any) => {
        const ticketId = req.body.ticket_id;
        const userId = req.user.id;
        console.log("userId",userId);
        const commentContent = req.body.commentContent;
        const commentedAt = format(new Date(), "yyyy-MM-dd HH:mm:ss");
        const insertQuery = "INSERT INTO comment (ticket_id, commentContent, user_id, commentedAt) VALUES (?, ?, ?, ?)";
         console.log("Add comment to ticket");
        connection.query(insertQuery, [ticketId, commentContent, userId, commentedAt], (err: any, results: any) => {

                if (err) {
                        console.error("Error executing query:", err);
                        res.status(500).json({ error: "Internal server error" });
                        return;
                }

                res.status(200).json(results);
                console.log("Add comment to ticket success");

        });
});





export const commentsRouter = router;
