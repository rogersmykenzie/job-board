require("dotenv").config();
const express = require("express");
const massive = require("massive");
const session = require("express-session");

const app = express();

app.use(express.json());

massive(process.env.CONNECTION_STRING).then(dbInstance => {
    app.set("db", dbInstance);
    console.log("Database Connected :)");
})

app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: process.env.SESSION_SECRET,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 3
    }
}))



app.listen(5050, () => console.log(`Listening on Port 5050`));