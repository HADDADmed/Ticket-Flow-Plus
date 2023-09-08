// create a file that contains all the functions that will be used to communicate with the server regarding tickets

import axios from "axios";
import GlobalService from "./global.service.js";
const accessToken = localStorage.getItem("accessToken")
     ? JSON.parse(localStorage.getItem("accessToken"))
     : null;
axios.defaults.headers.common["Authorization"] = "JWT " + accessToken;
const API_URL = "http://localhost:8000/api/tickets/";

class TicketsService {
     // get all tickets
                getAllTickets(user_id_tickets = null) {
                    return axios.get(API_URL + "?user_id_tickets=" + user_id_tickets);
                }

                // get ticket by id
                getTicketById(id) {
                    return axios.get(API_URL + "ticket/" + id);
                }

                // create a new ticket
                createTicket(data) {
                    return axios.post(API_URL, data);
                }

                //get ticket by token
                getTicketsByToken(token) {
                    return axios.get(API_URL + "token/" + token);
                }

                // get ticket by name
                getTicketByName(fullName) {
                    return axios.get(API_URL + "name/" + fullName);
                }

                // get ticket by email
                getTicketByEmail(email) {
                    return axios.get(API_URL + "email/" + email);
                }

                // update ticket by id
                updateTicketById(id, data) {
                    return axios.put(API_URL + id, data);
                }

                // delete ticket by id
                deleteTicketById(id) {
                    return axios.delete(API_URL + id);
                }

                // description to short format (max 100 characters)
                shortDescription(description) {
                    return description.substring(0, 15) + "...";
                }

                ticketValidation(html, newTicket) {
                     const isTheContentTheSame = html === "";
                    const isTheContentEmpty = html === `<p></p>`;
                    if (
                        (isTheContentEmpty || isTheContentTheSame) &&
                        newTicket.category_id == "" &&
                        newTicket.title == ""
                    ) {
                        GlobalService.toasterShowError(`Please fill all fields !`);
                        return false;
                    } else if (
                        newTicket.title == "" &&
                        newTicket.category_id == ""
                    ) {
                        GlobalService.toasterShowError(`Title and Category are required !`);
                        return false;
                    } else if (newTicket.title == "") {
                        GlobalService.toasterShowError(`Title is required !`);
                        return false;
                    } else if (newTicket.category_id == "") {
                        GlobalService.toasterShowError(`Category is required !`);
                        return false;
                    } else if (isTheContentEmpty || isTheContentTheSame) {
                        GlobalService.toasterShowError(`Content is required !`);
                        return false;
                    } else if (html.length < 60) {
                        GlobalService.toasterShowError(
                                `Content must be at least 50 characters !`
                        );
                        return false;
                    }
                    return true;
                }
}

export default new TicketsService();
