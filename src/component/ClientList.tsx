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
    const [clients, setClients] = useState([])
    useEffect(() => {
        async function fetchData() {
            const response = await axios.get('http://localhost:5000/api/client/list')
            if(response.data.status) {
                setClients(response.data.data)
            }else {
                toast.error(response.data.message)
            }
        }
        fetchData()
    })

    const handleChange = async (id: string) => {        
        const response = await axios.put('http://localhost:5000/api/client/block', {id:id})
        if(response.data.status) {
            toast.success(response.data.message)
        }else {
            toast.error(response.data.message)
        }
    }
    const classes = useStyle()
    return (
        <Container className={classes.contentContainer}>
            <Typography sx={{ marginTop: '20px', position: 'absolute' }} variant='h5'>Clients</Typography>
            <TextField sx={{ marginTop: '70px', backgroundColor: '#ffffff' }} fullWidth label="Search Clients" id="fullWidth" />
            <TableContainer sx={{ marginTop: '35px' }} component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>NAME</TableCell>
                            <TableCell align="center">EMAIL</TableCell>
                            <TableCell align="center">COUNTRY</TableCell>
                            <TableCell align="center">STATUS</TableCell>
                            <TableCell align="center">BLOCK OR UNBLOCK</TableCell>
                        </TableRow>
                    </TableHead>
                    {clients.map((client: any) => (
                    <TableBody>
                            <TableRow
                                key={client.firstName + client.lastName}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {client.firstName + " " + client.lastName}
                                </TableCell>
                                <TableCell align="center">{client.email}</TableCell>
                                <TableCell align="center">{client.country}</TableCell>
                                <TableCell align="center">{client.isClient ? "Active" : 'Blocked'}</TableCell>
                                <TableCell align="center"><Fab onClick={() => {        
                                    handleChange(client._id)
                                }} size='small' color="primary" aria-label="add">
                                   {client.isClient?<PersonOffIcon />: <PersonIcon /> } 
                                </Fab></TableCell>
                            </TableRow>
                    </TableBody>
                           ))}
                </Table>
            </TableContainer>
        </Container>
    );
}