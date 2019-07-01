const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const app = express();
let PORT = 8080;
let TOKEN = '123';

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST");
    res.header("Access-Control-Allow-Headers", "Content-Type, Token");
    next();
});
app.use(bodyParser.json());

app.get('/database', (req, res) => {
    let database = require(`${__dirname}/data.json`);
    res.send(database);
});

app.post('/database', (req, res) => {
    if(req.headers['token'] === TOKEN){
        fs.writeFileSync(`${__dirname}/data.json`, JSON.stringify(req.body));
        console.log('Notes updated.');
        res.send('Updated');
    } else {
        console.log(`False token: ${req.headers['token']}`);
        res.send('Access denied!');
    }
});

app.listen(PORT, () => console.log(`Server starts on port ${PORT}.`));