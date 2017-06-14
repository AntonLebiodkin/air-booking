const raceService = require('../../services/race.service');

module.exports = function (req, res) {
    raceService.delete(req.params._id)
        .then(() => {
            res.sendStatus(200);
        })
        .catch(error => {
            res.status(500).send(error);
        })
};