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

const newNotes = db;

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

    fs.readFile("./db/db.json", 'utf8', (err, data) => {
        if (err) console.log(err);
        const parsed = JSON.parse(data);
        res.send(parsed);
    })

});

app.put(`/api/notes/:id`, (req, res) => {
    //     res.json(res);
    console.log("updating note")
});
app.post("/api/notes", (req, res) => {
    req.body.id = cuid();
    const newNote = req.body;

    newNotes.push(newNote);
    console.log(newNotes);
    writeToFile(JSON.stringify(newNotes));
    res.json(newNotes);

});

app.delete(`/api/notes/:id`, (req, res) => {
    console.log("deleting")
})
app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));
