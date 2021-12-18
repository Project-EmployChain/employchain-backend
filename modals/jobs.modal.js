const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const jobSchema = new Schema({
    company: {
        type: String,
        required: true
    },
    jobtitle: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    salary: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    jobrole: {
        type: String,
        required: true
    },
    posttime: {
        type: Date,
        default: Date.now
    },
    noofapplicants: {
        type: Number,
        default: 0
    },
}, { collection: 'jobs' });

const Job = mongoose.model('jobs', jobSchema);

module.exports = Job;