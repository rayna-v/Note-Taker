const express = require('express');
const path = require('path');
const db = require('./db/db.json');
const fs = require('fs');
const { json } = require('express');
// const outputPath = path.join(db_DIR, 'db.json')
// const render = require("./public/assets/js/index");

// Sets up the Express App

const app = express();
const PORT = process.env.PORT || 3001;

// Sets up the Express app to handle data parsing
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const newNotes = [];

function writeToFile(fileName, newNotes) {
    let fileContent = render(newNotes);
    fs.writeFile(db, fileContent, (err) => {
        if (err) throw err;
        console.log("Success")
    })
}

app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'public/index.html')));

app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, 'public/notes.html')));

app.get('/api/notes', (req, res) => {
    // console.log(db);
    fs.readFile("./db/db.json", 'utf8', (err, data) => {
        if (err) console.log(err);
        // console.log(data);
        const parsed = JSON.parse(data);
        res.send(parsed);
    })
});


app.post("/api/notes", (req, res) => {

    const newNote = req.body;
    console.log(newNote);
    newNotes.push(newNote);
    console.log(newNotes);
    res.json(newNotes);
    const fileName = `db.json`;
    writeToFile(fileName, newNotes)
});


app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));
