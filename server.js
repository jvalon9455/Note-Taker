// run npm install express
// require express
// create instance of express
// add a PORT
// listen on PORT

const express = require("express");
const path = require("path");
const fs = require("fs");


const app = express();
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`App is listening on http://localhost:${PORT}`);
});

// set up routes
