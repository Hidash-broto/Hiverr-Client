import React, {useState} from 'react'
import { Typography, Stack, Container, CssBaseline, Button } from '@mui/material'
import { useStyle } from '../../style'
import '../../index.css'
import { useNavigate } from 'react-router-dom'


function SelectingPage() {
  const navigate = useNavigate()
  const classes = useStyle()
  const [status, setStatus] = useState('CLIENT')

  const submit = async () => {
    if(status === 'CLIENT') navigate('/client/signup')
    if(status === 'FREELANCER') navigate('/freelancer/signup')
  }

  const handleChange = (USER:string) => {
    setStatus(USER)
    if(USER === 'CLIENT'){
      let element = document.getElementById(USER);
      element !== null ? element.style.borderColor = 'lime': console.log('elsse');
      let element2 = document.getElementById('FREELANCER');
      element2 !== null ? element2.style.borderColor = 'white': console.log('elsse');

    }else {
      let element = document.getElementById(USER);
      element !== null ? element.style.borderColor = 'lime': console.log('elsse');
      let element2 = document.getElementById('CLIENT');
      element2 !== null ? element2.style.borderColor = 'white': console.log('elsse');
    }

  }


  return (
    <>
      <CssBaseline />
      <Container className={classes.imageContainer}>
        <Container className={`${classes.ContainerSelector}`}>
          <Typography variant='h4' className='ml-12 mt-3 '>Join as a client or freelancer</Typography>
          <Stack direction='row' spacing={2}>
          <div style={{borderStyle:'solid', borderColor:'lime'}} id='CLIENT' onClick={(event:React.MouseEvent<HTMLElement>) => {
             handleChange('CLIENT') 
          } } className={classes.selectBox}>
            <Typography variant='h5' className='ml-1 mt-10 selectorText'>I’m a client,
              hiring for a project</Typography>
          </div>
          <div style={{borderStyle:'solid', borderColor:'white'}} id='FREELANCER' onClick={(event:React.MouseEvent<HTMLElement>) => {
             handleChange('FREELANCER') 
          } } className={`${classes.selectBox} mt-4`}>
            <Typography variant='h5' className='ml-1 mt-10 selectorText'>I am a Freelancer, Looking for work</Typography>
          </div>
          </Stack>
          <Stack>
          <Button onClick={submit} className={classes.applyButton} variant='contained' size='large'>Apply as a {status}</Button>
          </Stack>
        </Container>
      </Container>
    </>
  )
}

export default SelectingPage
