import { Avatar, Box, Divider, Stack, Typography } from '@mui/material'
import { Container } from '@mui/system'
import React, { useEffect, useState } from 'react'
import ClientNav from '../../components/clientHomePageComponents/ClientNav'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import ChatInput from '../../components/chatComponents/ChatInput'

function ChatPage() {
  const [activeMessenger, setActiveMessenger] = useState('')
  const [allUsers, setAllUsers]: any = useState([])
  const currentUser = useSelector((state: any)=> state.messageUser.user)
  let ind: number = allUsers.findIndex((obj: any) => obj._id === activeMessenger)
  console.log(ind)
  useEffect( () => {
    const fetchData = async () => {
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/client/getAllMessengers`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      console.log(response);
      if(response.data.status) {
        setAllUsers(response.data.users)
      }
      console.log(allUsers,'==')
    }
    fetchData()
  },[])

  const handleSendMsg = () => {

  }
  return (
    <>
    <ClientNav />
    <div style={{width: '1350px', height: '700px'}}>
    <Container sx={{backgroundColor: '#5a5b7d', width: '1200px', height: '500px', marginTop: '70px', position: 'absolute', marginLeft: '70px', borderTopLeftRadius: '5px', borderBottomLeftRadius: '5px'}}>
      <Stack direction='column' spacing={1}>
        <Box sx={{width: '150px', height: '70px', backgroundColor: '#002D04', borderRadius: '5px', marginTop: '10px', ml: 6}}>
        <Typography sx={{mt:1, ml: 1}} color='white' variant='h3'>Hiverr</Typography>
        </Box>
        {
          allUsers.map((user: any) => {
            console.log(user)
            return  <Box onClick={() => setActiveMessenger(user._id)} sx={{width: '280px', height: '70px', backgroundColor: `${activeMessenger==user._id ? '#002D04':'white'}`, borderRadius: '5px'}} className='clientActiveMessenger'>
              <Stack direction='row'>
              <Avatar
              sx={{ bgcolor: '#5a5b7d', marginTop: '15px', marginLeft: '10px' }}
              alt={user.firstName.charAt(0)}
              src="/static/images/avatar/1.jpg"
            />
            <Typography variant='h6' sx={{ color: '#5a5b7d', marginTop: '18px', marginLeft: '10px' }}>{user.firstName+" "+user.lastName}</Typography>
              </Stack>

            </Box>
          })
        }
      </Stack>
    </Container>
    <Container sx={{ position: 'absolute', marginLeft: '395px', backgroundColor: '#002D04', width: '890px', height: '500px', marginTop: '70px', borderTopRightRadius: '5px', borderBottomRightRadius: '5px'}}>
      <Stack direction='row' sx={{borderBottom:'solid 2px white', width: '890px', height: '63px', marginLeft: '-24px'}}>
        {
          ind !== -1 ? (
            <>
            <Avatar
            sx={{ bgcolor: '#5a5b7d', marginTop: '12px', marginLeft: '15px' }}
            alt={allUsers[ind].firstName.charAt(0)}
            src="/static/images/avatar/1.jpg"
          />
      <Typography sx={{marginTop: '17px', marginLeft: '8px'}} color='white' variant='h5'>{allUsers[ind].firstName}</Typography>
      <Divider sx={{color: 'white'}} />
      </>
          ):(
            <>
            </>
          )
        }
      </Stack>
      {
        activeMessenger.length == 0 ?(
          <>
          <Stack sx={{marginLeft: '216px'}} direction='column'>
      <img style={{width: '400px'}} src="/gif/robot.gif" alt="gif" />
      <Typography color='white' sx={{marginTop: '-100px', marginLeft: '64px'}} variant='h3'>Welcome,Hidash</Typography>
      <Typography color='white' sx={{marginLeft: '64px'}} variant='h6'>Please select a chat to Start Messaging</Typography>
      </Stack>
      </>
        ) : (
        <div>
          <ChatInput handleSendMsg={handleSendMsg} />
        </div>
        )
      }
      
</Container>
    </div>
    </>
  )
}

export default ChatPage