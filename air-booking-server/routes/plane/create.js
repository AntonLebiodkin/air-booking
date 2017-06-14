const planeService = require('../../services/plane.service');

module.exports = function (req, res) {
    planeService.create(req.body)
        .then((plane) => {
            return res.send(plane);
        })
        .catch(err => {
            res.status(400).send(err);
        });
};