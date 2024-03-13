import axios from 'axios';

const apiHandler = (apiInstance) => {
  const callApi = async (queryParams) => {
    try {
      const response = await apiInstance.get('', { params: {...queryParams} });
      // Handle response data here
      return response?.data;
    } catch (error) {
      // Handle error here
      console.error('Error:', error);
      throw error;
    }
  };

  return callApi;
};

export default apiHandler;