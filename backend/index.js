const express = require('express')
const cors = require('cors')
const db = require('./dbConfig/db')
const form = require('./app/controllers/formCtlr')
const app = express()
const port = 3000
app.use(cors())
app.use(express.json())
db()

//api's
app.get('/get/forms', form.get)
app.post('/create/form', form.create)
app.put('/update/form/:id', form.edit)
app.delete('/delete/form/:id', form.delete)

app.listen(port, ()=>{
    console.log('server is running on port', port)
})