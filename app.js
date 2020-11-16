require('dotenv').config();

let express = require('express');
let app = express();

let sequelize = require('./db');

let user = require('./controllers/usercontroller');
let log = require('./controllers/logcontroller');

sequelize.sync();
// {force: true}

app.use(express.json());

app.use('/user', user);
app.use('/log', log);

// this goes to bottom
app.listen(3000, function(){
    console.log('App is listening on port 3000');
})



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