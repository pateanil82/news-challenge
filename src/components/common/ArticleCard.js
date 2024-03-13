import React from "react";
import { Box, Typography } from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import {
  formatPublishedAt,
  truncateDescription,
  truncateTitle,
} from "../../utils";

const ArticleCard = (props) => {
  const { webUrl, webDescription, publishedAt, webTitle, urlToImage } = props;
  return (
    <a href={webUrl} target="_blank" rel="noopener noreferrer">
      <Box
        sx={{
          backgroundColor: "#fff",
          boxShadow: "0 0 15px #00000014",
          display: "flex",
          flexDirection: "column",
          borderRadius: "0.375rem",
        }}
      >
        <Box p={1}>
          <Box
            component={"img"}
            src={urlToImage}
            height={"150px"}
            width={"100%"}
            sx={{
              borderRadius: "15px",
            }}
          />
          <Box
            sx={{
              minHeight: "50px",
              padding: "20px",
            }}
          >
            <Typography
              sx={{
                fontSize: "18px",
                fontWeight: 700,
                mt: 2,
              }}
            >
              {truncateTitle(webTitle)}
            </Typography>
          </Box>
          {webDescription && (
            <Box
              sx={{
                minHeight: "80px",
                padding: "20px",
              }}
            >
              <p>{truncateDescription(webDescription)}</p>
            </Box>
          )}
          <Box
            sx={{
              display: "flex",
              alignItems: "end",
              padding: "10px",
            }}
          >
            <Box
              component={"span"}
              sx={{
                color: "rgba(0, 0, 0, 0.6)",
                svg: {
                  fontSize: "10px",
                },
              }}
            >
              <AccessTimeIcon />
            </Box>{" "}
            <Typography
              variant="subtitle2"
              color="text.secondary"
              sx={{
                fontSize: "10px",
                ml: 0.5,
              }}
            >
              {formatPublishedAt(publishedAt)}
            </Typography>
          </Box>
        </Box>
      </Box>
    </a>
  );
};

export default ArticleCard;
