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
        
        const doc_token = firestore.collection("Tokens").doc(token);
        await doc_token.set({name : first_name, admin: admin})
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
    try{
    const {email, password} = req.body;
    const doc =  firestore.collection("Users").doc(email);
    data = (await doc.get()).data()
    stored_password = data.password
    first_name = data.first_name
    _admin = data.admin
    const is_match = await bcrypt.compare(password, stored_password)
    const token = jwt.sign({ userId: email }, 'MY_SECRET_KEY');
    

    if(is_match){
        const doc_token = firestore.collection("Tokens").doc(token);
        await doc_token.set({name : first_name, admin :  _admin})
        res.status(StatusCodes.OK).send({token})
    }else{res.status(StatusCodes.UNAUTHORIZED).send({status : StatusCodes.UNAUTHORIZED, message : "User UNAUTHORIZED"})}
    } catch (error){
        console.log("Error in login function", error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({status: StatusCodes.INTERNAL_SERVER_ERROR , message: "server error"})
    }
   
}

const isUserLoggedIn = async(req, res) =>{
    res.send("login check")
}

const signout = async(req, res)=> {
    res.send("sign out user")
}


const getUserCounter = (req, res) => {
    try{
    const doc = firestore.collection("Users").get().then(snap=>{
        res.status(200).send({user_counter : snap.size})
    })}catch(e){console.log(e); res.status(500).send({isError : true , msg : e})}
}

const getUsersByMail = async (req, res) => {
    const docs = await firestore.collection("Users").listDocuments();
    const ids = docs.map(it => it.id)
    console.log(ids);
    res.status(200).send({mails: ids})
}

const getCurrUserByName = async (req, res) =>{
    try{
    const {token} = req.body

    const doc = firestore.collection("Tokens").doc(token)
    db_token = await doc.get()
    if(db_token.exists){
        res.status(200).send(db_token.data())
    }else{
        res.status(StatusCodes.UNAUTHORIZED).send({Error: "error"})
    }}catch(e){
        res.status(StatusCodes.UNAUTHORIZED).send({Error: "error"})
        console.log("getCurrUserByName:\n", e);

    }

}

const removeUser = async (req, res) =>{
    try{
    const {email} = req.body
    docRef = firestore.collection("Users").doc(email).delete()
    res.status(200).send({status: 200 , msg: "success"})

    }catch{
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({status : StatusCodes.INTERNAL_SERVER_ERROR ,msg:  "server error"})
    }
}

const setAdmin = async (req, res)=>{
    const {email} = req.body
    try{
    doc = firestore.collection("Users").doc(email)
    await doc.update({admin: true}) 
    res.status(200).send({status: 200 , msg: "success"})
    }catch(e) {
        console.log(e);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({status : StatusCodes.INTERNAL_SERVER_ERROR ,msg:  "server error"})
    }  
}

const isAdmin = async (req, res)=>{
    const {token} = req.body
    try{
    doc = firestore.collection("Tokens").doc(token)
    ref = await doc.get()
    res.status(200).send({admin : ref.data().admin})
    }catch(e) {
        console.log(e);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({status : StatusCodes.INTERNAL_SERVER_ERROR ,msg:  "server error"})
    }  
}





module.exports = {
    register,
    login,
    isUserLoggedIn,
    signout,
    getUserCounter,
    getUsersByMail,
    getCurrUserByName,
    removeUser,
    setAdmin,
    isAdmin
}

