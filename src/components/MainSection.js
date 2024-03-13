import React, { useState } from "react";
import {
  Box,
  TextField,
  InputAdornment,
  IconButton,
  Autocomplete,
  Divider,
  Grid,
} from "@mui/material";
import { useLocation } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";

const MainSection = (props) => {
  const {
    searchQuery,
    handleSearchQueryChange,
    setSelectedSource,
    selectedSource,
    selectedAuthor,
    setSelectedAuthor,
    authorOptions,
    setFromDate,
    handleSearch,
    setToDate,
    toDate,
    fromDate,
    articleType,
    selectedType,
    setSelectedType,
  } = props;

  const location = useLocation();
  const showAutocomplete = location.pathname === "/";

  const sourceData = [
    {
      label: "NewsAPI",
      value: "NewsAPI",
    },
    {
      label: "New york times",
      value: "New york times",
    },
    {
      label: "The guardian",
      value: "The guardian",
    },
  ];

  const handleFromDateChange = (date) => {
    const formattedDate = date ? dayjs(date).format("YYYY-MM-DD") : null;
    setFromDate(formattedDate);
  };

  const handleToDateChange = (date) => {
    const formattedDate = date ? dayjs(date).format("YYYY-MM-DD") : null;
    setToDate(formattedDate);
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={3}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Search..."
            value={searchQuery}
            onChange={handleSearchQueryChange}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleSearch}>
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid
          item
          xs={12}
          sm={6}
          md={3}
          sx={{
            display: showAutocomplete ? "block" : "none",
          }}
        >
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={sourceData}
            value={selectedSource}
            onChange={(event, newValue) => {
              if (newValue) setSelectedSource(newValue.value);
              else setSelectedSource();
            }}
            getOptionLabel={(option) => option.label}
            renderInput={(params) => <TextField {...params} label="Source" />}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={authorOptions || []}
            value={selectedAuthor}
            onChange={(event, newValue) => {
              if (newValue) setSelectedAuthor(newValue);
              else setSelectedAuthor();
            }}
            getOptionLabel={(option) => option.label}
            renderInput={(params) => <TextField {...params} label="Author" />}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={articleType}
            value={selectedType}
            onChange={(event, newValue) => {
              if (newValue) setSelectedType(newValue.value);
              else setSelectedType();
            }}
            getOptionLabel={(option) => option.label}
            renderInput={(params) => <TextField {...params} label="Category" />}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={5}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <DatePicker
                label="From Date"
                value={fromDate}
                onChange={handleFromDateChange}
                renderInput={(params) => <TextField {...params} />}
                inputFormat={(value) => dayjs(value).format("YYYY-MM-DD")}
              />
              <Divider width="15px">To</Divider>
              <DatePicker
                label="To Date"
                value={toDate}
                onChange={handleToDateChange}
                renderInput={(params) => <TextField {...params} />}
                inputFormat={(value) => dayjs(value).format("YYYY-MM-DD")}
              />
            </Box>
          </LocalizationProvider>
        </Grid>
      </Grid>
    </Box>
  );
};

export default MainSection;
