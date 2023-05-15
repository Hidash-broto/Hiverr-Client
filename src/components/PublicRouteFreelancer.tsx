import { Navigate } from "react-router-dom";

type childrenProp = {
    children: React.ReactNode;
  }

export default function PublicRouteFreelancer (props:childrenProp) {
   const user = localStorage.getItem('freelancerToken')
    if(user) {
            return <Navigate to='/freelancer/home' />
    }else {
        return (
            <>
            {props.children}
            </>
        )
    }
}