"use client";
import * as React from "react";
import Image from "next/image";
import { AppBar, Box, CssBaseline, Divider, Drawer, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography } from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import backwardicon from "../../assets/Back - Button.svg";
import accnt from "../../assets/User Gear.svg";
import chats from "../../assets/Chats.svg";
import heplcenter from "../../assets/Headset.svg";
import faq from "../../assets/Question.svg";
import delaccnt from "../../../public/Deleteaccnt.svg";
import logout from "../../assets/logout.svg";
import Link from "next/link";

const drawerWidth = 240;

interface Props {
  window?: () => Window;
  children?: React.ReactNode;
}

const ProfileSideInfo: React.FC<Props> = ({ window, children }) => {
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
  };

  const menuItems = [
    { text: "Account Settings", icon: accnt, url: "/profile/account-settings" },
    { text: "Live Activity Settings", icon: chats, url: "/profile/LiveAccntSettings" },
  ];

  const helpItems = [
    { text: "Help Center", icon: heplcenter, url: "/profile/help-center" },
    { text: "FAQs", icon: faq, url: "/profile/FAQ" },
  ];

  const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  }));

  const drawer = (
    <>
      <div className="ps-[32px] bg-[black]">
        <List className="bg-[black] text-[white]">
          <Link href="/profile/profile-main">
            <h3 className="text-xl font-bold mb-[24px]">Profile</h3>
          </Link>
          <div>
            <h3 className="text-[#FFFFFF99] text-sm font-bold mb-[8px]">SETTINGS</h3>
            <div className="text-xl font-bold">
              {menuItems.map((item) => (
                <Link href={item.url} key={item.text}>
                  <ListItem
                    className={`text-xl font-bold ${activeItem === item.text ? "gradient-border rounded-lg" : ""}`}
                    disablePadding
                    onClick={() => handleItemClick(item.text)}
                  >
                    <ListItemButton className="p-[10px] flex items-center">
                      <ListItemIcon className="min-w-0 pr-2">
                        <Image src={item.icon} alt={item.text} width={24} height={24} />
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
          <h3 className="text-[#FFFFFF99] text-sm font-bold mb-[8px]">SUPPORT</h3>
          <div className="font-bold text-[24px]">
            {helpItems.map((item) => (
              <Link href={item.url} key={item.text}>
                <ListItem
                  className={`font-bold text-[24px] ${activeItem === item.text ? "border-[#13FF7A] border-[1px] rounded-[8px]" : ""}`}
                  disablePadding
                  onClick={() => handleItemClick(item.text)}
                >
                  <ListItemButton className="pt-[10px] flex items-center">
                    <ListItemIcon className="min-w-0 pe-[6px]">
                      <Image src={item.icon} alt={item.text} width={24} height={24} />
                    </ListItemIcon>
                    <ListItemText primary={item.text} className="font-bold text-[24px]" />
                  </ListItemButton>
                </ListItem>
              </Link>
            ))}
          </div>
        </List>
        <List className="bg-[black] pt-[34px] text-[white]">
          <h3 className="text-[#FFFFFF99] text-sm font-bold mb-[10px]">ABOUT</h3>
          <Link href="/profile/Delete-account">
            <ListItem
              className={`text-xl font-bold ${activeItem === "Delete Account" ? "border-[#13FF7A] border-[1px] rounded-[8px]" : ""}`}
              disablePadding
              onClick={() => handleItemClick("Delete Account")}
            >
              <ListItemButton className="p-[10px]">
                <ListItemIcon className="min-w-0 pr-2">
                  <Image src={delaccnt} alt="Delete Account" width={24} height={24} />
                </ListItemIcon>
                <ListItemText primary="Delete Account" className="text-sm" />
              </ListItemButton>
            </ListItem>
          </Link>
        </List>
      </div>
      <div className="">
        <button className="text-[white] mb-[31px] absolute bottom-[10%] mx-[21px] flex justify-center items-center text-[11px] md:text-base font-bold border border-[#FF1717] py-[14px] px-[20px] text-center rounded-[110px] w-[112px] md:w-[205px]">
          <Image src={logout} className="w-[16px] md:w-[24px] me-[8px] md:me-[14px]" /> Log out
        </button>
      </div>
    </>
  );

  const container = window !== undefined ? () => window().document.body : undefined;
  const theme = useTheme();

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          background: "transparent",
          marginTop: "115px",
          boxShadow: "none",
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" }, boxShadow: "none" }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" sx={{ background: "transparent" }} noWrap component="div"></Typography>
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
            "& .MuiTypography-root": {
              fontSize: "14px",
              fontWeight: "400",
            },
          }}
        >
          <DrawerHeader className="flex justify-start h-[30px] w-[30px] ps-[32px]">
            <IconButton className="p-0 h-[30px] w-[30px]" onClick={handleDrawerClose}>
              {theme.direction === "ltr" ? <Image src={backwardicon} /> : <ChevronRightIcon />}
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
              marginTop: "87px",
              backgroundColor: "black",
            },
            "& .MuiTypography-root": {
              fontSize: "14px",
              fontWeight: "400",
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
          width: '100%',
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default ProfileSideInfo;
