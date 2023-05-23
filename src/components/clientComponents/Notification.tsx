import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { Avatar, Button, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import { toast } from "react-hot-toast";
import axios from "axios";
import useRazorpay from "react-razorpay";

function Notification() {
  const [notification, setNotification] = useState([]);
  const [gigId, setGigId] = useState('');
  const [freelancerId, setFreelancerId] = useState('');
  const [currentNotification, setCurrentNotification] = useState('')
  const Razorpay = useRazorpay()
  console.log(gigId, freelancerId, currentNotification)
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

  const openPayModal = (amt: number) => {
    var amount = amt * 100;
    console.log(amount) // Razorpay considers the amount in paise
    var options: any = {
      key: 'rzp_test_0QarnsaitePhae',
      amount: amount, // 2000 paise = INR 20, amount in paisa
      name: '',
      description: '',
      order_id: '',
      handler: function (response: any) {
        console.log(response);
        var values = {
          razorpay_signature: response.razorpay_signature,
          razorpay_order_id: response.razorpay_order_id,
          transactionid: response.razorpay_payment_id,
          transactionamount: amount,
          gigId,
          freelancerId,
          currentNotification,
        };
        axios
          .post(`${process.env.REACT_APP_BASE_URL}/client/doPayment`, {values, gigId, freelancerId, currentNotification}, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('clientToken')}`
            }
          })
          .then((res) => {
            if(res.data.status) {
              toast.success('Payment Success')
            }else {
              toast.error(res.data.message)
            }
          })
          .catch((e) => console.log(e));
      },
      prefill: {
        name: 'Hiverr',
        email: 'admin@gmail.com',
        contact: '1234567890',
      },
      notes: {
        address: 'Hello World',
      },
      theme: {
        color: '#528ff0',
      },
    };

    axios
      .post(`${process.env.REACT_APP_BASE_URL}/client/payment`, { amount: amount })
      .then((res) => {
        console.log(res, '-=')
        options.order_id = res.data.data.id;
        options.amount = res.data.data.amount;
        console.log(options);
        var rzp1: any = new Razorpay(options);
        rzp1.open();    
      })
      .catch((e) => console.log(e));
  };

  const handlePay = async (gigId1: string, freelancerId1: string) => {
    try {
      console.log(gigId1)
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/client/amountPick`, {gigId1}, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('clientToken')}`
        }
      })
      console.log(response)
      if(response.data.status) {
        console.log(gigId1, freelancerId1)
        setGigId(gigId1)
        setFreelancerId(freelancerId1)
        console.log(gigId, freelancerId, '==')
        openPayModal(response.data.price)
      }
    } catch (error) {
      toast.error('Something Went Wrong')
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
                  onClick={() =>{
                    setCurrentNotification(noti.index)
                    handlePay(noti.gigId, noti.freelancerId)}
                  }
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
