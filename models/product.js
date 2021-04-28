const mongoose = require('mongoose'); // Nhúng thư viện mongoose

module.exports = mongoose.model('Product', {
    name: String,
    description: String,
    price: Number,
    thumbnail:String
});