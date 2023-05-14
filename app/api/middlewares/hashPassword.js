const bcrypt = require('bcrypt')

const hashPassword = async (req, res, next) => {
   const password = req.body.password
   if (!password)
      return res
         .status(400)
         .json({ error: { message: 'Bad Request', status: 400 } })
   req.body.password = await bcrypt.hash(password, 10)
   next()
}

module.exports = { hashPassword }
