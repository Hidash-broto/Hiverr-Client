import { Button, Container, Typography } from '@mui/material'
import React from 'react'
import { useDispatch } from 'react-redux'
import { gigPageChange } from '../../redux/Gig'
import DoneAllIcon from '@mui/icons-material/DoneAll';
import { Stack } from '@mui/system';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Publish () {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const onSubmit =async () => {
      try {
        const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/freelancer/gigCreation`, {number: 6},{
          headers: {
            Authorization: `Bearer ${localStorage.getItem('freelancerToken')}`
          }
        })
        if(response.data.status) {
          toast.success('Your Gig will Publish after Approving Our Team')
          dispatch(gigPageChange(0)) 
          navigate('/freelancer/home')
        }else {
          toast.error(response.data.message)
        }
      } catch (error) {
        toast.error('Something went Wrong')
      }
    }
  return (
    <>
          <Container
        sx={{
          width: "900px",
          height: "500px",
          backgroundColor: "white",
          marginTop: "65px",
          position: "absolute",
          marginLeft: "200px",
        }}
      >
        <Stack direction='column'>
          <DoneAllIcon sx={{width: '300px', height: '300px', marginLeft: '255px'}}/>
          <Typography sx={{marginLeft: '255px'}} variant='h4'>You're almost there!</Typography>
          <Typography sx={{marginLeft: '225px'}}>Let’s publish your Gig and get you ready to start selling.</Typography>
          <Button
                type="submit"
                sx={{ width: "200px", marginLeft: "650px", marginTop: '70px' }}
                color="success"
                variant="contained"
                size="large"
                onClick={onSubmit} 
              >
                Save & Continue
              </Button>
        </Stack>
      </Container>
    </>
  )
}

export default Publish
