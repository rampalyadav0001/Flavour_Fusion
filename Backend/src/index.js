// Import the dotenv module to load environment variables from a.env file
import dotenv from "dotenv";

// Import the connectDB function from the db/index.js file
import connectDB from "./db/index.js";

import app from "./app.js";

// Load the environment variables from the.env file located in the project root
dotenv.config({
    path: './.env'
});





// Connect to the MongoDB database using the connectDB function
connectDB()
 .then(() => {
    // Start the Express server and listen on the specified port or default to 8000
    app.listen(process.env.PORT || 8000, () => {
      console.log(`Server is running at port : ${process.env.PORT}`);
    });
  })
  // Log an error message if the MongoDB connection fails
 .catch((err) => {
    console.log("MONGO db connection failed!!!", err);
  });