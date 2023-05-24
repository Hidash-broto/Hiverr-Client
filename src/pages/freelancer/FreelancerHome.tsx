import { Container } from "@mui/system";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Avatar,
  Box,
  Button,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import FreelancerNav from "../../components/FreelancerNav";
import Notification from "../../components/freelancerComponent/Notification";
import UserFooter from "../../components/UserFooter";
import axios from "axios";

function FreelancerHome() {
  const [datas, setDatas]: any = useState([]);
  const [freelancer, setFreelancer]: any = useState({});
  const [notificationClicked, setNotificationClicked]: boolean | any =
    useState(false);
  const handleClick: any = () => setNotificationClicked(!notificationClicked);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/freelancer/dashboardDatas`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("freelancerToken")}`,
          },
        }
      );
      console.log(response);
      if (response.data.status) {
        let objs: any = [];
        // eslint-disable-next-line array-callback-return
        response.data.orderLists.map((obj: any) => {
          const days = calculateDateDifference(obj.createdAt.toString());
          if (days > parseInt(obj.gigId.deliveryTime)) {
            obj.createdAt =
              days - parseInt(obj.gigId.deliveryTime) + " days Late";
            obj.status = "Late";
            objs.push(obj);
          } else {
            obj.createdAt = days + ` ${days === 1 ? "day ago" : "days ago"}`;
            obj.status = `${
              parseInt(obj.gigId.deliveryTime) / 4 > days ? "New" : "Progress"
            }`;
            objs.push(obj);
          }
        });
        setDatas(objs);
        console.log(setDatas, "datas");
        setFreelancer(response.data.freelancer);
      } else {
        <Alert severity="error">{response.data.message}</Alert>;
      }
    };
    fetchData();
  });

  function calculateDateDifference(date: string) {
    var userInput = new Date(date);

    // Create a Date object from the user input
    var enteredDate = new Date(userInput);

    // Get the current date
    var currentDate = new Date();

    // Calculate the difference in milliseconds between the current date and the entered date
    var timeDiff = currentDate.getTime() - enteredDate.getTime();

    // Convert the difference to days
    var daysDiff = Math.floor(timeDiff / (1000 * 3600 * 24));

    // Print the difference
    return daysDiff;
  }

  return (
    <>
      {notificationClicked && (
        <Notification notificationClicked={handleClick} />
      )}
      <FreelancerNav handleClick={handleClick} />
      <Container
        sx={{
          backgroundColor: "#EFEFEF",
          width: "100%",
          paddingBottom: "100px",
          maxWidth: "2000px !important",
        }}
      >
        <Stack direction="row">
          <Box
            sx={{
              width: "420px",
              height: "420px",
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
                alt={`${freelancer.firstName ? freelancer.firstName : "G"}`}
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
                {freelancer.firstName + " " + freelancer.lastName}
              </Typography>
              <Typography
                sx={{ fontSize: "15px", color: "#ababab", marginLeft: "140px" }}
              >
                Level One Seller
              </Typography>
              <Divider />
              <Stack
                sx={{ ml: "40px", mt: "10px" }}
                direction="row"
                spacing={25}
              >
                <Typography>Response Rate</Typography>
                <Typography>91%</Typography>
              </Stack>
              <Stack
                sx={{ ml: "40px", mt: "10px" }}
                direction="row"
                spacing={24}
              >
                <Typography>Delivery on time</Typography>
                <Typography>98%</Typography>
              </Stack>
              <Stack
                sx={{ ml: "40px", mt: "10px" }}
                direction="row"
                spacing={23}
              >
                <Typography>Order Completion</Typography>
                <Typography>99%</Typography>
              </Stack>
              <Divider />
              <Stack
                sx={{ ml: "40px", mt: "10px" }}
                direction="row"
                spacing={23}
              >
                <Typography>Earned in March</Typography>
                <Typography>$6,890</Typography>
              </Stack>
              <Stack
                sx={{ ml: "40px", mt: "10px" }}
                direction="row"
                spacing={25}
              >
                <Typography>Response Time</Typography>
                <Typography>1Hrs</Typography>
              </Stack>
            </Stack>
          </Box>
          <Stack direction="column">
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
                <Typography sx={{ fontFamily: "-moz-initial" }} variant="h3">
                  Active Orders
                </Typography>
                <Typography
                  sx={{ marginTop: "17px !important", color: "#b0b0b0" }}
                  variant="h5"
                >
                  11 ($1,855)
                </Typography>
              </Stack>
            </Box>
            {datas.map((obj: any) => (
              <Box
                sx={{
                  width: "784px",
                  height: "240px",
                  backgroundColor: "white",
                  position: "abosolute !important",
                  marginLeft: "513px",
                  marginTop: "50px",
                  borderLeft: "solid 4px red",
                }}
              >
                <Stack direction="column">
                  <Stack
                    direction="row"
                    spacing={5}
                    sx={{ marginTop: "30px", marginLeft: "57px" }}
                  >
                    <Box
                      sx={{
                        width: "100px",
                        height: "100px",
                        backgroundColor: "whitesmoke",
                      }}
                    >
                      <img
                        style={{ width: "100%", height: "100%" }}
                        src={obj.gigId.images[0]}
                        alt=""
                      />
                    </Box>
                    <Avatar
                      alt={obj.clientId.firstName}
                      src="/img"
                      sx={{
                        width: "80px",
                        height: "80px",
                        fontSize: "2rem",
                        marginTop: "10px !important",
                        backgroundColor: "#D9D9D9",
                      }}
                    />
                    <Stack
                      direction="column"
                      spacing={0}
                      sx={{ marginLeft: "20px", marginTop: "20px !important" }}
                    >
                      <Typography variant="h6">
                        {obj.clientId.firstName + "" + obj.clientId.lastName}
                      </Typography>
                      <Typography
                        sx={{ fontSize: "10px", color: "#00DE09" }}
                        variant="h6"
                      >
                        View Order
                      </Typography>
                    </Stack>
                    <Stack
                      direction="column"
                      spacing={0}
                      sx={{ marginLeft: "20px", marginTop: "20px !important" }}
                    >
                      <Typography variant="h6">Price</Typography>
                      <Typography sx={{ fontSize: "10px" }} variant="h6">
                        <CurrencyRupeeIcon
                          sx={{ width: "14px", height: "10px" }}
                        />
                        {obj.gigId.totalPrice}
                      </Typography>
                    </Stack>
                    <Stack
                      direction="column"
                      spacing={0}
                      sx={{ marginLeft: "20px", marginTop: "20px !important" }}
                    >
                      <Typography variant="h6">Delivery Time</Typography>
                      <Typography
                        sx={{
                          fontSize: "10px",
                          color: `${obj.status === "Late" ? "red" : "black"}`,
                        }}
                        variant="h6"
                      >
                        {obj.createdAt}
                      </Typography>
                    </Stack>
                  </Stack>
                  <Divider sx={{ mt: 4 }} />
                  <Stack
                    sx={{ marginTop: "15px", marginLeft: "30px" }}
                    direction="row"
                  >
                    <Box
                      sx={{
                        paddingLeft: "5px",
                        paddingRight: "5px",
                        height: "20px",
                        backgroundColor: `${
                          obj.status === "Late"
                            ? "red"
                            : obj.status === "Progress"
                            ? "blue"
                            : "#ff7b00"
                        }`,
                        marginTop: "20px",
                      }}
                    >
                      <Typography color="white" sx={{ textAlign: "center" }}>
                        {obj.status}
                      </Typography>
                    </Box>
                    <Typography
                      sx={{
                        marginLeft: "20px",
                        marginTop: "20px",
                        fontSize: "0.7rem !important",
                        color: "#666666",
                      }}
                    >{`${
                      obj.status === "Late"
                        ? "You are running late. Deliver now to avoid Negative rating."
                        : obj.status === "Progress"
                        ? "We recommend you Deliver early. So there is enough time for revisions"
                        : "You’ve received a new Order! Check it out."
                    }`}</Typography>
                    <Button
                      sx={{
                        marginTop: "5px",
                        position: "absolute",
                        right: "55px",
                      }}
                      variant="outlined"
                      size="large"
                      color="success"
                    >
                      Delivery Now
                    </Button>
                  </Stack>
                </Stack>
              </Box>
            ))}
          </Stack>
        </Stack>
      </Container>
      <UserFooter />
    </>
  );
}

export default FreelancerHome;
