const express = require('express')
const router = express.Router()
const {user_already_exists,user_not_exists,all_element_exists,passwordHash} = require('../middleware/authentication')
const {login, register, isUserLoggedIn, signout, getUserCounter, getUsersByMail,getCurrUserByName,removeUser, setAdmin, isAdmin} = require('../controllers/auth')


router.post('/register', [all_element_exists,user_already_exists, passwordHash],register)
router.post('/isUserLoggedIn', isUserLoggedIn)
router.post('/login', [user_not_exists],login)
router.post('/signout', signout)
router.get('/usersCounter', getUserCounter)
router.get('/usersByMail', getUsersByMail)
router.post('/getUserByName', getCurrUserByName)
router.post('/removeUser', [user_not_exists],removeUser)
router.post('/setAdmin', [user_not_exists],setAdmin)
router.post('/isAdmin', isAdmin)








module.exports = router