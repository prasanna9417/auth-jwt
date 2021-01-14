const User = require('../models/user')

const authenticateUser = function(req,res,next){
    const token = req.header('Authorization')
    User.findByToken(token)
        .then(function(user){
            console.log(user)
            if(user){
                req.token =token
                req.id =user._id
                next()
            }else{
                res.status('401').send({notice:'token not available'})
            }
        })
        .catch(function(err){
            res.status('401').send(err)
        })
}

module.exports = {
    authenticateUser
}