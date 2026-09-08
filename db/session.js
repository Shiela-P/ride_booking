const { loadEnvFile } = require('node:process');
const express = require('express');
const mongoose = require('mongoose');

const app = express();

loadEnvFile();

// TODO: Store conection string in more secure way
// connection string to allow connection to MongoDB
const dbURI = process.env.CONNECTION_STRING;

// Connecting to database
mongoose.connect(dbURI).then((result) => {
    app.listen(3000);
    console.log('conected to database');
}).catch((err) => console.log(err));

module.exports = mongoose;