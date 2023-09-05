// create a file that contain all dashboard functions


import axios from "axios";
const accessToken = localStorage.getItem('accessToken')? JSON.parse(localStorage.getItem('accessToken')) : null;
axios.defaults.headers.common['Authorization'] = 'JWT '+ accessToken;
const API_URL = "http://localhost:8000/api/dashboard/";

class DashboardService {

    // fetching statistics

    dashboardstatistics() {
        return axios.get(API_URL);
    }

}

export default new DashboardService();


