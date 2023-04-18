import { Box, Container } from '@mui/system'
import AddCircleIcon from '@mui/icons-material/AddCircle';
import React from 'react'

function FreelancerHome() {


  return (
    <>
    <Container>
        <Box sx={{width:'230px', height:'230px', border:'solid', borderRadius:'10px', borderColor:'black', margin:'0 auto', marginTop:'200px'}}>
            <AddCircleIcon fontSize='large' style={{width:'220px', marginTop:'100px'}}></AddCircleIcon>
        </Box>
    </Container>
    </>
  )
}

export default FreelancerHome
