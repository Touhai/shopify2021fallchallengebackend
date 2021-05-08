const express = require('express');
const apiRoutes = require("./api-routes");
const mongoose = require("mongoose");
const cors = require('cors');
require('dotenv').config()




const app = express();
const port = 3000;

//Enable CORS
app.use(cors());

//Grab URI for secrets file
const URI = process.env.DB_URI;



app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})

// Importing the database routes
app.use('/api', apiRoutes);

// Connecting to Database
let db = mongoose.connect(URI, { useNewUrlParser: true });

if (!db)
    console.log("Error connecting db")
else
    console.log("Db connected successfully")