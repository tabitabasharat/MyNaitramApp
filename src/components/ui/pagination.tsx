import * as React from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

export default function PaginationRounded() {
  return (
    <div className="bg-[red]">
      <Stack spacing={2}>
        <Pagination
          sx={{
            "& .MuiPaginationItem-root": {
              color: "white", // Set text color to white
            },
            "& .MuiPaginationItem-root.Mui-selected": {
              backgroundColor: "red", // Customize selected background color
              color: "red", // Change selected text color
            },
            "& .MuiPaginationItem-ellipsis": {
              color: "white", // Set ellipsis (dots) to white
            },
          }}
          count={10}
          variant="outlined"
          shape="rounded"
        />
      </Stack>
    </div>
  );
}
