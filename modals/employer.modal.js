const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const employerSchema = new Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    phone: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    companyname: {
        type: String,
    },
    companyphone: {
        type: String,
    },
    gstnumber: {
        type: String,
    },
    walletaddress: {
        type: String,
    },
    jobs: {
        type: [String],
        default: []
    },
}, {  collection: 'employer' });

const Employer = mongoose.model('employer', employerSchema);
  
module.exports = Employer;