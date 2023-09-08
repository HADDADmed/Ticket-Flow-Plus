import { response } from "express";

const express = require('express');
const router = express.Router();
const connection = require('../DataBaseManager/dbConnection'); // Adjust the path as needed

/// get all categories
router.get('/', (req:any, res:any) => {

    //// select all categories and add to each category the number of tickets with this category id
    const selectQuery =
                    ` select c.*, count(ticket.id) as tickets_Count
                        from category c
                        LEFT join ticket
                        ON c.id = ticket.category_id
                        group by c.id
                        ORDER BY c.createdAt DESC
                        ;`
    connection.query(selectQuery, (err:any, rows:any, fields:any) => {
            
            if (!err) {
                res.json(rows);
                console.log("categories fetched succeffuly");
            } else {
                console.log(err);
                console.log("an error was occured while fetching categories");
            }
        }
    );
});
router.get('/names', (req:any, res:any) => {
    //select all categories names
    const selectQuery =
                    ` select id,name
                        from category;`
    connection.query(selectQuery, (err:any, rows:any, fields:any) => {

            if (!err) {
                res.json(rows);
                console.log("categories names fetched succeffuly");
            } else {
                console.log(err);
                console.log("an error was occured while fetching categories names");
            }
        }
    );
});

router.post('/',(req:any, res:any) => {
    if(req.user.role == "ADMIN"){
        const name = req.body.name;
    const description = req.body.description;
    const selectQuery = 'INSERT INTO category (name, description) VALUES (?, ?)';
    
  connection.query(selectQuery, [name, description], (err:any, results:any) => {
        if (!err) {
            res.json(results);
            console.log("category added succeffuly");
        } else {
            console.log(err);
            console.log("an error was occured while adding category");
            res.status(500).json({ error: "Internal server error" });
        }
    }
    );
    }else{
        res.status(401).json({ error: "Unauthorized" });
    }
});


//delete category   delete all tickets with this category id after deleting all statuses with this ticket id and comments with this ticket id
router.delete('/:id',(req:any, res:any) => {
    
    if(req.user.role == "ADMIN"){
        const categoryId = req.params.id;
   // delete statuses and comments
            const deleteQuery = 'DELETE FROM ticketStatus WHERE ticket_id IN (SELECT id FROM ticket WHERE category_id = ?)';
            const selectQuery2 = 'DELETE FROM comment WHERE ticket_id IN (SELECT id FROM ticket WHERE category_id = ?)';
            const selectQuery3 = 'DELETE FROM ticket WHERE category_id = ?';
            const selectQuery4 = 'DELETE FROM category WHERE id = ?';
            connection.query(deleteQuery, [categoryId], (err:any, results:any) => {
                if (!err) {
                    connection.query(selectQuery2, [categoryId], (err:any, results:any) => {
                        if (!err) {
                            connection.query(selectQuery3, [categoryId], (err:any, results:any) => {
                                if (!err) {
                                    connection.query(selectQuery4, [categoryId], (err:any, results:any) => {
                                        if (!err) {
                                            res.json(results);
                                            console.log("category deleted succeffuly");
                                        } else {
                                            console.log(err);
                                            console.log("an error was occured while deleting category");
                                        }
                                    });
                                } else {
                                    console.log(err);
                                    console.log("an error was occured while deleting category");
                                }
                            });
                        } else {
                            console.log(err);
                            console.log("an error was occured while deleting category");
                        }
                    });
                } else {
                    console.log(err);
                    console.log("an error was occured while deleting category");
                }
    });
    }else{
        res.status(401).json({ error: "Unauthorized" });
    }
});







export const categoriesRouter = router;

