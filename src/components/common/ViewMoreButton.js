import React from "react";
import { Box, Button } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const ViewMoreButton = ({ handleViewMore }) => {
  return (
    <Box mt={3}>
      <Button
        variant="outlined"
        sx={{
          borderRadius: "15px",
          textTransform: "capitalize",
          float: "right",
          color: "#051550",
          border: "1px solid #051550",
          svg: {
            fontSize: "15px !important",
          },
        }}
        endIcon={<ArrowForwardIosIcon />}
        onClick={handleViewMore}
      >
        View More
      </Button>
    </Box>
  );
};

export default ViewMoreButton;
