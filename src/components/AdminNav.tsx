import React from 'react'
import { AppBar, Toolbar, Typography } from '@mui/material'

function AdminNav() {
  return (
    <AppBar style={{width:'1066px', marginLeft:'284px', display:'block', position:'absolute'}} position='relative'>
    <Toolbar>
    <Typography variant='h5' color='black'>
        ADMIN
      </Typography>
      <Typography variant='h5' sx={{textAlign:'end', marginLeft:'430px'}}>
        Hiverr
      </Typography>
    </Toolbar>
  </AppBar>
  )
}

export default AdminNav
