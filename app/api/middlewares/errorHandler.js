function clientErrorHanlder(err, req, res, next) {
   const errorMessage = { error: { ...err, ok: false } }
   switch (err.status) {
      case 400:
         return res.status(err.status).json(errorMessage)
      case 401:
         return res.status(err.status).json(errorMessage)
      case 403:
         return res.status(err.status).json(errorMessage)
      case 404:
         return res.status(err.status).json(errorMessage)
      case 409:
         return res.status(err.status).json(errorMessage)
      case 500:
         return res.status(err.status).json(errorMessage)
      default:
         next(err)
   }
}

function serverErrorHandler(err, req, res, next) {
   res.status(500).json(err)
}

module.exports = {
   clientErrorHanlder,
   serverErrorHandler,
}
