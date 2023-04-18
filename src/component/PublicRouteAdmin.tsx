import React from 'react'
import { Navigate } from 'react-router-dom'


type childrenProp = {
  children: React.ReactNode;
}

function PublicRouteAdmin(props: childrenProp) {
    console.log(localStorage.getItem('adminToken'),'==');
    
    if(localStorage.getItem("adminToken")){
        return <Navigate to='/admin'/>
    }else{
        return <>
        {props.children}
        </> 
    }
}

export default PublicRouteAdmin