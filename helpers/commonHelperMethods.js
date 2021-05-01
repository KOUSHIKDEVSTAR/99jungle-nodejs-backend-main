const randomstring = require('randomstring');


//-------------------------------------------------------------
//  generate random number method for OTP
//-------------------------------------------------------------
const generateRandomNumber = async (length) => {
    return randomstring.generate({ length: length, charset: '1234567890' });
}





module.exports = {generateRandomNumber};