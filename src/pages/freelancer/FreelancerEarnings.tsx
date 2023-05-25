import { Alert, Button, Divider, Typography } from '@mui/material'
import { Box, Container, Stack } from '@mui/system'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import FreelancerNav from '../../components/FreelancerNav'
import UserFooter from '../../components/UserFooter'

function FreelancerEarnings() {
    const [availableBalance, setAvailableBalance] = useState(0);
    const [pendingAdmin, setPendingAdmin] = useState(0);
    const [activeOrders, setActiveOrders] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/freelancer/getAllEarningsData`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('freelancerToken')}`
                    }
                })
                console.log(response)
                if(response.data.status) {
                    setAvailableBalance(response.data.availableBalance)
                    setPendingAdmin(response.data.pendingAdmin)
                    setActiveOrders(response.data.activeOrders)
                } else {
                    <Alert severity='error'>{response.data.message}</Alert>
                }
            } catch (error: Error|any) {
                <Alert severity='error'>{error.message}</Alert>
            }
        }
        fetchData();
    })

  return (
    <>
      <FreelancerNav />
      <Container sx={{maxWidth: '2000px !important', backgroundColor: '#EFEFEF', width: '100%', height: '600px', marginTop: '5px'}}>
        <Typography variant='h2' sx={{marginTop: '50px', marginLeft: '30px', position: 'absolute'}}>Earnings</Typography>
        <Stack spacing={4} direction='row' sx={{marginTop: '187px', marginLeft: '30px', position: 'absolute'}}>
            <Box sx={{width: '300px', height: '210px', backgroundColor: 'white', padding: '30px'}}>
                <Stack direction='column'>
                    <Typography sx={{opacity: '0.5'}}>Balance available for use</Typography>
                    <Typography sx={{fontSize: '30px', marginTop: '30px'}}>                        <CurrencyRupeeIcon
                          sx={{ width: "28px", height: "24px" }}
                        />{availableBalance}</Typography>
                    <Button sx={{marginTop: '30px', color: '#00F0FF'}} variant='outlined'>Withdraw balance</Button>
                </Stack>
            </Box>
            <Box sx={{width: '300px', height: '210px', backgroundColor: 'white', padding: '30px'}}>
            <Stack direction='column'>
                    <Typography sx={{opacity: '0.5'}}>Payments being cleared</Typography>
                    <Typography sx={{fontSize: '30px', marginTop: '10px'}}><CurrencyRupeeIcon
                          sx={{ width: "28px", height: "24px" }}
                        />{pendingAdmin}</Typography>
                    <Divider sx={{mt: '20px'}} />
                    <Typography sx={{opacity: '0.5', marginTop: '20px'}}>Payments for active orders</Typography>
                    <Typography sx={{fontSize: '30px', marginTop: '10px'}}><CurrencyRupeeIcon
                          sx={{ width: "28px", height: "24px" }}
                        />{activeOrders}</Typography>
                </Stack>
</Box>
        </Stack>
      </Container>
      <UserFooter />
    </>
  )
}

export default FreelancerEarnings
