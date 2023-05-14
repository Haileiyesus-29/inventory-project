function clientErrorHanlder(err, req, res, next) {
   // console.log(err.code)
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
         next(err)
   }
}

function mongooseErrorHanlder(err, req, res, next) {
   console.log(err.name)
   switch (err.name) {
      case 'MongoServerError': {
         res.status(409).json({
            message: 'Email address is already in use',
            status: 409,
         })
         break
      }
      case 'ValidationError': {
         res.status(400).json({ message: 'Bad Request', status: 400 })
         break
      }
      default:
         res.status(500).json({ Error: err })
   }
}

module.exports = {
   clientErrorHanlder,
   mongooseErrorHanlder,
}
