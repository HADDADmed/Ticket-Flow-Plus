const connection = require("../DataBaseManager/dbConnection"); // Adjust the path as needed
const express = require("express");
const router = express.Router();
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const cors = require("cors"); // Import the cors package
const JWT_SECRET_KEY = "HADDAD_TOP_SECRET_KEY_DONT_TELL_ANYONE";
const TOKEN_HEADER_KEY = "HADDAD_HEADER_KEY_DONT_TELL_ANYONE";



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


export const authRouter = router;
