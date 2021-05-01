const jwt = require('jsonwebtoken');
const STATIC = require('../staticValues');

//-------------------------------------------------------------
//  generate token
//-------------------------------------------------------------
const generateJwtToken = async(payload) => {
    return jwt.sign(payload, STATIC.secret, {algorithm: STATIC.algorithm, audience: STATIC.audience, issuer: STATIC.issuer, subject: Date.now().toString()});
}



module.exports = generateJwtToken;