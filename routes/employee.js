const express = require("express");

const EmployeeRouter = express.Router();
const { signAccessToken, verifyAccessToken, signRefreshToken, verifyRefreshToken } = require("../helpers/jwthelper");
const Employee = require("../modals/employee.modal");

EmployeeRouter.post("/signup", async (req, res, next) => {
    try {
        const { email, phone, password } = req.body;
        const findEmployee = await Employee.findOne({ email: email });
        if (findEmployee) {
            res.status(400).send({ error: "Employee already exists" });
        } else {
            const newEmployee = new Employee({
                email: email,
                phone: phone,
                password: password
            });
            await newEmployee.save();
            res.status(200).send({ message: "Employee created successfully" });
        }
    } catch (error) {
        next(error);
    }
})

EmployeeRouter.post("/login", async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const findEmployee = await Employee.findOne({ email: email });
        if (findEmployee) {
            const isValidPassword = await findEmployee.isValidPassword(password);
            if (isValidPassword) {
                const accessToken = signAccessToken(email);
                const refreshToken = signRefreshToken(email);
                res.status(200).send({ accessToken, refreshToken });
            } else {
                res.status(400).send({ error: "Invalid password" });
            }
        } else {
            res.status(400).send({ error: "Employee not found" });
        }
    } catch (error) {
        next(error);
    }
});

EmployeeRouter.post("/saveprofile", async (req, res, next) => {
    try {
        const { name, email, phone, gender, dob, address, education, work, skills, resumelink } = req.body;
        const finduser = await User.findOne({ email: email });
        if (finduser) {
            var updateuser = User.findOneAndUpdate(
                { _id: finduser._id },
                {
                    gender: gender,
                    dob: dob,
                    address: address,
                    education: education,
                    work: work,
                    skills: skills,
                    resumelink: resumelink,
                }
            );
            if (updateuser) {
                res.send({ status: "success", data: updateuser });
            }
        }
    } catch (error) {
        next(error);
    }
});

module.exports = EmployeeRouter;