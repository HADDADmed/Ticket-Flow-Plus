const express = require("express");
const router = express.Router();
const connection = require("../DataBaseManager/dbConnection"); // Adjust the path as needed
import { format } from "date-fns"; // Import the format function from the 'date-fns' library

const verifyToken = require("../middleware/authJWT");

// get all dashboard statistics

router.get("/", (req: any, res: any) => {

    let selectQuery = 'SELECT ';
    let whereUserId = "";
    let where = "";
    if (req.user.role == "ADMIN"||req.user.role == "RESPONSIBLE") {
        selectQuery += `
            (SELECT
                SUM(CASE WHEN role = 'USER' OR role = 'user' THEN 1 ELSE 0 END)
            FROM user) AS users_count,

            (SELECT
                SUM(CASE WHEN role = 'RESPONSIBLE' OR role = 'responsible' THEN 1 ELSE 0 END)
            FROM user) AS responsibles_count,
            
            (SELECT
                COUNT(id) AS categories_count
            FROM category) AS categories_count,

            `
        
    }else{
        whereUserId = "and ticket.user_id = "+req.user.id;
        where = " where user_id = "+req.user.id;
    }



    selectQuery += `
                (SELECT
                    COUNT(*) AS open
                FROM ticketstatus
                    JOIN ticket ON ticket.id = ticketstatus.ticket_id ${whereUserId}
                WHERE ticketstatus.createdAt = (SELECT MAX(createdAt) FROM ticketstatus WHERE ticket_id = ticket.id)
                    AND status_id = 1) AS open_status_tickets_count,

                (SELECT
                    COUNT(*) AS pending
                FROM ticketstatus
                    JOIN ticket ON ticket.id = ticketstatus.ticket_id ${whereUserId}
                WHERE ticketstatus.createdAt = (SELECT MAX(createdAt) FROM ticketstatus WHERE ticket_id = ticket.id)
                    AND status_id = 2) AS pending_status_tickets_count,

                (SELECT
                    COUNT(*) AS closed
                FROM ticketstatus
                    JOIN ticket ON ticket.id = ticketstatus.ticket_id ${whereUserId}
                WHERE ticketstatus.createdAt = (SELECT MAX(createdAt) FROM ticketstatus WHERE ticket_id = ticket.id)
                    AND status_id = 3) AS closed_status_tickets_count,

                (SELECT
                    COUNT(*) AS total
                FROM ticket ${where}) AS total_count;
            `;
            
          connection.query(selectQuery, (err: any, result: any) => {
               if (err) {
                    console.error("Error executing query:", err);
                    res.status(500).json({ error: "Internal server error" });
                    return;
               }

               res.status(200).json(result);
          });
});


export const dashboardRouter = router;
