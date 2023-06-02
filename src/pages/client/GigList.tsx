import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import ClientNav from "../../components/clientHomePageComponents/ClientNav";
import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Collapse,
  Container,
  Typography,
} from "@mui/material";
import { Box, Stack } from "@mui/system";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import { red } from "@mui/material/colors";
import { styled } from "@mui/material/styles";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import UserFooter from "../../components/UserFooter";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { GridList } from "@material-ui/core";
import { toast } from "react-hot-toast";
import { gigDt } from "../../redux/Gig";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

function GigList() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [search, setSearch]: string | any = useState("");
  let [gigs, setGigs]: any = useState([]);
  const gigCat = useSelector((state: any) => state.gigList.gigPage);
  console.log(gigCat);
  useEffect(() => {
    const fetch = () => {
      axios
        .post(`${process.env.REACT_APP_BASE_URL}/client/gigList`, {
          gigCat: gigCat,
        })
        .then((response) => {
          console.log(response);
          if (response.data.status) {
            // eslint-disable-next-line react-hooks/exhaustive-deps
            setGigs(response.data.data);
            console.log(gigs, "==");
          } else {
            alert(response.data.message);
          }
        });
    };
    fetch();
  });
  interface ExpandMoreProps extends IconButtonProps {
    expand: boolean;
  }

  const ExpandMore = styled((props: ExpandMoreProps) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
  })(({ theme, expand }) => ({
    transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  }));

  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleClick = (gig: any) => {
    try {
      dispatch(gigDt(gig));
      navigate("/client/gigDt");
    } catch (error: Error | any) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    const fun = async () => {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/getCurrentUser`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("clientToken")}`,
          },
        }
      );
      if (response.data.status) {
        response.data.user.favorites?.map((id: any, index: number) => {
          const element: any = document.getElementById(id)
            ? document.getElementById(id)
            : "";
          return (element.style.color = "#0275d8");
        });
      }
    };
    fun();
  },[]);

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
        if (response.data.liked) {
          const element: any = document.getElementById(id)
            ? document.getElementById(id)
            : "";
          element.style.color = "#0275d8";
        } else {
          const element: any = document.getElementById(id)
            ? document.getElementById(id)
            : "";
          element.style.color = "rgba(0, 0, 0, 0.54)";
        }
      }
    } catch (error) {}
  };

  const handleSearch: any = (event: any) => {
    setSearch(event.target.value);
  };

  return (
    <>
      <ClientNav search={handleSearch as any} />
      <div>
        <Container
          sx={{
            with: "100%",
            height: "350px",
            backgroundColor: "#F5E359",
            maxWidth: "2000px !important",
          }}
        >
          <Stack
            direction="column"
            sx={{
              marginTop: "40px",
              marginLeft: "125px",
              position: "absolute",
            }}
          >
            <Typography sx={{ fontFamily: "fantasy" }} variant="h2">
              Make it real <br />
              with Hiverr
            </Typography>
            <Typography>Find inspiration for your next big idea</Typography>
          </Stack>
          <Stack
            direction="row"
            sx={{
              marginTop: "250px",
              marginLeft: "125px",
              position: "absolute",
            }}
          >
            <Typography variant="h6">
              This website design cost
              <br />
              and took 9 days
            </Typography>
            <Box
              sx={{
                borderRadius: "100px",
                backgroundColor: "#C90138",
                width: "70px",
                height: "70px",
                textAlign: "center",
                marginLeft: "50px",
              }}
            >
              <Typography
                color="white"
                sx={{ marginTop: "22px", lineHeight: "80%" }}
              >
                200 Rupees
              </Typography>
            </Box>
          </Stack>
          <img
            style={{
              width: "383px",
              right: "125px",
              position: "absolute",
              marginTop: "48px",
            }}
            src="/img/gigListBannerPhoto.jpg"
            alt=""
          />
        </Container>

        <Container sx={{ marginTop: "50px" }}>
          <Stack direction="column">
            <Typography color="#002D04" variant="h4">
              Handpicked {gigCat} ideas for you
            </Typography>
            <Typography color="#545454" variant="h6">
              Featured work from our best freelancers
            </Typography>
          </Stack>
          <GridList cols={5} className="gigListCardGroup">
            {gigs
              // eslint-disable-next-line array-callback-return
              .filter((val: any) => {
                if (search === "") {
                  return val;
                } else if (
                  val.title.toLowerCase().includes(search.toLowerCase())
                ) {
                  return val;
                }
              })
              .map((gig: any) => {
                return (
                  <Card
                    sx={{
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
                          {gig.userId.firstName.charAt(0)
                            ? gig.userId.firstName.charAt(0)
                            : ""}
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
                        color="#002D04"
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
                      >
                        <FavoriteIcon />
                      </IconButton>
                      <IconButton aria-label="share">
                        <ShareIcon />
                      </IconButton>
                      <ExpandMore
                        expand={expanded}
                        onClick={handleExpandClick}
                        aria-expanded={expanded}
                        aria-label="show more"
                      >
                        <ExpandMoreIcon />
                      </ExpandMore>
                    </CardActions>
                    <Collapse in={expanded} timeout="auto" unmountOnExit>
                      <CardContent>
                        <TableBody sx={{ marginLeft: "30px" }}>
                          <TableRow
                            sx={{
                              "&:last-child td, &:last-child th": { border: 0 },
                            }}
                          >
                            <TableCell component="th" scope="row">
                              Delivey Time
                            </TableCell>
                            <TableCell align="right">{`${gig.deliveryTime} Days`}</TableCell>
                          </TableRow>
                          <TableRow
                            sx={{
                              "&:last-child td, &:last-child th": { border: 0 },
                            }}
                          >
                            <TableCell component="th" scope="row">
                              Hosting Setup
                            </TableCell>
                            <TableCell align="right">{`${gig.hostingSetup}`}</TableCell>
                          </TableRow>
                          <TableRow
                            sx={{
                              "&:last-child td, &:last-child th": { border: 0 },
                            }}
                          >
                            <TableCell component="th" scope="row">
                              Licenced Images
                            </TableCell>
                            <TableCell align="right">{`${gig.licensedImages} Images`}</TableCell>
                          </TableRow>
                          <TableRow
                            sx={{
                              "&:last-child td, &:last-child th": { border: 0 },
                            }}
                          >
                            <TableCell component="th" scope="row">
                              Number of Pages
                            </TableCell>
                            <TableCell align="right">{`${gig.numberOfPages} Pages`}</TableCell>
                          </TableRow>
                          <TableRow
                            sx={{
                              "&:last-child td, &:last-child th": { border: 0 },
                            }}
                          >
                            <TableCell component="th" scope="row">
                              Revisions
                            </TableCell>
                            <TableCell align="right">{`${gig.revisions}`}</TableCell>
                          </TableRow>
                        </TableBody>
                      </CardContent>
                    </Collapse>
                  </Card>
                );
              })}
          </GridList>
        </Container>
      </div>
      <UserFooter />
    </>
  );
}

export default GigList;
