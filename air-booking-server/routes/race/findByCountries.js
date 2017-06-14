const raceService = require('../../services/race.service');

module.exports = function (req, res) {
    raceService.getAll()
        .then(races => {
            if (!races) {
                races = [];
            }
            let fromCountry = req.query.fromCountry;
            let toCountry = req.query.toCountry;
            races = races.filter(race => {
                if (fromCountry && toCountry) {
                    return race.from.country === fromCountry && race.to.country === toCountry;
                } else if (fromCountry) {
                    return race.from.country === fromCountry
                } else if (toCountry) {
                    return race.to.country === toCountry;
                }
            });


            return res.send(races);
        })
        .catch(err => {
            res.status(400).send(err);
        });
};