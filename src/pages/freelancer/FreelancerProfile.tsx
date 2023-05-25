import React, { useEffect, useState } from 'react'
import UserFooter from '../../components/UserFooter'
import FreelancerNav from '../../components/FreelancerNav'
import { Box, Container, Stack } from '@mui/system'
import { Alert, Avatar, Button, Divider, Tab, Tabs, Typography } from '@mui/material'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import LocationOnIcon from '@mui/icons-material/LocationOn';    
import ReactLoading from "react-loading";
import { useStyle } from '../../style'
import FreelancerProfileActiveGigs from '../../components/FreelancerProfileActiveGigs'
import FreelancerProfilePendingGigs from '../../components/FreelancerProfilePendingGigs'

function FreelancerProfile() {
    const [user, setUser]: any = useState({})
    const [loading, setLoading] = useState(true)
    let [activeGigs, setActiveGigs]: any = useState([])
    let [pendingGigs, setPendingGigs] = useState([])
    const classes = useStyle()

    useEffect(() => {
        const fetchData = async () => {
            try {
               const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/freelancer/getUserDt`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('freelancerToken')}`
                }
               })
               setLoading(false)
               if(response.data.status) {
                setUser(response.data.user)
                  setActiveGigs(response.data.activeGigs);
                    setPendingGigs(response.data.pendingGigs)
               }else {
                toast.error(response.data.message)
               }
               
              //  setActiveGigs(response.data.user)
            } catch (error: Error|any) {
                <Alert severity='error'>{error.message}</Alert>
            }
        }
        fetchData()
    }, [])

    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        console.log(newValue)
      setValue(newValue);
    };
    function a11yProps(index: number) {
        return {
          id: `simple-tab-${index}`,
          'aria-controls': `simple-tabpanel-${index}`,
        };
      }

  return (
    <>
    <FreelancerNav />
    <Container
        sx={{
          backgroundColor: "#EFEFEF",
          width: "100%",
          paddingBottom: "100px",
          maxWidth: "2000px !important",
          minHeight: '600px'
        }}
      >
    <Stack direction='row'>
    <Box
            sx={{
              width: "420px",
              height: "375px",
              backgroundColor: "white",
              marginTop: "50px",
              position: "absolute",
              marginLeft: "40px",
            }}
          >
            <Button
              variant="outlined"
              sx={{
                borderRadius: "50px",
                right: "27px",
                position: "absolute",
                marginTop: "20px",
              }}
              color="success"
            >
              Online
            </Button>
            <Stack direction="column">
              <Avatar
                alt={user.firstName}
                src="/img"
                sx={{
                  width: "120px",
                  height: "120px",
                  fontSize: "5rem",
                  marginTop: "50px !important",
                  backgroundColor: "#ff7b00",
                  marginLeft: "140px",
                }}
              />
              <Typography
                sx={{ marginTop: "10px", textAlign: "center" }}
                variant="h6"
              >
               {user.firstName+' '+user.lastName}
              </Typography>
              <Typography
                sx={{ fontSize: "15px", color: "#ababab", marginLeft: "140px" }}
              >
                {user.email}
              </Typography>
              <Divider />
              <Stack
                sx={{ ml: "40px", mt: "10px" }}
                direction="row"
                spacing={25}
              >
                <Typography><LocationOnIcon sx={{fontSize: '1rem'}} />From</Typography>
                <Typography>{user.country}</Typography>
              </Stack>
              <Stack
                sx={{ ml: "40px", mt: "10px" }}
                direction="row"
                spacing={19}
              >
                <Typography>Member since</Typography>
                <Typography>{user.createdAt?.slice(0, 10)}</Typography>
              </Stack>
              <Divider />
              <Button sx={{backgroundColor: '#00B628', width: '200px', marginLeft: '100px', marginTop: '15px'}} variant='contained'>View more</Button>
            </Stack>
          </Box>
          <Stack direction='row'>
          <Box
              sx={{
                width: "784px",
                height: "110px",
                backgroundColor: "white",
                position: "abosolute !important",
                marginLeft: "513px",
                marginTop: "50px",
              }}
            >
              <Stack
                direction="row"
                spacing={4}
                sx={{ marginTop: "26px", marginLeft: "20px" }}
              >
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Active Gigs" {...a11yProps(0)} />
          <Tab label="Pending to Approval" {...a11yProps(1)} />
        </Tabs>
              </Stack>
            </Box>
          </Stack>
    </Stack>
    {
      loading?            <ReactLoading
      type="spinningBubbles"
      color="#0000FF"
      height={100}
      width={50}
      className={classes.freelancerProfileLoading}
    />:
      value===0?<FreelancerProfileActiveGigs activeGigs={activeGigs}/>:<FreelancerProfilePendingGigs pendingGigs={pendingGigs}/>
    }
    </Container>

      <UserFooter />
    </>
  )
}

export default FreelancerProfile
