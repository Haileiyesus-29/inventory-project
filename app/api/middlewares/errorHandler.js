function errorHandler(err, req, res, next) {
   console.log(err.message)
   res.status(500).send('something went wrong')
}

module.exports = {
   errorHandler,
}
