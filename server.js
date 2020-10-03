// run npm install express
// require express
// create instance of express
// add a PORT
// listen on PORT

const express = require("express");
const path = require("path");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");


const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("./public"));



// set up routes
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/notes.html"));
});


app.get("/api/notes", (req, res) => {
    // res.json(db);
    // fs.readFile(path.join(__dirname, "/Develop/db/db.json"));
    fs.readFile("/db/db.json", "utf-8", (err, data) => {
        if (err) throw err;
        res.json(JSON.parse(data));
    })
});


// add new notes

app.post("/api/notes", (req, res) => {
    console.log(req.body);
    fs.readFile("/db/db.json", "utf8", (err, data) => {
        if (err) throw err;
        console.log(data);
        const notesInput = JSON.parse(data);
        req.body.id = uuidv4();
        notesInput.push(req.body);
        console.log(notesInput);
        fs.writeFile("/db/db.json", JSON.stringify(notesInput), "utf8", (err) => {
            if (err) throw err;
            res.json(notesInput);
        });
    })
});


app.listen(PORT, () => {
    console.log(`App is listening on http://localhost:${PORT}`);
});
