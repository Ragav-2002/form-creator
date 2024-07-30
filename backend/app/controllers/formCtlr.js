
const Form = require('../models/form')

const form = {}
form.create = async(req, res) => {
    const body = req.body
    try{
        const data = new Form(body)
        await data.save()
        res.json(data)
    }catch(e){
        res.status(500).json('something went wrong')
    }
}
form.edit = async(req, res)=> {
    const body = req.body
    const id = req.params.id
    try{
        const data = await Form.findByIdAndUpdate(id, body, {new: true})
        res.json(data)
    }catch(e){
        res.status(500).json('something went wrong')
    }
}
form.delete = async(req, res)=> {
    const id = req.params.id
    try{
        await Form.findByIdAndDelete(id)
        res.json({msg: 'form deleted successfully'})
    }catch(e){
        res.status(500).json('something went wrong')
    }
}
form.get = async(req, res)=> {
    try{
        const data = await Form.find()
        res.json(data)
    }catch(e){
        res.status(500).json('something went wrong')
    }
}

module.exports = form