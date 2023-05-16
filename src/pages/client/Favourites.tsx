import { Card, GridList } from '@material-ui/core'
import { Avatar, CardActions, CardContent, CardHeader, CardMedia, Container, Typography } from '@mui/material'
import { Stack } from '@mui/system'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import ClientNav from '../../components/clientHomePageComponents/ClientNav'
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useDispatch } from 'react-redux'
import { gigDt } from '../../redux/Gig'
import { useNavigate } from 'react-router-dom'
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import { red } from "@mui/material/colors";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import UserFooter from '../../components/UserFooter'

function Favourites() {
    const [gigs, setGigs] = useState([])
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [fetch, setFetch]: boolean|any = useState(true)
    const handleFav = async (id: string) => {
        try {
          const response = await axios.post(
            `${process.env.REACT_APP_BASE_URL}/client/favouriteGig`,
            { id: id },
            {
              headers: {
                Authorization: `bearer ${localStorage.getItem("clientToken")}`,
              },
            }
          );
          console.log(response);
          if (response.data.status) {
              setFetch(!fetch)
        }
       } catch (error) {}
      };
    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/client/getFavorites`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('clientToken')}`
                }
            })
            console.log(response)
            if(response.data.status) {
                setGigs(response.data.data)
            }else {
                toast.error(response.data.message)
            }
        }
        fetchData()
    },[fetch])
    const handleClick = (gig: any) => {
        try {
          dispatch(gigDt(gig));
          navigate("/client/gigDt");
        } catch (error: Error | any) {
          toast.error(error.message);
        }
      };
  return (
    <>
      <ClientNav />
      <Container>
      <Stack sx={{mt: 10, ml: 5}} direction='column' >
        <Typography variant='h2'>My Favourites</Typography>
        <Typography sx={{color: '#808080'}}>Organize your favorites services <br/>lists you can easily access and share with your team.</Typography>
        <GridList cols={5} className="gigListCardGroup">
            {gigs.map((gig: any) => {
                return (
                  <Card
                    style={{
                      maxWidth: 345,
                      marginTop: "50px",
                      marginLeft: "50px",
                      height: "450px !important",
                    }}
                    className="gigListCard"
                  >
                    <CardHeader
                      avatar={
                        <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                          {gig.userId.firstName?.charAt(0)}
                        </Avatar>
                      }
                      action={
                        <IconButton aria-label="settings">
                          <MoreVertIcon />
                        </IconButton>
                      }
                      title={gig.userId.firstName ? gig.userId.firstName : ""}
                      subheader={`${
                        gig.createdAt ? gig.createdAt : "13-04-2023"
                      }`}
                    />
                    <CardMedia
                      onClick={() => {
                        handleClick(gig);
                      }}
                      component="img"
                      height="194"
                      image={gig.images[0]}
                      alt="Paella dish"
                      sx={{ borderTop: "solid 1px #b5b5b5" }}
                    />
                    <CardContent
                      onClick={() => {
                        handleClick(gig);
                      }}
                    >
                      <Typography
                        color="#C90138"
                        className="gigListTitle"
                        sx={{ fontFamily: "cursive", transition: "1s" }}
                        variant="h5"
                      >
                        {gig.title}
                      </Typography>
                      <Typography variant="h5">
                        <CurrencyRupeeIcon />
                        {gig.totalPrice}
                      </Typography>
                    </CardContent>
                    <CardActions disableSpacing>
                      <IconButton
                        id={gig._id}
                        aria-label="add to favorites"
                        onClick={() => handleFav(gig._id)}
                        sx={{color:'red'}}
                      >
                        <FavoriteIcon />
                      </IconButton>
                      <IconButton aria-label="share">
                        <ShareIcon />
                      </IconButton>
                    </CardActions>
                  </Card>
                );
              })}
          </GridList>
      </Stack>
      </Container>
      <UserFooter />
    </>
  )
}
export default Favourites