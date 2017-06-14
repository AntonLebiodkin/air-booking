const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RaceSchema = new Schema({
    from: { type: Schema.Types.ObjectId, ref: 'Destination'},
    to: { type: Schema.Types.ObjectId, ref: 'Destination' },
    places: [{ type: Schema.Types.ObjectId, ref: 'Place' }],
    plane: { type: Schema.Types.ObjectId, ref: 'Plane' },
    economyLeft: Number,
    firstLeft: Number,
    businessLeft: Number,
    placesLeft: Number
});

const Race = mongoose.model('Race', RaceSchema);
module.exports = Race;