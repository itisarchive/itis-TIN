'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 8080;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'www')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'www', 'form.html'));
});

app.post('/submit-form', (req, res) => {
    const { name, email, password } = req.body;
    res.render('result', { name, email, password });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
