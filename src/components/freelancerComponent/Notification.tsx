import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { Avatar, Button, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import { toast } from "react-hot-toast";
import axios from "axios";
import Swal from "sweetalert2";

function Notification(props: any) {
  const [notification, setNotification] = useState([]);
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/freelancer/getNotification`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem(
                "freelancerToken"
              )}`,
            },
          }
        );
        console.log(response, "90");
        if (response.data.status) {
          setNotification(response.data.data);
          setMessages(response.data.messages);
        }
      } catch (error) {
        toast.error("Something Went Wrong");
      }
    };
    fetchData();
  });


  const handleSubmit = async (id: string) => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/freelancer/requestAccept`, {id:id}, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('freelancerToken')}`
        }
      })
      if(response.data.status) {
        toast.success('Accepted, We will Inform you if Order is Confirmed')
        props.notificationClicked()
      }
      console.log(response)
    } catch (error) {
      toast.error('Something Went Wrong')
    }
  }

  const handleReject = async (id: string) => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/freelancer/gigReject`, {id: id}, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('freelancerToken')}`
        }
      })
      if(response.data.status) {
        toast.success('Rejected')
        props.notificationClicked()
      } else {
        toast.error(response.data.message)
      }
    } catch (error: Error|any) {
      toast.error(error.message)
    }
  }

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
                  alt={noti.firstName.charAt(0).toUpperCase()}
                  src="/static/images/avatar/1.jpg"
                  sx={{
                    width: "57px",
                    height: "57px",
                    fontSize: "2rem",
                    marginTop: "15px !important",
                    backgroundColor: "#ff7b00",
                  }}
                />
                <Stack
                  direction="column"
                  sx={{ width: "250px", marginTop: "10px !important" }}
                >
                  <Typography
                   sx={{opacity: '0.5'}}
                  >
                    {noti.firstName + " " + noti.lastName}
                  </Typography>
                  <Typography>{messages[ind]}</Typography>
                </Stack>
                <Button
                  sx={{
                    width: "100px",
                    height: "30px",
                    marginTop: "30px !important",
                  }}
                  variant="outlined"
                  color="error"
                  onClick={() => {
                    Swal.fire({
                      title: 'Are you Sure to Reject the Order',
                      showDenyButton: true,
                      confirmButtonText: 'Sure',
                    }).then((result: any) => {
                      /* Read more about isConfirmed, isDenied below */
                      if (result.isConfirmed) {
                        handleReject(noti._id)
                      } else if (result.isDenied) {
                        Swal.fire('Changes are not saved', '', 'info')
                      }
                    })
                  }
}
                >
                  Decline
                </Button>
                <Button
                  sx={{
                    width: "100px",
                    height: "30px",
                    marginRight: "8px !important",
                    marginTop: "30px !important",
                  }}
                  variant="outlined"
                  color="success"
                  onClick={() => {
                    Swal.fire({
                      title: 'Are you Sure to Accept the Order',
                      showDenyButton: true,
                      confirmButtonText: 'Sure',
                    }).then((result: any) => {
                      /* Read more about isConfirmed, isDenied below */
                      if (result.isConfirmed) {
                        handleSubmit(noti._id)
                      } else if (result.isDenied) {
                        Swal.fire('Changes are not saved', '', 'info')
                      }
                    })
                  }
}
                >
                  Accept
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
