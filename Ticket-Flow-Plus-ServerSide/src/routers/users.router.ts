const connection = require("../DataBaseManager/dbConnection"); // Adjust the path as needed
const express = require("express");
const router = express.Router();
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const cors = require("cors"); // Import the cors package
const JWT_SECRET_KEY = "HADDAD_TOP_SECRET_KEY_DONT_TELL_ANYONE";
const TOKEN_HEADER_KEY = "HADDAD_HEADER_KEY_DONT_TELL_ANYONE";


dotenv.config();


// verifyToken middleware is applied to all routes
router.get("/auth/verify-token", (req: any, res: any) => {
     res.status(200).json({ message: "Authorized" });
});

// Get all users
router.get("/", (req: any, res: any) => {
    if(req.user.role === "ADMIN"){
                            // slecting all users with their tickets count
                     const selectQuery = `
                        SELECT u.id,u.fullName ,u.email,u.role,u.phoneNumber,u.birthDate,u.hiringDate,COUNT(ticket.id) AS tickets_count
                        FROM user u 
                        LEFT JOIN ticket
                        ON u.id = ticket.user_id
                        GROUP BY u.id;`;

                    connection.query(selectQuery, (err: any, results: any) => {
                    if (err) {
                            console.error("Error executing query:", err);
                            res.status(500).json({ error: "Internal server error" });
                            return;
                    }

                    res.status(200).json(results);  
                    });
     }    else if(req.user.role === "RESPONSIBLE"){
                    // slecting all users with their tickets count that have role = USER
                    const selectQuery = `
                    SELECT u.id,u.fullName ,u.email,u.role,u.phoneNumber,u.birthDate,u.hiringDate,COUNT(ticket.id) AS tickets_count
                    FROM user u
                    LEFT JOIN ticket
                    ON u.id = ticket.user_id
                    WHERE u.role = "USER"
                    GROUP BY u.id;`;

                    connection.query(selectQuery, (err: any, results: any) => {
                    if (err) {

                               console.error("Error executing query:", err);
                                   res.status(500).json({ error: "Internal server error" });   
                                   return;
                    }

                    res.status(200).json(results);
                    });
     }
    else{
        res.status(401).json({ message: "Unauthorized" });
    }
});



//get users by role
router.put("/role/:id", (req: any, res: any) => {
     const { id } = req.params;
     // change the role of the user
     const newRole = req.body;
     
});

// Get user by id
router.get("/:id", (req: any, res: any) => {
     console.log("Get user by id");
     res.send("Get user by id");
});

// Change user role by id
router.put("/change-user-role", (req: any, res: any) => {
     console.log("Change user role by id");

     const selecteQuery = "UPDATE user SET role = ? WHERE id = ?";
     const role = req.body.role;
     const id = req.body.id;
     console.log("role : " + role);
     console.log("id : " + id);

     connection.query(selecteQuery, [role, id], (err: any, results: any) => {
          if (err) {
               console.error("Error executing query:", err);
               res.status(500).json({ error: "Internal server error" });
               return;
          }
          console.log({ message: "User role changed successfully", results });
          res.status(200).json({
               message: "User role changed successfully",
               results,
          });
     });
});


//creat a new user
router.post("/register", (req: any, res: any) => {
     const newUser = {
          fullName: req.body.fullName,
          email: req.body.email,
          password: req.body.password,
          role: req.body.role,
          phoneNumber: req.body.phoneNumber,
          birthDate: req.body.birthDate,
          hiringDate: req.body.hiringDate,
     };

   // create a query to insert a new user but first we have to check if the email is already used in the same query
   const checkEmailQuery = "SELECT * FROM user WHERE email = ?";
     const insertQuery =
          "INSERT INTO user (fullName,email,password,role,phoneNumber,birthDate,hiringDate) VALUES (?,?,?,?,?,?,?)";
     connection.query(
          checkEmailQuery,
          [newUser.email],
          (err: any, results: any) => {

               if (err) {
                    console.error("Error executing query:", err);
                    res.status(500).json({ error: "Internal server error" });
                    return;
               }
               if (results.length === 1) {
                    res.status(409).json({
                         error: "Email already used",
                    });
               } else {
                    connection.query(
                         insertQuery,
                         [
                              newUser.fullName,
                              newUser.email,
                              newUser.password,
                              newUser.role,
                              newUser.phoneNumber,
                              newUser.birthDate,
                              newUser.hiringDate,
                         ],
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
                              console.log({
                                   message: "User created successfully",
                                   results,
                              });
                              res.status(200).json({
                                   message: "User created successfully",
                                   results,
                              });
                         }
                    );
               }
          }
     );
});

/// delete user by id but first we have to delete all the tickets of this user
router.delete("/:id", (req: any, res: any) => {
     console.log("delete user by id");
     const { id } = req.params;
     //deleting all statuses and coments
     const deleteQuery =
          "DELETE FROM ticketStatus WHERE ticket_id IN (SELECT id FROM ticket WHERE user_id = ?)";
     const selectQuery2 =
          "DELETE FROM comment WHERE ticket_id IN (SELECT id FROM ticket WHERE user_id = ?)";
     const selectQuery3 = "DELETE FROM ticket WHERE user_id = ?";
     const selectQuery4 = "DELETE FROM user WHERE id = ?";
     connection.query(deleteQuery, [id], (err: any, results: any) => {
          if (err) {
               console.error("Error executing query:", err);
               res.status(500).json({ error: "Internal server error" });
               return;
          }
          connection.query(selectQuery2, [id], (err: any, results: any) => {
               if (err) {
                    console.error("Error executing query:", err);
                    res.status(500).json({ error: "Internal server error" });
                    return;
               }
               connection.query(
                    selectQuery3,
                    [id],
                    (err: any, results: any) => {
                         if (err) {
                              console.error("Error executing query:", err);
                              res.status(500).json({
                                   error: "Internal server error",
                              });
                              return;
                         }
                         connection.query(
                              selectQuery4,
                              [id],
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
                                   console.log({
                                        message: "delete user by id success :",
                                        results,
                                   });
                                   res.status(200).json(results);
                              }
                         );
                    }
               );
          });
     });
});

export const usersRouter = router;
