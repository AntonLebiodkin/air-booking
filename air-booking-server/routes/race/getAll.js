const raceService = require('../../services/race.service');

module.exports = function (req, res) {
    raceService.getAll()
        .then(races => {
            if (!races) {
                races = [];
            }
            return res.send(races);
        })
        .catch(err => {
            res.status(400).send(err);
        });
};