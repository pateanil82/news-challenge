import React from "react";
import { Box, Typography } from "@mui/material";

const NoData = () => {
  return (
    <Box mt={3} width="100%">
      <Typography
        sx={{
          textAlign: "center",
        }}
      >
        No data available
      </Typography>
    </Box>
  );
};

export default NoData;
