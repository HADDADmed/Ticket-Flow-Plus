// create a file that contains all the functions that will be used to communicate with the server regarding Categories

import axios from 'axios';  
const accessToken = localStorage.getItem('accessToken')? JSON.parse(localStorage.getItem('accessToken')) : null;
axios.defaults.headers.common['Authorization'] = 'JWT '+ accessToken;
const API_URL = 'http://localhost:8000/api/categories/';

class CategoriesService {
    // get all categories
    getAllCategories() {
        return axios.get(API_URL);    
    }
    getAllCategoriesNames() {
        return axios.get(API_URL + 'names');
    }

    // get category by id
    getCategoryById(id) {
        return axios.get(API_URL + id);
    }
    
    // create a new category
    createCategory(data) {
        return axios.post(API_URL, data);
    }
    
    // update category by id
    updateCategoryById(id, data) {
        return axios.put(API_URL + id, data);
    }
    
    // delete category by id
    deleteCategoryById(id) {
        return axios.delete(API_URL + id);
    }
    

}


export default new CategoriesService();
