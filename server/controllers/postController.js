function addPost(req, res) {
    const {postInfo, postTitle} = req.body;
    const db = req.app.get("db");
    db.getIdViaUsername(req.session.user.username).then(id => {
        let userID = id[0].id;
        db.addPost(userID, postTitle, postInfo).then(() => {
            res.sendStatus(200)
        })
    })
} 

function getPastPosts(req, res) {
    const db = req.app.get("db");
    db.getPastPosts(req.session.user.username).then(posts => {
        res.status(200).json(posts);
    })
}

function getAllPosts(req, res) {
    const db = req.app.get("db");
    db.getPosts().then(posts => {
        res.status(200).json(posts);
    })
}

function editPost(req, res) {
    const {id} = req.params;
    const {title, info} = req.body;
    const db = req.app.get("db");
    db.updatePost(title, info, id).then(() => {
        db.getPastPosts(req.session.user.username).then(posts => {
            res.status(200).json(posts);
        })
        // console.log(posts);
    })
}

module.exports = {
    addPost,
    getPastPosts,
    getAllPosts,
    editPost
}