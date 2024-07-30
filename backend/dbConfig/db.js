const mongoose = require('mongoose')
const db = async() => {
    try{
        await mongoose.connect('mongodb+srv://ragavbts:ragvirat2002@cluster0.2vr7yrz.mongodb.net/')
        console.log('connected to db')
    }catch(e){
        console.log('error connecting to db')
    }
}
module.exports = db