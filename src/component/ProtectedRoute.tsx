import React from 'react'
import { Navigate } from 'react-router-dom'


type childrenProp = {
  children: React.ReactNode;
}

function ProtectedRoute(props: childrenProp) {
    if(localStorage.getItem("adminToken")){
        return <>
        {props.children}
        </>

    }else{
        return <Navigate to='/admin/login'/>
    }
}

export default ProtectedRoute