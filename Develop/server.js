const express = require('express');
const path = require('path');
const db = require('./db/db.json');
const fs = require('fs');
const { json } = require('express');


// Sets up the Express App

const app = express();
const PORT = process.env.PORT || 3001;

// Sets up the Express app to handle data parsing
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());



app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'public/index.html')));

app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, 'public/notes.html')));

app.get('/api/notes', (req, res) => {
    console.log(db);
    fs.readFile("./db/db.json", 'utf8', (err, data) => {
        if (err) console.log(err);
        console.log(data);
        const parsed = JSON.parse(data);
        res.send(parsed);
    })
    // res.json(db);
});


app.post("/api/notes", (req, res) => {

    // req.body.id =

    //     console.log(newTable);

    // if (tables.length < 5) {
    //     tables.push(newTable);
    //     res.json(newTable);
    // } else {
    //     waitlist.push(newTable)
    //     res.json(waitlist)
    // }


});


app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));
