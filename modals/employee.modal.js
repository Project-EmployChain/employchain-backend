const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const employeeSchema = new Schema({
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
    fullname: {
      type: String,
    },
    aadhaarhash: {
      type: String,
    },
    eduIPFS: {
      type: Object,
    },
    empIPFS: {
      type: Object,
    }
  }, { collection: 'employee' });

  employeeSchema.pre('save', async function(next){
    try {
        const salt = await bcrypt.genSalt(10)
        const hashedPwd = await bcrypt.hash(this.password, salt)
        this.password = hashedPwd
        next()
    } catch (error) {
        next(error)
    }
  })
  
  employeeSchema.methods.isValidPassword = async function(password){
    try {
        return await bcrypt.compare(password, this.password)
    } catch (error) {
        throw error
    }
  }
  
  const Employee = mongoose.model('employee', employeeSchema);
  
  module.exports = Employee;