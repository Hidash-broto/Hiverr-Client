import React from 'react'
import {Button, Container, Tab, Tabs, Typography} from '@mui/material'
import {useStyle} from '../style'
import '../index.css'
import { Box, Stack } from '@mui/system'
import AdminNav from './AdminNav'
import { useNavigate } from 'react-router-dom'

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
  }
  
function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`vertical-tabpanel-${index}`}
        aria-labelledby={`vertical-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

  function a11yProps(index: number) {
    return {
      id: `vertical-tab-${index}`,
      'aria-controls': `vertical-tabpanel-${index}`,
    };
  }


function AdminLayout(prop: any) {
    const navigate = useNavigate()    
    const classes = useStyle()
    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
      setValue(newValue);
      if(newValue === 1){
        localStorage.setItem('listType', 'freelancer')
      } else if (newValue === 2){
        localStorage.setItem('listType', 'client')
      }
    };

  return (
    <>
    <AdminNav />
    <Stack direction='row'>
    <Container className={classes.adminLayout}>
        <Typography variant='h2' className='adminHeading'>Admin</Typography>
        <Box
      sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: 224 }}
    >
      <Tabs
        orientation="vertical"
        variant="fullWidth"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        sx={{width:'400px'}}
      >
        <Tab sx={{marginRight:'30px'}} label="Dashboard" {...a11yProps(0)} />
        <Tab sx={{marginRight:'30px'}} label="Freelancers" {...a11yProps(1)} />
        <Tab sx={{marginRight:'30px'}} label="Clients" {...a11yProps(2)} />
        <Tab sx={{marginRight:'30px'}} label="Payments" {...a11yProps(3)} />
      </Tabs>
      </Box>
      <Button onClick={() => {
      localStorage.clear()
      navigate('/admin/login')
    }} sx={{marginLeft:'75px'}} variant="outlined" color="error">
         Logout
      </Button>
      </Container>
      <TabPanel value={value} index={0}>
        {prop.children[1]}
      </TabPanel>
      <TabPanel value={value} index={1}>
        {prop.children[0]}
      </TabPanel>
      <TabPanel value={value} index={2}>
      {prop.children[0]}
      </TabPanel>
      <TabPanel value={value} index={3}>
        Item Four
      </TabPanel>
    </Stack>
    </>
  )
}

export default AdminLayout
