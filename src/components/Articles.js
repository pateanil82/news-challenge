import React, { useEffect, useState } from "react";
import { Grid, Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import MainSection from "./MainSection.js";
import Skeleton from "@mui/material/Skeleton";
import {
  newsApiInstance,
  nyTimesApiInstance,
  theGuardianInstance,
} from "../interceptors.js";
import apiHandler from "../utils/apiHandler.js";
import newPlaceHolder from "../assets/news-placeholder.jpg";
import ArticleCard from "./common/ArticleCard.js";
import NoData from "./common/NoData.js";
import ViewMoreButton from "./common/ViewMoreButton.js";

const Articles = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSource, setSelectedSource] = useState();
  const [selectedAuthor, setSelectedAuthor] = useState();
  const [authorOptions, setAuthorOptions] = useState([]);
  const [newsAPIData, setNewsAPIData] = useState([]);
  const [guardianApidata, setGuardianApidata] = useState([]);
  const [nytimesData, setNytimesData] = useState([]);
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [preLoader, setPreLoader] = useState(true);
  const [selectedType, setSelectedType] = useState();
  const [articleType, setArticleType] = useState([]);
  const [searchResults, setSearchResults] = useState({
    newsApi: [],
    newYorkTimesApi: [],
    guardianApi: [],
  });

  const callNyTimesApi = apiHandler(nyTimesApiInstance);
  const callTheGuardianApi = apiHandler(theGuardianInstance);
  const callNewsApi = apiHandler(newsApiInstance);

  useEffect(() => {
    const queryParams = {
      q: "tesla",
    };

    Promise.all([
      callTheGuardianApi(queryParams),
      callNyTimesApi(queryParams),
      callNewsApi(queryParams),
    ])
      .then(([guardianRes, nyTimesRes, newsApiRes]) => {
        // Process The Guardian articles
        setSearchResults((prevSearchResults) => ({
          ...prevSearchResults,
          guardianApi: guardianRes?.response?.results,
        }));
        setGuardianApidata(guardianRes?.response?.results);
        const guardianTypes = guardianRes?.response?.results.map((article) => ({
          label: article.type,
          value: article.type,
        }));

        // Process New York Times articles
        setSearchResults((prevSearchResults) => ({
          ...prevSearchResults,
          newYorkTimesApi: nyTimesRes?.response?.docs,
        }));
        setNytimesData(nyTimesRes?.response?.docs);

        // Process NewsAPI articles
        setSearchResults((prevSearchResults) => ({
          ...prevSearchResults,
          newsApi: newsApiRes?.articles,
        }));
        const authors = newsApiRes?.articles.map((result) => result.author);
        const uniqueAuthors = [...new Set(authors)];
        const authorOptions = uniqueAuthors.map((author) => ({
          label: author,
          value: author,
        }));
        setAuthorOptions(authorOptions);
        setNewsAPIData(newsApiRes?.articles);

        const nyTimesTypes = (nyTimesRes?.response?.docs || []).map(
          (article) => ({
            label: article?.document_type,
            value: article?.document_type,
          })
        );

        const allArticleTypes = [...nyTimesTypes, ...guardianTypes].map(
          (type) => JSON.stringify(type)
        );
        const uniqueArticleTypes = [...new Set(allArticleTypes)].map((type) =>
          JSON.parse(type)
        );

        setArticleType(uniqueArticleTypes);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      })
      .finally(() => {
        setPreLoader(false);
      });
  }, []);

  useEffect(() => {
    if (searchQuery === "") {
      const queryParams = {
        q: "",
      };
      callTheGuardianApi({
        q: "tesla",
      }).then((res) => {
        setSearchResults((prevSearchResults) => ({
          ...prevSearchResults,
          guardianApi: res?.response?.results,
        }));
      });
      callNyTimesApi(queryParams).then((res) => {
        setSearchResults((prevSearchResults) => ({
          ...prevSearchResults,
          newYorkTimesApi: res?.response?.docs,
        }));
      });
      callNewsApi(queryParams).then((res) =>
        setSearchResults((prevSearchResults) => ({
          ...prevSearchResults,
          newsApi: res?.articles,
        }))
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
        setSearchResults((prevSearchResults) => ({
          ...prevSearchResults,
          guardianApi: res?.response?.results,
        }))
      );
      callNyTimesApi(queryParams).then((res) =>
        setSearchResults((prevSearchResults) => ({
          ...prevSearchResults,
          newYorkTimesApi: res?.response?.docs,
        }))
      );
      callNewsApi(queryParams).then((res) =>
        setSearchResults((prevSearchResults) => ({
          ...prevSearchResults,
          newsApi: res?.articles,
        }))
      );
    }
  };

  const handleViewMore = () => {
    navigate("/newsall");
  };
  const handleViewNYnews = () => {
    navigate("/nynewsall");
  };
  const handleguardianNews = () => {
    navigate("/guardiannews");
  };

  const handleSearchQueryChange = (event) => {
    setSearchQuery(event.target.value);
  };

  useEffect(() => {
    const filteredNewsApi = newsAPIData?.filter(
      (article) => article?.author === selectedAuthor?.value
    );
    setSearchResults((prevSearchResults) => ({
      ...prevSearchResults,
      newsApi: filteredNewsApi?.length > 0 ? filteredNewsApi : newsAPIData,
    }));
  }, [selectedAuthor]);

  const fetchDataWithDateRange = () => {
    if (fromDate && toDate) {
      const queryParams = {
        q: searchQuery,
        "from-date": fromDate,
        "to-date": toDate,
      };

      callTheGuardianApi(queryParams).then((res) =>
        setSearchResults((prevSearchResults) => ({
          ...prevSearchResults,
          guardianApi: res?.response?.results,
        }))
      );
      callNyTimesApi(queryParams).then((res) =>
        setSearchResults((prevSearchResults) => ({
          ...prevSearchResults,
          newYorkTimesApi: res?.response?.docs,
        }))
      );
      callNewsApi(queryParams).then((res) =>
        setSearchResults((prevSearchResults) => ({
          ...prevSearchResults,
          newsApi: res?.articles,
        }))
      );
    }
  };

  useEffect(() => {
    fetchDataWithDateRange();
  }, [fromDate, toDate]);

  useEffect(() => {
    const filteredguardianApidata = searchResults?.guardianApi?.filter(
      (article) => article?.type === selectedType
    );

    const filteredNyApidata = searchResults?.newYorkTimesApi?.filter(
      (article) => article?.document_type === selectedType
    );

    setSearchResults((prevSearchResults) => ({
      ...prevSearchResults,
      guardianApi:
        filteredguardianApidata?.length > 0
          ? filteredguardianApidata
          : guardianApidata,
      newYorkTimesApi:
        filteredNyApidata?.length > 0 ? filteredNyApidata : nytimesData,
    }));
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
        authorOptions={authorOptions}
        fromDate={fromDate}
        setFromDate={setFromDate}
        toDate={toDate}
        setToDate={setToDate}
        handleSearch={handleSearch}
        articleType={articleType}
        setSelectedType={setSelectedType}
        selectedType={selectedType}
      />
      <Box my={3}>
        {preLoader ? (
          <Grid container spacing={{ xs: 2, md: 3 }}>
            {[...Array(4)].map((_, index) => (
              <Grid item xs={2} sm={4} md={3} key={index}>
                <Skeleton variant="rectangular" width="100%" height={120} />
                <Box sx={{ minHeight: "50px" }}>
                  <Typography sx={{ fontSize: "18px", fontWeight: 700, mt: 2 }}>
                    <Skeleton />
                  </Typography>
                </Box>
                <Box sx={{ minHeight: "80px" }}>
                  <Skeleton />
                </Box>
                <Box sx={{ display: "flex", alignItems: "end" }}></Box>
              </Grid>
            ))}
          </Grid>
        ) : (
          <>
            {(selectedSource === undefined || selectedSource === "NewsAPI") && (
              <Box>
                <Box>
                  <Typography variant="h4" fontWeight={600}>
                    NewsAPI
                  </Typography>
                </Box>
                <Box sx={{ flexGrow: 1, py: 3 }}>
                  <Grid
                    container
                    spacing={{ xs: 2, md: 3 }}
                    columns={{ xs: 4, sm: 8, md: 12 }}
                  >
                    {searchResults?.newsApi &&
                    searchResults?.newsApi?.length > 0 ? (
                      searchResults?.newsApi?.map(
                        (item, index) =>
                          index < 4 && (
                            <Grid item xs={2} sm={4} md={3} key={index}>
                              <ArticleCard
                                webUrl={item?.url}
                                webDescription={item?.description}
                                publishedAt={item?.publishedAt}
                                urlToImage={item?.urlToImage}
                                webTitle={item?.title}
                              />
                            </Grid>
                          )
                      )
                    ) : (
                      <NoData />
                    )}
                  </Grid>
                  {searchResults?.newsApi?.length > 0 && (
                    <ViewMoreButton handleViewMore={handleViewMore} />
                  )}
                </Box>
              </Box>
            )}
            {(selectedSource === undefined ||
              selectedSource === "New york times") && (
              <Box>
                <Box>
                  <Typography variant="h4" fontWeight={600}>
                    New york times
                  </Typography>
                </Box>
                <Box sx={{ flexGrow: 1, py: 3 }}>
                  <Grid
                    container
                    spacing={{ xs: 2, md: 3 }}
                    columns={{ xs: 4, sm: 8, md: 12 }}
                  >
                    {searchResults?.newYorkTimesApi &&
                    searchResults?.newYorkTimesApi.length > 0 ? (
                      searchResults?.newYorkTimesApi?.map(
                        (item, index) =>
                          index < 4 && (
                            <Grid item xs={2} sm={4} md={3} key={index}>
                              <ArticleCard
                                webUrl={item?.web_url}
                                webDescription={item?.lead_paragraph}
                                publishedAt={item?.pub_date}
                                urlToImage={newPlaceHolder}
                                webTitle={item?.abstract}
                              />
                            </Grid>
                          )
                      )
                    ) : (
                      <NoData />
                    )}
                  </Grid>
                  {searchResults?.newYorkTimesApi?.length > 0 && (
                    <ViewMoreButton handleViewMore={handleViewNYnews} />
                  )}
                </Box>
              </Box>
            )}
            {(selectedSource === undefined ||
              selectedSource === "The guardian") && (
              <Box>
                <Box>
                  <Typography variant="h4" fontWeight={600}>
                    The guardian
                  </Typography>
                </Box>
                <Box sx={{ flexGrow: 1, py: 3 }}>
                  <Grid
                    container
                    spacing={{ xs: 2, md: 3 }}
                    columns={{ xs: 4, sm: 8, md: 12 }}
                  >
                    {searchResults?.guardianApi &&
                    searchResults?.guardianApi.length > 0 ? (
                      searchResults?.guardianApi?.map(
                        (item, index) =>
                          index < 4 && (
                            <Grid item xs={2} sm={4} md={3} key={index}>
                              <ArticleCard
                                webUrl={item?.webUrl}
                                publishedAt={item?.webPublicationDate}
                                urlToImage={newPlaceHolder}
                                webTitle={item?.webTitle}
                              />
                            </Grid>
                          )
                      )
                    ) : (
                      <NoData />
                    )}
                  </Grid>
                  <Box mt={3}>
                    {searchResults?.guardianApi?.length > 0 && (
                      <ViewMoreButton handleViewMore={handleguardianNews} />
                    )}
                  </Box>
                </Box>
              </Box>
            )}
          </>
        )}
      </Box>
    </>
  );
};

export default Articles;
