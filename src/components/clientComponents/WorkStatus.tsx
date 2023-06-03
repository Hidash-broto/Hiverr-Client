import {
  Box,
  Button,
  Divider,
  Modal,
  Stack,
  Typography,
} from "@mui/material";
import SystemUpdateAltIcon from '@mui/icons-material/SystemUpdateAlt';
import CheckIcon from '@mui/icons-material/Check';
import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

function WorkStatus() {
  const [allData, setAllData]: any = useState([]);
  const [notificationData, setNotificationData]: any = useState([]);
  const handleOpen = () => setOpen(true);
  const   handleClose = () => setOpen(false);
  const [open, setOpen] = useState(false);
  const [dataIndex, setDataIndex] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/client/getAllStatus`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("clientToken")}`,
          },
        }
      );
      if (response.data.status) {
        const objs: any = [];
        setAllData(response.data.data);
        response.data.data.map((obj: any) => {
          let len = obj.statuses.length - 1;
          obj.statuses[len].docId = obj._id
          return objs.push(obj.statuses[len]);
        });
        setNotificationData(objs);
        console.log(notificationData);
      } else {
        toast.error(response.data.message);
      }
    };
    fetchData();
  });

  const closeOrder = async (id: String) => {
    try {
      const response = await axios.put(`${process.env.REACT_APP_BASE_URL}/client/closeOrder`, {id}, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('freelancerToken')}`
        }
      })
      console.log(response)
      if(response.data.status) {
        toast.success('Order Completed')
      }else {
        toast.error(response.data.message)
      }
    } catch (error: Error| any) {
      toast.error(error.message)
    }
  }

  const downloadFile = async (id: String) => {
    try {
      handleClose()
      axios({
        url: `${process.env.REACT_APP_BASE_URL}/client/doDownload`,
        data: {id},
        method: 'POST',
        responseType: 'blob', // Set the response type to 'blob'
      }).then((response: any) => {
        console.log(response)
        const filename = 'image.jpg'
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        a.click();
        window.URL.revokeObjectURL(url);
      })
    } catch (error: any) {
      console.log(error.message)
      toast.error('Something Went Wrong')
    }
  }

  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    backgroundColor: "white",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    height: "500px",
    overflow: "scroll",
  };


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
          top: "0",
          left: "0",
          zIndex: "99",
        }}
      >
        <Box sx={{ width: "100%", height: "40px", backgroundColor: "#D9D9D9" }}>
          <Typography sx={{ ml: 2 }} variant="h6">
            Freelancer Status
          </Typography>
        </Box>
        {notificationData.map((obj: any, index: number) => {
          return (
            <Box
              sx={{
                width: "90%",
                paddingBottom: "10px",
                marginTop: "30px",
                backgroundColor: "white",
                marginLeft: "20px !important",
                borderRadius: "5px",
                filter: "drop-shadow(1px 1px 1px black)",
                justifyContent: 'center',
                display: 'flex'
              }}
            >
              <Stack
                sx={{
                  paddingLeft: "8px",
                  paddingBottom: "10px",
                  marginTop: "10px",
                  textAlign: "center",
                }}
                direction="row"
                spacing={2}
              >
                <Box>
                {
                      obj.percentage !== 100 ? 
                      <Typography
                      variant="h4"
                      sx={{
                        fontFamily: "-moz-initial",
                        textAlign: "center",
                        marginTop: "10px",
                      }}
                    >
                      {obj.percentage}%
                    </Typography>:
                    <Box sx={{width: '50px', height: '50px', backgroundColor: 'whitesmoke', border: 'solid 5px green', borderRadius: '50px', marginTop: '7px'}}>
                                            <Typography
                      variant="h6"
                      sx={{
                        fontFamily: "-moz-initial",
                        textAlign: "center",
                        marginTop: "10px",
                      }}
                    >
                      {obj.percentage}%
                    </Typography>
                    </Box>
                    }
                </Box>
                <hr
                  style={{
                    marginTop: "10px",
                    filter: "drop-shadow(2px 1px 2px #002D04)",
                  }}
                />
                <Box
                              onClick={() => {
                                setDataIndex(index);
                                allData[dataIndex]?.statuses.reverse();
                                handleOpen();
                              }}
                sx={{width: '160px'}}>
                <Typography
                  variant="h6"
                  sx={{ marginTop: "10px !important", color: "#002D04", textAlign: 'center' }}
                >
                  {obj.doneThings}.
                </Typography>
                </Box>
                {
                  obj.percentage === 100? 
                  <Stack sx={{marginTop: '20px'}} direction='row' spacing={2}>
                <SystemUpdateAltIcon onClick={() => {
                  downloadFile(obj.docId)
                }} sx={{width: '30px', height: '30px', marginTop: '10px'}}/>
                <Button onClick={() => {
                  closeOrder(obj.docId)
                }} color='success' sx={{width: '30px', height: '30px', mt: '12px !important'}} variant="outlined"><CheckIcon/></Button>
                </Stack>: ''
                }
                
              </Stack>
            </Box>
          );
        })}
      </Box>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography variant="h4" sx={{ fontFamily: "-moz-initial" }}>
            All Statuses
          </Typography>
          <Stack
            direction="row"
            spacing={2}
            sx={{
              border: "solid 1px",
              height: "100px",
              width: "395px",
              backgroundColor: "#0b103b",
              borderRadius: "3px",
              filter: "drop-shadow(4px 7px 5px black)",
              paddingLeft: "5px",
              marginTop: "20px",
            }}
          >
            <img
              style={{
                width: "90px",
                height: "90px",
                borderRadius: "5px",
                marginTop: "5px",
              }}
              src={allData[dataIndex]?.gigId.images[0]}
              alt=""
            />
            <Typography
              sx={{ marginTop: "20px !important", color: "white" }}
              variant="h5"
            >
              {allData[dataIndex]?.gigId.title}
            </Typography>
          </Stack>
          <Divider sx={{ marginTop: "20px" }} />
          {allData[dataIndex]?.statuses.reverse().map((obj: any) => {
            return (
              <Box sx={{ marginLeft: "7px" }}>
                <Stack
                  direction="row"
                  spacing={4}
                  sx={{
                    border: "solid 1px",
                    height: "80px",
                    width: "375px",
                    backgroundColor: "#292b2c",
                    borderRadius: "3px",
                    paddingLeft: "13px",
                    marginTop: "20px",
                  }}
                >
                  <Box
                    style={{
                      width: "70px",
                      height: "60px",
                      borderRadius: "5px",
                      marginTop: "12px",
                      backgroundColor: "whitesmoke",
                    }}
                  >
                    <Typography
                      variant="h4"
                      sx={{
                        fontFamily: "-moz-initial",
                        textAlign: "center",
                        marginTop: "10px",
                      }}
                    >
                      {obj.percentage}%
                    </Typography>
                  </Box>
                  <Typography
                    sx={{
                      marginTop: "10px !important",
                      color: "white",
                      textAlign: "center !important",
                      verticalAlign: "middle !important",
                      fontFamily: "monospace",
                    }}
                    variant="h5"
                  >
                    {obj.doneThings}
                  </Typography>
                </Stack>
              </Box>
            );
          })}
        </Box>
      </Modal>
    </>
  );
}

export default WorkStatus;
