// creating a file that contains all the functions that will be used to communicate with the server regarding Tickettatus


import axios from 'axios';
const accessToken = localStorage.getItem('accessToken')? JSON.parse(localStorage.getItem('accessToken')) : null;
axios.defaults.headers.common['Authorization'] = 'JWT '+ accessToken;
const API_URL = 'http://localhost:8000/api/statuses/';

class TicketStatusService {
    // get all ticketStatuses
    getAllTicketStatusesByTicketId(ticket_id) {
        return axios.get(API_URL+ticket_id);    
    }

    // get ticketStatus by id
    getTicketStatusById(id) {
        return axios.get(API_URL + id);
    }
    
    // create a new ticketStatus
    createTicketStatus(data) {
        return axios.post(API_URL, data);
    }
    
    // update ticketStatus by id
    updateTicketStatusById(id, data) {
        return axios.put(API_URL + id, data);
    }
    
    // delete ticketStatus by id
    deleteTicketStatusById(id) {
        return axios.delete(API_URL + id);
    }
    
    getCurrentStatus(ticket_id) {
        return axios.get(API_URL + 'current/' + ticket_id);
    }

    

}


export default new TicketStatusService();




