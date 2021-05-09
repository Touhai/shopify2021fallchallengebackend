// Handles the model for mongoose.

const mongoose = require('mongoose');

const PhotoSchema = new mongoose.Schema({
    path: String,
    date: {type: Date, default: Date.now},
})

let PhotoDatabase = module.exports = mongoose.model('shopifyPhotos',PhotoSchema);

module.exports.get = function(callback, limit) {
    PhotoDatabase.find(callback).limit(limit);
}