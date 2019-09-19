const bcrypt = require ("bcryptjs");

module.exports = {
    registerUser: function(req, res) {
        //make sure no one has taken the username or email
        //hash the password
        //insert into the db
        //place the user on session
        //send back a response
        const {username, password, email, firstName, lastName, isEmployer} = req.body;
        const db = req.app.get("db");
        db.checkForTakenUsernameOrEmail(username, email).then(count => {
            if(+count[0].count === 0) {
                bcrypt.hash(password, 12).then(hash => {
                    db.registerUser(firstName, lastName, email, isEmployer, username, hash).then(() => {
                        req.session.user = {
                            username,
                            firstName,
                            lastName,
                            email,
                            isEmployer
                        }
                        res.status(200).json(req.session.user);
                    })
                })
            } else {
                res.status(409).json({
                    error: "Username or Email already Exists. Please Log in with your account"
                })
            }
        })
    },
    loginUser: function(req, res) {
        const {username, password} = req.body;
        const db = req.app.get("db");
        db.getPasswordViaUsername(username).then(user => {
            let hash = user[0].password;
            // const {firstName, lastName, email, isEmployer} = user[0];
            console.log(user[0]);
            bcrypt.compare(password, hash).then(areSame => {
                if(areSame) {
                    req.session.user = {
                        username,
                        firstName: user[0].first_name,
                        lastName: user[0].last_name,
                        email: user[0].email,
                        isEmployer: user[0].is_employer
                    }
                    res.status(200).json(req.session.user);
                } else {
                    res.status(401).json({
                        error: "Username or Password incorrect"
                    })
                }
            })
        })
    }
}