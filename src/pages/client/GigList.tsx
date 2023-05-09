import React from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios'

function GigList()  {
    const gigCat = useSelector((state:any) => state.gigList.gigPage)
    console.log(gigCat)
    axios.post(`${process.env.REACT_APP_BASE_URL}/client/gigList`, {gigCat: gigCat}).then((response) => {
      console.log(response)
    })
  return (
    <>
      <h1>Hello</h1>
    </>
  )
}

export default GigList
