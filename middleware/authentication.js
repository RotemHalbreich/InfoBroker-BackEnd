const bcrypt = require('bcryptjs')
const {BadRequestError} = require("../errors")
const {StatusCodes} = require('http-status-codes')
const firebase = require('../db/connect')
const firestore = firebase.firestore();
const jwt = require("jsonwebtoken");

const config = process.env;
const all_element_exists = (req, res, next) => {
    const { first_name, last_name, email, password, admin } = req.body;
    if(!first_name || !last_name || !email || !password || !admin){
        res.status(StatusCodes.BAD_REQUEST).send("please provide all the details")
    }else next()
}

const user_already_exists = async (req, res, next)=>{//for register
    const {email} = req.body
    doc = firestore.collection("Users").doc(email);
    user_data =await doc.get()
    if(!user_data.exists){
        next()
    }else{
        res.status(StatusCodes.UNAUTHORIZED).send({"status" : StatusCodes.UNAUTHORIZED , "message" : "user already exists, please sign in"});
    }

}

const user_not_exists = async(req, res, next) => {//for login

    const {email} = req.body
    doc = firestore.collection("Users").doc(email);
    user_data = await doc.get()
    if(!user_data.exists){
        res.status(StatusCodes.UNAUTHORIZED).send({"status" : StatusCodes.UNAUTHORIZED, "message":  "the given user does not exist, please register"});
    }else{
        next()
    }
}


const passwordHash = async (req, res, next) => {
    let {password} = req.body
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt)
    req.body.password = hashedPassword
    next()
}



const verifyToken = (req, res, next) => {
  const token =
    req.body.token || req.query.token || req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({"status" : 403 , "message" : "A token is required for authentication"});
  }
  try {
    const decoded = jwt.verify(token, 'MY_SECRET_KEY');
    req.user = decoded;
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
  return next();
};



module.exports = {
    passwordHash,
    all_element_exists,
    user_already_exists,
    user_not_exists,
    verifyToken

}