import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:5000/',
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true, // Include credentials (cookies) in requests
});

// Custom endpoints
export const get=(url,params) => instance.get(url,{params});
export const post=(url,data) => instance.post(url,data);
export const put=(url,data) => instance.put(url,data);
export const deleted=(url) => instance.delete(url);


// Add a request interceptor
instance.interceptors.request.use(function (config) {
    // Do something before request is sent
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });

// Add a response interceptor
instance.interceptors.response.use(function (response) {
    console.log("Response Interceptor",response);
    return response;
  }, function (error) {
    console.log("Response Interceptor",error);
    // Do something with response error 

    return Promise.reject(error);
  });