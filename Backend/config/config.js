require('dotenv').config();
module.exports = {
    MONGODB_URL: process.env.MONGODB_URI,
    PORT: process.env.PORT,
};