const raceService = require('../../services/race.service');

module.exports = function (req, res) {
    raceService.getById(req.params._id)
        .then(race => {
            if (race) {
                res.send(race)
            } else {
                res.sendStatus(404);
            }
        })
        .catch(err => {
            res.status(400).send(err);
        });
};