import { Button, Stack, TextField, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React, { useState } from 'react'
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';
import Modal from '@mui/material/Modal';
import Slider from '@mui/material/Slider';
import { toast } from 'react-hot-toast';
import axios from 'axios';

function WorkStatus(props: any) {
  console.log(props)
  const [open, setOpen] = useState(false);
  const [modalData, setModalData]: any = useState({statuses: [{
    percentage: 0
  }]});
  const [modalLength, setModalLength]:number|any = useState(modalData.statuses.length - 1)
  const [doneThings, setDoneThings]: any = useState('');
  const [statusCount, setStatusCount]: number|any = useState(0);
  const [file, setFile]: any = useState();
  const [currentGigId, setCurrentGigId] = useState('')
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  function valuetext(value: number) {
    return `${value}°C`;
  }
  

  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    backgroundColor: 'white', // Update the background color here
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  const saveFile = (e: any) => {
    setFile(e.target.files[0]);
  };

  const handleUpdate = async () => {
    try {
      if(doneThings === '') {
        return toast.error('Fill the field')
      }
      if(statusCount === 100) {
        let deliverResponse = doneThings
        const response = await axios.post(
          `${process.env.REACT_APP_BASE_URL}/freelancer/submitOrder`,{file, deliverResponse, currentGigId}, {
            headers: {
              'content-type': 'multipart/form-data'
            }
          }
        );
        if(response.data.status) {
          setDoneThings('')
          modalData.statuses[modalLength].percentage = statusCount
          setStatusCount(0)
          handleClose()
          toast.success('Project Completed Wait for Client Status Response')
        }else {
          toast.error(response.data.message)
        }
      } else {
        const response = await axios.put(`${process.env.REACT_APP_BASE_URL}/freelancer/updateWorkStatus`, {id:modalData._id, statusCount, doneThings, prev: modalData.statuses[modalLength].percentage}, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('freelancerToken')}`
          }
        })
        console.log(response)
        if(response.data.status) {
          setDoneThings('')
          modalData.statuses[modalLength].percentage = statusCount
          setStatusCount(0)
          handleClose()
          toast.success('Status Updated')
        }else {
          toast.error(response.data.message)
        }
      }
    } catch (err: Error|any) {
      toast.error(err.message)
    }
  }

  return (
    <>
      <Box
        sx={{
          width: '455px',
          paddingBottom: '20px',
          backgroundColor: 'whitesmoke',
          position: 'absolute',
          marginLeft: '821px',
          marginTop: '85px',
          border: 'solid 1px',
          filter: 'drop-shadow(1px 1px 1px)',
          top: '0',
          left: '0',
          zIndex: '99',
        }}
      >
        <Typography variant="h5" sx={{ marginLeft: '15px' }}>
          Works
        </Typography>
        {props.datas.map((obj: any) => (
          <Box
            sx={{
              width: '100%',
              paddingBottom: '10px',
              minHeight: '50px',
              backgroundColor: 'white',
              marginTop: '10px',
            }}
            onClick={() => {
              setModalData(obj)
              setModalLength(obj.statuses.length - 1)
              setCurrentGigId(obj._id)
              handleOpen()
              console.log(modalData, '==', obj)
            }}
          >
            <Stack sx={{ paddingTop: '20px', marginLeft: '10px' }} spacing={1} direction="row">
              <Typography color="#0275d8">{obj.gigId.title}</Typography>
              <DoubleArrowIcon sx={{ marginTop: '0px' }} />
              <Typography>{obj.clientId.firstName + ' ' + obj.clientId.lastName}</Typography>
            </Stack>
          </Box>
        ))}
      </Box>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Stack direction='column' spacing={2}>
              <>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Update Status
            </Typography>
            {
              modalData.statuses[modalLength].percentage === 100?
              <Slider defaultValue={100} step={10} marks min={0} max={100} disabled />:
              <Slider
              aria-label="Temperature"
              defaultValue={modalData.statuses[modalLength].percentage}
              getAriaValueText={valuetext}
              valueLabelDisplay="auto"
              step={10}
              marks
              min={0}
              max={100}
              onChange={(e: any) => {
                setStatusCount(e.target.value)
              }}
            />
            }

      {
        statusCount === 100? 
        <input type="file" onChange={(e) => {
          saveFile(e)
        }}/>:
        ''
      }
      <TextField onChange={(e) => setDoneThings(e.target.value)} id="standard-basic" label=      {
        // eslint-disable-next-line eqeqeq
        statusCount == 100? 
        'Response':
        'What things done'
      } variant="standard" />
      <Button onClick={() => handleUpdate()} sx={{marginTop: '20px !important'}} variant='contained'>Update</Button>
      </>
      </Stack>
          </Box>
        </Modal>
    </>
  );
}

export default WorkStatus;
