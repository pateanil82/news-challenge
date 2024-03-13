import React, { useEffect, useState } from "react";
import { Grid, Box } from "@mui/material";
import apiHandler from "../utils/apiHandler.js";
import { theGuardianInstance } from "../interceptors.js";
import MainSection from "./MainSection.js";
import newPlaceHolder from "../assets/news-placeholder.jpg";
import ArticleCard from "./common/ArticleCard.js";
import NoData from "./common/NoData.js";

const TheGuardianNews = () => {
  const [guardianApires, setGuardianApires] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSource, setSelectedSource] = useState();
  const [selectedAuthor, setSelectedAuthor] = useState();
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const callTheGuardianApi = apiHandler(theGuardianInstance);
  const [guardianApidata, setGuardianApidata] = useState([]);
  const [selectedType, setSelectedType] = useState();
  const [articleType, setArticleType] = useState([]);

  useEffect(() => {
    const queryParams = {
      q: "",
    };
    callTheGuardianApi(queryParams).then((res) => {
      setGuardianApires(res?.response?.results);
      setGuardianApidata(res?.response?.results);
      const guardianTypes = res?.response?.results.map((article) => ({
        label: article.type,
        value: article.type,
      }));
      const allArticleTypes = guardianTypes.map((type) => JSON.stringify(type));
      const uniqueArticleTypes = [...new Set(allArticleTypes)].map((type) =>
        JSON.parse(type)
      );
      setArticleType(uniqueArticleTypes);
    });
  }, []);

  useEffect(() => {
    if (searchQuery === "") {
      const queryParams = {
        q: searchQuery,
      };
      callTheGuardianApi(queryParams).then((res) =>
        setGuardianApires(res?.response?.results)
      );
    }
  }, [searchQuery]);

  const handleSearch = () => {
    if (searchQuery !== "") {
      const queryParams = {
        q: searchQuery,
        "from-date": fromDate,
        "to-date": toDate,
      };
      callTheGuardianApi(queryParams).then((res) =>
        setGuardianApires(res?.response?.results)
      );
    }
  };

  const fetchDataWithDateRange = () => {
    if (fromDate && toDate) {
      const queryParams = {
        q: searchQuery,
        "from-date": fromDate,
        "to-date": toDate,
      };

      callTheGuardianApi(queryParams).then((res) =>
        setGuardianApires(res?.response?.results)
      );
    }
  };

  useEffect(() => {
    fetchDataWithDateRange();
  }, [fromDate, toDate]);

  const handleSearchQueryChange = (event) => {
    setSearchQuery(event.target.value);
  };

  useEffect(() => {
    const filteredguardianApidata = guardianApires?.filter(
      (article) => article?.type === selectedType
    );
    setGuardianApires(
      filteredguardianApidata?.length > 0
        ? filteredguardianApidata
        : guardianApidata
    );
  }, [selectedType]);

  return (
    <>
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
            {guardianApires && guardianApires.length > 0 ? (
              guardianApires?.map((item, index) => (
                <Grid item xs={6} sm={4} md={4} key={index}>
                  <ArticleCard
                    webUrl={item?.webUrl}
                    publishedAt={item?.webPublicationDate}
                    urlToImage={newPlaceHolder}
                    webTitle={item?.webTitle}
                  />
                </Grid>
              ))
            ) : (
              <NoData />
            )}
          </Grid>
        </Box>
      </Box>
    </>
  );
};

export default TheGuardianNews;
