import axios from 'axios';

// Function to create Axios instances
const NYAPIKey = process.env.REACT_APP_NY_API_KEY;
const guardianAPI = process.env.REACT_APP_GUARDIAN_API_KEY;
const  newsAPI = process.env.REACT_APP_NEWS_API_KEY;
const createAxiosInstance = (baseURL, params) => {
  const instance = axios.create({
    baseURL,
    params,
  });

  // Apply interceptors
  applyInterceptors(instance);

  return instance;
};

// Function to apply interceptors
const applyInterceptors = (instance) => {
  // Request interceptor
  instance.interceptors.request.use(
    (config) => {
      // Add required headers to the request config
      config.headers['Accept'] = 'application/json';
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // Response interceptor
  instance.interceptors.response.use(
    (response) => {
      // Modify response data here
      return response;
    },
    (error) => {
      return console.error(error);
    }
  );
};

// Create Axios instances
const newsApiInstance = createAxiosInstance('https://newsapi.org/v2/everything',
 {
  apiKey: newsAPI,
});
const nyTimesApiInstance = createAxiosInstance(
  'https://api.nytimes.com/svc/search/v2/articlesearch.json',
  {
    'api-key': NYAPIKey,
  }
);
const theGuardianInstance = createAxiosInstance(
  'https://content.guardianapis.com/search',
  {
    'api-key': guardianAPI,
  }
);

// Export Axios instances
export { newsApiInstance, nyTimesApiInstance, theGuardianInstance };