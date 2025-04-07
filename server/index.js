import app from "./app.js";
import connectDB from "./database/db.js";
import serverPort from "./dotenv/serverPort.js";


// Start the server - two arguments: port and a callback function
// The callback function is executed once the server is running
//now we can run or listen this server
app.listen(serverPort, () => {
  console.log("server is running at http://localhost:" + serverPort);
  // connect to MongoDB
  connectDB();
});

