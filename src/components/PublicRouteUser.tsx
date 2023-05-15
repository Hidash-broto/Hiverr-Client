import { Navigate } from "react-router-dom";

type childrenProp = {
    children: React.ReactNode;
  }

export default function ProtectedRouteUser (props:childrenProp) {
   const client: any = localStorage.getItem('client')
    if(localStorage.getItem(client)) {
            return <Navigate to='/' />
    }else {
        return (
            <>
            {props.children}
            </>
        )
    }
}