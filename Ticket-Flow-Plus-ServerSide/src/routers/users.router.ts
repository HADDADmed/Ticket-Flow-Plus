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
    }else{
        res.status(401).json({ message: "Unauthorized" });
    }
});






router.post("/login", (req: any, res: any) => {
     const { email, password } = req.body;
     const selectQuery = "SELECT * FROM user WHERE email = ? AND password = ?";
     connection.query(
          selectQuery,
          [email, password],
          (err: any, results: any) => {
               if (err) {
                    console.error("Error executing query:", err);
                    res.status(500).json({ error: "Internal server error" });
                    return;
               }
               if (results.length === 1) {
                    const userD = results[0];
                    const token = jwt.sign({ id: userD.id },  
                        JWT_SECRET_KEY , {
                         expiresIn: "24h",
                    });
                    res.status(200).json({
                         message: "login success",
                         user: {
                              fullName: userD.fullName,
                              role: userD.role,
                         },
                         accessToken: token
                    });

               } else {
                    res.status(401).json({
                         error: "Invalid email or password",
                    });
               }
          }
     );
});

//get users by role
router.get("/role/:role", (req: any, res: any) => {
     console.log("Get users by role");
     const { role } = req.params;
     const selectQuery = "SELECT * FROM user WHERE role = ?";

     connection.query(selectQuery, [role], (err: any, results: any) => {
          if (err) {
               console.error("Error executing query:", err);
               res.status(500).json({ error: "Internal server error" });
               return;
          }
          console.log({ message: "Get users by role  success :", results });
          res.status(200).json(results);
     });
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

//count number of tickets of a user
router.get("/count/:userId", (req: any, res: any) => {
     console.log("count number of tickets of a user ");
     const { userId } = req.params;
     const selectQuery = "SELECT COUNT(*) FROM ticket WHERE user_id = ?";

     connection.query(selectQuery, [userId], (err: any, results: any) => {
          if (err) {
               console.error("Error executing query:", err);
               res.status(500).json({ error: "Internal server error" });
               return;
          }
          console.log({
               message: "count number of tickets of a user  success :",
               results,
          });
          res.status(200).json(results);
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
     const selectQuery = "INSERT INTO user SET ?";
     connection.query(selectQuery, newUser, (err: any, results: any) => {
          if (err) {
               console.error("Error executing query:", err);
               res.status(500).json({ error: "Internal server error" });
               return;
          }
          console.log({ message: "creat a new user success :", results });
          res.status(200).json(results);
     });
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
