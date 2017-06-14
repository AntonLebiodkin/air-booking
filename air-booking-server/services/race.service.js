const config = require('../config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const models = require('../models');
const mongoose = require('mongoose');
const Schema = require('mongoose').Schema;
const User = models.User;
const Race = models.Race;
const Destination = models.Destination;
const Place = models.Place;
const Ticket = models.Ticket;
const Plane = models.Plane;
const ObjectId = mongoose.Types.ObjectId;
// const User = require('../models/').User;

const service = {};

service.getAll = getAll;
service.getById = getById;
service.create = create;
service.update = update;
service.delete = _delete;
service.book = book;

module.exports = service;

function getAll() {
    return Race.find({})
        .populate('from')
        .populate('to')
        .populate('places')
        .populate('plane')
        .exec()
        .then(races => {
            return Promise.resolve(races);
        });
}

function getById(_id) {
    return Race.findById(_id)
        .populate('from')
        .populate('to')
        .populate('places')
        .populate('plane')
        .exec()
        .then(race => {
            return Promise.resolve(race)
        })
        .catch(err => {
            return Promise.reject(err.name + ': ' + err.message);
        });
}

function book(ticket) {
    var raceRef = null;
    var userRef = null;
    var placeRef = null;

    return User.findById(ticket.userId)
        .then((user) => {
            userRef = user;
            return Place.findById(ticket.placeChoosed._id)

        })
        .then(place => {
            if (userRef.money < place.price) {
                return Promise.reject("User has not enough money!");
            }

            if (place.available) {
                place.available = false;
                place.plusChild = ticket.placeChoosed.plusChild;
            } else {
                return Promise.reject("There is no available place with this id")
            }


            return place.save();
        })
        .then(place => {
            placeRef = place;
            return place.save();
        })
        .then(place => {
            userRef.money -= place.price;
            return userRef.save();
        })
        .then(user => {
            return Race.findById(ticket.raceId)
                .populate('places')
                .exec()
        })
        .then(race => {
            race.placesLeft--;
            return race.save();
        })
        .then(race => {
            return Ticket.create({
                user: ticket.userId,
                race: ticket.raceId,
                place: placeRef._id
            })
        })
        .then(ticket => {
            return Promise.resolve({ success: true});
        })
        .catch(error => {
            console.error(error);
        })
}



function create(race) {
    console.log('creating ', race);
    let fromDate = Date.parse(race.from.date + ' ' + race.from.time);
    let toDate = Date.parse(race.to.date + ' ' + race.to.time);
    let planeId = race.planeId;
    let from = {};
    let to = {};
    let economyPlaces = [];
    let businessPlaces = [];
    let firstPlaces = [];

    const economyPlacesCount = 250;
    const firstPlacesCount = 100;
    const businessPlacesCount = 50;

    return new Destination({
        city: race.from.city,
        country: race.from.country,
        country_ISO: race.from.country_ISO,
        time: fromDate
    }).save()
      .then(fromItem => {
          from = fromItem;
          return new Destination({
              city: race.to.city,
              country: race.to.country,
              country_ISO: race.to.country_ISO,
              time: toDate
          }).save()
      })
      .then(toItem => {
          to = toItem;

          let placeNumber = 1;

          let economyPrice = 50;
          let firstClass = 250;
          let businessClass = 300;

          for (let i = 1; i < economyPlacesCount; i++) {
            economyPlaces.push(
                new Place({
                    number: placeNumber,
                    class: 'economy',
                    available: true,
                    price: economyPrice
                }).save()
            );
            placeNumber++;
          }

          for (let i = 0; i < firstPlacesCount; i++) {
              firstPlaces.push(
                  new Place({
                      number: placeNumber,
                      class: 'first',
                      available: true,
                      price: firstClass
                  }).save()
              );
              placeNumber++;
          }

          for (let i = 0; i < businessPlacesCount; i++) {
              businessPlaces.push(
                  new Place({
                      number: placeNumber,
                      class: 'business',
                      available: true,
                      price: businessClass
                  }).save()
              );
              placeNumber++;
          }

          let places = economyPlaces.concat(firstPlaces).concat(businessPlaces);
          return Promise.all(places);
      }).then(places => {
          console.log('FUCKING PLANE ID ', planeId);
          console.log(ObjectId(planeId));
            return new Race({
                from: from,
                to: to,
                places: places,
                plane: ObjectId(planeId),
                placesLeft: economyPlacesCount + firstPlacesCount + businessPlacesCount,
                economyLeft: economyPlacesCount,
                firstLeft: firstPlacesCount,
                businessLeft: businessPlacesCount
            }).save()
      }).then(race => {
            console.log(race);
            return Promise.resolve(race);
      });
}

function update(_id, raceToUpdate) {
    delete raceToUpdate._id;
    delete raceToUpdate.places;
    return Destination.update({_id: raceToUpdate.from._id}, raceToUpdate.from)
        .exec()
        .then((res) => {
            console.log(res);
            return Destination.update({ _id: raceToUpdate.to._id }, raceToUpdate.to)
        })
        .then((res) => {
            console.log(res);
            return Promise.resolve();
        })
        .catch(err => {
            return Promise.reject(err.name + ': ' + err.message);
        });
}

function _delete(_id) {
    return Ticket.remove({
        race: _id
    })
        .then(() => {
            return Race.remove({ _id: _id })
                .exec()
                .then((result) => {
                    return Promise.resolve();
                })
                .catch((error) => {
                    return Promise.reject(error);
                });
        })

}