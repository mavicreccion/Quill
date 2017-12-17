let jwt = require("jsonwebtoken");
let bcrypt = require("bcrypt");
let User = require("../models/user.server.model.js");

var admin = new User({
  name: "admin@test.com",
  password: "123"
});

admin.save(function(req, res, error) {
  if (error) {
    console.log(error);
    return;
  } else {
    console.log("Admin Created")
  }
});

exports.create = function(req, res) {

    let login = req.body || { name: "", password: "" };

    User.findPasswordHash(login.name)
        .then((hash) => {
            bcrypt.compare(login.password, hash)
                .then((success) => {
                    if(success) {
                        var payload = {
                            name: login.userId
                        }

                        var token = jwt.sign(payload, "secret", {
                            expiresIn: 1440
                        });

                        res.set("Authorization", `Bearer ${token}`);
                        return res.status(204).send();
                    } else {
                        return res.status(401).send();
                    }
                })
                .catch((error) => {
                    console.log(error);
                    return res.status(401).send();
                });
        })
        .catch((error) => {
            console.log(error);
            return res.status(401).send();
        });
}
