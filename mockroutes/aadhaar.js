const express = require('express');
const createError = require('http-errors');
const aadhaarRouter = express.Router();

let mockdata = {
    "999988887777":{
        "fullname":"Pranav M S",
        "sex": "m",
        "dob":"13/01/2000",
        "address":"No.105, 29th Cross, 13th Main, Banashankari 2nd Stage, Bangalore",
        "pincode":"560070",
        "so":"M A Suresh",
    },
    "666655554444":{
        "fullname":"Samhitha",
        "sex": "f",
        "dob": "16/11/1999",
        "address": "ille vidhyapeetha hatra",
        "pincode": "560XXX",
        "do":"Varadaraj Tantry"
    },
    "333322221111":{
        "fullname":"Raksha S",
        "sex": "f",
        "dob": "10/07/2000",
        "address": "very far",
        "pincode": "560059",
        "do":"Suresh Karanth"
    }
}

aadhaarRouter.get(`/get/${aadhaarno}`, async(req, res, next) => {
    try {
        const singleAadhaar = mockdata[aadhaarno];
        res.send({status: "success", data: singleAadhaar});
    } catch (error) {
        res.send({status: "fail"});
    }
})