const mongoose = require('mongoose'); // Nhúng thư viện mongoose

module.exports = mongoose.model('Product', {
    name: String,
    description: String,
    price: Number,
    category: String,
    key: String,
    trademark:String,
    thumbnail:String,
    thumbnail_sm_1: String,
    thumbnail_sm_2: String,
    thumbnail_sm_3: String
});