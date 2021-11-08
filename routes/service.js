'use strict';
var express = require('express');
var router = express.Router();
let userModel = require('../models/user');
let carrierModel = require('../models/carrier');
let contactModel = require('../models/contact');
let commonFunction = require('./commonFunction');
var commonFunctionObj = new commonFunction();
let CommonMiddleware = require('../middlewares/commonMiddleware')
let commonMiddlewareObj = new CommonMiddleware()
router.get('/dashboard/service', commonMiddlewareObj.checkUserLoggedIn, async (req, res, next) => {
    res.render('services')
})
router.get('/dashboard/carrier',commonMiddlewareObj.checkUserLoggedIn, async (req, res, next) => {
    res.render('carrier')
})
router.get('/dashboard/contact',commonMiddlewareObj.checkUserLoggedIn, async (req, res, next) => {
    res.render('contact')
})
router.get('/dashboard/about',commonMiddlewareObj.checkUserLoggedIn, async (req, res, next) => {
    let userDetails = await  userModel.findAll({})
    res.render('about',{data:userDetails})
})
router.get('/dashboard/news',commonMiddlewareObj.checkUserLoggedIn, async (req, res, next) => {
    res.render('news')
})

router.get('/dashboard',async (req, res, next) => {
    res.render('home')
})

router.post('/carrier', commonMiddlewareObj.checkUserLoggedIn, async (req, res, next) => {
    let major = req.body.major
    let carrierDetails = {
        Title:req.body.Title,
        FirstName :req.body.FirstName,
        SurName :req.body.SurName,
        PreName :req.body.PreName,
        mydate: req.body.mydate,
        major: major[0],
        email: req.body.email,
        phone :req.body.phone,
        country:req.body.country,
        notes: req.body.notes
    }
    let result = await carrierModel.create(carrierDetails) 
    res.redirect('/dashboard/carrier')
})
router.post('/contact', commonMiddlewareObj.checkUserLoggedIn, async (req, res, next) => {
    
    let contactDetails = {
        fname:req.body.fname,
        email :req.body.email,
        phone :req.body.phone,
        comment : req.body.comment
    }
    let result = await contactModel.create(contactDetails) 
    res.redirect('/dashboard/contact')
})


//***************************************************login and signup******************************************************//
router.get('/logout', async (req, res, next) => {
    res.render('login')
})
router.get('/login', async (req, res, next) => {
    res.render('login')
})
router.post('/login', async (req, res, next) => {
    let email = req.body.email;
    let password = req.body.password;
    let userDetails = await userModel.findOne({
        where: {
            email: email,
        }
    })
    req.session.isAuth = true;
    //req.session.userDetails = userDetails
    //console.log(req.session);
    if (userDetails) {
        var hash = userDetails.dataValues.password;
        if (await commonFunctionObj.comparePassword(password, hash) == true) {
            if (userDetails) {
                let encryptId = await commonFunctionObj.encryptId(userDetails.dataValues.id);
                let tokenData = {
                    email: email,
                    id: encryptId
                }
                let token = await commonFunctionObj.createToken(tokenData)
                req.session.userId = userDetails.dataValues.id;
                req.session.token = token
                req.session.userEmail = userDetails.dataValues.email
                /*Redirect after successfull login*/
                res.redirect('/dashboard');
            }
        }

    }
    else {
        res.redirect('/login');
    }


})
router.get('/signup', async (req, res, next) => {
    res.render('register')
})
router.post('/signup', async (req, res, next) => {
    let email = req.body.email;
    let password = req.body.password;
    let firstName = req.body.firstName;
    let lastName = req.body.lastName;
    let address = req.body.address;
    let mobileNo = req.body.mobileNo;
    let username = req.body.username;
    let userDetails = await userModel.findOne({
        where: {
            email: email,
        }
    })
    if (!userDetails) {

        let craeteUserData = {
            email: email,
            password: await commonFunctionObj.hashPassword(password),
            firstName: firstName,
            lastName: lastName,
            address: address,
            mobileNo: mobileNo,
            username: username,
        }
        let result = await userModel.create(craeteUserData)
        let encryptId = await commonFunctionObj.encryptId(result.dataValues.id);
        let tokenData = {
            email: email,
            id: encryptId
        }
        let token = await commonFunctionObj.createToken(tokenData)

        /*Redirect after successfull login*/
        res.redirect('/dashboard');

    }
    else {

        /*Redirect after successfull login*/
        res.redirect('/signup');
    }

})
module.exports = router;