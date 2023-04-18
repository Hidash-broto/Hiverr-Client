import React, { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useStyle } from '../style';
import { Container } from '@mui/system';
import { Fab, TextField, Typography } from '@mui/material';
import axios from 'axios';
import PersonOffIcon from '@mui/icons-material/PersonOff';
import PersonIcon from '@mui/icons-material/Person';
import toast from 'react-hot-toast'

export default function BasicTable() {
    const [Freelancers, setFreelancers] = useState([])
    useEffect(() => {
        async function fetchData() {
            const response = await axios.get('http://localhost:5000/api/freelancer/list')
            if(response.data.status) {
                setFreelancers(response.data.data)
            }else {
                toast.error(response.data.message)
            }
        }
        fetchData()
    })

    const handleChange = async (id: string) => {        
        const response = await axios.put('http://localhost:5000/api/freelancer/block', {id:id})
        if(response.data.status) {
            toast.success(response.data.message)
        }else {
            toast.error(response.data.message)
        }
    }
    const classes = useStyle()
    console.log(Freelancers)
    return (
        <Container className={classes.contentContainer}>
            <Typography sx={{ marginTop: '20px', position: 'absolute' }} variant='h5'>Freelancers</Typography>
            <TextField sx={{ marginTop: '70px', backgroundColor: '#ffffff' }} fullWidth label="Search Freelancers" id="fullWidth" />
            <TableContainer sx={{ marginTop: '35px' }} component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow className='max-w-md'>
                            <TableCell>NAME</TableCell>
                            <TableCell align="center">EMAIL</TableCell>
                            <TableCell align="center">COUNTRY</TableCell>
                            <TableCell align="center">STATUS</TableCell>
                            <TableCell align="center">BLOCK OR UNBLOCK</TableCell>
                        </TableRow>
                    </TableHead>
                    {Freelancers.map((freelancer: any) => (
                    <TableBody>
                            <TableRow
                                key={freelancer.firstName + freelancer.lastName}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {freelancer.firstName + " " + freelancer.lastName}
                                </TableCell>
                                <TableCell align="center">{freelancer.email}</TableCell>
                                <TableCell align="center">{freelancer.country}</TableCell>
                                <TableCell align="center">{freelancer.isFreelancer ? "Active" : 'Blocked'}</TableCell>
                                <TableCell align="center"><Fab onClick={() => {        
                                    handleChange(freelancer._id)
                                }} size='small' color="primary" aria-label="add">
                                   {freelancer.isFreelancer?<PersonOffIcon />: <PersonIcon /> } 
                                </Fab></TableCell>
                            </TableRow>
                    </TableBody>
                                    ))}
                </Table>
            </TableContainer>
        </Container>
    );
}