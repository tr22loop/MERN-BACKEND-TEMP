require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const hpp = require("hpp");
const rateLimit = require("express-rate-limit");

// DATABASE CONNECTION
mongoose
    .connect(process.env.MONGO_URI)
    .then((res) => {
        console.log("Database Connected");
    })
    .catch((err) => {
        console.log(err);
    });


const app = new express();

app.use(cookieParser());
app.use(mongoSanitize());
app.use(xss());
app.use(hpp());


app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

const limiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 3000 });

app.use(limiter);
app.set("etag", false);

module.exports = app;
