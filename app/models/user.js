const mongoose = require('mongoose')
const validator = require('validator')
const jwt = require('jsonwebtoken')
const bcryptjs = require('bcryptjs')

const Schema = mongoose.Schema

const userSchema = new Schema({
    username:{
        type: String,
        required: true,
        minlength: 6,
        maxlength: 128
    },
    email:{
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function(value){
                return validator.isEmail(value)
            },
            message: function(){
                return 'invalid email format'
            }
        }
    },
    password: {
        type: String,
        required: true, 
        minlength: 6,
        maxlength: 128 
    }, 
    phone:{
        type: Number,
        required: true,
        minlength:10,
        maxlength:10
    },
    tokens:[{
        token:{
            type: String
        },
        createdAt: {
            type: Date,
            default: Date.now
        }
    }],
    createdAt:{
        type: Date,
        default: Date.now
    }
})

// pre hook middleware
userSchema.pre('save',function(next){
    const user = this
    if(user.isNew){
        bcryptjs.genSalt(10)
            .then(function(salt){
                bcryptjs.hash(user.password,salt)
                    .then(function(encryptedPassword){
                        user.password = encryptedPassword
                        next()
                    })
            })
    }else{
        next()
    }
    
})

// static method
userSchema.statics.findByCredentials = function(email,password){
    const user = this
    return user.findOne({email})
        .then(function(user){
            if(!user){
                return Promise.reject('invalid email/password')
            }
            return bcryptjs.compare(password,user.password)
                .then(function(result){
                    if(result){
                        return Promise.resolve(user)
                    }else{
                        return Promise.reject('invalid email/password')
                    }
                })
        })
        .catch(function(err){
            return Promise.reject(err)
        })
}

userSchema.statics.findByToken = function(token){
    const user = this
    let tokenData
    try{
        tokenData = jwt.verify(token, 'jwt@123')
    }catch(err){
        return Promise.reject(err)
    }
    return User.findOne({
        _id:tokenData._id,
        'tokens.token':token
    })
}


// instance method
userSchema.methods.generateToken = function(){
    const user = this
    const tokenData = {
        _id: user._id,
        username: user.username,
        createdAt: Number(new Date())
    }
    const token = jwt.sign(tokenData,'jwt@123',{
        algorithm: "HS256",
        expiresIn: 300
    })
    user.tokens.push({
        token
    })
    return user.save()
        .then(function(user){
            return Promise.resolve(token)
        })
        .catch(function(err){
            return Promise.reject(err)
        })
}

const User = mongoose.model('User', userSchema)

module.exports = User