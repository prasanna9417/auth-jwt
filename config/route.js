const express = require('express')
const router = express.Router()
const userController = require('../app/controllers/userController')

const {authenticateUser} = require('../app/middlewares/authentication')

router.post('/users/signUp',userController.signUp)
router.post('/users/signIn',userController.signIn)
router.delete('/users/signOut',authenticateUser,userController.signOut)
router.get('/users/details',authenticateUser,userController.details)

module.exports = router