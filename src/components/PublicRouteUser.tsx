import { Navigate } from "react-router-dom";

type childrenProp = {
    children: React.ReactNode;
  }

export default function ProtectedRouteUser (props:childrenProp) {
    if(localStorage.getItem('clientToken')) {
            return <Navigate to='/' />
    }else {
        return (
            <>
            {props.children}
            </>
        )
    }
}