'use strict';

const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const logic = require("./functions");

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'form.html'));
});

app.post('/submit-form', (req, res) => {
    const {name, email, duration, password} = req.body;
    let invalidFields = [];

    if (!logic.isNameValid(name)) {
        invalidFields.push('name');
    }
    if (!logic.isEmailValid(email)) {
        invalidFields.push('email');
    }
    if (!logic.isDurationValid(duration)) {
        invalidFields.push('duration');
    }
    if (!logic.isPasswordValid(password)) {
        invalidFields.push('password');
    }

    if (invalidFields.length > 0) {
        res.render('invalid', {invalidFields});
    } else {
        let dateUntil = new Date();
        dateUntil.setDate(dateUntil.getDate() + parseInt(duration));
        dateUntil = dateUntil.getDate() + ' ' + dateUntil.toLocaleString('default', {month: 'short'}) + ' ' + dateUntil.getFullYear();
        res.render('result', {name, email, dateUntil});
    }
});

app.get('/favicon.ico', (req, res) => res.status(204));

app.use(function (req, res) {
    if(logic.isAnyFieldEmpty(req.body)) {
        res.status(400).send('All fields are required');
    }
});

app.use(function (req, res, next) {
    next(createError(404));
});

app.use(function (err, req, res) {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
