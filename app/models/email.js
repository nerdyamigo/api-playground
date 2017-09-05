var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var EmailSchema = new Schema({
  address: { type: String }
});


module.exports = mongoose.model('Email', EmailSchema);
