
// Imports
import mysql from 'mysql2/promise';


// ESM

// ESM
import { faker } from '@faker-js/faker';

// CJS


const connectionConfig = {
  host: '127.0.0.1', // Change this to your MySQL host
  user: 'root',
  password: '',
  database: 'IssueTrackrPro'
};


const connection =  mysql.createConnection(connectionConfig);

async function createUsers() {

  connection.connect();

  const tickets = [];

  for (let i = 0; (i +13)< 110; i++) {
    const userId = i + 13;

    for (let j = 0; j < 10; j++) {
      const ticket = {
        title: faker.lorem.sentence({
          min: 1,
          max: 3
        }),
        description: faker.lorem.paragraph(),
        category_id: faker.number.int({ min: 9, max: 14 }),
        creationDate: faker.date.past().toISOString().split('T')[0],
        userId: userId,
      };

      tickets.push(ticket);
    }
  }

  const insertTicketQuery = `INSERT INTO Ticket (title, description, createdAt, user_id, category_id) VALUES ?`;

  const ticketValues = tickets.map(ticket => [
    ticket.title,
    ticket.description,
    ticket.creationDate,
    ticket.userId,
    ticket.category_id,
  ]);

  try {
    await new Promise((resolve, reject) => {
      connection.query(insertTicketQuery, [ticketValues], (err, result) => {
        if (err) {
          console.error('An error occurred while adding tickets:', err);
          reject(err);
        } else {
          console.log('Tickets added successfully');
          resolve(result);
        }
      });
    });
  } catch (error) {
    console.error('Error:', error);
  } finally {
    connection.end();
  }
}

async function addTicketStatus() {
  connection.connect();

  const insertTicketStatusQuery = `
    INSERT INTO TicketStatus (ticket_id, status_id, changedByUser_id)
    VALUES (?, 1, 2)
  `;

  try {
    for (let ticketId = 138; ticketId <= 1207; ticketId++) {
      await new Promise((resolve, reject) => {
        connection.query(
          insertTicketStatusQuery,
          [ticketId],
          (err, statusResult) => {
            if (err) {
              console.error('An error occurred while adding ticket status:', err);
              reject(err);
            } else {
              console.log('Ticket status added successfully for ticket_id:', ticketId);
              resolve(statusResult);
            }
          }
        );
      });
    }
  } catch (error) {
    console.error('Error:', error);
  } finally {
    connection.end();
  }
}

async function addCommentsToTickets() {
  connection.connect();

  const insertCommentQuery = `
    INSERT INTO Comment (ticket_id, commentContent, user_id, commentedAt)
    VALUES (?, ?, ?, ?)
  `;

  try {
    for (let ticketId = 138; ticketId <= 1207; ticketId++) {
      for (let commentIndex = 1; commentIndex <= 2; commentIndex++) {
        const commentContent = faker.lorem.paragraph();
        const userId =  faker.helpers.arrayElement( [1,2,15,26,37,48,59,70,81,92,103,114]); // Replace with actual user ID range
        const commentedAt = faker.date.past().toISOString();

        await new Promise((resolve, reject) => {
          connection.query(
            insertCommentQuery,
            [ticketId, commentContent, userId, commentedAt],
            (err, commentResult) => {
              if (err) {
                console.error('An error occurred while adding comment:', err);
                reject(err);
              } else {
                console.log('Comment added successfully for ticket_id:', ticketId);
                resolve(commentResult);
              }
            }
          );
        });
      }
    }
  } catch (error) {
    console.error('Error:', error);
  } finally {
    connection.end();
  }
}

   

      
   
    async function main() {
  
      addCommentsToTickets()
    }
    
    // Execute the main function
    main();
