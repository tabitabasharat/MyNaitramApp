// 'use client'
// import * as React from 'react';
// import AppBar from '@mui/material/AppBar';
// import Box from '@mui/material/Box';
// import CssBaseline from '@mui/material/CssBaseline';
// import Divider from '@mui/material/Divider';
// import Drawer from '@mui/material/Drawer';
// import IconButton from '@mui/material/IconButton';
// import InboxIcon from '@mui/icons-material/MoveToInbox';
// import List from '@mui/material/List';
// import ListItem from '@mui/material/ListItem';
// import ListItemButton from '@mui/material/ListItemButton';
// import ListItemIcon from '@mui/material/ListItemIcon';
// import ListItemText from '@mui/material/ListItemText';
// import MailIcon from '@mui/icons-material/Mail';
// import MenuIcon from '@mui/icons-material/Menu';
// import Toolbar from '@mui/material/Toolbar';
// import Typography from '@mui/material/Typography';

// const drawerWidth = 240;

// interface Props {
//   /**
//    * Injected by the documentation to work in an iframe.
//    * Remove this when copying and pasting into your project.
//    */
//   window?: () => Window;
// }
"use client";
import * as React from "react";
import Image from "next/image";
import { useEffect } from "react";
import {
  AppBar,
  Box,
  CssBaseline,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import backwardicon from "@/assets/Back - Button.svg";
import dashboard from "@/V2assets/dashboard.svg";
import chats from "@/V2assets/eventanalytics.svg";
import heplcenter from "@/assets/Headset.svg";
import faq from "@/assets/Question.svg";
import delaccnt from "../../../public/Deleteaccnt.svg";
import logout from "@/assets/logout.svg";
import Link from "next/link";
import { useAppDispatch } from "@/lib/hooks";
import { useRouter } from "next/navigation";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-poppins",
  display: "swap",
});

const drawerWidth = 300;

interface Props {
  window?: () => Window;
  children?: React.ReactNode;
}
interface GradientListItemProps {
  item: {
    url: string;
    text: string;
    icon: string;
  };
  activeItem: string | null;
}

const Analytics: React.FC<Props> = ({ window, children }) => {
    const isSmallScreen = useMediaQuery("(max-width:992px)");
    useEffect(() => {
      if (isSmallScreen) {
        setMobileOpen(false);
      }
    }, [isSmallScreen]);
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [isClosing, setIsClosing] = React.useState(false);
    const [activeItem, setActiveItem] = React.useState<string | null>(null);
  
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
  
    const handleItemClick = (itemText: string) => {
      setActiveItem(itemText);
      if (isSmallScreen) {
        handleDrawerClose(); 
      }
    };
  
    const menuItems = [
      { text: "Dashboard", icon: dashboard, url: "/side-drawer/dashboard" },
      {
        text: "Event Analytics",
        icon: chats,
        url: "/profile/LiveAccntSettings",
      },
    ];
  
    // const helpItems = [
    //   { text: "Help Center", icon: heplcenter, url: "/helpcenter" },
    //   { text: "FAQs", icon: faq, url: "/profile/FAQ" },
    // ];
  
    const DrawerHeader = styled("div")(({ theme }) => ({
      display: "flex",
      alignItems: "center",
      padding: theme.spacing(0, 1),
      ...theme.mixins.toolbar,
      justifyContent: "flex-end",
    }));
    const dispatch = useAppDispatch();
    const router = useRouter();
  
    const Logout = () => {
      localStorage.clear();
  
      dispatch({ type: "LOGOUT" });
      router.push("/");
    };
  
    const drawer = (
      <>
        <div className="px-[32px] bg-[black] overflow-y-auto scrollbar-hide">
          <List className="bg-[black] p-[0px] text-[white]">
            <div className="flex  lg:pt-[32px]  mb-[24px] items-center">
              {mobileOpen && (
                <Image
                  src={backwardicon}
                  alt="icon"
                  onClick={handleDrawerClose}
                />
              )}
              {/* <Link href="/profile/profile-main">
                <h3 className="text-[20px] ps-[6px] font-extrabold pt-[0px]">
                  Profile
                </h3>
              </Link> */}
            </div>
            <div>
              <h3 className="text-[#FFFFFF99] ps-[9px] text-sm font-extrabold mb-[11px]">
              ANALYTICS
              </h3>
              <div className="text-xl flex flex-col gap-[8px] font-bold">
                {menuItems.map((item) => (
                  <Link href={item.url} key={item.text}>
                    <ListItem
                      className={`text-sm font-normal ${
                        activeItem === item.text
                          ? "gradient-border rounded-lg"
                          : ""
                      }`}
                      disablePadding
                      onClick={() => handleItemClick(item.text)}
                    >
                      <ListItemButton>
                        <ListItemIcon
                          style={{ minWidth: "0pc" }}
                          className="pr-2"
                        >
                          <Image
                            src={item.icon}
                            alt={item.text}
                            width={16}
                            height={16}
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
          {/* <Divider />
          <List className="bg-[black] pt-[24px] pb-[0px] text-[white]">
            <h3 className="text-[#FFFFFF99] ps-[9px] text-sm font-bold mb-[8px]">
              SUPPORT
            </h3>
            <div className="text-xl font-bold">
              {helpItems.map((item) => (
                <Link href={item.url} key={item.text}>
                  <ListItem
                    className={`text-xl font-bold ${
                      activeItem === item.text ? "gradient-border rounded-lg" : ""
                    }`}
                    disablePadding
                    onClick={() => handleItemClick(item.text)}
                  >
                    <ListItemButton className=" flex items-center">
                      <ListItemIcon style={{ minWidth: "0pc" }} className=" pr-2">
                        <Image
                          src={item.icon}
                          alt={item.text}
                          width={16}
                          height={16}
                        />
                      </ListItemIcon>
                      <ListItemText primary={item.text} />
                    </ListItemButton>
                  </ListItem>
                </Link>
              ))}
            </div>
          </List>
          <List className="bg-[black] pt-[24px] pb-[0px] text-[white]">
            <h3 className="text-[#FFFFFF99] text-sm ps-[9px] font-bold mb-[8px]">
              ABOUT
            </h3>
            <Link href="/profile/Delete-account">
              <ListItem
                className={`text-xl font-bold ${
                  activeItem === "Delete Account"
                    ? "gradient-border rounded-lg"
                    : ""
                }`}
                disablePadding
                onClick={() => handleItemClick("Delete Account")}
              >
                <ListItemButton className="p-[10px]">
                  <ListItemIcon
                    style={{ minWidth: "0px" }}
                    className="min-w-0 pr-2"
                  >
                    <Image
                      src={delaccnt}
                      alt="Delete Account"
                      width={16}
                      height={16}
                    />
                  </ListItemIcon>
                  <ListItemText primary="Delete Account" />
                </ListItemButton>
              </ListItem>
            </Link>
          </List> */}
          <div className="mt-[180px] pb-[50px] md:mt-[230px]">
          <button
            className="text-[white] mb-[50px] hover:opacity-80 duration-300 md:me-[21px] 
            me-[32px] flex justify-center items-center text-[11px] md:text-base font-bold
             border border-[#FF1717] py-[10px] px-[25px] md:justify-center md:w-[205px] md:py-[14px] text-center rounded-[110px]"
            onClick={Logout}
          >
            <Image
              src={logout}
              className="w-[16px] md:w-[24px] me-[8px] md:me-[14px]"
              alt="img"
            />{" "}
            Log out
          </button>
        </div>
        </div>
      </>
    );
  
    const container =
      typeof window !== "undefined" ? window().document.body : null;
    const theme = useTheme();
    // const { window } = props;
    // const [mobileOpen, setMobileOpen] = React.useState(false);
    // const [isClosing, setIsClosing] = React.useState(false);
  
    // const handleDrawerClose = () => {
    //   setIsClosing(true);
    //   setMobileOpen(false);
    // };
  
    // const handleDrawerTransitionEnd = () => {
    //   setIsClosing(false);
    // };
  
    // const handleDrawerToggle = () => {
    //   if (!isClosing) {
    //     setMobileOpen(!mobileOpen);
    //   }
    // };
  
    // const drawer = (
    //   <div>
    //     <Toolbar />
    //     <Divider />
    //     <List>
    //       {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
    //         <ListItem key={text} disablePadding>
    //           <ListItemButton>
    //             <ListItemIcon>
    //               {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
    //             </ListItemIcon>
    //             <ListItemText primary={text} />
    //           </ListItemButton>
    //         </ListItem>
    //       ))}
    //     </List>
    //     <Divider />
    //     <List>
    //       {['All mail', 'Trash', 'Spam'].map((text, index) => (
    //         <ListItem key={text} disablePadding>
    //           <ListItemButton>
    //             <ListItemIcon>
    //               {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
    //             </ListItemIcon>
    //             <ListItemText primary={text} />
    //           </ListItemButton>
    //         </ListItem>
    //       ))}
    //     </List>
    //   </div>
    // );
  
    // // Remove this const when copying and pasting into your project.
    // const container = window !== undefined ? () => window().document.body : undefined;
  
    return (
        <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar
          position="fixed"
          sx={{
            background: "transparent",
            marginTop: "80px",
            boxShadow: "none",
            "& .MuiToolbar-root": {
              minHeight: isSmallScreen ? "56px" : "64px",
            },
          }}
        >
          <Toolbar
            sx={{
              "& .MuiToolbar-root": {
                minHeight: isSmallScreen ? "56px" : "64px",
              },
            }}
          >
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{
                mr: 2,
                display: { sm: "block", md: "block", lg: "none" },
                boxShadow: "none",
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h6"
              sx={{ background: "transparent" }}
              noWrap
              component="div"
            ></Typography>
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
            ModalProps={{ keepMounted: true }}
            sx={{
              display: { xs: "block", sm: "none" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
                background: "black",
                marginTop: "87px",
                position: "relative",
              },
              "& .MuiListItemButton-root": {
                paddingLeft: "0px",
                marginLeft: "9px",
              },
              "& .MuiTypography-root": {
                fontSize: "14px",
                fontWeight: "400",
              },
              "& .MuiListItemText-root": {
                marginBottom: "0px",
              },
            }}
          >
            {drawer}
          </Drawer>
          <Drawer
            variant="permanent"
            sx={{
              display: { xs: "none", sm: "block" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
                marginTop: "87px",
                backgroundColor: "black",
              },
              "& .MuiListItemButton-root": {
                marginLeft: "9px",
                paddingLeft: "0px",
              },
              "& .MuiTypography-root": {
                fontSize: "14px",
                fontFamily: "var(--font-base)",
              },
              "& .MuiListItemText-root": {
                marginBottom: "0px",
              },
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
          {children}
        </Box>
      </Box>
    );
}
export default Analytics;