import { Box, Button, Stack, Typography, CardActionArea, CardActions, Card, CardMedia, CardContent } from '@mui/material'
import { Container } from '@mui/system'
import { useNavigate } from 'react-router-dom'
import ClientNav from '../../components/clientHomePageComponents/ClientNav'
import { useStyle } from '../../style'
import { useSelector, useDispatch } from 'react-redux'
import { GridList } from '@material-ui/core'
import UserFooter from '../../components/UserFooter'
import { toast } from 'react-hot-toast'
import { gigPageList } from '../../redux/ClientGigPage'

function CientHome() {
  const dispatch = useDispatch()
  const gigList = useSelector((state:any) => state.gigList)
  const cards: any = [
    {
      name: 'Frontend Development',
      image: '/img/frontEndDevelopment.jpg'
    },
    {
      name: 'Marketing & advertising graphic design',
      image: '/img/marketing&AdvertisingGraphicDesign.jpg'
    },
    {
      name: 'Backend Development',
      image: 'https://assets-global.website-files.com/606a802fcaa89bc357508cad/611432b386bb6d5c574f91f3_1.png'
    },
    {
      name: 'Packaging graphic design',
      image: '/img/packagingGraphicDesign.jpg'
    },
    {
      name: 'Full Stack Web Development',
      image: '/img/fullStackWebDevelopment.jpg'
    },
    {
      name: 'Motion graphic design',
      image: '/img/MotionGraphicDesign.jpg'
    },
    {
      name: 'Web Design',
      image: '/img/WebDesign.jpg'
    },
    {
      name: 'Logo Design',
      image: '/img/LogoDesign.jpg'
    },
    {
      name: 'Banner Design',
      image: '/img/BannerDesign.jpg'
    }
  ]
  const classes = useStyle()
  const navigate = useNavigate()
  const user = useSelector((state:any) => state.user)
  const handleClick = (index: number) => {
    try {
      dispatch(gigPageList(cards[index].name))
      console.log(cards[index].name);
      navigate('/client/gigList');
    } catch (error: Error|any) {
      toast.error(error.message)
    }
  }
  return (
    <>
    <ClientNav />
    <Container className='ClientHomeBanner'>
      <Typography sx={{marginTop: '100px', marginLeft: '50px', position: 'absolute'}} color='white' variant='h4'>{user.value.email.replace('@gmail.com','')},<br /> Here's what you need to build<br/>your website</Typography>
      <Stack direction='row' spacing={3} sx={{marginLeft: '556px', marginTop: '74px', position: 'absolute'}}>
        <Box sx={{width: '290px', height: '182px', backgroundColor: 'white', borderRadius: '10px', transition: '3', "&:hover":{
          transform: 'scale(1.1)',
          transition: '500ms'
        }}}>
        <img style={{width: '100px', margin: '21px 0 0 82px'}} src="https://img.icons8.com/ios-filled/50/null/windows10-personalization.png"/>
        <Typography variant='h5' color='#0b103b' sx={{marginTop: '5px',marginLeft: '73px'}}>Web Design</Typography>
        </Box>
        <Box sx={{width: '290px', height: '182px', backgroundColor: 'white', borderRadius: '10px', transition: '3', "&:hover":{
          transform: 'scale(1.1)',
          transition: '500ms'
        }}}>
        <img style={{width: '100px', margin: '21px 0 0 82px'}} src="https://img.icons8.com/ios-filled/50/null/web.png"/>
        <Typography variant='h5' color='#0b103b' sx={{marginTop: '5px',marginLeft: '45px'}}>Web Development</Typography>
        </Box>
      </Stack>
    </Container>
    <Container className='contentContainer'>
      <Stack sx={{marginTop: '50px', marginLeft: '6px'}} direction='column'>
        <Typography color='#0b103b' variant='h4'>Make it Real with Hiverr.</Typography>
        <Typography color='#0b103b'>Get some Inspirations from 1800+ skills</Typography>
        </Stack>
        
        <GridList cols={4} className='clienCardGroup'>
          {
            cards.map((card:Object[]|any, index:number) => {
              return(
                <div onClick={() => handleClick(index)} className="clientHomeCard">
                  <img className='clientHomeCardImg' src={card.image} alt="" />
                  <div className="clientHomeCardContent">
                    <h3 style={{position: 'absolute', marginTop: '11px', color: 'black', marginLeft: '10px'}}>{card.name}</h3>
                  </div>
                </div>
              )
            })
          }
          </GridList>
       
    </Container>
    <UserFooter/>
    </>
  )
}

export default CientHome
