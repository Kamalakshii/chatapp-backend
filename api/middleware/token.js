/******************************************************************************
 *  @Purpose        : Method is used to generate tokens
 *  @file           : token.js        
 *  @author         : KAMALAKSHI C SWAMY
 *  @since          : 25-02-2019
 ******************************************************************************/
const jwt = require('jsonwebtoken');
module.exports = {
/**
 * importing token 
 */
    GenerateToken(payload) {
        const token = jwt.sign({ payload }, 'secretkey', { expiresIn:'1d'}) 
        const obj = {
            success: true,
            message: 'Token Generated Successfully!!',
            token: token
        }
        return obj;
    }
}