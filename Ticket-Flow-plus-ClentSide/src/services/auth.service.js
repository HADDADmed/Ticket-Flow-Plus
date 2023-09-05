

import axios from 'axios';
const auth_URL = 'http://localhost:8000/auth/';
class AuthService {
    
       
    // login
    login(email, password) {
        return axios.post(auth_URL + 'login',{
            email,
            password
        })
        .then(response => {
            if(response.data.accessToken) {
                localStorage.setItem('user', JSON.stringify(response.data.user));
                localStorage.setItem('accessToken', JSON.stringify(response.data.accessToken));
            return response.data;
            }});
    }

}

export default new AuthService();

