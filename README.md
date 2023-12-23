[![LinkedIn][linkedin-shield]][linkedin-url]

## Installation

To install and run SQL-joins-example locally, follow these steps:

Clone Repository:

```sh
git clone https://github.com/hossain101199/SQL-joins-example.git
```

Navigate to Project Directory:

```
cd SQL-joins-example
```

Create a `.env` file in the project root with the following content:

```env
NODE_ENV=development

PORT=8000

# PostgreSQL Database Configuration

DATABASE="The name of the database."
HOST="The database server's address."
PASSWORD="The password for connecting to the database."
DATABASE_PORT="The port on which the database server is running."
USER="The username for connecting to the database."
```

Install Dependencies:

```sh
 npm install
```

Start Development Server:

```sh
npm run dev
```

The application will be accessible at http://localhost:8000.

## Running Database Setup

1. Create Database Tables

In the server.js file, locate the following lines:

```javascript
// Uncomment the lines below if you want to execute these functions on startup.
// createQuery();
// insertData();
// dropTables();
```

Uncomment the `createQuery();` line:

```javascript
createQuery();
```

Save the file and run your Node.js application. This will execute the createQuery function, which performs the following:

- Creates four tables in the PostgreSQL database: Customers, Products, Orders, and OrderDetails.
- Defines the structure of each table with specific columns, primary keys, and foreign key relationships.

After running this, you will have the required tables set up in your database.

2. Insert Sample Data

Next, uncomment the `insertData();` line in server.js:

Uncomment the `insertData();` line:

```javascript
insertData();
```

Save the file and run your Node.js application again. This will execute the `insertData` function, which does the following:

- Inserts sample data into the previously created tables (Customers, Products, Orders, and OrderDetails).
- Populates the tables with information such as customer details, product details, order information, and order details.

After running this, your database will have sample data that you can use to test your SQL queries and see how joins work in your application.

_Important Note:_ Ensure that your PostgreSQL server is running and that the connection details in your .env file are accurate before running these commands.

## Contact

If you have any questions or feedback, feel free to contact me:

- Mohammad Hossain - [Linkedin](https://www.linkedin.com/in/hossain1011/) - fshossain10@gmail.com

[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://www.linkedin.com/in/hossain1011/
