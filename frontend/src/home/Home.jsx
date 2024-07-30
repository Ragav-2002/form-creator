import React, { useContext } from 'react'
import Button from '@mui/material/Button';
import './home.css'
import { useNavigate } from 'react-router-dom';
import { FormContext } from '../App';
import axios from 'axios';
function Home() {
    const {forms, dispatchForm} = useContext(FormContext) 
    const navigate = useNavigate()
    const handleDelete = async(id) => {
        try{
            const res = await axios.delete(`https://form-creator-73ie.onrender.com/delete/form/${id}`)
            dispatchForm({type: 'DEL', payload: id})
            console.log(res.data.msg)
        }catch(e){
            console.log(e.message)
        }
    }
    return (
    <div className='home'>
        <div className="head">
            <h1>Welcome to Form.com</h1>
            <p>This is a simple form builder</p>
            <Button variant="contained" color="success" onClick={()=>navigate('createForm')}>CREATE NEW FORM</Button>
        </div>
        <hr/>
        <div className="body">
            <h1>Forms</h1>
            {forms.length > 0 ? 
            forms.map(form=>{
                return (
                    <div className="formContent" key={form._id}>
                        <h2>{form.heading}</h2>
                        <div className="actions">
                            <Button color='success' onClick={()=>(navigate('viewForm', {state:{form: form}}))}>view</Button>
                            <Button color='primary' onClick={()=>(navigate('createForm', {state:{form: form}}))}>edit</Button>
                            <Button color='error' onClick={()=>handleDelete(form._id)}>delete</Button>
                        </div>
                    </div>
                )
            }) : 'You have no forms created yet'}
        </div>
    </div>
    )
}

export default Home