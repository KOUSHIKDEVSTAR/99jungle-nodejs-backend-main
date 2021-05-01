var bcrypt = require('bcryptjs');

module.exports = {
    comparePassword: (pass, hash)=>{
        return bcrypt.compareSync(pass, hash);
    },
    hashPassword: (pass)=>{
        var salt = bcrypt.genSaltSync(5);
        var hash = bcrypt.hashSync(pass, salt);
        return hash;
    }
}