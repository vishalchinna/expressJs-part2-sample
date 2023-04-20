const express = require("express");
const { open } = require("sqlite");
const sqlite3 = require("sqlite3");
const path = require("path");
const dbpath = path.join(__dirname, "goodreads.db");
const app = express();
let db = null;

const initilizeDbAndServer = async () => {
  try {
    db = await open({
      filename: dbpath,
      driver: sqlite3.Database,
    });

    app.listen(3000, () => {
      console.log("Serverstarted");
    });
  } catch (e) {
    console.log(`Error occured ${e.message}`);
    process.exit(1);
  }
};
initilizeDbAndServer();

app.get("/books/", async (request, response) => {
  const getBookQuery = `
    SELECT * FROM book ORDER BY book_id
    `;
  const finalQuery = await db.all(getBookQuery);
  response.send(finalQuery);
});
