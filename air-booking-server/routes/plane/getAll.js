const planeService = require('../../services/plane.service');

module.exports = function (req, res) {
    planeService.getAll()
        .then((planes) => {
            return res.send(planes);
        })
        .catch(err => {
            res.status(400).send(err);
        });
};