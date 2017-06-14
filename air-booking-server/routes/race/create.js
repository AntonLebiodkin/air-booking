const raceService = require('../../services/race.service');

module.exports = function (req, res) {
    console.log('create race server');
    raceService.create(req.body)
        .then((race) => {
            return res.send(race);
        })
        .catch(err => {
            res.status(400).send(err);
        });
};