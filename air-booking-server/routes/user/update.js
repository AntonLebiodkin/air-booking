const userService = require('../../services/user.service');

module.exports = function (req, res) {
    userService.update(req.params._id, req.body)
        .then(() => {
            res.status(200).send({ "ok": "true" });
        })
        .catch(err => {
            res.status(400).send(err);
        });
};