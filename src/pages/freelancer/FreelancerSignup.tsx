import React from 'react'
import { Button, Container, MenuItem, TextField, Typography, Link, Alert } from '@mui/material'
import { useStyle } from '../../style'
import '../../index.css'
import GoogleIcon from '@mui/icons-material/Google';
import { Stack } from '@mui/system';
import CountriesList from '../../components/CountriesList'
import { useNavigate } from 'react-router-dom';
import { Formik } from 'formik'
import * as yup from 'yup'
import axios from 'axios';
import { toast } from 'react-hot-toast';

interface MyFormValues {
  firstName: string,
  lastName: string,
  email: string,
  password: string,
  confirmPassword: string,
  country: string
}


function FreelancerSignup() {

  let confirmPass = false

  const initialValue: MyFormValues = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    country: ''
  }

  const navigate = useNavigate()

  const classes = useStyle();

  return (
    <>
      <Container className={classes.clientSignupContainer} >
        <Typography variant='h4' className='ml-10 mt-3 clientSignupTitle'>Sign up to find work you love</Typography>
        <Button variant="contained" size='medium' sx={{ width: '419px', marginTop: '20px', marginLeft: '29px', borderRadius: '30px' }}><GoogleIcon sx={{
          color: '#0275d8', width: '25px', backgroundColor: 'white', height: '15px', marginRight: '3px', borderRadius: '50px'
        }}></GoogleIcon>Continue with Google</Button>
        <Formik initialValues={initialValue}
        validationSchema={yup.object({
          firstName: yup.string().max(10,'Only allowed 10 charecteres').required('*First Name Required').matches(/^'?\p{L}+(?:[' ]\p{L}+)*'?$/u,'Insert only normal character'),
          lastName: yup.string().max(10,'Only allowed 10 charecteres').required('*Last Name Required').matches(/^'?\p{L}+(?:[' ]\p{L}+)*'?$/u,'Insert only normal character'),
          email:yup.string().email('Invalid email').required('*Email Required'),
          password:yup.string().min(8, 'Require 8 or more charecters').required("*Password Required"),
          confirmPassword:yup.string().required("*Confirm Password Required"),
          country:yup.string().required("*Country Required")
        })}
        onSubmit={async (values) => {
          console.log(values)
          if(values.password !== values.confirmPassword) confirmPass = true
          const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/freelancer/signup`,values);
          if(response.data.status){
            toast.success(response.data.message)
            navigate('/login')
          }else {
            toast.error(response.data.message)
          }
        }}
        >{({ handleSubmit, handleChange, errors, touched, values }) => (

          <form onSubmit={handleSubmit}>
             {
              errors.firstName && touched.firstName?<Alert sx={{marginTop: '20px'}} severity='error'>{errors.firstName}</Alert>:
              errors.lastName && touched.lastName?<Alert sx={{marginTop: '20px'}} severity='error'>{errors.lastName}</Alert>:
              errors.email && touched.email?<Alert sx={{marginTop: '20px'}} severity='error'>{errors.email}</Alert>:
              errors.password && touched.password?<Alert sx={{marginTop: '20px'}} severity='error'>{errors.password}</Alert>:
              errors.confirmPassword && touched.confirmPassword?<Alert sx={{marginTop: '20px'}} severity='error'>{errors.confirmPassword}</Alert>:
              errors.country && touched.country?<Alert sx={{marginTop: '20px'}} severity='error'>{errors.country}</Alert>:''
            }
            <Typography sx={{marginLeft:'130px', marginTop:'10px'}} color='#fc0303'>{confirmPass?"Password must be Match":null}</Typography>
            <Stack direction="row" spacing={3}>
              <TextField
                id="outlined"
                label='First Name'
                type="text"
                autoComplete="current-password"
                size='small'
                className={`ml-8 mt-5 textField`}
                style={{ width: '200px' }}
                name='firstName'
                onChange={handleChange}
                value={values.firstName}
                placeholder='First Name'
              />
              <TextField
                id="outlined"
                label='Last Name'
                type="text"
                size='small'
                className={`ml-4 mt-5 textField`}
                style={{ width: '200px' }}
                name='lastName'
                onChange={handleChange}
                value={values.lastName}
                placeholder='Last Name'
              />
            </Stack>
            <Stack direction="column" spacing={3}>
              <TextField
                id="outlined"
                label='Email'
                type="text"
                size='small'
                className={`ml-8 mt-5 textField`}
                style={{ width: '415px' }}
                name='email'
                onChange={handleChange}
                value={values.email}
                placeholder='Email'
              />
              <TextField
                id="outlined"
                label='Password'
                type="password"
                size='small'
                className={`ml-8  textField`}
                style={{ width: '415px' }}
                name='password'
                onChange={handleChange}
                value={values.password}
                placeholder='Password'
              />
              
              <TextField
                id="outlined"
                label='Confirm Password'
                type="password"
                autoComplete="current-password"
                size='small'
                className={`ml-8 textField`}
                style={{ width: '415px' }}
                name='confirmPassword'
                onChange={handleChange}
                value={values.confirmPassword}
                placeholder='Confirm Password'
              />
            
              <TextField
                id="outlined-select-currency"
                select
                label='Country'
                defaultValue="India"
                helperText="Please select your Country"
                size='small'
                style={{ width: '415px' }}
                className='ml-8'
                name='country'
                onChange={handleChange}
                value={values.country}
              >
                {CountriesList.map((option: string) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
             
            </Stack>
            <Button type='submit' variant="contained" size='medium' sx={{ width: '419px', marginTop: '20px', marginLeft: '29px', borderRadius: '10px' }}>Create my  Account</Button>
          </form>
        )}
        </Formik>
        <Link underline='always' onClick={() => navigate('/client/login')} style={{ marginLeft: '115px', marginTop: '20px' }}>Already have an account? Log In</Link>
      </Container>
    </>
  )
}

export default FreelancerSignup
