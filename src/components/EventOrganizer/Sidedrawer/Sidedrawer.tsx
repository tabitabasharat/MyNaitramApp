"use client";
import * as React from "react";
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
} from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import backwardicon from "@/assets/Back - Button.svg";
import accnt from "@/assets/User Gear.svg";
import chats from "@/assets/Chats.svg";
import heplcenter from "@/assets/Headset.svg";
import faq from "@/assets/Question.svg";
import scanner from "@/assets/Scan.svg" 
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
const Sidedrawer: React.FC<Props> = ({ window, children }) => {
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

  const event = [
    { text: "Create Event", icon: chats, url: "/organizer-create-event" },
    { text: "Manage Event", icon: accnt, url: "/management" },
    { text: "Create Scanner Login", icon: scanner, url: "/organizer-event/event-dashboard" },
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
      <div className="ps-[24px] pe-[24px] bg-[black]">
        <List className="bg-[black] p-[0px] text-[white]">
          <Link href="/organizer-event/event-dashboard">
            <h3 className="text-[20px] font-bold pt-[0px] lg:pt-[32px]  mb-[24px]">
              Organizer
            </h3>
          </Link>
          <div>
            <List className="bg-[black] py-[0px] text-[white]">
              <h3 className="text-[#FFFFFF99] text-sm font-extrabold mt-[2px] mb-[10px]">
                {" "}
                PROFILE
              </h3>
              <Link href="/organizer-event/profile">
                <ListItem
                  className={`text-xl font-bold ${
                    activeItem === "Edit Organizer Profile"
                      ? "gradient-border rounded-lg"
                      : ""
                  }`}
                  disablePadding
                  onClick={() => handleItemClick("Edit Organizer Profile")}
                >
                  <ListItemButton className="p-[10px]">
                    <ListItemIcon className="min-w-0 pr-[6px]">
                      <Image
                        src={accnt}
                        alt="Delete Account"
                        width={16}
                        height={16}
                      />
                    </ListItemIcon>
                    <ListItemText primary="Edit Organizer Profile" />
                  </ListItemButton>
                </ListItem>
              </Link>
            </List>
          </div>
        </List>
        <Divider />
        <List className="bg-[black] pt-[24px] pb-[0px] text-[white]">
          <h3 className="text-[#FFFFFF99] text-sm font-extrabold mb-[10px]">
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
                    <ListItemIcon className="min-w-0 pr-[6px]">
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
          <h3 className="text-[#FFFFFF99] text-sm font-extrabold mb-[10px]">
            ANALYTICS/BILLING
          </h3>
          <Link href="/organizer-event/event-dashboard">
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
                <ListItemIcon className="min-w-0 pr-[6px]">
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
        <List className="bg-[black] pt-[24px] pb-[0px] text-[white]">
          <h3 className="text-[#FFFFFF99] text-sm font-extrabold mb-[10px]">HELP</h3>
          <Link href="/organizer-event/event-dashboard">
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
                <ListItemIcon className="min-w-0 pr-[6px]">
                  <Image
                    src={heplcenter}
                    alt="Delete Account"
                    width={16}
                    height={16}
                  />
                </ListItemIcon>
                <ListItemText primary="Help Center" />
              </ListItemButton>
            </ListItem>
          </Link>
        </List>
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
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
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
            sx={{ mr: 2, display: { sm: "none" }, boxShadow: "none" }}
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
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default Sidedrawer;
