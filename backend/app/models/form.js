const {Schema, model} = require('mongoose')
const formSchema = new Schema({
    heading: String,
    inputs: [{}]
})
const Form = model('Form', formSchema)
module.exports = Form