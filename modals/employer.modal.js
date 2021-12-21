const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

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
}, { collection: 'employer' });

employerSchema.pre('save', async function (next) {
    try {
        const salt = await bcrypt.genSalt(10)
        const hashedPwd = await bcrypt.hash(this.password, salt)
        this.password = hashedPwd
        next()
    } catch (error) {
        next(error)
    }
})

employerSchema.methods.isValidPassword = async function (password) {
    try {
        return await bcrypt.compare(password, this.password)
    } catch (error) {
        throw error
    }
}

const Employer = mongoose.model('employer', employerSchema);

module.exports = Employer;