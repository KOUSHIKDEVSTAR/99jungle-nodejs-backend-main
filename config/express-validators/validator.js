const { body, validationResult, check } = require('express-validator');
// Auth data
const EMAIL_VALIDATE = check('email', 'Not a valid email !').isEmail();
const PHONE_VALIDATE = check('phone', 'Not a valid Phone number !').notEmpty().isString().isLength({min: 10, max: 10});
const F_NAME_VALIDATE = check('f_name', 'Not a valid First name !').notEmpty().isString().isLength({min: 2, max: 50});
const PASSWORD_VALIDATE = check('password', 'Not a valid Password !').notEmpty().isString().isLength({min: 4, max: 25});
const OLD_PASSWORD_VALIDATE = check('oldpass', 'Not a valid Password !').notEmpty().isString().isLength({min: 4, max: 25});
const NEW_PASSWORD_VALIDATE = check('newpass', 'Not a valid Password !').notEmpty().isString().isLength({min: 4, max: 25});
const CONF_PASSWORD_VALIDATE = check('confnewpass', 'Not a valid Password !').notEmpty().isString().isLength({min: 4, max: 25});
const OTP_VALIDATE = check('otp', 'Not a valid OTP!').notEmpty().isString().isLength({min: 6, max: 6});
// category data
const NAME_VALIDATE = check('name', 'Not a valid name !').notEmpty().isString().isLength({min: 1, max: 100});
const ID_VALIDATE = check('parent_id', 'Not a valid Parent_Id !').notEmpty().isString().isLength({min: 1, max: 50});
const LABEL_VALIDATE = check('lavel', 'Not a valid Label !').notEmpty().isString().isLength({min: 1, max: 100});
const ID_DATA_VALIDATE = check('id', 'Not a valid ID !').notEmpty().isString().isLength({min: 1, max: 50});


//-------------------------------------------------------------
//  Auth route validators
//-------------------------------------------------------------
const USER_REGISTER_DATA_VALIDATORS = [EMAIL_VALIDATE, F_NAME_VALIDATE, PASSWORD_VALIDATE];
const ADMIN_LOGIN_DATA_VALIDATORS = [EMAIL_VALIDATE, PASSWORD_VALIDATE];
const RESET_PASSWORD_DATA_VALIDATORS = [EMAIL_VALIDATE, OLD_PASSWORD_VALIDATE, NEW_PASSWORD_VALIDATE, CONF_PASSWORD_VALIDATE];
const SEND_OTP_MAIL_DATA_VALIDATORS = [EMAIL_VALIDATE];
const FORGOT_PASS_DATA_VALIDATORS = [EMAIL_VALIDATE, OTP_VALIDATE, NEW_PASSWORD_VALIDATE];



//-------------------------------------------------------------
//  Category route validators
//-------------------------------------------------------------
const CATEGORY_ADD_DATA_VALIDATORS = [NAME_VALIDATE, LABEL_VALIDATE];
const CATEGORY_UPDATE_DATA_VALIDATORS = [ID_DATA_VALIDATE];
const CATEGORY_DELETE_DATA_VALIDATORS = [ID_DATA_VALIDATE];

module.exports = {
    USER_REGISTER_DATA_VALIDATORS, 
    ADMIN_LOGIN_DATA_VALIDATORS, 
    RESET_PASSWORD_DATA_VALIDATORS,
    SEND_OTP_MAIL_DATA_VALIDATORS,
    FORGOT_PASS_DATA_VALIDATORS,
    CATEGORY_ADD_DATA_VALIDATORS,
    CATEGORY_UPDATE_DATA_VALIDATORS,
    CATEGORY_DELETE_DATA_VALIDATORS
};




// name, parent_id, lavel, description