const Product = require('../models/product');

const getAllProductsStatic = async (req, res) => {

  const products = await Product.find({})
    .sort('name')
    .select('name price')
    .limit(4)
    .skip(5);
  res.status(200).json({ products, nbHits: products.length })
}

const getAllProducts = async (req, res) => {
  const { featured, company, name, sort, fields } = req.query;
  const queryObject = {}

  if (featured) {
    queryObject.featured = featured === 'true' ? true : false;
  }
  if (company) {
    queryObject.company = company
  }
  if (name) {
    queryObject.name = { $regex: name, $options: 'i' };
  }

  // console.log(queryObject)
  let result = Product.find(queryObject);
  //sort
  if (sort) {
    result = result.sort(sort.replace(',', ' '))
  } else {
    result = result.sort('createdAt')
  }

  if (fields) {
    result = result.select(fields.replace(',', ' '))
  }

  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit);
  const skip = (page - 1) * limit;

  result = result.skip(skip).limit(limit);

  const products = await result;
  res.status(200).json({ products, nbHits: products.length })
}

module.exports = {
  getAllProducts,
  getAllProductsStatic,
}