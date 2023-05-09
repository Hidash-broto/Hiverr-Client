import { Container, Typography } from '@mui/material'
import { Stack } from '@mui/system'
import React from 'react'
import {useStyle} from '../style'

function UserFooter() {
    const classes = useStyle()
  return (
    <Container style={{alignItems:'center'}} className={classes.footer}>
      <Stack direction='column' spacing={3} sx={{marginTop: '53px', marginLeft: '223px', position:'absolute', width: '1000px'}}>
        <Stack direction='row' spacing={10}>
            <Typography color='white' variant='h5'>About Us</Typography>
            <Typography color='white' sx={{marginLeft: '300px !important', position: 'absolute'}} variant='h5'>Feedback</Typography>
            <Typography color='white' sx={{marginLeft: '550px !important', position: 'absolute'}} variant='h5'>Community</Typography>
        </Stack>
        <Stack direction='row' spacing={10} >
            <Typography color='white' variant='h5'>Trust, Safety & Security</Typography>
            <Typography color='white' sx={{marginLeft: '300px !important', position: 'absolute'}} variant='h5'>Help & Support</Typography>
            <Typography color='white' sx={{marginLeft: '550px !important', position: 'absolute'}} variant='h5'>Hiverr Foundation</Typography>
        </Stack>
        <Stack direction='row' spacing={10}>
            <Typography color='white' variant='h5'>Terms of Service</Typography>
            <Typography color='white' sx={{marginLeft: '300px !important', position: 'absolute'}} variant='h5'>Privacy Policy</Typography>
            <Typography color='white' sx={{marginLeft: '550px !important', position: 'absolute'}} variant='h5'>Cookie Settings</Typography>
        </Stack>
        <Stack direction='row' spacing={10}>
            <Typography color='white' variant='h5'>Accessibility</Typography>
            <Typography color='white' sx={{marginLeft: '300px !important', position: 'absolute'}} variant='h5'>Cookie Policy</Typography>
            <Typography color='white' sx={{marginLeft: '550px !important', position: 'absolute'}} variant='h5'>Desktop App</Typography>
        </Stack>
      </Stack>
    </Container>
  )
}

export default UserFooter
