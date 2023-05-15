function clientErrorHanlder(err, req, res, next) {
<<<<<<< HEAD
   console.log(err)
   switch (err.message) {
      case 'Not Found': {
         res.status(404).json(err)
         break
      }
      case 'Unauthorized': {
         res.status(401).json(err)
         break
      }
      case 'Bad Request': {
         res.status(400).json(err)
         break
      }
      default:
         res.status(500).json(err)
      // next(err)
   }
}

function mongooseErrorHanlder(err, req, res, next) {
   switch (err.name) {
      case 'MongoServerError': {
         res.status(409).json({
            error: {
               message: 'Email address is already in use',
               status: 409,
            },
         })
         break
      }
      case 'ValidationError':
      case 'CastError': {
         res.status(400).json({
            error: { message: 'Bad Request', status: 400 },
         })
      }
      default:
         res.status(500).json({ Error: err })
   }
=======
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
>>>>>>> inv_api
}

module.exports = {
   clientErrorHanlder,
<<<<<<< HEAD
   mongooseErrorHanlder,
=======
   serverErrorHandler,
>>>>>>> inv_api
}
