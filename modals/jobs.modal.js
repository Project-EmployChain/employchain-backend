const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const jobSchema = new Schema({
    companyid: {
        type: String,
        required: true
    },
    jobtitle: {
        type: String,
        required: true
    },
    jobtype: {
        type: String,
        required: true
    },
    jobdesc: {
        type: String,
    },
    noofopenings: {
        type: Number,
    },
    location: {
        type: String,
        required: true
    },
    bond: {
        type: String,
    },
    salary: {
        type: String,
        required: true
    },
    salarytype: {
        type: String,
    },
    description: {
        type: String,
        required: true
    },
    posttime: {
        type: Date,
        default: Date.now()
    },
    noofapplicants: {
        type: Number,
        default: 0
    },
    applicants: {
        type: [String],
        default: []
    },
}, { collection: 'jobs' });

const Job = mongoose.model('jobs', jobSchema);

module.exports = Job;