import React from 'react'
import { Button, Container, MenuItem, TextField, Typography } from '@mui/material'
import { useStyle } from '../style'
import '../index.css'
import { Stack } from '@mui/system';
import CountriesList from '../component/CountriesList'
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


function SignupAfterAuth() {

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

      <Container className={classes.clientSignupContainer2} >
        <Typography variant='h3' className='ml-10 mt-3 clientSignupTitle2'>Fill it</Typography>
        <Formik initialValues={initialValue}
          validationSchema={yup.object({
            password: yup.string().min(8, 'Require 8 or more charecters').required("*Required"),
            confirmPassword: yup.string().required("*Required"),
            country: yup.string().required("*Required")
          })}
          onSubmit={async (values) => {
            console.log(values)
            if (values.password !== values.confirmPassword) { confirmPass = true } else {
              const Name:any = localStorage.getItem('userName')
              const email:any = localStorage.getItem('email')
              console.log(Name,' ',email)
              const userName = Name.split(" ")
              const firstName = userName[0]
              const lastName = userName[1]
              values.firstName = firstName
              values.lastName = lastName
              values.email = email
              const response = await axios.post('http://localhost:5000/api/client/signup', values);
              if (response.data.status) {
                toast.success(response.data.message)
                navigate('/login')
              } else {
                toast.error(response.data.message)
              }
            }
          }}
        >{({ handleSubmit, handleChange, errors, touched, values }) => (

          <form onSubmit={handleSubmit}>
            <Typography sx={{ marginLeft: '130px', marginTop: '10px' }} color='#fc0303'>{confirmPass ? "Password must be Match" : null}</Typography>
            <Stack direction="column" spacing={3} className="mt-5">
              <TextField
                id="outlined"
                label={touched.password && errors.password ? errors.password : 'Password'}
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
                label={touched.confirmPassword && errors.confirmPassword ? errors.confirmPassword : 'Confirm Password'}
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
                label={touched.country && errors.country ? errors.country : 'Country'}
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
      </Container>
    </>
  )
}

export default SignupAfterAuth