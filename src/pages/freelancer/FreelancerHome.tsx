import { Box, Container } from '@mui/system'
import AddCircleIcon from '@mui/icons-material/AddCircle';
import React from 'react'
import { Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import UserNav from '../../components/UserNav'

function FreelancerHome() {

  const navigate = useNavigate()

  return (
    <>
          <UserNav />
    <Container>

    </Container>
    </>
  )
}

export default FreelancerHome
