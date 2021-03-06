const userService = require('../../services/user.service');

module.exports = function (req, res) {
    userService.getById(req.params._id)
        .then(user => {
            if (user) {
                res.send(user)
            } else {
                res.sendStatus(404);
            }
        })
        .catch(err => {
            res.status(400).send(err);
        });
};
