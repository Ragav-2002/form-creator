import { Button, TextField } from '@mui/material';
import React from 'react';
import { useLocation } from 'react-router-dom';
import './formView.css';

function FormView() {
    const location = useLocation();
    const form = location.state?.form;

    const handleData = (e) => {
        e.preventDefault(); 
        const formData = new FormData(e.target);
        const formValues = Object.fromEntries(formData.entries());
        alert('Data submitted successfully');
        console.log(formValues);
    };

    return (
        <div className='formView'>
            <h1>{form?.heading}</h1>
            <form className="container" onSubmit={handleData}>
                <div className="inputs" >
                    {form?.inputs.map((ele, i) => {
                        return (
                            <div className="input" key={i}>
                                <TextField
                                    label={ele.title}
                                    placeholder={ele.placeholder}
                                    type={ele.type}
                                    size="small"
                                    variant="standard"
                                    name={ele.title}
                                />
                            </div>
                        );
                    })}
                </div>
                <Button color='success' variant='contained' type='submit'>Submit</Button>
            </form>
        </div>
    );
}

export default FormView;
