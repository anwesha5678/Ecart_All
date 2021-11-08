'use strict';
let jwt = require('jsonwebtoken');
let bcrypt = require('bcrypt');
let Cryptr = require('cryptr')
let cryptr = new Cryptr('myTotalySecretKey');
let JWT_SECRET = 'FHGFHSFHSDFGSJDSJFJSFSKDJFSJSK';
let expiresIn = '3600'
module.exports = class LoginMiddleware {
    async createToken(token) {
        let jwtToken = jwt.sign(token, JWT_SECRET, { expiresIn: expiresIn })
        return jwtToken
    }
    async verifyToken(token) {
        jwt.verify(token, JWT_SECRET, function (err, decoded) {
            if (err) {
                return err;
            }
            else {
                return decoded;
            }
        })
    }
    /*For password encryption*/
    async hashPassword(passsword) {
        var salt = bcrypt.genSaltSync(10);
        var hash = bcrypt.hashSync(passsword, salt);
        return hash;
    }
    /*End*/

    /*For password decryption*/
    async comparePassword(password, hash) {
        if (bcrypt.compareSync(password, hash)) {
            return true;
        } else {
            return false;
        }
    }
    /*End*/

    /*ID encryption*/
    async encryptId(id) {
        const encryptedId = cryptr.encrypt(id);
        return encryptedId;
    }
    /*End*/

    /*ID decryption*/
    async decryptId(encId) {
        const decryptedId = cryptr.decrypt(encId);
        return decryptedId;
    }
}

