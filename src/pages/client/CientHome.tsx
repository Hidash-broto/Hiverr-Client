import { Box, Stack, Typography} from '@mui/material'
import { Container } from '@mui/system'
import ClientNav from '../../components/clientHomePageComponents/ClientNav'
import { useSelector } from 'react-redux'
import UserFooter from '../../components/UserFooter'
import ClientHomeCards from '../../components/clientHomePageComponents/ClientHomeCards'
import { useState } from 'react'
import Notification from '../../components/clientComponents/Notification'

function CientHome() {
  const [search, setSearch]: any = useState('')
  const [notificationClicked, setNotificationClicked] = useState(true)
  const user = useSelector((state:any) => state.user)
  const handleSearch = (event: any) => {
    setSearch(event.target.value)
  }

  const handleNotification: any = () => setNotificationClicked(!notificationClicked)

  return (
    <>
    {
      notificationClicked && <Notification />
    }
    <ClientNav search={handleSearch} handleNotification={handleNotification}/>
    <Container className='ClientHomeBanner'>
      <Typography sx={{marginTop: '100px', marginLeft: '50px', position: 'absolute'}} color='white' variant='h4'>{`${user.value.email ? user.value.email.replace('@gmail.com', '') : 'Guest'},`}<br /> Here's what you need to build<br/>your website</Typography>
      <Stack direction='row' spacing={3} sx={{marginLeft: '556px', marginTop: '74px', position: 'absolute'}}>
        <Box sx={{width: '290px', height: '182px', backgroundColor: 'white', borderRadius: '10px', transition: '3', "&:hover":{
          transform: 'scale(1.1)',
          transition: '500ms'
        }}}>
        <img style={{width: '100px', margin: '21px 0 0 82px'}} src="https://img.icons8.com/ios-filled/50/null/windows10-personalization.png" alt=''/>
        <Typography variant='h5' color='#0b103b' sx={{marginTop: '5px',marginLeft: '73px'}}>Web Design</Typography>
        </Box>
        <Box sx={{width: '290px', height: '182px', backgroundColor: 'white', borderRadius: '10px', transition: '3', "&:hover":{
          transform: 'scale(1.1)',
          transition: '500ms'
        }}}>
        <img style={{width: '100px', margin: '21px 0 0 82px'}} src="https://img.icons8.com/ios-filled/50/null/web.png" alt=''/>
        <Typography variant='h5' color='#0b103b' sx={{marginTop: '5px',marginLeft: '45px'}}>Web Development</Typography>
        </Box>
      </Stack>
    </Container>
    <Container className='contentContainer'>
      <Stack sx={{marginTop: '50px', marginLeft: '6px'}} direction='column'>
        <Typography color='#0b103b' variant='h4'>Make it Real with Hiverr.</Typography>
        <Typography color='#0b103b'>Get some Inspirations from 1800+ skills</Typography>
        </Stack>
        <ClientHomeCards search={search}/>
    </Container>
    <UserFooter/>
    </>
  )
}

export default CientHome
