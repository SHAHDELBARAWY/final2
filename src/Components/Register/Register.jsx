import axios from 'axios';
import { useFormik } from 'formik';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {Alert}  from 'react-bootstrap';
import * as Yup from 'yup';
import { UserContext } from '../../Context/UserContext';



export default function Register(){
    let navigate = useNavigate();

    let {setUserLogin} = useContext(UserContext);
    
    let validationSchema = Yup.object().shape({
        name:Yup.string().min(3 , 'name minlenght is 3').max(10 , 'name maxlenght is 10').required('name is required'),
        email:Yup.string().email('email is invalid').required('email is required'),
        phone:Yup.string().matches(/^01[012][0-9]{8}$/, 'phone must be alid egyption number').required('name is required'),
        password:Yup.string().matches(/^[A-Z][a-z0-9]{5,10}$/ , 'password must start with uppercase').required('password is required'),
        rePassword:Yup.string().oneOf([Yup.ref('password')] , 'password and rePassword must be same').required('rePassword is required')
    })




    const [apiError, setapiError]= useState('');
    const [isLoading, setIsLoading]= useState(false);

    function handleRegister(formValues){

        setIsLoading(true);
        axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signup`, formValues)
        .then((apiResponse)=> {
              if (apiResponse?.data?.message === 'success')
                {
                localStorage.setItem('userToken', response.data.token);
                setUserLogin(apiResponse.data.token);
                navigate('/');
                setIsLoading(false);
                console.log(x);
              }
            })
        .catch((apiResponse)=>{
            setIsLoading(false);
            setapiError(apiResponse?.response?.data?.message);
            })
        console.log(formValues);
        console.log('register');
    }

    
    let formik = useFormik({
    
        initialValues:{
            name:'',
            email:'',
            password:'',
            rePassword:'',
            phone:''
        },
        validationSchema,
        onSubmit:handleRegister
    
    });

    const[counter , setcounter] = useState(0);
    useEffect(()=>{

    },[])
    
      return <>
        
       
      <div className='alert'></div>
              <div className="container">


              {apiError? ( ['danger'].map((variant) => (
        <Alert key={variant} variant={variant}>
          {apiError}
        </Alert>
            ))
            ):null}
          <h2>register now</h2>
          <form onSubmit={formik.handleSubmit}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Name:</label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>

            {formik.errors.name && formik.touched.name? ( ['danger'].map((variant) => (
        <Alert key={variant} variant={variant}>
          {formik.errors.name}
        </Alert>
            ))
            ):null}

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

              <div className="mb-3">
              <label htmlFor="rePassword" className="form-label">rePassword:</label>
              <input
                type="password"
                className="form-control"
                id="rePassword"
                name="rePassword"
                value={formik.values.rePassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              </div>
                {formik.errors.rePassword && formik.touched.rePassword? ( ['danger'].map((variant) => (
        <Alert key={variant} variant={variant}>
          {formik.errors.rePassword}
        </Alert>
            ))
            ):null}

              <div className="mb-3">
              <label htmlFor="phone" className="form-label">Phone:</label>
              <input
                type="tell"
                className="form-control"
                id="phone"
                name="phone"
                value={formik.values.phone}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              </div>
                {formik.errors.phone && formik.touched.phone? ( ['danger'].map((variant) => (
        <Alert key={variant} variant={variant}>
          {formik.errors.phone}
        </Alert>
            ))
            ):null}

            <button type="submit" className="btn btn-primary">
                {isLoading?<i className='fas fa-spinner fa-spin'></i>: 'Register now'}
            </button>
          </form>
        </div>
      </>
    
    
    }

