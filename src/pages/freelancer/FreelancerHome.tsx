import { Container } from "@mui/system";
import React, { useState } from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import FreelancerNav from "../../components/FreelancerNav";
import Notification from '../../components/freelancerComponent/Notification'

function FreelancerHome() {
  const navigate = useNavigate();
  const [notificationClicked, setNotificationClicked]: boolean|any  = useState(true)
  const handleClick: any = () => setNotificationClicked(!notificationClicked)

  return (
    <>
    {
      notificationClicked && <Notification notificationClicked={handleClick} />
    }
      <FreelancerNav handleClick={handleClick} />
      <Container>
        <Button
          onClick={() => {
            localStorage.clear();
            navigate("/login");
          }}
        >
          Logout
        </Button>
      </Container>
    </>
  );
}

export default FreelancerHome;
