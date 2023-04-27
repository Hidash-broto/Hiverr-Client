import { Box, Container } from '@mui/system'
import AddCircleIcon from '@mui/icons-material/AddCircle';
import React from 'react'
import { Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function FreelancerHome() {

  const navigate = useNavigate()

  return (
    <>
    <Container>
      <Button variant='contained' onClick={() => {
        localStorage.clear()
        navigate('/login')
      }}>Logout</Button>
        <Box onClick={() => navigate('/freelancer/gigCreation')} sx={{width:'230px', height:'230px', border:'solid', borderRadius:'10px', borderColor:'black', margin:'0 auto', marginTop:'200px', color:'blue'}}>
          <Typography variant='h4'>Create Gig</Typography>
            <AddCircleIcon fontSize='large' style={{width:'220px', marginTop:'60px'}}></AddCircleIcon>
        </Box>
    </Container>
    </>
  )
}

export default FreelancerHome
