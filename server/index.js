require("dotenv").config();
const express = require("express");
const massive = require("massive");
const session = require("express-session");
//controllers
const {registerUser, loginUser} = require("./controllers/authController");
const {addPost, getPastPosts, getAllPosts, editPost} = require("./controllers/postController")

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

app.post("/auth/register", registerUser)
app.post("/auth/login", loginUser)
app.get("/auth/user", (req, res) => {
    res.status(200).json(req.session.user);
})

app.post("/api/post", addPost)
app.get("/api/employer/posts", getPastPosts)
app.get("/api/posts", getAllPosts)
app.put("/api/post/:id", editPost)
app.delete("/api/post/:id", (req, res) => {
    const {id} = req.params;
    const db = req.app.get("db");

    db.deletePost(id).then(() => {
        db.getPastPosts(req.session.user.username).then(posts => {
            res.status(200).json(posts);
        })
    })
})

app.listen(5050, () => console.log(`Listening on Port 5050`));