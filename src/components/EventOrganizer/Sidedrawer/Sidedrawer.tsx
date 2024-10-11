"use client";
import * as React from "react";
import { useState, useEffect } from "react";
import Image from "next/image";
import {
  AppBar,
  Box,
  CssBaseline,
  Divider,
  IconButton,
  List,
  ListItem,
  Drawer,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  useMediaQuery,
} from "@mui/material";
import logout from "@/assets/logout.svg";
import sponser from "@/assets/sponser.svg";
import { styled, useTheme } from "@mui/material/styles";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import backwardicon from "@/assets/Back - Button.svg";
import accnt from "@/assets/User Gear.svg";
import chats from "@/assets/Chats.svg";
import heplcenter from "@/assets/Headset.svg";
import faq from "@/assets/Question.svg";
import scanner from "@/assets/Scan.svg";
import history from "@/assets/empty-wallet-time.svg";
import money from "@/assets/Money.svg";
import paydetail from "@/assets/receipt-text.svg";
import Link from "next/link";
import { useAppDispatch } from "@/lib/hooks";
import { useRouter } from "next/navigation";
// import { Poppins } from "next/font/google";

// const poppins = Poppins({
//   subsets: ["latin"], // Specify the subsets you need
//   weight: ["400", "700"], // Specify the weights you need
//   variable: "--font-poppins",
//   display: "swap",
// });

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
const Sidedrawer: React.FC<Props> = ({ window, children }) => {
  const container =
    typeof window !== "undefined" ? window().document.body : null;

  const theme = useTheme();

  // Use media query hook
  const isSmallScreen = useMediaQuery("(max-width:992px)");
  const drawerWidth = 273;
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
      handleDrawerClose()
    }
  };

  const event = [
    { text: "Host Event", icon: chats, url: "/organizer-event/launch-event" },
    { text: "Manage Event", icon: accnt, url: "/management" },
    {
      text: "Create Scanner Login",
      icon: scanner,
      url: "/organizer-event/sacnner-login",
    },
  ];
  const help = [
    {
      text: "Get Sponsored",
      icon: sponser,
      url: "/get-sponsor",
    },
    {
      text: "Help Center",
      icon: heplcenter,
      url: "/organizer-event/helpcenter",
    },
  ];
  const payments = [
    { text: "Get Paid", icon: money, url: "/organizer-event/get-paid" },
    {
      text: "Payout Details",
      icon: paydetail,
      url: "/organizer-event/payout-detail",
    },
    {
      text: "Payout History",
      icon: history,
      url: "/organizer-event/payout-history",
    },
  ];

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
      <div className="ps-[24px] pe-[24px] bg-[black] scrolling-issue overflow-y-auto scrollbar-hide">
        <List className="bg-[black] p-[0px] text-[white]">
          <div className="flex justify-left items-center  mb-[24px] lg:pt-[32px]">
            {mobileOpen && (
              <Image
                src={backwardicon}
                alt="icon"
                onClick={handleDrawerClose}
              />
            )}
            <Link href="/organizer-event/event-dashboard">
              <h3 className="text-[20px] ps-[6px] font-bold pt-[0px]  ">
                Organiser
              </h3>
            </Link>
          </div>

          {/* <DrawerHeader className="flex justify-start h-[30px] w-[30px] ps-[32px]">
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
          </DrawerHeader> */}
          <div>
            <List className="bg-[black] py-[0px] text-[white]">
              <h3 className="text-[#FFFFFF99] ps-[9px] text-sm font-extrabold mt-[2px] mb-[10px]">
                {" "}
                PROFILE
              </h3>
              <Link href="/organizer-event/profile">
                <ListItem
                  className={`text-xl font-bold ${
                    activeItem === "Edit Organiser Profile"
                      ? "gradient-border rounded-lg"
                      : ""
                  }`}
                  disablePadding
                  onClick={() => handleItemClick("Edit Organiser Profile")}
                >
                  <ListItemButton className="p-[10px]">
                    <ListItemIcon
                      style={{ minWidth: "0px" }}
                      className=" pr-[6px]"
                    >
                      <Image
                        src={accnt}
                        alt="Delete Account"
                        width={16}
                        height={16}
                      />
                    </ListItemIcon>
                    <ListItemText primary="Edit Organiser Profile" />
                  </ListItemButton>
                </ListItem>
              </Link>
            </List>
          </div>
        </List>
        <Divider />
        <List className="bg-[black] pt-[24px] pb-[0px] text-[white]">
          <h3 className="text-[#FFFFFF99] ps-[9px] text-sm font-extrabold mb-[10px]">
            EVENTS
          </h3>
          <div className="text-xl font-bold">
            {event.map((item) => (
              <Link href={item.url} key={item.text}>
                <ListItem
                  className={`text-xl font-bold ${
                    activeItem === item.text ? "gradient-border rounded-lg" : ""
                  }`}
                  disablePadding
                  onClick={() => handleItemClick(item.text)}
                >
                  <ListItemButton className="p-[10px] flex items-center">
                    <ListItemIcon
                      style={{ minWidth: "0px" }}
                      className="pr-[6px]"
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
        </List>
        <List className="bg-[black] pt-[24px] pb-[0px] text-[white]">
          <h3 className="text-[#FFFFFF99] ps-[9px] text-sm font-extrabold mb-[10px]">
            PAYMENTS
          </h3>
          <div className="text-xl font-bold">
            {payments.map((item) => (
              <Link href={item.url} key={item.text}>
                <ListItem
                  className={`text-xl font-bold ${
                    activeItem === item.text ? "gradient-border rounded-lg" : ""
                  }`}
                  disablePadding
                  onClick={() => handleItemClick(item.text)}
                >
                  <ListItemButton className="p-[10px] flex items-center">
                    <ListItemIcon
                      style={{ minWidth: "0px" }}
                      className="pr-[6px]"
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
        </List>
        <List className="bg-[black] pt-[24px] pb-[0px] text-[white]">
          <h3 className="text-[#FFFFFF99] ps-[9px] text-sm font-extrabold mb-[10px]">
            ANALYTICS
          </h3>
          <Link href="/salesmanage">
            <ListItem
              className={`text-xl font-bold ${
                activeItem === "Event Analytics"
                  ? "gradient-border rounded-lg"
                  : ""
              }`}
              disablePadding
              onClick={() => handleItemClick("Event Analytics")}
            >
              <ListItemButton className="p-[10px]">
                <ListItemIcon style={{ minWidth: "0px" }} className=" pr-[6px]">
                  <Image
                    src={faq}
                    alt="Delete Account"
                    width={16}
                    height={16}
                  />
                </ListItemIcon>
                <ListItemText primary="Event Analytics" />
              </ListItemButton>
            </ListItem>
          </Link>
        </List>
        <List className="bg-[black] pt-[24px] h-[18%] md:h-[20%] lg:h-[25%] pb-[0px] text-[white]">
          <h3 className="text-[#FFFFFF99] ps-[9px] text-sm font-extrabold mb-[10px]">
            HELP
          </h3>
          {help.map((item) => (
            <Link href={item.url} key={item.text}>
              <ListItem
                className={`text-xl font-bold ${
                  activeItem === item.text ? "gradient-border rounded-lg" : ""
                }`}
                disablePadding
                onClick={() => handleItemClick(item.text)}
              >
                <ListItemButton className="p-[10px]">
                  <ListItemIcon
                    style={{ minWidth: "0px" }}
                    className="pr-[6px]"
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
        </List>
        <div className="mt-[30px] pb-[50px] md:mt-[60px] xl:mt-[40px]">
        <button
          className="text-[white] hover:opacity-80 duration-300 mb-[50px] md:me-[21px] me-[32px] flex justify-center items-center text-[11px] md:text-base font-bold border border-[#FF1717] py-[10px] px-[25px] md:justify-center md:w-[205px] md:py-[14px] text-center rounded-[110px]"
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

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          // width: { sm: `calc(100% - ${drawerWidth}px)` },
          // ml: { sm: `${drawerWidth}px` },

          // ml: { xs: 0, sm: `${drawerWidth}px`, md: 0 },
          background: "transparent",
          marginTop: "80px",
          boxShadow: "none",
        }}
      >
        <Toolbar>
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
            flexShrink: 0,
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              background: "black",
              marginTop: "87px",
              position: "relative",
              overflowY: "auto",
            },
            "& .MuiTypography-root": {
              fontSize: "14px",
              fontWeight: "400",
            },
            "& .MuiListItemButton-root": {
              paddingLeft: "0px",
              marginLeft: "10px",
            },
            "& .MuiListItemText-root": {
              marginBottom: "0px",
              // fontWeight: "400",
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          // className="Poppins"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              marginTop: "87px",
              backgroundColor: "black",
            },
            "& .MuiListItemButton-root": {
              paddingLeft: "0px",
              marginLeft: "10px",
            },
            "& .MuiTypography-root": {
              fontSize: "14px",
              fontWeight: "400",
              fontFamily: "var(--font-base)",
            },
            "& .MuiListItemText-root": {
              marginBottom: "0px",
              // fontWeight: "400",
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
};

export default Sidedrawer;
