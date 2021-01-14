const User = require('../models/user')
const pick = require('lodash/pick')

module.exports.signUp =function(req,res){
    const body = req.body
    const user = new User(body)
    if(user.username && user.email && user.password && user.phone){
        User.findOne({email:user.email})
            .then(function(userFind){
                if(!userFind){
                    user.save()
                    .then(function(user){
                        res.send(pick(user, ['_id','username','email']))
                    })
                    .catch(function(err){
                        res.send(err)
                    })
                }else{
                    res.status('401').send('email already present')
                }
                
            })
            .catch(function(err){
                res.send(err)
            })
    }else{
        res.status('400').send('all fields are required')
    }

}

module.exports.signIn = function(req,res){
    const {email,password} = req.body
    if(email && password){
        User.findByCredentials(email,password)
            .then(function(user){
                return user.generateToken()
            })
            .then(function(token){
                res.send({token})
            })
            .catch(function(err){
                res.send(err)
            })
    }else{
        res.status('401').send('email and password is needed ')
    }
}

module.exports.signOut = function(req,res){
    const {id,token} = req
    User.findByIdAndUpdate(id,{$pull:{tokens:{token:token}}})
        .then(function(){
            res.send({notice:'successfully logged out'})
        })
        .catch(function(err){
            res.send(err)
        })
}

module.exports.details = function(req,res){
    const {id} = req
    console.log(id)
    User.findById(id)
        .then(function(user){
            res.send(pick(user, ['_id','username','email','phone']))
        })
        .catch(function(err){
            res.send(err)
        })
}