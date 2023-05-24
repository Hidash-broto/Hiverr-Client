import { Alert, Avatar, Button, Container, Typography } from '@mui/material';
import { Box, Stack } from '@mui/system';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import React, { useEffect, useState } from 'react'
import { useStyle } from '../style';
import axios from 'axios';
import ReactLoading from "react-loading";
import useRazorpay from "react-razorpay";
import { toast } from 'react-hot-toast';

function AdminPayments() {
    const classes = useStyle();
    const [lists, setLists] = useState([]);
    const [emptyData, setEmptyData] = useState(false);
    const [loading, setLoading] = useState(true);
    const [refreshData, setRefreshData] = useState(false);
    const Razorpay = useRazorpay()

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

    const openPayModal = (id: string, amt: number) => {
      var amount = amt * 100;
      console.log(amount) // Razorpay considers the amount in paise
      var options: any = {
        key: 'rzp_test_0QarnsaitePhae',
        amount: amount, // 2000 paise = INR 20, amount in paisa
        name: 'admin@gmail.com',
        description: '',
        order_id: '',
        handler: function (response: any) {
          console.log(response);
          var values = {
            razorpay_signature: response.razorpay_signature,
            razorpay_order_id: response.razorpay_order_id,
            transactionid: response.razorpay_payment_id,
            transactionamount: amount,
            id: id,
          };
          axios
            .post(`${process.env.REACT_APP_BASE_URL}/admin/doPayment`, values, {
              headers: {
                Authorization: `Bearer ${localStorage.getItem('adminToken')}`
              }
            })
            .then((res) => {
              if(res.data.status) {
                toast.success('Payment Success')
                setRefreshData(!refreshData)
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
        .post(`${process.env.REACT_APP_BASE_URL}/admin/payment`, { amount: amount })
        .then((res) => {
          options.order_id = res.data.data.id;
          options.amount = res.data.data.amount;
          console.log(options);
          var rzp1: any = new Razorpay(options);
          rzp1.open();    
        })
        .catch((e) => console.log(e));
    };

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/admin/getAllPayments`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('adminToken')}`
                }
            })
            setLoading(false)
            let objs: any = [];
            console.log(response)
            if(response.data.status) {
              if(response.data.lists.length > 0){
                // eslint-disable-next-line array-callback-return
                response.data.lists.map((obj: any) => {
                  const data = calculateDateDifference(obj.updatedAt.toString())
                  obj.updatedAt = data + ` ${data === 1 ? 'day ago': 'days ago'}`
                  objs.push(obj)
                })
                setLists(objs)
              } else {
                setEmptyData(!emptyData)
              }
            }else {
              <Alert severity="error">{response.data.message}</Alert>
            }
        }
        fetchData()
    },[refreshData])
  return (
    <>
      <Container className={classes.contentContainer}>
        <Stack direction='column' sx={{marginTop: '30px', position: 'absolute'}}>
            <Typography variant='h3' color='#FCAF26'>Payments</Typography>
            {
              loading?               <ReactLoading
              type="spinningBubbles"
              color="#0000FF"
              height={100}
              width={50}
              className={classes.listLoading}
              />:
              emptyData?
              <Stack sx={{width: '318px', height: '400px', marginLeft: '313px', marginTop: '0px'}} direction='column'>
                <img style={{width: '100%', height: '300px'}} src="/img/folder.png" alt="" />
                <Typography variant='h3' color='#5e79ff' sx={{fontFamily: 'monospace', filter: 'drop-shadow(1px 1px 1px #000000)'}}>No Payments</Typography>
                </Stack>:
            
              lists.map((obj: any) => (
            <Box sx={{marginLeft: '50px', width: '925px', height: '150px', backgroundColor: 'white', marginTop: '50px'}}>
                <Stack direction='row' spacing={4}>
                <Box sx={{width: '100px', height: '100px', marginTop: '23px', marginLeft: '30px', borderRadius: '5px', border: 'solid 1px'}}>
                    <img src={obj.gigId.images[0]} style={{width: '100%', height: '100%', borderRadius: '5px'}} alt="" />
              </Box>
              <Avatar
                    alt={obj.freelancerId.firstName}
                    src='/img'
                    sx={{
                      width: "80px",
                      height: "80px",
                      fontSize: "2rem",
                      marginTop: "27px !important",
                      backgroundColor: "#D9D9D9",
                    }}
                  />
                  <Typography sx={{marginTop: '50px !important'}} variant='h6'>{obj.freelancerId.firstName+' '+obj.freelancerId.lastName}</Typography>
                  <Stack direction='column' spacing={0} sx={{marginLeft: '20px', marginTop: '50px !important'}}>
                    <Typography variant='h6'>Price</Typography>
                    <Typography sx={{fontSize: '10px'}} variant='h6'><CurrencyRupeeIcon sx={{width: '14px', height: '10px'}}/>{obj.gigId.totalPrice}</Typography>
                  </Stack>
                  <Typography sx={{marginTop: '50px !important'}} color='#911414' variant='h6'>{obj.updatedAt}</Typography>
                  <Button onClick={() => openPayModal(obj._id, obj.transactionamount)} sx={{ marginTop: '50px !important', position: 'absolute', right: '55px'}} variant='outlined' size='large' color='success'>Ready to pay</Button>
                </Stack>
            </Box>
              ))
            }
            
        </Stack>
      </Container>
    </>
  )
}

export default AdminPayments;
