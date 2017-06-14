const raceService = require('../../services/race.service');

module.exports = function (req, res) {
    raceService.book(req.body)
        .then((ticket) => {
            return res.send(ticket);
        })
        .catch(err => {
            res.status(400).send(err);
        });
};