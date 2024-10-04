import * as React from "react";
import dayjs from "dayjs";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import styled from "styled-components";
import { useState } from "react";
import calendaricon from "@/assets/calender.svg";
import Image from "next/image";
import { useTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import { ThemeProvider, createTheme } from "@mui/material/styles";
const themeMui = createTheme({
  // typography: {
  //   fontFamily: '"ClashGrotesk"',
  // },
  components: {
    MuiDialog: {
      styleOverrides: {
        root: {
          color: "#ffffff", // Text color for the dialog root
        },
        paper: {
          backgroundColor: "#505050", // Dark background for the dialog
          color: "#ffffff", // Default text color
          borderRadius: "12px", // Rounded corners
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: "#505050", // Dark background for the dialog
          // width: "90%",
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          color: "#ffffff", // Default text color for Typography
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          // Default styles for all tabs
          color: "#ffffff", // Color for unselected tabs
        },
        selected: {
          color: "#1976d2", // Color for selected tab
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          color: "#ffffff", // Default text color for buttons
          backgroundColor: "transparent", // Default background color
          borderRadius: "8px", // Rounded corners
          "&:hover": {
            backgroundColor: "#155a8a", // Darker color on hover
          },
          "&.Mui-disabled": {
            backgroundColor: "#303f9f", // Color for disabled state
            color: "#a0a0a0", // Text color for disabled state
          },
        },
      },
    },
  },
});

const StyledDateTimePicker = styled(DateTimePicker)`
  & .MuiButton-root {
    // color: #8980f6;
    color: #ffffff;
  }
  & .MuiPaper-root {
    background-color: #eaea87;
    color: #ffffff;
  }
  &. MuiTypography-root {
    color: #ffffff;
  }
  //  & .MuiDialog-paper {
  //  background-color: #eaea87;
  //  }

  & .MuiIconButton-root {
    color: #808080;
    color: #ffffff;
  }

  & .MuiInputBase-root {
    border: 1px solid transparent;
    border-radius: 8px;

    background: linear-gradient(to top, #0f0f0f, #0f0f0f, #0f0f0f, #1a1a1a);
    color: #ffffff;
  }
  & input {
    color: #ffffff; /* Text color inside the input */
  }

  // & .MuiSvgIcon-root {
  //   color: #ff0000; /* Set your desired icon color here */
  // }
  & MuiPickersDay-root {
    color: #ffffff;
  }
  & MuiPickersDay-dayOutsideMonth {
    color: #ffffff;
  }
  & .MuiPickersDay-today {
    color: #ffffff;
    border-color: #ffffff;
  }
`;

export default function ResponsiveDateTimePickers() {
  const theme = useTheme();

  const [startTime, setStartTime] = useState<any>("");
  function MuiIcon() {
    return (
      <Image src={calendaricon} alt="Date picker opening icon" width={32} />
    );
  }

  return (
    <ThemeProvider theme={themeMui}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={["DateTimePicker"]}>
          <StyledDateTimePicker
            minDateTime={dayjs("2024-10-15T08:30")}
            onChange={(e) => {
              setStartTime(e);
              console.log("my start time new",e)
            }}
            slots={{ openPickerIcon: MuiIcon }}
            slotProps={{
              tabs: {
                hidden: false,
              },
              toolbar: {
                // color:"white",
                // Customize value display
                toolbarFormat: "YYYY",
                // Change what is displayed given an empty value
                // toolbarPlaceholder: '??',
                // Show the toolbar
                hidden: false,
              },
              calendarHeader: {
                sx: { color: "white" },
              },
            }}
          />
        </DemoContainer>
      </LocalizationProvider>
    </ThemeProvider>
  );
}
