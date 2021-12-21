const express = require("express");

const EmployerRouter = express.Router();

const { signAccessToken, verifyAccessToken, signRefreshToken, verifyRefreshToken } = require("../helpers/jwthelper");

const Employer = require("../modals/employer.modal");
const Employee = require("../modals/employee.modal");
const Job = require("../modals/jobs.modal");
const Hired = require("../modals/hire.modal");

EmployerRouter.post("/signup", async (req, res, next) => {
    try {
        const { email, phone, password } = req.body;
        const findEmployer = await Employer.findOne({ email: email });
        if (findEmployer) {
            res.status(400).send({ error: "Employer already exists" });
        } else {
            const newEmployer = new Employer({
                email: email,
                phone: phone,
                password: password
            });
            await newEmployer.save();
            res.status(200).send({ message: "Employer created successfully" });
        }
    } catch (error) {
        next(error);
    }
});

EmployerRouter.post("/login", async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const findEmployer = await Employer.findOne({ email: email });
        if (findEmployer) {
            const isValidPassword = await findEmployer.isValidPassword(password);
            if (isValidPassword) {
                const accessToken = await signAccessToken(email);
                const refreshToken = await signRefreshToken(email);
                res.status(200).send({ accessToken, refreshToken, cid: findEmployer._id });
            } else {
                res.status(400).send({ error: "Invalid password" });
            }
        } else {
            res.status(400).send({ error: "Employer not found" });
        }
    } catch (error) {
        next(error);
    }
});



EmployerRouter.post('/update', async (req, res, next) => {
    try {
        const { companyname, companyphone, gstnumber, walletaddress } = req.body;
        const findEmployer = await Employer.findOne({ email: email });
        if (findEmployer) {
            var updateEmployer = Employer.findOneAndUpdate(
                { _id: findEmployer._id },
                {
                    companyname: companyname,
                    companyphone: companyphone,
                    gstnumber: gstnumber,
                    walletaddress: walletaddress
                }
            );
            if (updateEmployer) res.status(200).send({ message: "Employer updated successfully" });
        }
    } catch (error) {
        next(error);
    }
})

EmployerRouter.post("/getjobs", async (req, res, next) => {
    try {
        const { id } = req.body;
        const findEmployer = await Employer.findOne({ _id: id });
        let result = [];
        if (findEmployer) {
            const jobids = findEmployer.jobs;
            for (let i = 0; i < jobids.length; i++) {
                const job = await Job.findOne({ _id: jobids[i] });
                result.push(job);
            }
        }
        res.send({ status: 'status', data: result });
    } catch (error) {
        next(error);
    }
});

EmployerRouter.post("/getjob", async (req, res, next) => {
    try {
        const { id } = req.body;
        const findJob = await Job.findOne({ _id: id });
        
        res.send({ status: 'status', data: findJob });
    } catch (error) {
        next(error);
    }
});

EmployerRouter.post("/addjob", async(req, res, next) => {
    try {
        const { id, jobtitle, jobtype, noofopenings, location, bond, salary, salarytype, jobdesc } = req.body;
        let job = new Job({
            companyid: id,
            jobtitle: jobtitle,
            jobtype: jobtype,
            noofopenings: noofopenings,
            location: location,
            bond: bond,
            salary: salary,
            salarytype: salarytype,
            description: jobdesc
        })
        await job.save();
        let nhired = new Hired({
            companyid: id,
            jobid: job._id,
            employeeid: []
        })
        await nhired.save();
        await Employer.findOneAndUpdate({ _id: id }, { $push: { jobs: job._id } }, { new: true })
        res.send({ status: 'success', data: job });

    } catch (error) {
        next(error);
    }
});

EmployerRouter.get("/hire", async(req, res, next) => {
    try {
        const { id, empid, jobid } = req.body;
        let findHired = await Hired.findOne({ jobid: jobid });
        if (findHired) Hired.findOneAndUpdate({ jobid: jobid }, { $push: { hired: empid } }, { new: true })

    } catch (error) {
        next(error);
    }
});

EmployerRouter.get("/getProfile", async(req, res, next) => {
    try {
        const { id } = req.body;
        let findEmployee = await Employee.findOne({ _id: id });
        if (findEmployee) {
            res.send({ status: 'status', data: findEmployee });
        }
    } catch (error) {
        next(error);
    }
});

module.exports = EmployerRouter;