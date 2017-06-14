const raceService = require('../../services/race.service');

module.exports = function (req, res) {
    raceService.update(req.params._id, req.body)
        .then((result) => {
            return res.status(200).send({ "ok": "true" });
        })
        .catch(err => {
            return res.status(400).send(err);
        });
};