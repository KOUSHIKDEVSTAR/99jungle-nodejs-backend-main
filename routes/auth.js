const express = require('express');
const { validationResult } = require('express-validator');
const cors = require('cors');
//config files imports
const STATIC = require('../config/staticValues');
const QUERY_USERS = require('../config/db-query/user');
const RESPONCE = require('../config/responces');
const RESPONSE_MESSAGES = require('../config/respMsgs');

const { 
  USER_REGISTER_DATA_VALIDATORS, 
  ADMIN_LOGIN_DATA_VALIDATORS, 
  RESET_PASSWORD_DATA_VALIDATORS, 
  FORGOT_PASS_DATA_VALIDATORS, 
  SEND_OTP_MAIL_DATA_VALIDATORS 
} = require('../config/express-validators/validator');

const generateJwtToken = require('../config/jwt/generateToken');

// helper functions
const { comparePassword, hashPassword } = require('../helpers/bcrypt');

const USER_ROLE = '600039277fecd1252473068b';
const ADMIN_ROLE = '60001006d14b7115108cb5cc';

const USER_ROLE_TYPE = '2';
const ADMIN_ROLE_TYPE = '1';

// model imports
const USER = require('../models/user');
const sendEmail = require('../config/node-mailer/nodemailer');
const { generateRandomNumber } = require('../helpers/commonHelperMethods');



var router = express.Router();




//-------------------------------------------------------------
//  redirecting to login API
//-------------------------------------------------------------
router.post('/', async function(req, res, next) {
  res.redirect(`${STATIC.apiRoot}/auth/login`);
});





//-------------------------------------------------------------
//  customer login API
//-------------------------------------------------------------
router.post('/login', async function(req, res, next) {
  try {

    const {email, password} = req.body;
    const qr = await QUERY_USERS.findItemFromUserDB({email});

    if(qr && qr.length <= 0){
      //user not exist
      RESPONCE.errorResponce(res, RESPONSE_MESSAGES.notRegistered);
    }else if(qr && qr.length > 0){
      // user exist 
      console.log('found user  : ', qr[0]);
      // validating role
      if(qr[0].role._id == USER_ROLE){
        // if role validated
        // checking password
        if(qr[0].is_deleted){
          RESPONCE.errorResponce(res, 'Sorry, You are de-activated', null, null);
        }else{
          let isSame = comparePassword(password, qr[0].password);
          if(isSame){
            // if password same
            // response body data
            let respUserData = {
              email: qr[0].email,
              phone: qr[0].phone,
              fname: qr[0].f_name,
              role_type: qr[0].role.role_type,
              role_name: qr[0].role.name
            };

            // generating token
            let token = await generateJwtToken(respUserData);
            // success login
            RESPONCE.successResponce(res, RESPONSE_MESSAGES.successLogin, respUserData, token);
          }else{
            // if password not matched
            RESPONCE.errorResponce(res, RESPONSE_MESSAGES.wrongPassword, null, null);
          }
        }
        
      }else{
        RESPONCE.errorResponce(res, RESPONSE_MESSAGES.loginNotAuthorized, null, null);
      }

    }
    
  } catch (error) {
    // error response
    if(error && error.message){
      RESPONCE.errorResponce(res, error.message, null, error.errors ? error.errors : error);
    }else if(error && error._message){
      RESPONCE.errorResponce(res, error._message, null, error.errors ? error.errors : error);
    }else{
      RESPONCE.errorResponce(res, RESPONSE_MESSAGES.wrongPassword, null, error.errors ? error.errors : error);
    }
  }
});






//-------------------------------------------------------------
//  admin login API
//-------------------------------------------------------------
router.post('/adminlogin', ADMIN_LOGIN_DATA_VALIDATORS, async function(req, res, next) {
  try {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // return res.status(400).json({ errors: errors.array() });
      return RESPONCE.errorResponce(res, 'Requested data is not valid', null, errors.array());
    }

    console.log('data  :  ', req.body);

    const {email, password} = req.body;
    const qr = await QUERY_USERS.findItemFromUserDB({email, role_type: '1'});

    if(qr && qr.length <= 0){
      //user not exist
      RESPONCE.errorResponce(res, RESPONSE_MESSAGES.wrongPassword);
    }else if(qr && qr.length > 0){
      // user exist 
      if(qr[0].role._id == ADMIN_ROLE){
        // checking password
        let isSame = comparePassword(password, qr[0].password);
        
        if(isSame){
          // if password matched
          // response body data
          let respUserData = {
            id: qr[0]._id,
            email: qr[0].email,
            phone: qr[0].phone,
            fname: qr[0].f_name,
            role_type: qr[0].role.role_type,
            role_name: qr[0].role.name
          }
          // generating token
          let token = await generateJwtToken(respUserData);
          // sending  success response
          RESPONCE.successResponce(res, RESPONSE_MESSAGES.successLogin, respUserData, token);
        }else{
          // password not matched
          console.log('password not matched  :  ', isSame);
          RESPONCE.errorResponce(res, RESPONSE_MESSAGES.wrongPassword);
        }
      }else{        
        RESPONCE.errorResponce(res, RESPONSE_MESSAGES.loginNotAuthorized);
      }

    }
    
  } catch (error) {
    // error response
    if(error && error.message){
      RESPONCE.errorResponce(res, error.message, null, error.errors ? error.errors : error);
    }else if(error && error._message){
      RESPONCE.errorResponce(res, error._message, null, error.errors ? error.errors : error);
    }else{
      RESPONCE.errorResponce(res, RESPONSE_MESSAGES.wrongPassword, null, error.errors ? error.errors : error);
    }

  }
});





//-------------------------------------------------------------
//  register API
//-------------------------------------------------------------
router.post('/register', USER_REGISTER_DATA_VALIDATORS, async function(req, res, next) {
  
  try {

    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // return res.status(400).json({ errors: errors.array() });
      return RESPONCE.errorResponce(res, 'Requested data is not valid', null, errors.array());
    }

    const {email, f_name, l_name, password} = req.body;
    // searching user for that name
    const qr = await QUERY_USERS.findItemFromUserDB({email: email});
    if(qr && qr.length <= 0){
      //user not exist
      let userdata = {email, f_name, l_name, password, role: USER_ROLE, role_type: USER_ROLE_TYPE};
      const cu = await QUERY_USERS.createItemForUserDB(userdata);
      if(cu){
        console.log('user created  :  ', cu);
        RESPONCE.successResponce(res, RESPONSE_MESSAGES.registrationSuccess);
      }
    }else if(qr && qr.length > 0){
      // user exist 
      RESPONCE.errorResponce(res, RESPONSE_MESSAGES.allReadyRegistered, null, null);
    }
    
  } catch (error) {

    // error response
    if(error && error.message){
      RESPONCE.errorResponce(res, error.message, null, error.errors ? error.errors : error);
    }else if(error && error._message){
      RESPONCE.errorResponce(res, error._message, null, error.errors ? error.errors : error);
    }else{
      RESPONCE.errorResponce(res, RESPONSE_MESSAGES.registrationError, null, error.errors ? error.errors : error);
    }
    
  }
  
});




//-------------------------------------------------------------
//  reset pass api
//-------------------------------------------------------------
router.post('/resetpass', RESET_PASSWORD_DATA_VALIDATORS, async function(req, res, next) {
  try {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // return res.status(400).json({ errors: errors.array() });
      return RESPONCE.errorResponce(res, 'Requested data is not valid', null, errors.array());
    }

    const {email, oldpass, newpass, confnewpass} = req.body;

    // console.log('body   ', req.body);
    if(newpass != confnewpass) {
      RESPONCE.errorResponce(res, 'Password not matched', null, null);
    }else{
    
    // finding user with that email 
    const qr = await QUERY_USERS.findItemFromUserDB({email});

    if(qr && qr.length <= 0){
      //user not exist
      RESPONCE.errorResponce(res, RESPONSE_MESSAGES.wrongPassword, null, null);
    }else if(qr && qr.length > 0){
      // user exist
      console.log('email exist');
      // comparing password
      let isSame = comparePassword(oldpass, qr[0].password);
      if(isSame){
        console.log('password same');
        // if password matched
        // hashing password
        let newhashpass = hashPassword(newpass);
        // updating password
        const result = await QUERY_USERS.updateItemForUserTable(qr[0]._id, {password: newhashpass});
        if(result){
          RESPONCE.successResponce(res, RESPONSE_MESSAGES.resetPassSuccess);
        }
      }else{
        // password not matched
        console.log('password not same');
        RESPONCE.errorResponce(res, RESPONSE_MESSAGES.wrongPassword, null, null);
      }
    }
  }
    
  } catch (error) {

    // error handling
    if(error && error.message){
      RESPONCE.errorResponce(res, error.message, null, error.errors ? error.errors : error);
    }else if(error && error._message){
      RESPONCE.errorResponce(res, error._message, null, error.errors ? error.errors : error);
    }else{
      RESPONCE.errorResponce(res, RESPONSE_MESSAGES.wrongPassword, null, error.errors ? error.errors : error);
    }
    
  }
});




//-------------------------------------------------------------
//  send OTP to Mail
//-------------------------------------------------------------
router.post('/sendotptomail', SEND_OTP_MAIL_DATA_VALIDATORS, async function(req, res, next) {
  try {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // return res.status(400).json({ errors: errors.array() });
      return RESPONCE.errorResponce(res, 'Requested data is not valid', null, errors.array());
    }

    const {email} = req.body;

    // finding user with that email 
    const qr = await QUERY_USERS.findItemFromUserDB({email});

    if(qr && qr.length <= 0){
      //user not exist
      RESPONCE.errorResponce(res, RESPONSE_MESSAGES.wrongPassword, null, null);
    }else if(qr && qr.length > 0){
      // user exist
      // sending mail to that user 
      sendEmail(qr[0].email, qr[0].f_name, qr[0].user_otp).then(info=>{
        console.log('email sent data  :  ', info);
        RESPONCE.successResponce(res, RESPONSE_MESSAGES.emailsentsuccess);
      }).catch(err=>{
        console.log('error :  ', err);
      })
    }

  } catch (error) {

    // error handling
    if(error && error.message){
      RESPONCE.errorResponce(res, error.message, null, error.errors ? error.errors : error);
    }else if(error && error._message){
      RESPONCE.errorResponce(res, error._message, null, error.errors ? error.errors : error);
    }else{
      RESPONCE.errorResponce(res, RESPONSE_MESSAGES.wrongPassword, null, error.errors ? error.errors : error);
    }
    
  }
});




//-------------------------------------------------------------
//  forgot pass api
//-------------------------------------------------------------
router.post('/forgotpass', FORGOT_PASS_DATA_VALIDATORS, async function(req, res, next) {
  try {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // return res.status(400).json({ errors: errors.array() });
      return RESPONCE.errorResponce(res, 'Requested data is not valid', null, errors.array());
    }

    const {email, otp, newpass} = req.body;
    
    // finding user with that email 
    const qr = await QUERY_USERS.findItemFromUserDB({email});

    if(qr && qr.length <= 0){
      //user not exist
      RESPONCE.errorResponce(res, RESPONSE_MESSAGES.wrongPassword, null, null);
    }else if(qr && qr.length > 0){

      if(otp != qr[0].user_otp){
        RESPONCE.errorResponce(res, RESPONSE_MESSAGES.invalidotp, null, null);
      }

      let newotp = await generateRandomNumber(6);
      let newhashpass = hashPassword(newpass);
        // updating password
        console.log('new otp  :  ', newotp);
        console.log('new pass  :  ', newhashpass);
      const result = await QUERY_USERS.updateItemForUserTable(qr[0]._id, {password: newhashpass, user_otp: newotp});
      if(result){
        RESPONCE.successResponce(res, RESPONSE_MESSAGES.resetPassSuccess);
      }
      
    }
    
  } catch (error) {

    // error handling
    if(error && error.message){
      RESPONCE.errorResponce(res, error.message, null, error.errors ? error.errors : error);
    }else if(error && error._message){
      RESPONCE.errorResponce(res, error._message, null, error.errors ? error.errors : error);
    }else{
      RESPONCE.errorResponce(res, RESPONSE_MESSAGES.wrongPassword, null, error.errors ? error.errors : error);
    }
    
  }
});




module.exports = router;



// admin role id - 60001006d14b7115108cb5cc
// customer role id - 600039277fecd1252473068b

// role type 2 - customer
// role type 1 - admin
