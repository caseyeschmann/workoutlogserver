// Required Endpoints
// The project should have the following endpoints:

// Endpoint	Verb	Description
// /user/register	POST	Allows a new user to be created with a username and password.
// /user/login	POST	Allows log in with an existing user.
// /log/	POST	Allows users to create a workout log with descriptions, definitions, results, and owner properties.
// /log/	GET	Gets all logs for an individual user.
// /log/:id	GET	Gets individual logs by id for an individual user.
// /log/:id	PUT	Allows individual logs to be updated by a user.
// /log/:id	DELETE	Allows individual logs to be deleted by a user.

let router = express.Router();
const User = require('../db').import('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// user/register
router.post('/register', function (req,res) {
    User.create ({
        email: req.body.user.email, 
       
        password: bcrypt.hashSync(req.body.user.password, 13)
    })
    .then(
        function createSuccess(user) {
           
            let token = jwt.sign({id: user.id, email: user.email}, process.env.JWT_SECRET, {expiresIn: 60*60*24});

            res.json({
                user: user,
                message: 'User succuessfully created!',
                sessionToken: token
            });
        }
    )
    .catch(err => res.status(500).json({error: err}))
});

// user/login

router.post('/login', function(req,res) {
   
    User.findOne({
        where: {
            email: req.body.user.email
        }
    })
    .then(function loginSuccess(user) {
        if (user) {

            bcrypt.compare(req.body.user.password, user.password, function (err, matches) {

            if (matches) {

            let token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: 60*60*24})

            res.status(200).json({
                user: user,
                message: "User successfully logged in!",
                sessionToken: token
            })

        } else {
            res.status(502).send({error: "Login Failed"});
        }
    });
        } else {
            res.status(500).json({error: "User does not exist"})
        }
    })
    .catch(err => res.status(500).json({error: err}))
});


// exporting routes

module.exports = router;