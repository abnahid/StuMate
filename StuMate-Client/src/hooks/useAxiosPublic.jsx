import axios from "axios";

const axiosPublic = axios.create({
  baseURL: 'http://localhost:5012/api',
});

const useAxiosPublic = () => {
  return axiosPublic;
};

export default useAxiosPublic;
