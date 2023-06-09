import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { Avatar, Button, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import { toast } from "react-hot-toast";
import axios from "axios";
import Swal from "sweetalert2";

function Notification(props: any) {
  const tikMarkImageUrl = 'data:image/png;base64,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'
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
        if(response.data.status) {
            setNotification(response.data.data);
            console.log(response.data.data)
            setMessages(response.data.messages);
          }  else {
          toast.error(response.data.message)
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
          }}
        >
          {notification.map((noti: any, ind: number) => {
            console.log(noti)
            if(noti.confirmed) {
              return(
                <Stack sx={{ paddingLeft: "8px", borderBottom: 'solid 1px', backgroundColor: 'white', paddingBottom: '10px' }} direction="row" spacing={2}>
                  <Avatar
                    alt='Upload'
                    src={tikMarkImageUrl}
                    sx={{
                      width: "57px",
                      height: "57px",
                      fontSize: "2rem",
                      marginTop: "30px !important",
                      backgroundColor: "#ff7b00",
                    }}
                  />
                  <Stack
                    direction="column"
                    sx={{ maxWidth: "400px", marginTop: "10px !important" }}
                  >
                    <Typography
                     sx={{opacity: '0.5'}}
                    >
                      {noti.gigTitle}
                    </Typography>
                    <Typography variant='h6'>{noti.message}</Typography>
                  </Stack>
                </Stack>
              )
            } else {
              return (
                <Stack sx={{ paddingLeft: "8px" }} direction="row" spacing={2}>
                  <Avatar
                    alt={noti.firstName?.charAt(0).toUpperCase()}
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
                    <Typography>{messages[0]}</Typography>
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
            }
           
          })}
        </Box>
      </Box>
    </>
  );
}

export default Notification;
