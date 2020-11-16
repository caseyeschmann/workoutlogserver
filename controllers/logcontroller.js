
let express = require('express');
let router = express.Router();
let validateSession = require('../middleware/validate-session');


// /log/	POST	Allows users to create a workout log with descriptions, definitions, results, and owner properties.

router.post('/', validateSession, (req, res) => {
    const postLog = {
        descriptions: req.body.log.title,
        definitions: req.body.log.date,
        results: req.body.log.entry,
        owner_id: req.log.owner_id
    }

    log.create(postLog)
        .then(log => res.status(200).json(log))
        .catch(err => res.status(500).json({error: err}))
})

// /log/	GET	Gets all logs for an individual user.

router.get("/", (req,res) => {
    log.findAll()
    .then(logs => res.status(200).json(logs))
    .catch(err => res.status(500).json({error:err}))
});


// /log/:id	GET	Gets individual logs by id for an individual user.

router.get("/:id", validateSession, (req,res) => {

    let id = req.user.id
    log.findAll({
        where: {owner_id: id}
    })
        .then(logs => res.status(200).json(logs))
        .catch(err => res.status(500).json ({error: err}))
});


// /log/:id	PUT	Allows individual logs to be updated by a user.

router.put("/log/:id", validateSession, function (req,res) {

    const updateLog = {
        descriptions: req.body.log.title,
        definitions: req.body.log.date,
        results: req.body.log.entry,
        owner_id: req.log.owner_id
    };

    const query = { where: {id: req.params.owner_id, owner: req.user.owner_id} };

    log.update(updateLog, query)
        .then((logs) => res.status(200).json(logs))
        .catch((err) => res.status(500).json({ error: err }));
});


// /log/:id	DELETE	Allows individual logs to be deleted by a user.

router.delete("/:id", validateSession, function (req,res) {

    const query = { where: { id: req.params.owner_id, owner: req.user.owner_id} };

    log.destroy(query)
        .then(() => res.status(200).json({ message: "Log Removed"}))
        .catch((err) => res.status(500).json({ error: err }));
});

module.exports = router;