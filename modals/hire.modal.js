const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const hiredSchema = new Schema({
    companyid: {
        type: String,
        required: true
    },
    jobid: {
        type: String,
        required: true
    },
    employeeid: {
        type: [String],
        default: []
    },
}, { collection: 'hired' });

const Hired = mongoose.model('hired', hiredSchema);
module.exports = Hired;