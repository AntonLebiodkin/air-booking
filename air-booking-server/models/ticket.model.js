const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TicketSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User'},
    race: { type: Schema.Types.ObjectId, ref: 'Race'},
    place: { type: Schema.Types.ObjectId, ref: 'Place'}
});

const Ticket = mongoose.model('Ticket', TicketSchema);
module.exports = Ticket;