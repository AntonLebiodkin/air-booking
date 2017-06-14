const raceService = require('../../services/race.service');

module.exports = function (req, res) {
    raceService.getById(req.params._id)
        .then(race => {
            if (race) {
                let economyLeft = 0;
                let firstLeft = 0;
                let businessLeft = 0;
                let placesLeft = 0;
                for (let i = 0; i < race.places.length; i++) {
                    if (!race.places[i].available) continue;
                    if (race.places[i].class === 'economy') {
                        economyLeft++;
                    }
                    if (race.places[i].class === 'first') {
                        firstLeft++;
                    }
                    if (race.places[i].class === 'business') {
                        businessLeft++
                    }
                    placesLeft++;
                }
                race.economyLeft = economyLeft;
                race.firstLeft = firstLeft;
                race.businessLeft = businessLeft;
                race.placesLeft = placesLeft;
                return race.save().then(race => {
                    return res.send(race)
                });
            } else {
                res.sendStatus(404);
            }
        })
        .catch(err => {
            res.status(400).send(err);
        });
};