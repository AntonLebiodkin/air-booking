const userService = require('../../services/user.service');

module.exports = function (req, res) {
    userService.authenticate(req.body.email, req.body.password)
        .then(user => {
            if (user) {
                return res.json(user)
            } else {
                return res.status(401).send('Username or password is incorrect');
            }
        })
        .catch(err => {
            return res.status(400).json({ error: err });
        })
};