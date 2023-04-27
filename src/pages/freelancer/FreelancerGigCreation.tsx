import { Step, StepLabel, Stepper, Typography } from '@mui/material'
import { Container } from '@mui/system'
import React, { useState } from 'react'
import UserFooter from '../../components/UserFooter'
import UserNav from '../../components/UserNav'
import { gigPageChange } from '../../redux/Gig'
import { useSelector } from 'react-redux'

type childrenProp = {
  children: React.ReactNode;
}

function FreelancerGigCreation(props:any) {
  console.log(props.children)
  let dup:any
  const page = useSelector((state:any) => state.gig.pageNumber)
  console.log(useSelector((state:any) => state.gig.pageNumber),'===')
  const steps = ['Overview', 'Pricing', 'Description & FAQ', 'Requirements', 'Gallery', 'Publish']
  
  switch (page) {
    case 0:
      dup = props.children
      break;
      case 1:
        dup = props.children
        break;
  
    default:
      dup = 0
      break;
  }

  return (
    <>
      <UserNav />
      <Container className='stepper' sx={{marginTop:'20px', borderBottom:'solid 1px', width:'1350px', height:'73px'}}>
      <Stepper activeStep={page} alternativeLabel>
  {steps.map((label) => (
    <Step key={label}>
      <StepLabel>{label}</StepLabel>
    </Step>
  ))}
</Stepper>
</Container>
<Container className='stepper' sx={{backgroundColor:'#cccccc', width:'100%', height:'850px'}}>
 {props.children[page]}
 {/* <UserFooter /> */}
</Container>
    </>
  )
}

export default FreelancerGigCreation
