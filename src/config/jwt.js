const jwt = require('jsonwebtoken');
const jwt_decode = require('jwt-decode');
require('dotenv').config;

const generateToken = (payload) => {
    return jwt.sign(payload, process.env.SECRET);
};
const decodeToken=(token)=>{
    return jwt_decode(token);
}
// const auth = async (req, res, next)=>{
//     try{
//         const token = req.headers.authorization?.replace('Bearer ','');
//         if (!token) throw Error('');
//         const decodedToken = jwt.verify(token, process.env.SECRET);
//         req.token = decodedToken;
//         next();
//     }catch (error){
//         res.status(401).json({message:'sin permiso'})
//     }
// }
//
// const checkRoles = (roles)=> {
//     return async (req, res, next) => {
//         try {
//             const token = req.token;
//             if (!token)
//                 }
//     }
// }

module.exports = {
    generateToken,decodeToken
};