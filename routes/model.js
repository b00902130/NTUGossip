var mongoose = require('mongoose');

var gossipSchema = mongoose.Schema({
    id: { type: String},
    text: { type: String, required: true},
    date: { type: Date, default: Date.now}
});

module.exports = mongoose.model('gossipObject', gossipSchema);
