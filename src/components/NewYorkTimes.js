import React, { useEffect, useState } from "react";
import { Grid, Box } from "@mui/material";
import "keen-slider/keen-slider.min.css";
import { useNavigate } from "react-router-dom";
import MainSection from "./MainSection.js";
import apiHandler from "../utils/apiHandler.js";
import newPlaceHolder from "../assets/news-placeholder.jpg";
import ArticleCard from "./common/ArticleCard.js";
import NoData from "./common/NoData.js";

import { nyTimesApiInstance } from "../interceptors.js";

const NewYorkTimes = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSource, setSelectedSource] = useState();
  const [selectedAuthor, setSelectedAuthor] = useState();
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [newYorkTimesApiRes, setNewYorkTimesApiRes] = useState([]);
  const [newYorkTimesApi, setNewYorkTimesApi] = useState([]);
  const [selectedType, setSelectedType] = useState();
  const [articleType, setArticleType] = useState([]);
  const callNyTimesApi = apiHandler(nyTimesApiInstance);

  const handleSearchQueryChange = (event) => {
    setSearchQuery(event.target.value);
  };
  const handleSearch = () => {
    if (searchQuery !== "") {
      const queryParams = {
        q: searchQuery,
        "from-date": fromDate,
        "to-date": toDate,
      };

      callNyTimesApi(queryParams).then((res) => {
        setNewYorkTimesApiRes(res?.response?.docs);
        setNewYorkTimesApi(res?.response?.docs);
      });
    }
  };

  useEffect(() => {
    const filteredNyApidata = newYorkTimesApi?.filter(
      (article) => article?.document_type === selectedType
    );
    setNewYorkTimesApiRes(
      filteredNyApidata?.length > 0 ? filteredNyApidata : newYorkTimesApi
    );
  }, [selectedType]);

  useEffect(() => {
    const queryParams = {
      q: "",
    };
    callNyTimesApi(queryParams).then((res) => {
      setNewYorkTimesApiRes(res?.response?.docs);
      setNewYorkTimesApi(res?.response?.docs);
      const nyTimesTypes =
        res?.response?.docs?.map((article) => ({
          label: article.document_type,
          value: article.document_type,
        })) || [];
      const allArticleTypes = nyTimesTypes?.map((type) => JSON.stringify(type));
      const uniqueArticleTypes = [...new Set(allArticleTypes)]?.map((type) =>
        JSON.parse(type)
      );
      setArticleType(uniqueArticleTypes);
    });
  }, []);

  const fetchDataWithDateRange = () => {
    if (fromDate && toDate) {
      const queryParams = {
        q: searchQuery,
        "from-date": fromDate,
        "to-date": toDate,
      };
      callNyTimesApi(queryParams).then((res) =>
        setNewYorkTimesApiRes(res?.response?.docs)
      );
    }
  };

  useEffect(() => {
    fetchDataWithDateRange();
  }, [fromDate, toDate]);

  return (
    <>
      {/* <Container> */}
      <MainSection
        searchQuery={searchQuery}
        handleSearchQueryChange={handleSearchQueryChange}
        setSelectedSource={setSelectedSource}
        selectedSource={selectedSource}
        setSelectedAuthor={setSelectedAuthor}
        selectedAuthor={selectedAuthor}
        fromDate={fromDate}
        setFromDate={setFromDate}
        toDate={toDate}
        setToDate={setToDate}
        handleSearch={handleSearch}
        articleType={articleType}
        setSelectedType={setSelectedType}
        selectedType={selectedType}
        setArticleType={setArticleType}
      />

      <Box mt={3}>
        <Box sx={{ flexGrow: 1 }}>
          <Grid
            container
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 4, sm: 8, md: 12 }}
          >
            {newYorkTimesApiRes && newYorkTimesApiRes.length > 0 ? (
              newYorkTimesApiRes?.map((item, index) => (
                <Grid item xs={6} sm={4} md={4} key={index}>
                  <ArticleCard
                    webUrl={item?.web_url}
                    webDescription={item?.lead_paragraph}
                    publishedAt={item?.pub_date}
                    urlToImage={newPlaceHolder}
                    webTitle={item?.abstract}
                  />
                </Grid>
              ))
            ) : (
              <NoData />
            )}
          </Grid>
        </Box>
      </Box>
      {/* </Container> */}
    </>
  );
};

export default NewYorkTimes;
