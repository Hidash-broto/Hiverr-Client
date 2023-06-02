import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import { useNavigate } from "react-router-dom";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { freelancerPageChange } from "../redux/FreelancerPage";
import { useSelector, useDispatch } from "react-redux";
import MailIcon from '@mui/icons-material/Mail';

const pages = ["Dashbord", "Gigs", "Profile", "Earnings"];
const path = [
  "/freelancer/home",
  "/freelancer/gigPage",
  "/freelancer/profile",
  "/freelancer/earnings",
];
const settings = ["Profile", "Messages", "Notification", "Logout"];

function ResponsiveAppBar(props: any) {
  const dispatch = useDispatch();
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = (e: any) => {
    setAnchorElUser(null);
    if (e === "Logout") {
      localStorage.removeItem("freelancerToken");
      localStorage.removeItem("isFreelancer");
      navigate("/freelancer/login");
    }
  };

  const pageId = useSelector((state: any) => state.freelancerPage.page);

  React.useEffect(() => {
    const element: any = document.getElementById(pageId);
    element !== null
      ? (element.style.backgroundColor = "#b0b0b0")
      : console.log("");
    element !== null ? (element.style.color = "black") : console.log("");
    // eslint-disable-next-line array-callback-return
    pages.map((page) => {
      if (page !== pageId) {
        const element: any = document.getElementById(page);
        element !== null
          ? (element.style.backgroundColor = "white")
          : console.log("");
      }
    });
  });

  const navigate = useNavigate();

  return (
    <>
      <AppBar color="transparent" position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <img
              src="/img/HiverrBlackLogo.png"
              style={{ width: "150px" }}
              alt=""
            />
            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                {pages.map((page) => (
                  <MenuItem key={page} onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">{page}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {pages.map((page, index) => (
                <Button
                  key={page}
                  id={page}
                  onClick={() => {
                    dispatch(freelancerPageChange(page));
                    handleCloseNavMenu();
                    navigate(path[index]);
                  }}
                  sx={{ my: 2, color: "black", display: "block" }}
                >
                  {page}
                </Button>
              ))}
            </Box>
            <Box
              sx={{ display: { xs: "none", md: "flex" }, marginRight: "20px" }}
            >
              <IconButton
                size="large"
                aria-label="show 17 new notifications"
                color="inherit"
                onClick={props.handleClick}
              >
                  <NotificationsIcon />
              </IconButton>
        <IconButton onClick={() => {
          navigate('/freelancer/chatPage')
        }} size="large" aria-label="show 4 new mails" color="inherit">
            <MailIcon />
        </IconButton>
        <Box onClick={() => props.handleStatusWork()} sx={{borderRadius: '50px', backgroundColor: '#bdbdbd', width: '50px', height: '50xp'}}>
        <img src="/img/gears.png" style={{width: '34px', height: 'auto', marginTop: '5px', marginLeft: '8px'}} alt="" />
        </Box>
            </Box>

            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem
                    id={setting}
                    key={setting}
                    onClick={() => handleCloseUserMenu(setting)}
                  >
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
}
export default ResponsiveAppBar;
