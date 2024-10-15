require("dotenv").config();
const http = require("http");
const app = require("./app");
const { connectDb } = require("./db");

const server = http.createServer(app);

const main = async () => {
  try {
    await connectDb();
    server.listen(process.env.PORT || 4000, () => {
      console.log(`Server is running on port ${process.env.PORT}`);
    });
  } catch (e) {
    console.log("Database Error");
    console.log(e);
  }            
};
main();
