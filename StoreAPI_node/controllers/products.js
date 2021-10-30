const getAllProductsStatic = async (req, res) => {
  throw new Error('async err test') // try, catch를 대신함
  res.status(200).json({ msg: 'products testing route' })
}

const getAllProducts = async (req, res) => {
  res.status(200).json({ msg: 'products route' })
}

module.exports = {
  getAllProducts,
  getAllProductsStatic,
}