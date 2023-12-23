const app = require("./app");

const { port } = require("./config");
const pool = require("./pool");
const { insertData, createQuery, dropTables } = require("./query/query");

async function main() {
  try {
    pool.connect((error) => {
      if (error) {
        console.log(`error occurred while connecting. ${error}`);
      } else {
        console.log("connection created with DB successfully");
        // Uncomment the lines below if you want to execute these functions on startup.
        // createQuery();
        // insertData();
        // dropTables();
      }
    });

    app.listen(port, () => {
      console.log(`app listening on port ${port} | http://localhost:${port}`);
    });
  } catch (error) {
    console.log("Failed to connect", error);
  }
}

main();
