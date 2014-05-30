var gossipSchema = new Schema({
    id: { type: String},
    text: { type: String, required: true},
    date: { type: Date, default: Date.now}
});

var gossipObject = mongoose.model('gossipObject', gossipSchema);