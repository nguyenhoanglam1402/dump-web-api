import Category from "src/models/category.model";
import { ICategoryData } from "src/types/product.type";

export const createCategoryService = async (categoryData: ICategoryData) => {
  try {
    if (!categoryData.name) {
      throw new Error('Category name is required');
    }

    const newCategory = await Category.create({
      name: categoryData.name,
      pictureURL: categoryData.pictureURL
    });

    return newCategory;
  } catch (error) {
    console.error('Error creating category:', error);
    throw error;  // Propagate the error to be handled at a higher level (e.g., controller)
  }
};

export const getCategory = async () => {
  try {
    const categories = await Category.findAll()
    return categories;
  } catch (error) {
    console.error('Error creating category:', error);
    throw error;  // Propagate the error to be handled at a higher level (e.g., controller)
  }
};