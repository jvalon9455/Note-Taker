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

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.listen(PORT, () => {
    console.log(`App is listening on http://localhost:${PORT}`);
});

// set up routes
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/notes.html"));
});

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.post("/api/notes", (req, res) => {
    fs.readFile("db/db/json", "utf8", (err, data) =>{
        if (err) throw err;
        console.log(data);
        const notesInput = JSON.parse(data);
        notesInput.push(req.body);
        console.log(notesInput);
        fs.writeFile("./db/db.json", JSON.stringify(notesInput), (err) => {
            if (err) throw err;
        });
    });
});


app.delete("/api/notes/:id", (res, req) =>{

});