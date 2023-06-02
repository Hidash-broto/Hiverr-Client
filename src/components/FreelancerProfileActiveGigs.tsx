import { GridList } from '@material-ui/core'
import { Box, Stack, Typography } from '@mui/material'
import React from 'react'
import AddCircleIcon from '@mui/icons-material/AddCircle';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { useNavigate } from 'react-router-dom';

function FreelancerProfileActiveGigs(props: any) {
    const navigate = useNavigate()
  return (
    <>
       <GridList style={{marginLeft: '495px', marginTop: '20px'}} cols={3}>
            {
                props.activeGigs.map((gig: any) => {
           return( <Box sx={{width: '375px !important', height: '350px !important', backgroundColor: 'white', marginLeft: '20px', marginTop: '20px'}}>
            <Stack direction='column'>
                <img src={gig.images[0]} style={{width: '100%', height: '242px', borderBottom: 'solid 1px'}} alt="" />
                <Typography sx={{textAlign: 'center', color: '#6e6e6e', marginTop: '10px'}} variant='h6'>{gig.title}</Typography>
            </Stack>
                <Stack sx={{marginLeft: '10px', marginTop: '10px'}} direction='row' spacing={28}>
                  <MoreHorizIcon sx={{marginTop: '20px'}} />
                  <Typography sx={{marginTop: '20px !important', color: '#00B628'}}>Price {gig.totalPrice}</Typography>
                </Stack>
            </Box>)
                })
            }
            <Box onClick={() => navigate('/freelancer/gigCreation')} sx={{width: '375px !important', height: '350px !important', backgroundColor: 'white', marginLeft: '20px', marginTop: '20px'}}>
                <AddCircleIcon sx={{width: '200px', marginTop: '60px', marginLeft: '92px', height: '200px', color: '#0275d8'}} />
                <Typography variant='h6' sx={{fontFamily: 'monospace', textAlign: 'center'}}>Create new Gig</Typography>
            </Box>
            </GridList> 
    </>
  )
}

export default FreelancerProfileActiveGigs
