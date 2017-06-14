const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    email: String,
    hash: String,
    firstName: String,
    lastName: String,
    birthDate: String,
    permissions: Array,
    money: Number
});

UserSchema.pre('save', function(next) {
    if (!this.permissions || !this.permissions.length) {
        this.permissions = ['user'];
    }
    if (!this.money) {
        this.money = 0;
    }
    next();
});

UserSchema.met

const User = mongoose.model('User', UserSchema);
module.exports = User;