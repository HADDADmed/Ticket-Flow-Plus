



import mysql from 'mysql';
import { faker, ne } from '@faker-js/faker';

const connectionConfig = {
  host: '127.0.0.1', // Change this to your MySQL host
  user: 'root',
  password: '',
  database: 'IssueTrackrPro'
};


// async function insertCategories() {
//   const categories = [
//     { name: '1C1ategory', description: 'Description for C1ategory 1' },
//     { name: '2C2ategory', description: 'Description for C2ategory 2' },
//     { name: '3C3ategory', description: 'Description for C3ategory 3' },
//     { name: 'C4ategory', description: 'Description for C4ategory 4' },
//     { name: '5C5ategory', description: 'Description for C5ategory 5' }
//   ];

  const connection =  mysql.createConnection(connectionConfig);

 

//   console.log('Categories inserted successfully');

//   connection.end();
// }
// const statuses = ['open', 'pending', 'closed'];

// async function getRandomStatusHistory() {
//   const statusHistory = [];
//   let createdAt = new Date();

//   for (const status of statuses) {
//     statusHistory.push(`${status} (${createdAt.toISOString()}),`);
//     createdAt = new Date(createdAt.getTime() + Math.random() * 1000000000); // Random time interval
//   }

//   return statusHistory.join('\n');
// }

// function generateRandom(min = 0, max = 100) {

//   // find diff
//   let difference = max - min;

//   // generate random number 
//   let rand = Math.random();

//   // multiply with difference 
//   rand = Math.floor( rand * difference);

//   // add with min value 
//   rand = rand + min;

//   return rand;
// }


// async function insertTickets() {
//   const connection = await mysql.createConnection(connectionConfig);

//   for (let i = 0; i < 100; i++) {
//     const randomCategoryId = generateRandom(1, 5);
//     const randomUserId =  generateRandom(3, 8); // Assuming user IDs start from 3
//     const statusHistory = await getRandomStatusHistory();

//     await connection.execute(
//       'INSERT INTO Ticket (title, description, status, category_id, user_id, historyOfStatus) VALUES (?, ?, ?, ?, ?, ?)',
//       [
//         `Ticket ${i + 1}`,
//         `${i + 1}Description ${i + 1} for Ticket number ${i + 1} sdouYDUIYDUQW  SOME RANDOM CONTENT   dwioufiw un wej hfwpo ${i + 1}`,
//         statuses[Math.floor(Math.random() * statuses.length)],
//         randomCategoryId,
//         randomUserId,
//         statusHistory
//       ]
//     );
//   }

//   console.log('Tickets inserted successfully');

//   connection.end();
// }

// async function createDatabase() {
//   const connection = await mysql.createConnection({
//     host: '127.0.0.1', // Change this to your MySQL host
//     user: 'root',
//     password: ''
//   });




//   // Create the IssueTrackrPro database if it doesn't exist
//   await connection.query('CREATE DATABASE IF NOT EXISTS IssueTrackrPro');
//   await connection.end();
// }


// async function changeTableNames() {
//     const connection = await mysql.createConnection({
//         host: '127.0.0.1', // Change this to your MySQL host
//     user: 'root',
//     password: '',
//     database: 'IssueTrackrPro',
//     });
//     await connection.query(`
//         ALTER TABLE bUser RENAME TO User;
//     `);
//     await connection.end();
// }



// async function createSchema() {
//     const connection = await mysql2.createConnection({
//       host: '127.0.0.1', // Change this to your MySQL host
//       user: 'root',
//       password: '',
//       database: 'IssueTrackrPro',
//     });
  
//     // Create the Category table first
//     await connection.query(`
//       CREATE TABLE IF NOT EXISTS Category (
//         id INT PRIMARY KEY AUTO_INCREMENT,
//         name VARCHAR(255) NOT NULL,
//         description TEXT
//       )
//     `);
  
//     // Create the bUser table
//     await connection.query(`
//       CREATE TABLE IF NOT EXISTS bUser (
//         id INT PRIMARY KEY AUTO_INCREMENT,
//         fullName VARCHAR(255) NOT NULL,
//         email VARCHAR(255) NOT NULL,
//         password VARCHAR(255) NOT NULL,
//         role VARCHAR(50) NOT NULL
//       )
//     `);
  
//     // Create the Ticket table last
   //  await connection.query(`
   //    CREATE TABLE IF NOT EXISTS Ticket (
   //      id INT PRIMARY KEY AUTO_INCREMENT,
   //      title VARCHAR(255) NOT NULL,
   //      description TEXT,
   //      status VARCHAR(50) NOT NULL,
   //      category_id INT,
   //      user_id INT,
   //      createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
   //      historyOfStatus TEXT,
   //      FOREIGN KEY (category_id) REFERENCES Category(id),
   //      FOREIGN KEY (user_id) REFERENCES bUser(id)
   //    )
//     `);
  
//     await connection.end();
//   }

// Function to create the StatusHistory table
function createCommentTable() {
   const createTableQuery = `
   ALTER TABLE Ticket
         ADD currentStatusDate TIMESTAMP;
   CREATE TABLE IF NOT EXISTS Status (
         id INT PRIMARY KEY AUTO_INCREMENT,
            status VARCHAR(50) NOT NULL
          );
   CREATE TABLE IF NOT EXISTS TicketStatusHistory  (
            id INT PRIMARY KEY AUTO_INCREMENT,
            ticket_id INT,
            status_id INT,
            changedByResponsible_id INT,
            createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (ticket_id) REFERENCES Ticket(id),
            FOREIGN KEY (status_id) REFERENCES Status(id)
            FOREIGN KEY (changedByResponsible_id) REFERENCES User(id)
          );

  
   `;
 
   connection.query(createTableQuery, (error, results, fields) => {
     if (error) {
       console.error('Error creating Notification table:', error);
     } else {
       console.log('Notification table created successfully');
     }
   });
 }



 // CREAT TABLE Status (
  function createStatusTable() {
    const createTableQuery = `
    ALTER TABLE TicketStatus
    ADD changedByUser_id INT,
    ADD FOREIGN KEY (changedByUser_id) REFERENCES User(id);

 
    
    `;
      
    connection.query(createTableQuery, (error, results, fields) => {
      if (error) {
        console.error('Error creating Notification table:', error);
      } else {
        console.log('Notification table created successfully');
      }

    });
  }
  async function createUsers() {

    const users = [
      {
        fullName: 'John Doe',
        email: '  ',  
        password: '123',
        role: 'USER',
        phoneNumber: '123456789',
        birthDate: new Date('1990-01-01'),
        hiringDate: new Date('2020-01-01'),

      }
    ];


    const roles = ['USER', 'RESPONSIBLE'];
    
    for (let i = 0; i < 10; i++) {
         for (let j = 0; j < 10; j++) {
                users.push({
                  fullName: faker.person.fullName() ,
                  email: faker.internet.email(),
                  password: faker.internet.password(),
                  role: 'USER',
                  phoneNumber: faker.phone.number() ,
                  birthDate: faker.date.birthdate(),
                  hiringDate: faker.date.past(),
                });
          }

          users.push({
            fullName: faker.person.fullName() ,
            email: faker.internet.email(),
            password: faker.internet.password(),
            role: 'RESPONSIBLE',
            phoneNumber: faker.phone.number() ,
            birthDate: faker.date.birthdate(),
            hiringDate: faker.date.past(),
          });
    
          }



    const insertQuery = ` INSERT INTO User (fullName, email, password, role, phoneNumber, birthDate, hiringDate) VALUES ?;`;
    connection.query(insertQuery, [users.map(user => [user.fullName, user.email, user.password, user.role, user.phoneNumber, user.birthDate, user.hiringDate])], (err, rows, fields) => {
        if (!err) {
            console.log("users added succeffuly");
        } else {
            console.log(err);
            console.log("an error was occured while adding users");
        }
    });

    }


    async function creatticketsStatusHystory() {


      const ticketsStatuses = [
        {
          ticket_id: 139,
          status_id: 3,
          changedByUser_id: 1,
        }
      ];

      for(let i = 138; i < 1207; i+=4) {
        ticketsStatuses.push({
          ticket_id: i,
          status_id: faker.helpers.arrayElement([2,3]),
          changedByResponsible_id: faker.helpers.arrayElement([1,2]) ,
        });
      }

      
      const insertQuery = ` INSERT INTO ticketstatus (ticket_id, status_id, changedByUser_id) VALUES ?;`;
      connection.query(insertQuery, [ticketsStatuses.map(ticketStatus => [ticketStatus.ticket_id, ticketStatus.status_id, ticketStatus.changedByResponsible_id])], (err, rows, fields) => {
          if (!err) {
              console.log("ticketsStatuses added succeffuly");
          } else {
              console.log(err);
              console.log("an error was occured while adding ticketsStatuses");
          }
      });



      }

      


 async function main() {
   try {
     await creatticketsStatusHystory();
     console.log('Notification table created successfully');
   } catch (error) {
     console.error('Error creating Notification table:', error);
   } finally {
     connection.end(); // Close the database connection
   }
 }
 
 // Execute the main function
 main();