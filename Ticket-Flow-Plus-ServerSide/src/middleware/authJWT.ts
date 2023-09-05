const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const JWT_SECRET_KEY = "HADDAD_TOP_SECRET_KEY_DONT_TELL_ANYONE";
const TOKEN_HEADER_KEY = "HADDAD_HEADER_KEY_DONT_TELL_ANYONE";
const connectionn = require("../DataBaseManager/dbConnection"); // Adjust the path as needed

// creating a middleware function to check if the user is authenticated

const verifyToken = (req: any, res: any, next: any) => {
     if (
          req.headers.authorization &&
          req.headers.authorization.split(" ")[0] === "JWT"
     ) {
          jwt.verify(
               req.headers.authorization.split(" ")[1],
               JWT_SECRET_KEY,
               (err: any, decoded: any) => {
                    if (err) {
                         res.status(401).json({ message: "Unauthorized 0" });
                    } else {
                         const selectQuery = "SELECT * FROM user WHERE id = ?";
                         connectionn.query(
                              selectQuery,
                              [decoded.id],
                              (err: any, results: any) => {
                                   if (err) {
                                        res.status(500).json({
                                             message: "Internal Server Error",
                                        });
                                        return;
                                   }
                                   if (results.length === 1) {
                                        req.user = results[0];
                                        next();
                                   } else {
                                        res.status(401).json({
                                             message: "Unauthorized 2",
                                        });
                                   }
                              }
                         );
                    }
               }
          );
     } else {
          res.status(401).json({ message: "Unauthorized" });
     }
};

module.exports = verifyToken;
