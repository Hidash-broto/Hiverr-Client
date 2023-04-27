import { Navigate } from "react-router-dom";

type childrenProp = {
    children: React.ReactNode;
  }

export default function ProtectedRouteUser (props:childrenProp) {
   const userType = localStorage.getItem('userType')
    if(localStorage.getItem('token')) {
        if(userType === 'client') {
            return <Navigate to='/' />
        }else {
            return <Navigate to='/freelancer/home' />
        }
    }else {
        return (
            <>
            {props.children}
            </>
        )
    }
}