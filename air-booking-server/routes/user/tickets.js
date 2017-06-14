const userService = require('../../services/user.service');

module.exports = function (req, res) {
    userService.getTickets(req.params.id)
        .then(tickets => {
            if (!tickets) {
                tickets = [];
            }
            res.send(tickets);
        })
        .catch(err => {
            res.status(400).send(err);
        });
};