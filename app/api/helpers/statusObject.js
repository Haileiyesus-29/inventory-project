function statusObject(status) {
   switch (status) {
      case 400:
         return { message: 'Bad Request', status }
      case 401:
         return { message: 'Unauthorized', status }
      case 403:
         return { message: 'Forbidded', status }
      case 404:
         return { message: 'Not Found', status }
      case 409:
         return { message: 'Conflict', status }
      default:
         return { message: 'Internal Server Error', status: 500 }
   }
}

module.exports = statusObject
