// create a file that containe alll the functions that will be used to communicate with the server regarding Comments


import axios from 'axios';
const accessToken = localStorage.getItem('accessToken')? JSON.parse(localStorage.getItem('accessToken')) : null;
axios.defaults.headers.common['Authorization'] = 'JWT '+ accessToken;
const API_URL = 'http://localhost:8000/api/comments/';

class CommentsService {

    // get all comments
    getAllComments() {
        return axios.get(API_URL);    
    }

    // get comment by id
    getCommentById(id) {
        return axios.get(API_URL + id);
    }
    
    // create a new comment
    createComment(data) {
        return axios.post(API_URL, data);
    }
    
    // update comment by id
    updateCommentById(id, data) {
        return axios.put(API_URL + id, data);
    }
    
    // delete comment by id
    deleteCommentById(id) {
        return axios.delete(API_URL + id);
    }
    

}


export default new CommentsService();
