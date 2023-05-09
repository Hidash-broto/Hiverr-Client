import { Box, Container } from '@mui/system'
import AddCircleIcon from '@mui/icons-material/AddCircle';
import React from 'react'
import { Button, Typography } from '@mui/material';
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
