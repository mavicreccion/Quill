const User = require("../models/user.server.model.js");

exports.register = (req, res) => {
    let user = req.body;

    let entry = new User({
        name: user.name,
        password: user.password
    });

    entry.save((error, data) => {
        if(error) {
            console.error(error);
            return res.status(500).send();
        } else {
            return res.status(204).send();
        }
    });
}

exports.getUser = function(req, res) {
    console.log("Getting User");
    console.log(req.params.category);
    var query = {name: req.params.name};
    console.log({name: req.params.name} + query);
    User.find(query, function(err, result) {
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
