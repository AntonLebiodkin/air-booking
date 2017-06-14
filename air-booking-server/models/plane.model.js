const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PlaneSchema = new Schema({
    brand: String,
    model: String,
    serialId: String,
    photoUrl: String,
});

const Plane = mongoose.model('Plane', PlaneSchema);
module.exports = Plane;