import React, { useEffect, useState } from "react";
import { Grid, Box } from "@mui/material";
import apiHandler from "../utils/apiHandler.js";
import { newsApiInstance } from "../interceptors.js";
import MainSection from "./MainSection.js";
import ArticleCard from "./common/ArticleCard.js";
import NoData from "./common/NoData.js";

const NewsOrg = () => {
  const [articles, setArticles] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSource, setSelectedSource] = useState();
  const [selectedAuthor, setSelectedAuthor] = useState();
  const [authorOptions, setAuthorOptions] = useState([]);
  const [newsAPIData, setNewsAPIData] = useState([]);
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [selectedType, setSelectedType] = useState();
  const [articleType, setArticleType] = useState([]);

  const callNewsApi = apiHandler(newsApiInstance);
  useEffect(() => {
    const queryParams = {
      q: "tesla",
    };
    callNewsApi(queryParams).then((res) => {
      setArticles(res?.articles);
      setNewsAPIData(res?.articles);
      const authors = res?.articles.map((result) => result.author);

      const uniqueAuthors = [...new Set(authors)];

      const authorOptions = uniqueAuthors.map((author) => ({
        label: author,
        value: author,
      }));
      setAuthorOptions(authorOptions);
    });
  }, []);

  useEffect(() => {
    if (searchQuery === "") {
      const queryParams = {
        q: "tesla",
      };
      callNewsApi(queryParams).then((res) => setArticles(res?.articles));
    }
  }, [searchQuery]);

  const handleSearch = () => {
    if (searchQuery !== "") {
      const queryParams = {
        q: searchQuery,
        "from-date": fromDate,
        "to-date": toDate,
      };
      callNewsApi(queryParams).then((res) => setArticles(res?.articles));
    }
  };

  const fetchDataWithDateRange = () => {
    if (fromDate && toDate) {
      const queryParams = {
        q: searchQuery,
        "from-date": fromDate,
        "to-date": toDate,
      };
      callNewsApi(queryParams).then((res) => setArticles(res?.articles));
    }
  };

  useEffect(() => {
    fetchDataWithDateRange();
  }, [fromDate, toDate]);

  const handleSearchQueryChange = (event) => {
    setSearchQuery(event.target.value);
  };

  useEffect(() => {
    const filteredNewsApi = newsAPIData?.filter(
      (article) => article.author === selectedAuthor?.value
    );
    setArticles(filteredNewsApi?.length > 0 ? filteredNewsApi : newsAPIData);
  }, [selectedAuthor]);

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
        <Box sx={{ flexGrow: 1 }}>
          <Grid
            container
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 4, sm: 8, md: 12 }}
          >
            {articles && articles.length > 0 ? (
              articles?.map((item, index) => (
                <Grid item xs={6} sm={4} md={4} key={index}>
                  <ArticleCard
                    webUrl={item?.url}
                    webDescription={item?.description}
                    publishedAt={item?.publishedAt}
                    urlToImage={item?.urlToImage}
                    webTitle={item?.title}
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

export default NewsOrg;
