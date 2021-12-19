const jwt = require('jsonwebtoken')
const CustomeAPIError = require('../errors/custom-error')

const login = async (req, res) => {
  const { username, password } = req.body
  // mongoose validation
  // Joi
  // check in the controller

  if (!username || !password) {
    throw new CustomeAPIError('Please provide email and password', 400)
  }

  // just for demo, normally provided by DB
  const id = new Date().getDate()

  // try to keep payload small, better experience for user
  const token = jwt.sign({ id, username }, process.env.JWT_SECRET, { expiresIn: '30d' })

  res.status(200).json({ msg: 'user created', token })
}

const dashboard = async (req, res) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new CustomeAPIError('No token provided', 401)
  }

  const token = authHeader.split(' ')[1]
  console.log(token);

  const luckyNumber = Math.floor(Math.random() * 100)
  res.status(200).json({
    msg: 'Hello, Master',
    secret: `Here is your authorized data, your lucky number is ${luckyNumber}`
  })
}

module.exports = {
  login, dashboard
}