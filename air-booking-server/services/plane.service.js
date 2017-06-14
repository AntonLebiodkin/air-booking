const models = require('../models');
const Schema = require('mongoose').Schema;
const Plane = models.Plane;

const service = {};

service.create = create;
service.getAll = getAll;
service.getById = getById

module.exports = service;

function create(plane) {
    return new Plane(plane).save()
        .then(plane => {
            return Promise.resolve(plane);
        })
        .catch(error => {
            return Promise.reject(error);
        })
}

function getAll() {
    return Plane.find({})
        .exec()
        .then(planes => {
            return Promise.resolve(planes);
        })
        .catch(error => {
            return Promise.reject(error);
        })
}

function getById(_id) {
    return Plane.findById(_id)
        .exec()
        .then(plane => {
            return Promise.resolve(plane)
        })
        .catch(err => {
            return Promise.reject(err.name + ': ' + err.message);
        });
}