const userService = require('../../services/user.service');

module.exports = function (req, res) {
    userService.delete(req.params._id)
        .then(() => {
            res.sendStatus(200);
        })
};