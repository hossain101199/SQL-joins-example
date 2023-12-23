// Import required modules
const express = require("express");
const pool = require("./pool");

// Create an instance of the Express application
const app = express();

// Handle GET request to the root endpoint "/"
app.get("/", async (req, res) => {
  // Set a constant value for ProductID
  const ProductID = 208;

  // Define the SQL query to retrieve order details based on ProductID
  const OrderDetailsQuery = `SELECT * FROM OrderDetails WHERE ProductID = $1`;
  const OrderDetailsSearchValues = [ProductID];

  // Execute the query using the database connection pool
  const { rows: OrderDetails } = await pool.query(
    OrderDetailsQuery,
    OrderDetailsSearchValues
  );

  // Create a response object containing the retrieved order details
  const result = { OrderDetails };

  // Send the response as JSON
  res.json(result);
});

// Handle GET request to the "/details" endpoint
app.get("/details", async (req, res) => {
  // Set constant values for ProductID and OrderID
  const ProductID = 208;
  const OrderID = 106;

  // Define the SQL query to retrieve order details based on ProductID and OrderID
  const OrderDetailsQuery = `SELECT * FROM OrderDetails WHERE ProductID = $1 AND OrderID = $2`;
  const OrderDetailsSearchValues = [ProductID, OrderID];

  // Execute the query using the database connection pool
  const {
    rows: [OrderDetails],
  } = await pool.query(OrderDetailsQuery, OrderDetailsSearchValues);

  // Define the SQL query to retrieve product details based on ProductID
  const ProductQuery = `SELECT * FROM Products WHERE ProductID = $1`;
  const ProductSearchValues = [ProductID];

  // Execute the query using the database connection pool
  const {
    rows: [ProductDetails],
  } = await pool.query(ProductQuery, ProductSearchValues);

  // Retrieve orderID from OrderDetails and define the SQL query to retrieve orderInfo
  const orderID = OrderDetails.orderid;
  const OrderQuery = `SELECT * FROM Orders WHERE OrderID = $1`;
  const OrdersSearchValues = [orderID];

  // Execute the query using the database connection pool
  const {
    rows: [orderInfo],
  } = await pool.query(OrderQuery, OrdersSearchValues);

  // Retrieve customerID from Order and define the SQL query to retrieve customer details
  const customerID = orderInfo.customerid;
  const customerQuery = `SELECT * FROM Customers WHERE CustomerID = $1`;
  const customerIDSearchValues = [customerID];

  // Execute the query using the database connection pool
  const {
    rows: [customerDetails],
  } = await pool.query(customerQuery, customerIDSearchValues);

  // Create a response object containing the retrieved details
  const result = { OrderDetails, ProductDetails, orderInfo, customerDetails };

  // Send the response as JSON
  res.json(result);
});

// Handle GET request to the "/details/with-join" endpoint
app.get("/details/with-join", async (req, res) => {
  // Set constant values for ProductID and OrderID
  const ProductID = 208;
  const OrderID = 106;

  // Define the SQL query to retrieve order details, product information, customer information, and order information
  const OrderDetailsQuery = `
  SELECT * 
  FROM OrderDetails 
  JOIN Products ON OrderDetails.ProductID = Products.ProductID 
  JOIN Orders ON OrderDetails.OrderID = Orders.OrderID 
  JOIN Customers ON Orders.customerid = Customers.CustomerID 
  WHERE OrderDetails.ProductID = $1 AND OrderDetails.OrderID = $2`;

  // Set the parameterized values for ProductID and OrderID in the SQL query
  const OrderDetailsSearchValues = [ProductID, OrderID];

  // Execute the query using the database connection pool
  const {
    rows: [OrderDetails],
  } = await pool.query(OrderDetailsQuery, OrderDetailsSearchValues);

  // Send the response as JSON containing the joined information
  res.json(OrderDetails);
});

// Export the app module for use in other parts of the application
module.exports = app;
