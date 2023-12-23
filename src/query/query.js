const pool = require("../pool");

const createQuery = () => {
  const createTablesQuery = `
    CREATE TABLE Customers (
      CustomerID INT PRIMARY KEY UNIQUE,
      Name VARCHAR(255),
      Email VARCHAR(255)
    );

    CREATE TABLE Products (
      ProductID INT PRIMARY KEY UNIQUE,
      ProductName VARCHAR(255),
      Price DECIMAL(10, 2)
    );

    CREATE TABLE Orders (
      OrderID INT PRIMARY KEY UNIQUE,
      CustomerID INT,
      OrderDate DATE,
      FOREIGN KEY (CustomerID) REFERENCES Customers(CustomerID)
    );

    CREATE TABLE OrderDetails (
      OrderID INT,
      ProductID INT,
      Quantity INT,
      PRIMARY KEY (OrderID, ProductID),
      FOREIGN KEY (OrderID) REFERENCES Orders(OrderID),
      FOREIGN KEY (ProductID) REFERENCES Products(ProductID)
    );
  `;

  pool.query(createTablesQuery, (error) => {
    if (error) {
      console.log(`Error occurred while creating tables: ${error}`);
    } else {
      console.log("Tables created successfully");
    }
  });
};

const insertData = () => {
  const insertDataQuery = `
    INSERT INTO Customers (CustomerID, Name, Email)
    VALUES
      (1, 'Korim', 'korim@email.com'),
      (2, 'Helal', 'helal@email.com'),
      (3, 'Zabed', 'zabed@email.com');
      
    INSERT INTO Products (ProductID, ProductName, Price)
    VALUES
      (207, 'Laptop', 55000),
      (208, 'Smartphone', 25000),
      (209, 'Tablet', 15000);

    INSERT INTO Orders (OrderID, CustomerID, OrderDate)
    VALUES
      (104, 1, '2023-01-01'),
      (105, 2, '2023-01-02'),
      (106, 3, '2023-01-03');

    INSERT INTO OrderDetails (OrderID, ProductID, Quantity)
    VALUES
      (104, 208, 3),
      (105, 207, 1),
      (104, 207, 1),
      (106, 207, 1),
      (106, 208, 1),
      (106, 209, 1);
  `;

  pool.query(insertDataQuery, (error) => {
    if (error) {
      console.log(`Error occurred while inserting data: ${error}`);
    } else {
      console.log("Data inserted successfully");
    }
  });
};

const dropTables = () => {
  const dropTablesQuery = `
  DROP TABLE IF EXISTS OrderDetails;
  DROP TABLE IF EXISTS Orders;
  DROP TABLE IF EXISTS Products;
  DROP TABLE IF EXISTS Customers;
`;

  pool.query(dropTablesQuery, (error) => {
    if (error) {
      console.log(`Error occurred while dropping tables: ${error}`);
    } else {
      console.log("Tables dropped successfully");
    }
  });
};

module.exports = { createQuery, insertData, dropTables };
