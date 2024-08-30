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
import backwardicon from "../../assets/Back - Button.svg";
import accnt from "../../assets/User Gear.svg";
import chats from "../../assets/Chats.svg";
import heplcenter from "../../assets/Headset.svg";
import faq from "../../assets/Question.svg";
import delaccnt from "../../../public/Deleteaccnt.svg";
import logout from "../../assets/logout.svg";
import Link from "next/link";
import { useAppDispatch } from "@/lib/hooks";
import { useRouter } from "next/navigation";

const drawerWidth = 247;

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
const ProfileSideInfo: React.FC<Props> = ({ window, children }) => {
  const isSmallScreen = useMediaQuery("(max-width:992px)");
  useEffect(() => {
    if (isSmallScreen) {
      setMobileOpen(false);
    }
  }, [isSmallScreen]);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);
  const [activeItem, setActiveItem] = React.useState<string | null>(null);
  // const isActive = activeItem === item.text;

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

  const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    // minHeight:isSmallScreen ? "56px" : "64px",
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
      <div className="ps-[32px] pe-[24px] bg-[black]">
        <List className="bg-[black] p-[0px] text-[white]">
          <Link href="/profile/profile-main">
            <h3 className="text-[20px] font-extrabold pt-[0px] lg:pt-[32px]  mb-[24px]">
              Profile
            </h3>
          </Link>
          <div>
            <h3 className="text-[#FFFFFF99] text-sm font-extrabold mb-[8px]">
              SETTINGS
            </h3>
            <div className="text-xl font-bold">
              {menuItems.map((item) => (
                <Link href={item.url} key={item.text}>
                  <ListItem
                    className={`text-xl font-bold ${
                      activeItem === item.text
                        ? "gradient-border rounded-lg"
                        : ""
                    }`}
                    // style={{
                    //   background:
                    //     "linear-gradient(#0F0F0F, #1A1A1A)   padding-box,linear-gradient(272.78deg, rgba(15, 255, 119, 0.32) 0%, rgba(255, 255, 255, 0.06) 50%, rgba(15, 255, 119, 0.32) 100%) border-box",
                    // }}
                    // className={`text-xl font-bold  bg-transparent ${
                    //   activeItem === item.text
                    //     ? "rounded-[8px] border-[1px]  border-transparent "
                    //     : ""
                    // }`}
                    disablePadding
                    onClick={() => handleItemClick(item.text)}
                  >
                    {/* <div style={{background:" linear-gradient(#fff, #fff) padding-box,linear-gradient(90deg, #0B6719 0%, #2AD72D 100%) border-box;",padding:"1px 2px"}}> */}
                    <ListItemButton
                    // style={{background:"black"}}
                    >
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

                    {/* </div> */}
                  </ListItem>
                </Link>
              ))}
            </div>
          </div>
        </List>
        <Divider />
        <List className="bg-[black] pt-[24px] pb-[0px] text-[white]">
          <h3 className="text-[#FFFFFF99] text-sm font-bold mb-[8px]">
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
                  <ListItemButton className="p-[10px] flex items-center">
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
          <h3 className="text-[#FFFFFF99] text-sm font-bold mb-[8px]">ABOUT</h3>
          <Link href="/profile/Delete-account">
            <ListItem
              // className={`text-xl font-bold ${
              //   activeItem === "Delete Account"
              //     ? "border-[#13FF7A] border-[1px] rounded-[8px]"
              //     : ""
              // }`}
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
        </List>
      </div>
      <div className="">
        <button
          className="text-[white] mb-[32px] md:mx-[21px] absolute bottom-[10%] mx-[32px] flex justify-center items-center text-[11px] md:text-base font-bold border border-[#FF1717] py-[10px] px-[25px] md:justify-center md:w-[205px] md:py-[14px] text-center rounded-[110px]"
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
    </>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;
  const theme = useTheme();

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          // width: { sm: `calc(100% - ${drawerWidth}px)` },
          // ml: { sm: `${drawerWidth}px` },
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
            // sx={{ mr: 2, display: { sm: "none" }, boxShadow: "none" }}
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
        {isSmallScreen ? (
          <Drawer
            container={container}
            variant="temporary"
            open={mobileOpen}
            onTransitionEnd={handleDrawerTransitionEnd}
            onClose={handleDrawerClose}
            ModalProps={{ keepMounted: true }}
            sx={{
              // display: { xs: "block", sm: "none" },
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
              <IconButton
                className="p-0 h-[30px] w-[30px]"
                onClick={handleDrawerClose}
              >
                {theme.direction === "ltr" ? (
                  <Image src={backwardicon} alt="icon" />
                ) : (
                  <ChevronRightIcon />
                )}
              </IconButton>
            </DrawerHeader>
            {drawer}
          </Drawer>
        ) : (
          <Drawer
            variant="permanent"
            sx={{
              // display: { xs: "none", sm: "block" },
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
        )}
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
};

export default ProfileSideInfo;
