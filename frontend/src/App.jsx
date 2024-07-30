import React, { createContext, useEffect, useReducer } from 'react'
import './index.css'
import axios from 'axios'
import Home from './home/Home'
import Form from './Form/Form'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import formReducer from './reducer/formReducer'
import FormView from './formView/FormView'

export const FormContext = createContext()

function App() {
  const [forms, dispatchForm] = useReducer(formReducer, [])
  useEffect(()=>{
    (async()=>{
      try{
        const res = await axios.get('http://localhost:3000/get/forms')
        dispatchForm({type: 'GET', payload: res.data})
      }catch(e){
        console.log(e.message)
      }
    })()
  }, [])
  return (
    <div className='main'>
      <BrowserRouter>
        <FormContext.Provider value={{forms, dispatchForm}} >
          <Routes>
            <Route path='/' element={<Home/>} />
            <Route path='/createForm' element={<Form/>} />
            <Route path='/viewForm' element={<FormView/>} />
          </Routes>
        </FormContext.Provider>
      </BrowserRouter>
    </div>
  )
}

export default App
