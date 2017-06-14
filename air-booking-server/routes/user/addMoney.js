const userService = require('../../services/user.service');

module.exports = function (req, res) {
    userService.addMoney(req.params._id, req.body.amount)
        .then(user => {
            res.status(200).send(user);
        })
        .catch(error => {
            res.status(500).send(error);
        })
};