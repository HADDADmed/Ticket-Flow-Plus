import axios from 'axios';
const accessToken = localStorage.getItem('accessToken')? JSON.parse(localStorage.getItem('accessToken')) : null;
axios.defaults.headers.common['Authorization'] = 'JWT '+ accessToken;
const API_URL = 'http://localhost:8000/api/users/';

class UsersService {
  // Get all users
  getAllUsers() {
    return axios.get(API_URL);    
  }
  
  // Get user by id
  getUserById(id) {
    return axios.get(API_URL + id);
  }
  
  // Create a new user
  createUser(data) {
    return axios.post(API_URL+'register', data);
  }
  
  // Get user by token
  getUserByToken(token) {
    return axios.get(API_URL + 'token/' + token);
  }

  // Get user by name
  getUserByName(fullName) {
    return axios.get(API_URL + 'name/' + fullName);
  }

  // Get user by email
  getUserByEmail(email) {
    return axios.get(API_URL + 'email/' + email);
  }

  // Update user by id
  updateUserById(id, data) {
    return axios.put(API_URL + id, data);
  }
  
  // Delete user by id
  deleteUserById(id) {
    return axios.delete(API_URL + id);
  }

  // Change user role
  changeUserRole(id, role) {
    return axios.put(API_URL + 'role/' + id, role);
  }

  // getUserStatusClass (for css)
    getUserStatusClass(status) {
        if (status === "OPEN") {
            return "open";
        } else if (status === "PENDING") {
            return "pending";
        } else if (status === "CLOSED") {
            return "closed";
        }
    }
    // get Role Class (for css)
    getUserRoleClass(role) {

        if (role === "ADMIN") {
            return "admin";
        } else if (role === "USER") {
            return "user";
      } else if (role === "RESPONSIBLE") {
            return "responsible";
        } // default
        else {
            return "badge bg-light text-dark";
        }
    }


    // get first name from full name
    getLastName(fullName) {
        return fullName.split(" ")[0];
    }

    // get last name from full name
    getFirstName(fullName) {
        return fullName.split(" ")[1];
    }

    // create function that return something if the user is admin or Responsible about the ticket_count
    ticketCount(ticketCount,role) {
        if(role === "ADMIN" || role === "RESPONSIBLE") {
            return 'No-tickets';
        } else if (ticketCount === 0) {
            return 'No-tickets';
        }
        else {
            return ticketCount;
        }
}
      getCurrentUser() {
        return JSON.parse(localStorage.getItem('user'));
      }


    //Login function
    login(email, password) {
        return axios.post(API_URL + 'login', {
            email,
            password
        }).then((response) => {
            if (response.data.accessToken) {
                localStorage.setItem('user', JSON.stringify(response.data.user));
                localStorage.setItem('accessToken', JSON.stringify(response.data.accessToken));
            }
            return response.data;
        });
    }
    }

    

export default new UsersService();
