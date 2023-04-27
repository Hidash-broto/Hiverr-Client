import { Button, ButtonGroup } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'

function CientHome() {
  const navigate = useNavigate()
  return (
  <div style={{alignItems:'center', padding:'10', width:'100%', height:'100px'}}>
      <h1>Home Page</h1>
    <ButtonGroup variant="contained" aria-label="outlined primary button group">
      <Button onClick={() => navigate('/login')}>Login</Button>
      <Button onClick={() => navigate('/signup')}>Signup</Button>
    </ButtonGroup>
  </div>
  )
}

export default CientHome
