// 'use strict'
// const db = require('../db');
// const firebase = require('../db');
// const User = require('../models/user');
// const firestore = firebase.firestore();
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const user = require('../models/user')
const firebase = require('../db/connect')
const firestore = firebase.firestore();
const {StatusCodes} = require('http-status-codes')
const {BadRequestError} = require("../errors")

const register = async (req,res) =>
{
    try{
        const { first_name, last_name, email, password, admin } = req.body;
        const doc = firestore.collection("Users").doc(email);
        const token = jwt.sign({ userId: email }, 'MY_SECRET_KEY');
        let new_user = new user(
            first_name,
            last_name,
            email,
            password,
            admin,
        );
        new_user = JSON.parse(JSON.stringify(new_user));
        await doc.set(new_user);
        res.status(StatusCodes.CREATED).send({token});
    }
    catch (error) {
        console.log(error.message)
        res.status( StatusCodes.BAD_REQUEST).send({"status" : StatusCodes.BAD_REQUEST, "message" : error.message});
    }
}

//email + password
//find the specified user, if exists check if his password match 



const login = async(req, res) =>{
    console.log("aaa");
    try{
    const {email, password} = req.body;
    const doc =  firestore.collection("Users").doc(email);
    stored_password = (await doc.get()).data().password
    const is_match = await bcrypt.compare(password, stored_password)
    const token = jwt.sign({ userId: email }, 'MY_SECRET_KEY');

    if(is_match){
        res.status(StatusCodes.OK).send({token})
    }else{res.status(StatusCodes.UNAUTHORIZED).send({"status" : StatusCodes.UNAUTHORIZED, "message" : "User UNAUTHORIZED"})}
    } catch (error){
        console.log("Error in login function", error);
    }
   
}

const isUserLoggedIn = async(req, res) =>{
    res.send("login check")
}

const signout = async(req, res)=> {
    res.send("sign out user")
}
module.exports = {
    register,
    login,
    isUserLoggedIn,
    signout
}



// const addUser = async(req,res,next) => {
//     try{
//         const { id, first_name, last_name, mail, password } = req.body;
//         const doc = firestore.collection("Users").doc();
//         let new_user = new User(
//             doc.id,
//             first_name,
//             last_name, 
//             mail, 
//             password
//         );
//         new_user = JSON.parse(JSON.stringify(new_user));
//         await doc.set(new_user);
//         res.status(200).send(new_user);
//     }
//     catch (error) {
//         res.status(400).send(error.message);
//     }
// }

// module.exports = {
//     addUser
// }