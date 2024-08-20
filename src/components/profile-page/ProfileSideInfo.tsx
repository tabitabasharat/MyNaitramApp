"use client";
import * as React from "react";
import Image from "next/image";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import { styled, useTheme } from '@mui/material/styles';
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";
import ProfileSidebar from "./ProfileSideBar";
import { IconButton } from "@mui/material";
import backwardicon from "../../assets/Back - Button.svg";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import MailIcon from "@mui/icons-material/Mail";
import MenuIcon from "@mui/icons-material/Menu";
import Typography from "@mui/material/Typography";
import AccountSettings from "./AccountSettings";
// import Profile from "./Prolife";
import delaccnt from "../../../public/Deleteaccnt.svg";
import accnt from "../../assets/User Gear.svg";
import chats from "../../assets/Chats.svg";
import heplcenter from "../../assets/Headset.svg";
import faq from "../../assets/Question.svg";
import { url } from "inspector";
import Link from "next/link";
import logout from "../../assets/logout.svg"

const drawerWidth = 240;

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * Remove this when copying and pasting into your project.
   */
  window?: () => Window;
}

export default function ProfileSideInfo(props: Props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  const menuItems = [
    { text: "Account Settings", icon: accnt, url: "/profile/account-settings" },
    {
      text: "Live Activity Settings",
      icon: chats,
      url: "/profile/LiveAccntSettings",
    },
  ];

  const helpItems = [
    { text: "Help Center", icon: heplcenter, url: "/profile/help-center" },
    { text: "FAQs", icon: faq, url: "/profile/FAQ" },
  ];
  const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // background:"red",
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  }));
  

  const drawer = (
    <>
    <div className="ps-[32px] bg-[black]">
      {/* <Toolbar /> */}
      <List className="bg-[black] text-[white]">
        <Link href={"/profile/profile-main"}>
          <h3 className="text-xl font-bold mb-[24px]">Profile</h3>
        </Link>
        <div>
          <h3 className="text-[#FFFFFF99] text-sm font-bold mb-[8px]">
            SETTINGS
          </h3>
          <div className="text-xl font-bold">
            {menuItems.map((item, index) => (
              <Link href={item.url}>
                <ListItem
                  className="text-xl font-bold"
                  key={item.text}
                  disablePadding
                >
                  <ListItemButton className="px-0 pt-[10px] pb-[0px] flex items-center">
                    <ListItemIcon className="min-w-0 pr-2">
                      <Image
                        src={item.icon}
                        alt={item.text}
                        width={24}
                        height={24}
                      />
                    </ListItemIcon>
                    <ListItemText primary={item.text} />
                  </ListItemButton>
                </ListItem>
              </Link>
            ))}
          </div>
        </div>
      </List>
      <Divider />
      <List className="bg-[black] pt-[26px] text-[white]">
        <h3 className="text-[#FFFFFF99] text-sm font-bold mb-[8px]">
          SUPPORT
        </h3>
        <div className="font-bold text-[24px]">
          {helpItems.map((item, index) => (
            <Link href={item.url}>
              <ListItem
                key={item.text}
                className="font-bold text-[24px]"
                sx={{ fontSize: "24px" }}
                disablePadding
              >
                <ListItemButton className="px-0 pt-[8px] pb-[0px] flex items-center">
                  <ListItemIcon className="min-w-0 pe-[6px]">
                    <Image
                      src={item.icon}
                      alt={item.text}
                      width={24}
                      height={24}
                    />
                  </ListItemIcon>
                  <ListItemText
                    primary={item.text}
                    sx={{ fontSize: "24px", fontWeight: 800 }}
                    className="font-bold text-[24px]"
                  />
                </ListItemButton>
              </ListItem>
            </Link>
          ))}
        </div>
      </List>
      <List className="bg-[black] pt-[34px] text-[white]">
        <h3 className="text-[#FFFFFF99] text-sm font-bold mb-[10px]">ABOUT</h3>
        <Link href={"/profile/Delete-account"}>
          <ListItem disablePadding>
            <ListItemButton className="px-0 ">
              <ListItemIcon className="min-w-0 pr-2">
                <Image
                  src={delaccnt}
                  alt="Delete Account"
                  width={24}
                  height={24}
                />
              </ListItemIcon>
              <ListItemText primary="Delete Account" className="text-sm" />
            </ListItemButton>
          </ListItem>
        </Link>
  
      </List>

    </div>
    <div className="">
      <button className="text-[white] mb-[31px] absolute bottom-[10%] mx-[21px] flex justify-center items-center text-[11px] md:text-base font-bold border border-[#FF1717] py-[14px] px-[20px] text-center rounded-[110px] w-[112px] md:w-[205px]">
     <Image src={logout} className="w-[16px] md:w-[24px] me-[8px] md:me-[14px]"/> Log out
    </button>
    </div>
    </>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;
      const theme = useTheme();

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      {/* <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
      </AppBar> */}
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          background:"transparent",
          marginTop:"115px",
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" sx={{
            background:"transparent"
          }} noWrap component="div">
          
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              background:"black",
              marginTop: "100px",
              position:"relative"
            },
            "& .MuiTypography-root":{
              fontSize:"14px",
              fontWeight:"400"
            }
          }}
        >
          <DrawerHeader className="flex justify-start h-[30px] w-[30px] ps-[32px]">
            <IconButton className="p-0 h-[30px] w-[30px]" onClick={handleDrawerClose}>
              {theme.direction === "ltr" ? (
                <Image src={backwardicon} />
              ) : (
                <ChevronRightIcon />
              )}
            </IconButton>
          </DrawerHeader>
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              marginTop: "100px",
              backgroundColor: "black",   
            },
            "& .MuiTypography-root":{
              fontSize:"14px",
              fontWeight:"400"
            }
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        {/* <Profile /> */}
      </Box>
    </Box>
  );
}
