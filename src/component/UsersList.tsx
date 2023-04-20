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
import {FunctionComponent} from 'react'
import ReactLoading from "react-loading";
// import { useDispatch } from 'react-redux'
import PaginationPage from './PaginationPage';


function UsersList() {
    // const dispatch = useDispatch()
    const userType = localStorage.getItem('listType')
    const [user, setUser] = useState([])
    const [loading, setLoading] = useState(true)
    const [currentPage, setCurrentPage] = useState(1)
    const [postsPerPage, setPostsPerPage] = useState(4)
    const indexOfLast = currentPage * postsPerPage
    const indexOfFirst = indexOfLast - postsPerPage
    console.log(indexOfFirst, indexOfLast, currentPage, postsPerPage)
    let currentLists:any = []
    useEffect(() => {
        async function fetchData() {
            const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/${userType}/list`)
            setLoading(false)
            if(response.data.status) {
                setUser(response.data.data)
            }else {
                toast.error(response.data.message)
            }
        }
        fetchData()
    },[])
    currentLists = user.slice(indexOfFirst, indexOfLast)
    console.log(currentLists)

    const handleChange = async (id: string) => {        
        const response = await axios.put(`${process.env.REACT_APP_BASE_URL}/${userType}/block`, {id:id})
        if(response.data.status) {
            toast.success(response.data.message)
        }else {
            toast.error(response.data.message)
        }
    }
    const classes = useStyle()

    const paginate = (pageNumber:number) =>{
        setCurrentPage(pageNumber)
        console.log(pageNumber)
    }
    return (
        <>
        <Container className={classes.contentContainer}>
            <Typography sx={{ marginTop: '20px', position: 'absolute' }} variant='h5'>Freelancers</Typography>
            <TextField sx={{ marginTop: '70px', backgroundColor: '#ffffff' }}  fullWidth label="Search Freelancers" id="fullWidth" />
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
                                {loading?
              <ReactLoading
              type="spinningBubbles"
              color="#0000FF"
              height={100}
              width={50}
              className={classes.listLoading}
              />:
                    currentLists.map((user: any) => (
                    <TableBody>
                            <TableRow
                                key={user.firstName + user.lastName}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {user.firstName + " " + user.lastName}
                                </TableCell>
                                <TableCell align="center">{user.email}</TableCell>
                                <TableCell align="center">{user.country}</TableCell>
                                <TableCell align="center">{user.isUser ? "Active" : 'Blocked'}</TableCell>
                                <TableCell align="center"><Fab onClick={() => {        
                                    handleChange(user._id)
                                }} size='small' color="primary" aria-label="add">
                                   {user.isUser?<PersonOffIcon />: <PersonIcon /> } 
                                </Fab></TableCell>
                            </TableRow>
                    </TableBody>
                 ))}
                </Table>
            </TableContainer>
             <PaginationPage postsPerPage={postsPerPage} totalPosts={user.length} paginate={paginate} />
        </Container>
        </>
    );
}

export default UsersList as FunctionComponent