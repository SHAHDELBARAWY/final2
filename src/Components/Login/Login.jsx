import axios from 'axios';
import styles from './Login.module.css'
import { useFormik } from 'formik';
import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {Alert}  from 'react-bootstrap';
import * as Yup from 'yup';
import { UserContext } from '../../Context/UserContext';





export default function Login(){
  const {setUserLogin} = useContext(UserContext);
    let navigate = useNavigate();
    
    let validationSchema = Yup.object().shape({
        email:Yup.string().email('email is invalid').required('email is required'),
        password:Yup.string().matches(/^[A-Z][a-z0-9]{5,10}$/ , 'password must start with uppercase').required('password is required'),
    })


    const [apiError, setapiError]= useState('');
    const [isLoading, setIsLoading]= useState(false);
    function handleLogin(formValues) {
      setIsLoading(true);
        axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin', formValues)
        .then ((response)=> {
          if (response.data.message === 'success') {
            localStorage.setItem('userToken', response.data.token);
            setUserLogin(response.data.token); 
            navigate('/')
            setIsLoading(false);
            console.log(x); 
          }
        })

       .catch ((response)=> {
        setIsLoading(false);
        setapiError(response?.response?.data?.message); 
      })
      console.log(formValues);
    }
    
    let formik = useFormik({
    
        initialValues:{
            email:'',
            password:'',
        },
        validationSchema,
        onSubmit:handleLogin
    
    });
    
      return <>
        
       
      <div className='alert'></div>
              <div className="container">

              {apiError? ( ['danger'].map((variant) => (
        <Alert key={variant} variant={variant}>
          {apiError}
        </Alert>
            ))
            ):null}
          <h2>Login now</h2>
          <form onSubmit={formik.handleSubmit}>

            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email:</label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
              {formik.errors.email && formik.touched.email? ( ['danger'].map((variant) => (
        <Alert key={variant} variant={variant}>
          {formik.errors.email }
        </Alert>
            ))
            ):null}

            <div className="mb-3">
              <label htmlFor="password" className="form-label">password:</label>
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              </div>
                {formik.errors.password && formik.touched.password? ( ['danger'].map((variant) => (
        <Alert key={variant} variant={variant}>
          {formik.errors.password}
        </Alert>
            ))
            ):null}
            <div className='d-flex align-items-center justify-content-between'>
             <p className='pl-4 '> <span className='fw-semibold'><Link to={'/register'}>forget your password?</Link></span></p>   
            <button type="submit" className={`btn btn-primary d-flex align-items-center btn-outline-secondary  ${styles.custombutton}`}>
                                             
                {isLoading?<i className='fas fa-spinner fa-spin'></i>: 'Login now'}
            </button>

            </div>
          </form>
        </div>
      </>
    
    
    }

  
