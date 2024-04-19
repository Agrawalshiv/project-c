const express = require('express');
const connectDB = require('./db/db');
const routes = require('./routes/routes');
const cors = require('cors'); 
const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 8080;

// Connect to MongoDB
connectDB();

app.use(cors({ origin: true, credentials: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/api', routes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
