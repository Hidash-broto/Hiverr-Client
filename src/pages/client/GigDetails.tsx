import {
  Avatar,
  Box,
  Button,
  Divider,
  Stack,
  TableBody,
  TableCell,
  TableRow,
  TextareaAutosize,
  Typography,
} from "@mui/material";
import { Container } from "@mui/system";
import React, { useState } from "react";
import ClientNav from "../../components/clientHomePageComponents/ClientNav";
import { useSelector } from "react-redux";
import StarRateIcon from "@mui/icons-material/StarRate";
import UserFooter from "../../components/UserFooter";
import DOMPurify from "dompurify";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/Twitter";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import Modal from "@mui/material/Modal";
import MessageIcon from "@mui/icons-material/Message";
import { toast } from "react-hot-toast";
import axios from "axios";
import { MessageUserChange } from "../../redux/MessageSelectedUserSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

function GigDetails() {
  const imgCount: number[] | any = [0, 1, 2];
  const [selected, setSelected] = useState(0);
  const [text, setText] = useState('')
  const gig = useSelector((state: any) => state.gig.gig);
  const [image, setImage] = useState(gig.images[0]);
  const discription = gig.discription;
  const sanitaze = DOMPurify.sanitize(discription);
  let count = 135;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
  const handleMessage = async () => {
    try {
      const client: any = localStorage.getItem("client");
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/client/messageUserAdd`,
        { freelancerId: gig.userId._id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem(
              client ? "clientToken" : "freelancerToken"
            )}`,
          },
        }
      );
      console.log();
      if (response.data.status) {
        dispatch(MessageUserChange(gig.userId._id));
        navigate("/client/chatPage");
      } else if (response.data.jwt) {
        localStorage.clear();
        navigate("/login");
      } else {
        toast.error("response.data.message");
      }
    } catch (err: Error | any) {
      toast.error(err.message);
    }
  };
  const handleRequest = async (gigId: string) => {
    try {
      console.log(localStorage.getItem('clientToken'));
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/client/gigRequest`, {gigId: gigId, text: text}, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('clientToken')}`
        }
      })
      if(response.data.status) {
        toast.success('Request Submited')
      }else {
        console.log(response.data.message)
      }
    } catch (error) {
      
    }
  }
  return (
    <>
      <ClientNav />
      <Container sx={{ width: "1200px" }}>
        <Typography color="#0b103b" sx={{ marginTop: "80px" }} variant="h4">
          {gig.title}
        </Typography>
        <Stack direction="column" sx={{ marginTop: "10px" }}>
          <Stack direction="row">
            <Avatar
              alt={gig.userId.firstName.charAt(0).toUpperCase()}
              src="/static/images/avatar/1.jpg"
            />
            <Typography sx={{ marginLeft: "12px", marginTop: "3px" }}>
              {gig.userId.firstName + " " + gig.userId.lastName}
            </Typography>
            <Typography
              sx={{
                marginLeft: "10px",
                marginTop: "7px",
                fontSize: "10px",
                opacity: "0.5",
              }}
            >
              @{gig.userId.email.replace("@gmail.com", "")}
            </Typography>
          </Stack>
          <Typography
            sx={{
              position: "absolute",
              marginTop: "22px",
              marginLeft: "42px",
              fontSize: "10px",
            }}
          >
            <StarRateIcon
              sx={{
                color: "red",
                fontSize: "1rem !important",
                marginTop: "5px",
              }}
            />
            {`${Math.floor(Math.random() * (5 - 1 + 1)) + 1}(${
              Math.floor(Math.random() * (200 - 1 + 1)) + 1
            } reviews)`}
          </Typography>
        </Stack>
        <Container
          sx={{
            backgroundColor: "#0E1724",
            width: "926px",
            height: "600px",
            marginTop: "50px",
          }}
        >
          <img
            src={image}
            style={{
              width: "855px",
              height: "530px",
              marginTop: "30px",
              marginLeft: "10px",
            }}
            alt=""
          />
        </Container>
        <Stack direction="row" sx={{ marginLeft: "325px", marginTop: "50px" }}>
          {imgCount.map((index: number) => {
            count += 50;
            return (
              <>
                <img
                  onClick={() => {
                    setSelected(index);
                    setImage(gig.images[index]);
                  }}
                  style={{
                    width: "100px",
                    height: "100px",
                    border: "solid 1px #0E1724",
                    marginLeft: "50px",
                    borderRadius: "5px",
                  }}
                  src={gig.images[index]}
                  alt=""
                />
                <Box
                  key={index}
                  style={{
                    width: "30px",
                    height: "20px",
                    backgroundColor: selected === index ? "#808080" : "#dbdbdb",
                    marginTop: "125px",
                    position: "absolute",
                    marginLeft: `${count}px`,
                    borderRadius: "50px",
                  }}
                ></Box>
              </>
            );
          })}
        </Stack>
        <Stack
          direction="column"
          sx={{ marginTop: "50px", marginLeft: "950px !important" }}
        >
          <Stack direction="row">
            <Avatar
              alt={gig.userId.firstName.charAt(0).toUpperCase()}
              src="/static/images/avatar/1.jpg"
            />
            <Typography sx={{ marginLeft: "12px", marginTop: "3px" }}>
              {gig.userId.firstName + " " + gig.userId.lastName}
            </Typography>
            <Typography
              sx={{
                marginLeft: "10px",
                marginTop: "7px",
                fontSize: "10px",
                opacity: "0.5",
              }}
            >
              @{gig.userId.email.replace("@gmail.com", "")}
            </Typography>
          </Stack>
          <Typography
            sx={{
              position: "absolute",
              marginTop: "22px",
              marginLeft: "42px",
              fontSize: "10px",
            }}
          >
            <StarRateIcon
              sx={{
                color: "red",
                fontSize: "1rem !important",
                marginTop: "5px",
              }}
            />
            {`${Math.floor(Math.random() * (5 - 1 + 1)) + 1}(${
              Math.floor(Math.random() * (200 - 1 + 1)) + 1
            } reviews)`}
          </Typography>
          <Button
            onClick={handleOpen}
            sx={{
              backgroundColor: "#002D04",
              width: "250px",
              marginTop: "20px",
            }}
            variant="contained"
          >
            Hire {gig.userId.firstName + " " + gig.userId.lastName}
          </Button>
          <Button
            onClick={handleMessage}
            sx={{
              backgroundColor: "#002D04",
              width: "250px",
              marginTop: "20px",
            }}
            variant="contained"
          >
            <MessageIcon /> Message
          </Button>
          <Divider sx={{ height: "5px", width: "250px", marginTop: "10px" }} />
          <Stack
            direction="row"
            spacing={4}
            sx={{ marginTop: "10px", marginLeft: "27px" }}
          >
            <FacebookIcon />
            <InstagramIcon />
            <TwitterIcon />
            <LinkedInIcon />
          </Stack>
          <Stack
            direction="row"
            spacing={1}
            sx={{ marginLeft: "50px", marginTop: "10px" }}
          >
            <CalendarTodayIcon sx={{ marginTop: "5px" }} />
            <Typography variant="h6">
              {gig.createdAt ? gig.createdAt : "03-04-2023"}
            </Typography>
          </Stack>
          <TableBody sx={{ marginLeft: "30px" }}>
            <TableRow
              sx={{
                "&:last-child td, &:last-child th": { border: 0 },
              }}
            >
              <TableCell sx={{ color: "red" }} component="th" scope="row">
                Delivey Time
              </TableCell>
              <TableCell align="right">{`${gig.deliveryTime} Days`}</TableCell>
            </TableRow>
            <TableRow
              sx={{
                "&:last-child td, &:last-child th": { border: 0 },
              }}
            >
              <TableCell sx={{ color: "red" }} component="th" scope="row">
                Hosting Setup
              </TableCell>
              <TableCell align="right">{`${gig.hostingSetup}`}</TableCell>
            </TableRow>
            <TableRow
              sx={{
                "&:last-child td, &:last-child th": { border: 0 },
              }}
            >
              <TableCell sx={{ color: "red" }} component="th" scope="row">
                Licenced Images
              </TableCell>
              <TableCell align="right">{`${gig.licensedImages} Images`}</TableCell>
            </TableRow>
            <TableRow
              sx={{
                "&:last-child td, &:last-child th": { border: 0 },
              }}
            >
              <TableCell sx={{ color: "red" }} component="th" scope="row">
                Number of Pages
              </TableCell>
              <TableCell align="right">{`${gig.numberOfPages} Pages`}</TableCell>
            </TableRow>
            <TableRow
              sx={{
                "&:last-child td, &:last-child th": { border: 0 },
              }}
            >
              <TableCell sx={{ color: "red" }} component="th" scope="row">
                Revisions
              </TableCell>
              <TableCell align="right">{`${gig.revisions}`}</TableCell>
            </TableRow>
          </TableBody>
        </Stack>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Request to order
            </Typography>
            <Stack direction="row" sx={{ marginTop: "30px" }}>
              <Avatar
                alt={gig.userId.firstName.charAt(0).toUpperCase()}
                src="/static/images/avatar/1.jpg"
              />
              <Typography sx={{ marginLeft: "12px", marginTop: "3px" }}>
                {gig.userId.firstName + " " + gig.userId.lastName}
              </Typography>
              <Typography
                sx={{
                  marginLeft: "10px",
                  marginTop: "7px",
                  fontSize: "10px",
                  opacity: "0.5",
                }}
              >
                @{gig.userId.email.replace("@gmail.com", "")}
              </Typography>
            </Stack>
            <Typography
              sx={{
                position: "absolute",
                marginTop: "-16px",
                marginLeft: "50px",
                fontSize: "10px",
              }}
            >
              Avg. response time:1 Hour
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 6 }}>
              Share details, add any requirements, or ask a question to make
              sure this service will meet your expectations
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 3 }}>
              If kunalkhurana401 can deliver what you need, they will reply with
              a custom offer based on your request.
            </Typography>
            <TextareaAutosize
              style={{ marginTop: "30px", width: "100%", height: "150px" }}
              id="outlined-basic"
              placeholder="Ask Webemy Digital Agency a question or share your project details 
              (Project requirement, timeline, budget, etc)"
              onChange={(e) => setText(e.target.value)}
            />
            <Button onClick={() => handleRequest(gig._id)} sx={{ marginTop: "15px" }} variant="contained">
              Submit Request
            </Button>
          </Box>
        </Modal>
        <div
          style={{
            marginLeft: "-26px",
            marginTop: "-470px",
            border: "solid 1px red",
            paddingLeft: "10px",
            width: "924px",
            position: "absolute",
          }}
          dangerouslySetInnerHTML={{ __html: sanitaze }}
        />
      </Container>
      <UserFooter />
    </>
  );
}

export default GigDetails;
