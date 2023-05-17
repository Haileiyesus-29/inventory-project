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
   // console.log(err.name)
   switch (err.name) {
      case 'MongoServerError':
         return res
            .status(409)
            .json({ error: { ok: false, message: 'duplicated', status: 409 } })
      case 'CastError':
      case 'ValidationError':
         return res
            .status(400)
            .json({ error: { ok: false, message: 'Bad Request', status: 400 } })
      default:
         res.status(500).json({
            error: {
               ok: false,
               message: 'Internal server failure',
               status: 500,
            },
         })
   }
}

module.exports = {
   clientErrorHanlder,
   serverErrorHandler,
}
