const userService = require('../../services/user.service');

module.exports = function (req, res) {
    userService.emailExists(req.query.email)
        .then(user => {
            if (user) {
                return res.json({ exists: true})
            } else {
                return res.json({ exists: false});
            }
        })
        .catch(err => {
            return res.status(400).json({ error: err });
        });
};