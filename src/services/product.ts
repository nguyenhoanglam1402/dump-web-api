import Product from "src/models/product.model"
import { IProductData } from "src/types/product.type"

export const getProduct = () => {
  return Product.findAll()
}

export const getProductId = (id: string) => {
  return Product.findOne({
    where: {
      id: id
    }
  })
}

export const createProduct = async (productData: IProductData) => {
  if (!productData.name || !productData.price || !productData.categoryId) {
    throw new Error('Missing required fields: name, price, and categoryId are required');
  }

  // Create the product using Sequelize
  const newProduct = await Product.create({
    name: productData.name,
    feature: productData.features,
    description: productData.description,
    price: productData.price,
    amountInStore: productData.amountInStore,
    categoryId: productData.categoryId,
    pictureURL: productData.pictureURL,
  });

  return newProduct;
}