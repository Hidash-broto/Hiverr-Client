import { Container } from '@mui/system'
import React from 'react'
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import FreelancerNav from '../../components/FreelancerNav'

function FreelancerHome() {

  const navigate = useNavigate()

  return (
    <>
          <FreelancerNav />
    <Container>
<Button onClick={() => {
  localStorage.clear()
  navigate('/login')
}}>Logout</Button>
    </Container>
    </>
  )
}

export default FreelancerHome
