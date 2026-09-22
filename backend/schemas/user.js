const mongoose = require('../db/session');

const UserSchema = new mongoose.Schema({
    firstName : String,
    lastName : String,
    userName: String,
    password: String,
    bookings: [String],
    isActive: Boolean
})

const User = mongoose.model('User', UserSchema);

module.exports = User;