import { Step, StepLabel, Stepper } from '@mui/material'
import { Container } from '@mui/system'
import React from 'react'
import FreelancerNav from '../../components/FreelancerNav'
import { useSelector } from 'react-redux'


function FreelancerGigCreation(props:any) {
  console.log(props.children)
  const page = useSelector((state:any) => state.gig.pageNumber)
  console.log(useSelector((state:any) => state.gig.pageNumber),'===')
  const steps = ['Overview', 'Pricing', 'Description & FAQ', 'Requirements', 'Gallery', 'Publish']

  return (
    <>
      <FreelancerNav />
      <Container className='stepper' sx={{marginTop:'20px', borderBottom:'solid 1px', width:'1350px', height:'73px'}}>
      <Stepper activeStep={page} alternativeLabel>
  {steps.map((label) => (
    <Step key={label}>
      <StepLabel>{label}</StepLabel>
    </Step>
  ))}
</Stepper>
</Container>
<Container className='stepper' sx={{backgroundColor:'#cccccc', width:'1350px', height:'900px'}}>
 {props.children[page]}
 {/* <UserFooter /> */}
</Container>
    </>
  )
}

export default FreelancerGigCreation
