
import { Typography, Stack, Container, CssBaseline, TextField, Button, Link, MenuItem, Alert } from '@mui/material'
import { useStyle } from '../style'
import '../index.css'
import { Formik } from 'formik'
import * as yup from 'yup'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { userData } from '../redux/User'
import { useDispatch } from 'react-redux'

interface MyFormValues {
  email: string,
  password: string,
  userType: string
}

const userTypes = [
  'Freelancer',
  'Client'
]

function Login() {

  const dispatch = useDispatch()

  const googleAuth = () => {
    window.open(
      'http://localhost:5000/api/client/google'
    )
  }
  const navigate = useNavigate()
  const initialValue: MyFormValues = {
    email: '',
    password: '',
    userType: ''
  }
  const classes = useStyle()

  return (
    <>
      <CssBaseline />
      <Container className='mainContainer'>
        <Container maxWidth='sm' style={{ width: '562px', height: '495px', marginLeft: '370px' }} className={classes.containerLogin}>
          <Container maxWidth='sm' style={{ width: '562px', paddingBottom: '20px', marginLeft: '-27px' }} className={classes.containerLogin2}>
            <Stack>
              <Typography className='mt-8 ml-12 heading' style={{ color: 'white' }} variant='h2'>Welcome back!</Typography>
            </Stack>
            <Formik initialValues={initialValue}
              validationSchema={yup.object({
                email: yup.string().required('*Email Required').email('Invalid email'),
                password: yup.string().required('*Password Required'),
                userType: yup.string().required("*User Type Required")
              })}
              onSubmit={async (values) => {
                const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/login`, values);
                console.log(response)
                if (response.data.status) {
                  let client: string|boolean|any = response.data.userType==='client'?true:false
                  let freelancer: string|boolean|any = response.data.userType==='client'?false:true
                  localStorage.setItem('client', client)
                  localStorage.setItem('freelancer', freelancer)
                  if(response.data.userType==='client') {
                    localStorage.setItem('clientToken', response.data.token)
                  }else {
                    localStorage.setItem('freelancerToken', response.data.token)
                  }
                  dispatch(userData(values))
                  toast.success(response.data.message)
                  if(response.data.userType === 'freelancer'){
                    navigate(`/${response.data.userType}/home`,{replace:true})
                  } else {
                    navigate('/');
                  }
                } else {
                  toast.error(response.data.message)
                }
              }}>{({ handleSubmit, handleChange, errors, touched, values }) => (
                <form onSubmit={handleSubmit}>
                  {
                    errors.email && touched.email ? <Alert severity='error'>{errors.email}</Alert>:
                    errors.password && touched.password ? <Alert severity='error'>{errors.password}</Alert>:
                    errors.userType && touched.userType ? <Alert severity='error'>{errors.userType}</Alert>:''
                  }
                  <Stack direction='column'>
                    <TextField InputLabelProps={{ className: classes.floatingLabelFocusStyle }} onChange={handleChange} value={values.email} name='email' color='primary' className='adminInput' style={{ marginTop: '10px' }} id="standard-basic"
                      label={touched.email && errors.email ? errors.email : 'Email'} variant="standard" />
                    <TextField InputLabelProps={{ className: classes.floatingLabelFocusStyle }} type='password' onChange={handleChange} value={values.password} name='password' className='adminInput' id="standard-basic"
                      label={touched.password && errors.password ? errors.password : 'Password'} variant="standard" />
                    <TextField
                      id="outlined-select-currency"
                      select
                      label={touched.userType && errors.userType ? errors.userType : 'User Type'}
                      helperText="Please select your User type"
                      className='ml-0'
                      name='userType'
                      onChange={handleChange}
                      InputLabelProps={{ className: classes.floatingLabelFocusStyle }}
                      style={{ width: '520px' }}
                    >
                      {userTypes.map((option: string) => (
                        <MenuItem key={option} value={option}>
                          {option}
                        </MenuItem>
                      ))}
                    </TextField>
                    <Button className='mt-5' size='large' type='submit' variant="contained">Login</Button>
                    <Link className='right' onClick={() => navigate('/signup')} sx={{ marginLeft: '222px', marginTop: '7px', fontWeight: '5px' }}>New User</Link>
                  </Stack>
                  <Button onClick={googleAuth}>Login with Google</Button>
                </form>
              )}
            </Formik>

          </Container>
        </Container>
      </Container>
    </>
  )
}

export default Login

