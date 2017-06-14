const userService = require('../../services/user.service');

module.exports = function (req, res) {
    userService.getAll()
        .then(users => {
            res.send(users);
        })
        .catch(err => {
            res.status(400).send(err);
        });
};