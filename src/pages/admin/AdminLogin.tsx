
import { Typography, Stack, Container, CssBaseline, TextField, Button } from '@mui/material'
import { useStyle } from '../../style'
import '../../index.css'
import { Formik } from 'formik'
import * as yup from 'yup'
import axios from 'axios'
import toast from 'react-hot-toast'
import {useNavigate} from 'react-router-dom'

interface MyFormValues {
  email: string,
  password: string
}

function AdminLogin() {
  const navigate = useNavigate()
  const initialValue: MyFormValues = {
    email: '',
    password: ''
  }
  const classes = useStyle()

  return (
    <>
      <CssBaseline />
      <Container className='mainContainer'>
        <Container maxWidth='sm' style={{ width: '562px', height: '420px', marginLeft: '290px' }} className={classes.containerLogin}>
          <Container maxWidth='sm' style={{ width: '562px', height: '420px', marginLeft: '-27px' }} className={classes.containerLogin2}>
            <Stack>
              <Typography className='mt-4 ml-12 heading' style={{ color: 'white' }} variant='h2'>Admin Login</Typography>
            </Stack>
            <Formik initialValues={initialValue}
              validationSchema={yup.object({
                email: yup.string().required('*Required').email('Invalid email'),
                password: yup.string().required('*Required')
              })}
              onSubmit={async (values) => {
                const response = await axios.post('http://localhost:5000/api/admin/login', values)
                console.log(response);               
                if(response.data.status){
                  const isAdmin = 'true';
                  localStorage.setItem('isAdmin',isAdmin)
                  localStorage.setItem('adminToken', response.data.token)
                  toast.success(response.data.message)
                  navigate('/admin')
                }else {
                  toast.error(response.data.message)
                }
              }}>{({ handleSubmit, handleChange, errors, touched, values }) => (
                <form onSubmit={handleSubmit}>
                  <Stack direction='column'>
                    {touched.email && errors.email ? <span className='errorMessage' style={{ color: '#fc0303' }}>{errors.email}</span> : null}
                    <TextField InputLabelProps={{className:classes.floatingLabelFocusStyle}} onChange={handleChange} value={values.email} name='email' color='primary' className='adminInput' style={{ marginTop: '10px' }} id="standard-basic" label="Email" variant="standard" />
                    {touched.password && errors.password ? <p  className='errorMessage' style={{ color: '#fc0303', fontSize:'50px' }}>{errors.password}</p> : null}
                    <TextField InputLabelProps={{className:classes.floatingLabelFocusStyle}} type='password' onChange={handleChange} name='password' className='adminInput' id="standard-basic" label="Password" variant="standard" />
                    <Button className='mt-3 ' size='large' type='submit' variant="contained">Login</Button>
                  </Stack>
                </form>
              )}
            </Formik>

          </Container>
        </Container>
      </Container>
    </>
  )
}

export default AdminLogin

