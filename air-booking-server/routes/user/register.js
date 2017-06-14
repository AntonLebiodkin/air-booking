const userService = require('../../services/user.service');

module.exports = function (req, res) {
    userService.create(req.body)
        .then(() => {
            res.sendStatus(200);
        })
        .catch(err => {
            res.status(400).send(err);
        });
};