const mongoose = require('mongoose')

const employeeSchema = mongoose.Schema({
    name:String,
    department:String,
    designation:String,
    salary:Number,
    doj:Date,
});


module.exports = mongoose.model('Employee', employeeSchema);