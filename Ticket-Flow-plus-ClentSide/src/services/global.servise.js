// creat a file named global.servise.js in services folder that conteain all global functions





class GlobalService {

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

}


export default new GlobalService();