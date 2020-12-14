// requiring necessary modules
const express = require('express');
const path = require('path');
const db = require('./db/db.json');
const fs = require('fs');
const { json } = require('express');
const cuid = require('cuid');

// Sets up the Express App
const app = express();
const PORT = process.env.PORT || 3001;

// Sets up the Express app to handle data parsing
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// array of objects containing notes from json file
let newNotes = db;

// writes the notes to the db.json file
function writeToFile(newNotes) {
    fs.writeFile('./db/db.json', newNotes, (err) => {
        if (err) throw err;
        console.log("Success")
    })
}
//CREATE 
// function to create new notes and write to db.json file
app.post("/api/notes", (req, res) => {
    req.body.id = cuid();
    const newNote = req.body;
    newNotes.push(newNote);
    console.log(newNotes);
    writeToFile(JSON.stringify(newNotes));
    res.json(newNotes);
});

// READ 
// function to view index.html
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'public/index.html')));
// function to view notes.html
app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, 'public/notes.html')));
// function to view api/notes from db.json file
app.get('/api/notes', (req, res) => {
    fs.readFile("./db/db.json", 'utf8', (err, data) => {
        if (err) console.log(err);
        const parsed = JSON.parse(data);
        res.send(parsed);
    })
});

// UPDATE **not complete**
// function to update notes
// app.put(`/api/notes/:id`, (req, res) => {

//     console.log("updating note")
// });

// DELETE
// function to delete notes 
app.delete(`/api/notes/:id`, (req, res) => {
    console.log("deleting");
    fs.readFile("./db/db.json", 'utf8', (err, data) => {
        newNotes = JSON.parse(data).filter((val) => {
            console.log(`Request ID: ` + req.params.id + `|| Note ID: ` + val.id)
            return val.id !== req.params.id;
        })
        if (err) console.log(err);
        res.send(newNotes);
        writeToFile(JSON.stringify(newNotes));
    })
    console.log()
})

// function to bind/listen the connections on local host and port
app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));
