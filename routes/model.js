var mongoose = require('mongoose');

var gossipSchema = mongoose.Schema({
    status: { type: String},
    text: { type: String, required: true},
    date: { type: Date, default: Date.now}
});

module.exports = mongoose.model('gossipObject', gossipSchema);
