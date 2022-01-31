var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    user: {type: Schema.Types.ObjectId, ref: 'User'},
    email: {type: String, required: true},
    cart: {type: Object, required: true},
    address: {type: String, required: true},
    name: {type: String, required: true},
    comment: {type: String, required: false},
    date: {type: Date, required: true}
});

module.exports = mongoose.model('Order', schema);