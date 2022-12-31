import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import ToolbarGroup from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import ourColors from "./ourColors";
const pages = ["Home", "Account", "Matches"];
const settings = ["Account", "Logout"];
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const navigate = useNavigate();
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = (option) => {
    setAnchorElUser(null);
  };

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: ourColors.background,
        width: "100%",
      }}
    >
      <Container maxWidth="xl">
        <Toolbar>
          <ToolbarGroup firstChild={true} float="left">
            <img src="/logo.png" alt="logo" width={130} height={60} />
          </ToolbarGroup>

          <ToolbarGroup
            style={{
              float: "none",
              width: "500px",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            <Box
              sx={{
                flexGrow: 1,
                display: { xs: "none", md: "flex" },
                width: "100%",
                margin: "auto",
                justifyContent: "space-evenly",
              }}
            >
              {pages.map((page) => (
                <Button
                  key={page}
                  onClick={() => navigate(`/${page.toLowerCase()}`)}
                  sx={{
                    my: 2,
                    color: ourColors.primary,
                    fontSize: "1.2rem",
                    fontWeight: "bold",
                    "&:hover": {
                      backgroundColor: "#dce1e1",
                    },
                  }}
                >
                  {page}
                </Button>
              ))}
            </Box>
          </ToolbarGroup>
          <ToolbarGroup lastChild={true} float="right">
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="avatar" src="./avatar.png" />
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
                    key={setting}
                    onClick={() => navigate(`/${setting.toLowerCase()}`)}
                  >
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </ToolbarGroup>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default NavBar;
