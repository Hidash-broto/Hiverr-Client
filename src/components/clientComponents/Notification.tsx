import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { Avatar, Button, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import { toast } from "react-hot-toast";
import axios from "axios";

function Notification() {
  const [notification, setNotification] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/client/getNotification`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem(
                'clientToken'
              )}`,
            },
          }
        );
        console.log(response, "90");
        if (response.data.status) {
          setNotification(response.data.data);
        }
      } catch (error) {
        toast.error("Something Went Wrong");
      }
    };
    fetchData();
  });


  return (
    <>
      <Box
        sx={{
          width: "455px",
          height: "500px",
          backgroundColor: "whitesmoke",
          position: "absolute",
          marginLeft: "821px",
          marginTop: "85px",
          border: "solid 1px",
          filter: "drop-shadow(1px 1px 1px )",
          top: '0',
          left: '0',
          zIndex: '99'
        }}
      >
        <Box sx={{ width: "100%", height: "40px", backgroundColor: "#D9D9D9" }}>
          <Typography sx={{ ml: 2 }} variant="h6">
            Notifications
          </Typography>
        </Box>
        <Box
          sx={{
            width: "100%",
            paddingBottom: "10px",
            marginTop: "0px",
            backgroundColor: "white",
          }}
        >
          {notification.map((noti: any, ind: number) => {
            return (
              <Stack sx={{ paddingLeft: "8px" }} direction="row" spacing={2}>
                <Avatar
                  alt={noti.freelancerName.charAt(0).toUpperCase()}
                  src="/static/images/avatar/1.jpg"
                  sx={{
                    width: "57px",
                    height: "57px",
                    fontSize: "2rem",
                    marginTop: "15px !important",
                    backgroundColor: "#ff7b00",
                    msTransform: 'translateY(50%)',
                    transform: 'translateY(55%)',
                  }}
                />
                <Stack
                  direction="column"
                  sx={{ width: "250px", marginTop: "10px !important" }}
                >
                  <Typography
                   sx={{opacity: '0.5'}}
                  >
                    {noti.freelancerName}
                  </Typography>
                  <Typography>{noti.message}</Typography>
                </Stack>
                <Button
                  sx={{
                    width: "100px",
                    height: "30px",
                    marginRight: "8px !important",
                    marginTop: "30px !important",
                    transform: 'translateY(60%)',
                  }}
                  variant="contained"
                  color="success"
                >
                  Pay
                </Button>
              </Stack>
            );
          })}
        </Box>
      </Box>
    </>
  );
}

export default Notification;
