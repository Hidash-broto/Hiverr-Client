import { Button, Container, Fade, Modal, TextField, Typography } from '@mui/material'
import { Box, Stack } from '@mui/system';
import AppsIcon from '@mui/icons-material/Apps';
import AddIcon from '@mui/icons-material/Add';
import Backdrop from '@mui/material/Backdrop';
import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { gigPageChange } from '../../redux/Gig';
import DeleteIcon from '@mui/icons-material/Delete';

function Requirements() {
    const dispatch = useDispatch()
    let sample = [
        {
        qn: 'Is this order for personal use, business use, or a side project?',
        opt: 'For Business / Personal / Side Project use'
    },{
        qn: 'Which industry do you work in?',
        opt: '3D Design, Academic Education, Academic Writing, Accounting, ..., Other'
    },{
        qn: 'What are you looking to achieve with this order?',
        opt: 'Build a mobile app, Build a website, Create an animation, Develop a game, ..., Other'
    }
]
const [questions, setQuestion] = useState([
    {
    qn: 'Is this order for personal use, business use, or a side project?',
    opt: 'For Business / Personal / Side Project use'
},{
    qn: 'Which industry do you work in?',
    opt: '3D Design, Academic Education, Academic Writing, Accounting, ..., Other'
},{
    qn: 'What are you looking to achieve with this order?',
    opt: 'Build a mobile app, Build a website, Create an animation, Develop a game, ..., Other'
}
])
console.log(questions)
const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'white',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
const [open, setOpen] = useState(false);
const handleOpen = () => setOpen(true);
const handleClose = () => setOpen(false);
const [nwQuestion, setNwQuestion] = useState('')
const [nwOption, setNwOption] = useState('')

const handleSubmit = async () => {
    try {
        const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/freelancer/gigCreation`, {questions,number:4}, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        if(response.data.status) {
            dispatch(gigPageChange(4))
        } else {
            toast.error(response.data.message)
        }
    } catch (error:any) {
        toast.error(error.message)
    }
}

  return (
    <>
      <Container sx={{width:'1200px', paddingBottom: '20px', backgroundColor:'white', marginTop:'65px', position:'absolute', marginLeft:'50px'}}>
        <Stack className='ml-10' direction='column' spacing={1}>
            <Typography variant='h5' sx={{marginTop: '30px'}}>Get all the information you need from buyers to get started</Typography>
            <Typography color='#b5b5b5'>Add questions to help buyers provide you with exactly what you need to start working on their order.</Typography>
        </Stack>
        <Stack className='ml-10' sx={{marginTop: '50px'}} direction='column' spacing={4}>
            {questions.map((obj, index) => {
           return <Box sx={{width: '1000px', height: '100px', border: 'solid 1px', borderColor: '#b5b5b5'}}>
                    <Stack className='ml-7 mt-1' direction='row' spacing={1}>
                        <AppsIcon />
                        <Typography variant='subtitle1'>MULTIPLE CHOICE</Typography>
                    </Stack>
                    <Stack className='ml-7 mt-2' direction='column' sx={{width: '600px'}} spacing={0}>
                        <Typography>{index+1}.{obj.qn}</Typography>
                        <Typography display='inline'>{obj.opt}</Typography>
                        <DeleteIcon onClick={() => questions.splice(index, 1)} sx={{marginLeft: '923px', color: 'red', fontSize: '2.5rem', position: 'absolute', marginTop: '-6px'}} />
                    </Stack>
                  </Box>
            })}
            <Button onClick={handleOpen} sx={{width:'200px', marginLeft: '825px'}} variant='outlined'><AddIcon/>Add Question</Button>
        </Stack>
        <Button onClick={handleSubmit} sx={{width:'200px', marginLeft: '825px'}} color='success' variant="contained" size="large">
          Save & Continue
        </Button>
        <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography id="transition-modal-title" variant="h6" component="h2">
              Add Question
            </Typography>
            <Stack direction='column' spacing={2} sx={{marginTop: '20px'}}>
            <TextField required onChange={(e) => setNwQuestion(e.target.value)} color='success' id="outlined-basic" label="Question" variant="outlined" />
            <TextField required onChange={(e) => setNwOption(e.target.value)} id="outlined-basic" label="Options" variant="outlined" />
            <Button onClick={() => {
                if(nwQuestion.length > 0 && nwOption.length > 0) {
                let Question = {
                    qn: nwQuestion,
                    opt: nwOption
                }
                questions.push(Question)
                console.log(questions)
            }}} sx={{width:'100px', marginLeft: '100px'}} color='success' variant="contained" size="large">
          Add
        </Button>
            </Stack>
          </Box>
        </Fade>
      </Modal>
      </Container>
    </>
  )
}

export default Requirements
