const mongoose = require('mongoose')
mongoose.Promise = global.Promise
mongoose.connect('mongodb+srv://prasanna:Jobs_2020@cluster0.9zp2r.mongodb.net/<dbname>?retryWrites=true&w=majority', { useNewUrlParser: true})
    .then(function(){
        console.log('connected to db')
    })
    .catch(function(){
        console.log('error connecting to db')
    })

module.exports = {
    mongoose 
}