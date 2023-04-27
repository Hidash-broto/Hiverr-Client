import { Container, Typography } from '@mui/material'
import { Stack } from '@mui/system'
import React from 'react'
import {useStyle} from '../style'

function UserFooter() {
    const classes = useStyle()
  return (
    <Container style={{alignItems:'center'}} className={classes.footer}>
      <ul>
        <Stack direction='row' spacing={7}>
        <li>
            <Typography color='white' variant='h5'>About Us</Typography>
            <Typography color='white' variant='h5'>Feedback</Typography>
            <Typography color='white' variant='h5'>Community</Typography>
        </li>
        <li>
            <Typography color='white' variant='h5'>Trust, Safety & Security</Typography>
            <Typography color='white' variant='h5'>Help & Support</Typography>
            <Typography color='white' variant='h5'>Hiverr Foundation</Typography>
        </li>
        <li>
            <Typography color='white' variant='h5'>Terms of Service</Typography>
            <Typography color='white' variant='h5'>Privacy Policy</Typography>
            <Typography color='white' variant='h5'>Cookie Settings</Typography>
        </li>
        <li>
            <Typography color='white' variant='h5'>Accessibility</Typography>
            <Typography color='white' variant='h5'>Cookie Policy</Typography>
            <Typography color='white' variant='h5'>Desktop App</Typography>
        </li>
        </Stack>
      </ul>
    </Container>
  )
}

export default UserFooter
