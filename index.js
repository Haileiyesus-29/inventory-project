const app = require('./app/app')
const mongoose = require('mongoose')
const { PORT } = require('./app/config/config')

// connect to MongoDB
mongoose
   .connect(process.env.DB_URI)
   .then(() => {
      app.listen(PORT, () =>
         console.log(`🚀️ Server is running on http://localhost:${PORT}`)
      )
   })
   .catch(err => console.log(err.message))
