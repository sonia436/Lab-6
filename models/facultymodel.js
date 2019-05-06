var mongoose = require('mongoose');
// Book Schema
var FacultySchema = mongoose.Schema({
  facid: {
    type:String,
    unique:true
  },
  facname: {type:String},
  facemail: {type:String},
  facdesig: {type:String},
  facdep: {type:String},
});

var Projects = module.exports = mongoose.model('faculties', FacultySchema);