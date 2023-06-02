import { Alert, Button, Divider, Stack, Tab, Tabs, Typography } from '@mui/material'
import { Container } from '@mui/system'
import React, { useEffect, useState } from 'react'
import FreelancerNav from '../../components/FreelancerNav'
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import axios from 'axios';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useNavigate } from 'react-router-dom';
import UserFooter from '../../components/UserFooter';

function FreelancerGigPage() {

    const [value, setValue] = React.useState(0);
    const [activeGigs, setActiveGigs]: any = useState([])
    const [pendingGigs, setPendingGigs]: any = useState([])
    const [rejectedGigs, setRejectedGigs]: any = useState([])
    const [rows, setRows]: any = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/freelancer/getUserDt`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('freelancerToken')}`
                    }
                })
                console.log(response)
                if(response.data.status) {
                    setActiveGigs(response.data.activeGigs);
                    setPendingGigs(response.data.pendingGigs);
                    setRejectedGigs(response.data.rejectedGigs);
                } else {
                    <Alert severity='error'>{response.data.message}</Alert>
                }
            } catch (error: Error|any) {
                <Alert severity='error'>{error.message}</Alert>
            }
        }
        fetchData()
    },[])

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
      console.log(newValue);
      setValue(newValue);
      const nwobj: any = []
      if(newValue === 0) {
        activeGigs.forEach((obj: any, index: number) => {
            const obj1: any = { id: index + 1,image: obj.images[0], title: obj.title, IMPRESSION: 4, CLICKS: 5 }
            console.log(obj1, '09')
            nwobj.push(obj1)
         });
         setRows(nwobj)
      } else if (newValue === 1) {
        pendingGigs.forEach((obj: any, index: number) => {
            const obj1: any = { id: index + 1,image: obj.images[0], title: obj.title, IMPRESSION: 4, CLICKS: 5 }
            nwobj.push(obj1)
            console.log(rows)
         })
         setRows(nwobj)
      } else if(newValue === 2) {
        rejectedGigs.forEach((obj: any, index: number) => {
            const obj1: any = { id: index + 1,image: obj.images[0], title: obj.title, IMPRESSION: 4, CLICKS: 5 }
            nwobj.push(obj1)
         })
         setRows(nwobj)
      }
    };
    function a11yProps(index: number) {
      return {
        id: `simple-tab-${index}`,
        "aria-controls": `simple-tabpanel-${index}`,
      };
    }

    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'image', headerName: 'Image', width: 100, renderCell: (params) => <img src={params.value} alt="" style={{ width: '100%', height: 'auto' }} />},
        { field: 'title', headerName: 'Title', width: 200 },
        {
          field: 'IMPRESSION',
          headerName: 'IMPRESSION',
          type: 'number',
          width: 150,
        },
        {
          field: 'CLICKS',
          headerName: 'CLICKS',
          type: 'number',
          width: 90,
        },
      ];

      const rows2 = [
        { id: 1, image: '/img/folder.png', firstName: 'Jon', age: 35 },
        { id: 2, image: 'Lannister', firstName: 'Cersei', age: 42 },
        { id: 3, image: 'Lannister', firstName: 'Jaime', age: 45 },
        { id: 4, image: 'Stark', firstName: 'Arya', age: 16 },
        { id: 5, image: 'Targaryen', firstName: 'Daenerys', age: null },
        { id: 6, image: 'Melisandre', firstName: null, age: 150 },
        { id: 7, image: 'Clifford', firstName: 'Ferrara', age: 44 },
        { id: 8, image: 'Frances', firstName: 'Rossini', age: 36 },
        { id: 9, image: 'Roxie', firstName: 'Harvey', age: 65 },
      ];

  return (
    <>
    <FreelancerNav />
      <Container sx={{maxWidth: '2000px !important', width: '100%', minHeight: '600px', marginTop: '5px', backgroundColor: '#EFEFEF', paddingBottom: '50px'}}>
    <Stack sx={{marginTop: '50px', position: 'absolute', marginLeft: '50px'}} direction='column'>
        <Typography sx={{fontFamily: '-moz-initial'}} variant='h2'>Gigs</Typography>
        <Tabs
                  value={value}
                  onChange={handleChange}
                  aria-label="basic tabs example"
                  sx={{marginTop: '30px'}}
                >
                  <Tab label="Active Gigs" {...a11yProps(0)} />
                  <Tab label="Pending to Approval" {...a11yProps(1)} />
                  <Tab label="Denied Gigs" {...a11yProps(2)} />
                </Tabs>
                <Divider />
                <Button onClick={() => navigate('/freelancer/gigCreation')} sx={{position: 'abosolute', marginTop: '-41px', marginLeft: '451px', backgroundColor: '#00B628'}} variant='contained'>Create Gig</Button>
    </Stack>
    <Container sx={{marginTop: '250px', position: 'absolute'}}>
    <div style={{ height: 270, width: '100%', backgroundColor: 'white' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 3 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
      />
    </div>
    {/* <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Dessert (100g serving)</TableCell>
            <TableCell align="right">Calories</TableCell>
            <TableCell align="right">Fat&nbsp;(g)</TableCell>
            <TableCell align="right">Carbs&nbsp;(g)</TableCell>
            <TableCell align="right">Protein&nbsp;(g)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.calories}</TableCell>
              <TableCell align="right">{row.fat}</TableCell>
              <TableCell align="right">{row.carbs}</TableCell>
              <TableCell align="right">{row.protein}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer> */}
    </Container>
      </Container>
      <UserFooter/>
    </>
  )
}

export default FreelancerGigPage
