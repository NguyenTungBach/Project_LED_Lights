const mongoose = require('mongoose'); // Nhúng thư viện mongoose

module.exports = mongoose.model('Contact', {
    name: String,
    email: String,
    subject: String,
    messeage: String
});