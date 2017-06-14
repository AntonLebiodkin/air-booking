const config = require('../config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;
const models = require('../models/');
const User = models.User;
const Ticket = models.Ticket;

const service = {};

service.authenticate = authenticate;
service.getAll = getAll;
service.getById = getById;
service.create = create;
service.update = update;
service.delete = _delete;
service.emailExists = emailExists;
service.getTickets = getTickets;
service.addMoney = addMoney;

module.exports = service;

function authenticate(email, password) {
    return User.findOne({ email: email })
        .exec()
        .then(user => {
            if (user && bcrypt.compareSync(password, user.hash)) {
                return Promise.resolve({
                    _id: user._id,
                    email: user.email,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    birthDate:user.birthDate,
                    token: jwt.sign({ sub: user._id }, config.secret)
                })
            } else {
                return Promise.resolve();
            }
        });
}

function getTickets(userId) {
    return Ticket.find({
        user: userId
    })
        .populate({
            path: "race",
            populate : { path: "from"}
        })
        .populate({
            path: "race",
            populate : { path: "to"}
        })
        .populate({
            path: "race",
            populate : { path: "plane"}
        })
        .populate('place')
        .exec()
        .then(tickets => {
            console.log(tickets)
            return Promise.resolve(tickets);
        }).catch(err => {
            return Promise.reject(err.name + ': ' + err.message);
        });
}

function emailExists(email) {
    return User.findOne({ email: email })
        .exec()
        .then(user => {
            return Promise.resolve(user);
        })
        .catch(err => {
            return Promise.reject(err.name + ': ' + err.message);
        })
}

function getAll() {
    return User.find({})
        .exec()
        .then(users => {
            users = _.map(users, (user) => {
                return _.omit(user, 'hash');
            });
            return Promise.resolve(users);
        });
}

function getById(_id) {
    return User.findById(_id)
        .exec()
        .then(user => {
            if (user) {
                return Promise.resolve(_.omit(user, 'hash'));
            } else {
                return Promise.resolve();
            }
        })
        .catch(err => {
            return Promise.reject(err.name + ': ' + err.message);
        })
}

function create(userProfile) {
    return User.findOne({ email: userProfile.email })
        .exec()
        .then(user => {
            if (user) {
                return Promise.reject('Email ' + userProfile.email + ' is already taken');
            } else {
                createUser();
            }
        });

    function createUser() {
        const user = _.omit(userProfile, 'password');
        user.hash = bcrypt.hashSync(userProfile.password, 10);

        const userDocument = new User(user).save()
            .catch(err => {
                return Promise.reject(err.name + ': ' + err.message);
            })
    }
}

function update(_id, userProfile) {
    return User.findById(_id)
        .exec()
        .then(user => {
            if (user.email !== userProfile.email) {
                return User.findOne({ email: userProfile.email}).exec();
            } else {
                updateUser();
            }
        })
        .then(user => {
            if (user) {
                return Promise.reject('Email ' + req.body.email + ' is already taken');
            } else {
                updateUser();
            }
        });

    function updateUser() {
        const set = {
            firstName: userProfile.firstName,
            lastName: userProfile.lastName,
            email: userProfile.email,
        };

        if (userProfile.password) {
            set.hash = bcrypt.hashSync(userProfile.password, 10);
        }

        return User.findById(_id)
            .exec()
            .then(user => {
                Object.assign(user, set);
                user.save();
            })
            .then(user => {
                return Promise.resolve();
            })
            .catch(err => {
                return Promise.reject(err.name + ': ' + err.message);
            })
    }
}

function addMoney(id, amount) {
    if (amount <= 0) return;
    return User.findById(id)
        .then(user => {
            if (!user.money) {
                user.money = amount
            } else {
                user.money += amount;
            }
            return user.save();
        })
        .then(user => {
            return Promise.resolve(user);
        })
        .catch(error => {
            return Promise.reject(error);
        })
}

function _delete() {
    return User.remove({ _id: _id})
        .then(() => {
            return Promise.resolve();
        })
        .catch(() => {
            return Promise.reject();
        });
}