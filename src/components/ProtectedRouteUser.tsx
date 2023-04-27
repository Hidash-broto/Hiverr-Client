import React,{ useEffect} from 'react'
import { userData } from '../redux/User'
import { useDispatch, useSelector } from 'react-redux' 
import axios from 'axios'
import { Navigate, useNavigate } from 'react-router-dom'

type childrenProp = {
  children: React.ReactNode;
}

function ProtectedRouteUser (props:childrenProp) {


  const {user} = useSelector((state:any) => state.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const token = localStorage.getItem('token')
  const getUser = async () => {
    const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/get-user-info-by-id`, {token:token}, {
      headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
      }
  })
  console.log(response.data);
  
    if (response.data.status) {
      dispatch(userData(response.data.data))
    }else {
      localStorage.clear()
      navigate('/login')
    }
  }

  useEffect(() => {
    if(!user) {
      getUser()
    }
  },[user])

  console.log(token);
  

  if (token) {
    return(
      <>
        {props.children}
      </>
    ) 
  } else {
    return <Navigate to='/login' />
  }

}

export default ProtectedRouteUser
