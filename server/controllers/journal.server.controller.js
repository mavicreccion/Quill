const Journal = require("../models/journal.server.model.js");

exports.getAll = function(req, res) {

    var query = {userId: req.params.userId};

    Journal.find(query, function(err, result) {
        console.log("Finding");
        console.log(result);
        if(err) {
            console.log(err);
            return res.status(500).send();
        } else {
            return res.status(200).send(result);
        }
    });
}

exports.getById = function(req, res) {

    Journal.findById(req.params.journalId, function(err, journal) {
        if(err) {
            console.log(err);
            return res.status(500).send();
        } else {
            return res.status(200).send(journal);
        }
    });
}

exports.create = function(req, res) {
    let journal = new Journal(req.body);

    journal.save((err, journal) => {
        if(err) {
            console.log(err);
            return res.status(500).send();
        } else {
            return res.status(204).send();
        }
    });
}

exports.delete = function(req, res) {
    console.log(req.params.journalId);

    Journal.findByIdAndRemove(req.params.journalId, function(err, data) {
        if(!err) {
            res.status(204).send();
        } else {
            res.status(500).send();
        }
    });
}

exports.update = function(req, res) {
    console.log(req.params.journalId);
    let journal = {
        title: req.body.title,
        entry: req.body.entry,
        category: req.body.category
    }

    Journal.findByIdAndUpdate(req.params.journalId, journal, function(err, data) {
        if(!err) {
            res.status(204).send();
        } else {
            res.status(500).send();
        }
    })
}

exports.filter = function(req, res) {
    console.log("Filtering");
    console.log(req.params.category);
    var query = {userId: req.params.userId, category: req.params.category};
    Journal.find(query, function(err, result) {
        console.log("Finding");
        console.log(result);
        if(err) {
            console.log(err);
            return res.status(500).send();
        } else {
            return res.status(200).send(result);
        }
    });
}
