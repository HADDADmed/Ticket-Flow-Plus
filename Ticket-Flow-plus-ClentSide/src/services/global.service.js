// creat a file named global.service.js in services folder that conteain all global functions

import { createToaster } from "@meforma/vue-toaster";
import { createRouter, createWebHistory } from 'vue-router';

import router from '@/router'; // Import your Vue Router instance

class GlobalService {

    constructor() {
        this.toaster = createToaster({})
      }
      
    getCurrentUser() {
        return JSON.parse(localStorage.getItem('user'));
    }
    //create a global variable isAdmin to check if the user is admin or not
    isAdmin() {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user.role === "ADMIN") {
            return true;
        } else {
            return false;
        }
    }

    // date formater function to format date to dd-mm-yyyy 
    formatDate(date) {
        let d = new Date(date);
        let month = '' + (d.getMonth() + 1);
        let day = '' + d.getDate();
        let year = d.getFullYear();
        
        if (month.length < 2) 
            month = '0' + month;
        if (day.length < 2) 
            day = '0' + day;
        
        return [day, month, year].join('-');
    }

    /// date and time formater function to format date to dd-mm-yyyy hh:mm
    formatDateTime(date) {

        let d = new Date(date);
        let month = '' + (d.getMonth() + 1);
        let day = '' + d.getDate();
        let year = d.getFullYear();
        let hour = '' + d.getHours();
        let minute = '' + d.getMinutes();
        
        if (month.length < 2) 
            month = '0' + month;
        if (day.length < 2) 
            day = '0' + day;
        if (hour.length < 2)
            hour = '0' + hour;
        if (minute.length < 2)
            minute = '0' + minute;
        
        return [day, month, year].join('-') + ' ' + [hour, minute].join(':');
    }

    formatDate(date) {
        let d = new Date(date);
        let month = '' + (d.getMonth() + 1);
        let day = '' + d.getDate();
        let year = d.getFullYear();

        if (month.length < 2)

            month = '0' + month;
        if (day.length < 2)

            day = '0' + day;

        return [day, month, year].join('-');
    }


    formatTime(time) {
        let d = new Date(time);
        let hour = '' + d.getHours();
        let minute = '' + d.getMinutes();

        if (hour.length < 2)

            hour = '0' + hour;
        if (minute.length < 2)

            minute = '0' + minute;

        return [hour, minute].join(':');
    }



    // description to short format (max 13 characters)
    shortDescription(description) {
        return description.substring(0, 13) + '...';
    }


    /// short title format (max 8 characters)
    shortTitle(title) {
        return title.substring(0, 8) + '...';
    }

    removeHTMLTags(html) {
                const div = document.createElement('div');
        div.innerHTML = html;
        return div.textContent || div.innerText || '';
    }

   
    // create a function that retturns the current date and time in the format yyyy-mm-dd hh:mm:ss
    getCurrentDateTime() {
        let d = new Date();
        let month = '' + (d.getMonth() + 1);
        let day = '' + d.getDate();
        let year = d.getFullYear();
        let hour = '' + d.getHours();
        let minute = '' + d.getMinutes();
        let second = '' + d.getSeconds();
        
        if (month.length < 2) 
            month = '0' + month;
        if (day.length < 2) 
            day = '0' + day;
        if (hour.length < 2)
            hour = '0' + hour;
        if (minute.length < 2)
            minute = '0' + minute;
        if (second.length < 2)
            second = '0' + second;
        
        return [year, month, day].join('-') + ' ' + [hour, minute, second].join(':');
    }

    // create a function that retturns the current date in the format yyyy-mm-dd
    getCurrentDate() {
        let d = new Date();
        let month = '' + (d.getMonth() + 1);
        let day = '' + d.getDate();
        let year = d.getFullYear();
        
        if (month.length < 2) 
            month = '0' + month;
        if (day.length < 2) 
            day = '0' + day;
        
        return [day, month,year].join('-');
    }


    // create a function that retturns the current time in the format hh:mm:ss
    getCurrentTime() {
        let d = new Date();
        let hour = '' + d.getHours();
        let minute = '' + d.getMinutes();
        let second = '' + d.getSeconds();
        
        if (hour.length < 2)
            hour = '0' + hour;
        if (minute.length < 2)
            minute = '0' + minute;
        if (second.length < 2)
            second = '0' + second;
        
        return [hour, minute, second].join(':');
    }

    getCurrentTimeWithoutSeconds() {
        let d = new Date();
        let hour = '' + d.getHours();
        let minute = '' + d.getMinutes();
        
        if (hour.length < 2)
            hour = '0' + hour;
        if (minute.length < 2)
            minute = '0' + minute;
        
        return [hour, minute].join(':');
    }

    passwordMatch(password, confirmPassword) {
        if (password === confirmPassword) {
            return true;
        } else {
            return false;
        }
    }

    
    toasterShow(message, type,icon ,duration=5000, position="top", ) {
        this.toaster.show(`<div><i class="${icon}"></i>&nbsp;&nbsp;&nbsp${message} </div>`, {
            position: position,
            duration: duration,
            type: type,

          });
    }

    toasterShowError(message,duration=6000, position="top") {
        this.toasterShow(message, "error",'fa-solid fa-triangle-exclamation',duration,position);
    }
    
    toasterShowSuccess(message,duration=6000, position="top") {
        this.toasterShow(message, "success",'fa-regular fa-circle-check',duration,position);
    }
    
    toasterShowWarning(message,duration=6000, position="top") {
        this.toasterShow(message, "warning",'fa-regular fa-circle-xmark',duration,position); 
    }

    passwordValidation(password, confirmPassword) {
        if(!(this.passwordMatch(password, confirmPassword))) {
            this.toasterShowWarning(`Passwords don't match  !`);
              return false;
        } else
        if(password.length < 8) { 
                this.toasterShowWarning(`Password must be at least 8 characters  !`);
                    return false;
            
            } else if(password.search(/[a-z]/) < 0) { 
                this.toasterShowWarning(`Password must contain at least one lowercase letter  !`);
                    return false;

            } else if(password.search(/[A-Z]/) < 0) { 
                this.toasterShowWarning(`Password must contain at least one uppercase letter  !`);
                    return false;

            } else if(password.search(/[0-9]/) < 0) { 
                this.toasterShowWarning(`Password must contain at least one number  !`);
                    return false;

            } else { 
                    return true;
            } 
}
           
            // cretae a function that push to the component that name is passed as parameter and also if the parameter contans params and query
            // push the params and query to the component
            routerPush(componentName, params=null, query=null) {
                if(params && query) {
                    router.push({name: componentName, params: params, query: query});
                } else if(params) {
                    router.push({name: componentName, params: params});
                } else if(query) {
                    router.push({name: componentName, query: query});
                } else {
                    router.push({name: componentName});
                }
            }

 }


export default new GlobalService();