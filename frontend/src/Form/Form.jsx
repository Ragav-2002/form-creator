import React, { useContext, useState } from 'react';
import './form.css';
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';
import TextField from '@mui/material/TextField';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios'
import { useLocation, useNavigate } from 'react-router-dom';
import { FormContext } from '../App';

function Form() {
  const location = useLocation()
  const form = location.state?.form
  console.log(form)
  const [addInput, setAddInput] = useState(false);
  const [inputs, setInputs] = useState(form?.inputs ? [...form.inputs] : []);
  const [heading, setHeading] = useState(form?.heading ? form.heading : 'Untitled Form');
  const [editIndex, setEditIndex] = useState(null);
  const [formData, setFormData] = useState({ title: '', placeholder: '' });
  const {dispatchForm} = useContext(FormContext)
  const navigate = useNavigate()

  const handleAddInputs = (type) => {
    if (inputs.length <= 20) {
      const data = {
        heading: heading,
        type: type,
        placeholder: 'enter',
        title: type,
      };
      setInputs([...inputs, data]);
    } else {
      alert('Input fields must be 20 or less');
    }
  };

  const handleFormCreate = async() => {
    const formData = {heading, inputs}
    try{
        if(form){
            const res = await axios.put(`https://form-creator-73ie.onrender.com/update/form/${form?._id}`, formData)
            dispatchForm({type: 'EDIT', payload: res.data})
            navigate('/')
        }else{
            const res = await axios.post(`https://form-creator-73ie.onrender.com/create/form`, formData)
            dispatchForm({type: 'CREATE', payload: res.data})
            navigate('/')
        }
    }catch(e){
        alert(e.message)
    }
  }

  const handleEditClick = (index) => {
    setEditIndex(index);
    setFormData(inputs[index]);
  };

  const handleHeadEdit = () => {
    setEditIndex('head');
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    const updatedInputs = [...inputs];
    updatedInputs[editIndex] = { ...updatedInputs[editIndex], [name]: value };
    setInputs(updatedInputs);
  };

  const handleDeleteClick = (index) => {
    const updatedInputs = inputs.filter((_, i) => i !== index);
    setInputs(updatedInputs);
    if (index === editIndex) {
      setEditIndex(null);
      setFormData({ title: '', placeholder: '' });
    }
  };

  return (
    <div className='form'>
      <h1>Create New Form</h1>
      <div className="container">
        <div className='left'>
          <div className="title">
            <h2>{heading}</h2>
            <EditIcon color='primary' onClick={handleHeadEdit} />
          </div>
          <div className="inputContainer">
            {inputs.map((ele, i) => (
              <div className="input" key={i}>
                <TextField
                  label={ele.title}
                  placeholder={ele.placeholder}
                  type={ele.type}
                  size="small"
                  variant="standard"
                  InputProps={{
                    readOnly: true,
                  }}
                  InputLabelProps={ele.type === 'date' ? { shrink: true } : {}}
                />
                <EditIcon color='primary' onClick={() => handleEditClick(i)} />
                <DeleteIcon color='error' onClick={() => handleDeleteClick(i)} />
              </div>
            ))}
          </div>
          <div className='content'>
            <Button variant='outlined' onClick={() => setAddInput(!addInput)}>
              {addInput ? 'Close input' : 'Add Input'}
            </Button><br />
            {addInput && (
              <div className="buttons">
                <Button variant='contained' onClick={() => handleAddInputs('text')}>text</Button>
                <Button variant='contained' onClick={() => handleAddInputs('number')}>number</Button>
                <Button variant='contained' onClick={() => handleAddInputs('email')}>email</Button>
                <Button variant='contained' onClick={() => handleAddInputs('password')}>password</Button>
                <Button variant='contained' onClick={() => handleAddInputs('date')}>date</Button>
              </div>
            )}
            <Button variant='contained' color='success'>Submit</Button>
          </div>
        </div>
        <div className="right">
          <h3>Form Editor</h3>
          {editIndex === 'head' ? 
            <TextField
              label='Title'
              value={heading}
              onChange={(e) => setHeading(e.target.value)}
              size="small"
              variant="standard"
            />
          :
            <>
              <TextField
                label='Title'
                name="title"
                value={formData.title}
                onChange={handleFormChange}
                size="small"
                variant="standard"
              />
              <TextField
                label='Placeholder'
                name="placeholder"
                value={formData.placeholder}
                onChange={handleFormChange}
                size="small"
                variant="standard"
                style={{ marginTop: '10px' }}
              />
            </>
          }
        </div>
      </div>
      <Button color='success' variant='contained' onClick={handleFormCreate}>{form ? 'edit form' :'CREATE FORM'}</Button>
    </div>
  );
}

export default Form;

