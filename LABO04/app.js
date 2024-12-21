"use strict";

const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const sqlite3 = require("sqlite3").verbose();
const sqlite = require("sqlite");

const formValidator = require("./middlewares/formValidator");
const couriersRouter = require("./routes/couriers");
const faviconRouter = require("./routes/favicon");

const app = express();

(async () => {
    try {
        module.exports.db = await sqlite.open({ filename: "./couriers.db", driver: sqlite3.Database });
    }
    catch (error) {
        console.error("Failed to initialize the database", error);
        process.exit(1);
    }
})();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", faviconRouter);
app.use("/couriers/add", formValidator);
app.use("/couriers", couriersRouter);

app.use((req, res, next) => {
    next(createError(404));
});

app.use((err, req, res, next) => {
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};

    res.status(err.status || 500);
    res.render("error");
});

module.exports = app;
