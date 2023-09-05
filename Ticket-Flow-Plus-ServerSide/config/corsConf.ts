const whitelist = [
    'http://localhost:5173',
];

const corsConfig = {
    origin: function (origin:any, callback:any) {
        if (whitelist.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
};

module.exports = corsConfig