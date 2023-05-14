require('dotenv').config()
const {
   PORT,
   DB_URI,
   DB_URI_TEST,
   NODE_ENV,
   ACCESS_TOKEN_KEY,
   REFRESH_TOKEN_KEY,
} = process.env

module.exports = {
   PORT,
   DB_URI: NODE_ENV === 'testing' ? DB_URI_TEST : DB_URI,
   ACCESS_TOKEN_KEY,
   REFRESH_TOKEN_KEY,
}
