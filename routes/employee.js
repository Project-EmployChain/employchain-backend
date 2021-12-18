const express = require("express");

const EmployeeRouter = express.Router();
const { signAccessToken, verifyAccessToken, signRefreshToken, verifyRefreshToken } = require("../helpers/jwthelper");
const Employee = require("../models/employee");

EmployeeRouter.post("/signup", async (req, res, next) => {
    try {
        const { email, phone, password } = req.body;
        const findEmployee = await Employee.findOne({ email: email });
        if(findEmployee){
            res.status(400).send({error: "Employee already exists"});
        } else {
            const newEmployee = new Employee({
                email: email,
                phone: phone,
                password: password
            });
            await newEmployee.save();
            res.status(200).send({message: "Employee created successfully"});
        }
    } catch (error) {
        next(error);
    }
})

EmployeeRouter.post("/login", async (req, res, next) => {
    try {
        const { email, password }= req.body;
        const findEmployee = await Employee.findOne({ email: email });
        if(findEmployee){
            const isValidPassword = await findEmployee.isValidPassword(password);
            if(isValidPassword){
                const accessToken = signAccessToken(findEmployee);
                const refreshToken = signRefreshToken(findEmployee);
                res.status(200).send({accessToken, refreshToken});
            } else {
                res.status(400).send({error: "Invalid password"});
            }
        } else {
            res.status(400).send({error: "Employee not found"});
        }
    } catch (error) {
        next(error);
    }
});


module.exports = EmployeeRouter;