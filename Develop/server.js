const express = require('express');
const path = require('path');
const db = require('./db/db.json');
const fs = require('fs');
const { json } = require('express');
const cuid = require('cuid');
// const outputPath = path.join(db_DIR, 'db.json')
// const render = require("./public/assets/js/index");

const newNotes = [];
// Sets up the Express App
// console.log(cuid())
const app = express();
const PORT = process.env.PORT || 3001;

// Sets up the Express app to handle data parsing
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// console.log(typeof (db))
// const newNotes = JSON.parse(db);
// console.log(typeof (newNotes))

// const renderNotes = () => {
//     fs.readFile('./db/db.json', 'utf8', (err, data) => {
//         if (err) console.log(err);
//         // const newNotes = 
//         for (x in data) {
//             console.log(x);
//         }
//     })
// }
// renderNotes();
function writeToFile(newNotes) {
    // let fileContent = render(newNotes);
    fs.writeFile('./db/db.json', newNotes, (err) => {
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
    req.body.id = cuid();
    console.log(req.body.id);
    const newNote = req.body;
    console.log(newNote);
    newNotes.push(newNote);
    console.log(newNotes);
    writeToFile(JSON.stringify(newNotes));
    res.json(newNotes);



    app.delete(`/api/notes/${req.body.id}`, (req, res) => {
        res.json("Deleting")
    })
});
app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));
