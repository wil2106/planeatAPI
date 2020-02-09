const User = require('../models').user;

module.exports = {
    create(req, res) {
        return User
        .create({
            name: req.body.name,
            password: req.body.password,
        })
        .then(user => res.status(201).send(user))
        .catch(error => res.status(400).send(error));
    },
};