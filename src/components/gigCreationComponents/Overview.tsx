import { Button, Fab, MenuItem, TextField, Typography } from '@mui/material'
import { Container, Stack } from '@mui/system'
import React, { useState } from 'react'
import AddIcon from '@mui/icons-material/Add';
import { Formik } from 'formik';
import * as yup from 'yup'
import toast from 'react-hot-toast'
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { gigPageChange } from '../../redux/Gig';

function Overview() {
  console.log(useSelector((state:any) => state.gig))
  const dispatch = useDispatch()
  const [subCategories, setSubCategories] = useState(['Select Category'])
  const Categories = ['Web Development', 'Graphic Design']
  const subCategoriesWebDevelopment = ['Frontend Development', 'Backend Development', 'Full Stack Web Development', 'Web Design'];
  const subCategoriesGraphicDesign = ['Marketing & advertising graphic design', 'Packaging graphic design', 'Motion graphic design', 'Logo Design', 'Banner Design'];
  const [keyWord, setKeyWord] = useState('')
  const [sample, setSample] : any = useState([])
  const handleKeyword = () => {
    sample.push(keyWord)
    console.log(sample)
  }
  const initialValue = {
    title: '',
    category: '',
    subCategory: ''
  }
  return (
    <>
      <Container sx={{width:'1200px', height:'750px', backgroundColor:'white', marginTop:'65px', position:'absolute', marginLeft:'50px'}}>
        <Formik initialValues={initialValue}
        validationSchema={yup.object({
          title: yup.string().required('*Title Required').min(30, 'Title is Short'),
          category: yup.string().required('*Required'),
          subCategory: yup.string().required('*Required')
        })}
        onSubmit={async (values) => {
          console.log(values)
          const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/freelancer/gigCreation`, {values, sample, number:1},{
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`
            }
          })
          if(response.data.status) {
            dispatch(gigPageChange(1))
          }else if(response.data.jwt) {
            toast.error('Session Expired')
          }else {
            toast.error(response.data.message)
          }
        }}
        >{({ handleSubmit, handleChange, errors, touched, values}) => (
          <form onSubmit={handleSubmit}>
          <Stack direction='column'>
            <Stack direction='row'>
               <Stack sx={{marginLeft:'50px', marginTop:'50px'}} direction='column'>
                <Typography sx={{marginLeft:'25px'}} variant='h4'>Gig Title</Typography>
                <Container sx={{width:'260px'}}>
                <Typography >As your Gig storefront, your title is the most important place to include keywords that buyers would likely use to search for a service like yours.</Typography>
                </Container>
                </Stack>
                <TextField
                 id="outlined-multiline-static"
                 label={touched && errors.title ? errors.title : 'Title'}
                 multiline
                 rows={4}
                 defaultValue="I will do something I’m really good at"
                 className='gigTitle'
                 name='title'
                 onChange={handleChange}
                 value={values.title}
                 />
            </Stack>
            <Stack  direction='row'>
                <Stack sx={{marginLeft:'50px', marginTop:'50px'}} direction='column'>
                <Typography sx={{marginLeft:'25px'}} variant='h4'>Category</Typography>
                <Container sx={{width:'260px'}}>
                <Typography >Choose the category and sub-category most suitable for your Gig.</Typography>
                </Container>
                </Stack>
                <TextField
                      id="outlined-select-currency"
                      select
                      defaultValue='Web Development'
                      label= {touched.category && errors.category ? errors.category : 'Category'}
                      helperText="Please select your Category"
                      name='category'
                      sx={{width:'240px', height:'50px',marginLeft:'200px', marginTop:'50px'}}
                      className='categoryDropdown'
                      onChange={(e) => {
                        handleChange(e)
                        if(e.target.value === 'Graphic Design') {
                          setSubCategories(subCategoriesGraphicDesign)
                        }else {
                          setSubCategories(subCategoriesWebDevelopment)
                        }
                      }}
                      value={values.category}
                    >
                      {Categories.map((option: string) => (
                        <MenuItem key={option} value={option}>
                          {option}
                        </MenuItem>
                      ))}
                    </TextField>
              <TextField
                      id="outlined-select-currency"
                      defaultValue='Web Development'
                      select
                      label= {touched.subCategory && errors.subCategory ? errors.subCategory : 'Sub Category'}
                      helperText="Please select your Sub Category"
                      name='subCategory'
                      sx={{width:'240px', height:'50px',marginLeft:'20px', marginTop:'50px'}}
                      onChange={handleChange}
                      value={values.subCategory}
                    >
                      {subCategories.map((option: string) => (
                        <MenuItem key={option} value={option}>
                          {option}
                        </MenuItem>
                      ))}
                    </TextField>
            </Stack>
            <Stack direction='row'>
                <Stack sx={{marginLeft:'50px', marginTop:'50px'}} direction='column' >
                <Typography sx={{marginLeft:'25px'}} variant='h4'>Search tags</Typography>
                <Container sx={{width:'260px'}}>
                <Typography >Tag your Gig with buzz words that are relevant to the services you offer. Use all 5 tags to get found.</Typography>
                </Container>
                </Stack>
                <Stack sx={{marginLeft:'183px', marginTop:'0'}} direction='column'>
                <Typography sx={{marginLeft:'25px', marginTop:'50px'}} variant='h4'>Positive keyword</Typography>
                <Container sx={{width:'350px'}}>
                <Typography sx={{opacity:'50%'}} >Enter search terms you feel your buyers will use when looking for your service.</Typography>
                </Container>
                <TextField
                  id="outlined-multiline-flexible"
                  label="Positice key word"
                  multiline
                  maxRows={4}
                  className='gigKeyword'
                  onChange={(e) => setKeyWord(e.target.value)}
                  />
                </Stack>
                <Fab onClick={handleKeyword} className='positiveKeyAdd' color="secondary" aria-label="add">
                <AddIcon />
                </Fab>
            </Stack>  
            <Stack sx={{width:'600px', height: '70px', marginLeft: '510px'}}  direction='row'>
                {
                  sample.map((element:any) => {
                    return <Fab sx={{marginTop:'5px', marginLeft: '5px'}} color='secondary' variant="extended">
                      {element}
                  </Fab>
                  })
                }
            </Stack>
            <Button type='submit' sx={{width:'200px', marginLeft: '825px'}} color='success' variant="contained" size="large">
          Save & Continue
        </Button>
        </Stack>
        </form>
        )}
        </Formik>
      </Container>
    </>
  )
}

export default Overview
