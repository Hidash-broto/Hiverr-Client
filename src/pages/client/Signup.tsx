import React from 'react'
import { Button, Container, MenuItem, TextField, Typography, Link } from '@mui/material'
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
import {auth, provider} from '../../config'
import {signInWithPopup} from 'firebase/auth'

interface MyFormValues {
  firstName: string,
  lastName: string,
  email: string,
  password: string,
  confirmPassword: string,
  country: string
}


function Signup() {

  const handleLogin = () => {
    signInWithPopup(auth, provider).then((data) => {
      let userName: any = data.user.displayName
      let email: any = data.user.email
      console.log(userName,' ',email)
      localStorage.setItem('userName', userName)
      localStorage.setItem('email', email)
      navigate('/SignupAfterAuth')
    })
  }

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
        <Typography variant='h3' className='ml-10 mt-3 clientSignupTitle'>Sign up to hire talent</Typography>
        <Button onClick={handleLogin} variant="contained" size='medium' sx={{ width: '419px', marginTop: '20px', marginLeft: '29px', borderRadius: '30px' }}><GoogleIcon sx={{
          color: '#0275d8', width: '25px', backgroundColor: 'white', height: '15px', marginRight: '3px', borderRadius: '50px'
        }}></GoogleIcon>Continue with Google</Button>
        <Formik initialValues={initialValue}
        validationSchema={yup.object({
          firstName: yup.string().max(10,'Only allowed 10 charecteres').required('*Required').matches(/^'?\p{L}+(?:[' ]\p{L}+)*'?$/u,'Insert only normal character'),
          lastName: yup.string().max(10,'Only allowed 10 charecteres').required('*Required').matches(/^'?\p{L}+(?:[' ]\p{L}+)*'?$/u,'Insert only normal character'),
          email:yup.string().email('Invalid email').required('*Required'),
          password:yup.string().min(8, 'Require 8 or more charecters').required("*Required"),
          confirmPassword:yup.string().required("*Required"),
          country:yup.string().required("*Required")
        })}
        onSubmit={async (values) => {
          if(values.password !== values.confirmPassword) confirmPass = true
          const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/client/signup`,values);
          if(response.data.status){
            toast.success(response.data.message)
            navigate('/login')
          }else {
            toast.error(response.data.message)
          }
        }}
        >{({ handleSubmit, handleChange, errors, touched, values }) => (

          <form onSubmit={handleSubmit}>
            <Typography sx={{marginLeft:'130px', marginTop:'10px'}} color='#fc0303'>{confirmPass?"Password must be Match":null}</Typography>
            <Stack direction="row" spacing={3}>
              <TextField
                id="outlined"
                label={touched.firstName && errors.firstName ? errors.firstName: 'First Name'}
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
                label={touched.lastName && errors.lastName ? errors.lastName: 'Last Name'}
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
                label={touched.email && errors.email ? errors.email: 'Email'}
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
                label={touched.password && errors.password ? errors.password: 'Password'}
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
                label={touched.confirmPassword && errors.confirmPassword ? errors.confirmPassword: 'Confirm Password'}
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
                label={touched.country && errors.country ? errors.country: 'Country'}
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

export default Signup
