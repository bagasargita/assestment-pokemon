import Product from "../models/ProductModel.js";

export const getAllProducts = async (req, res, next) => {
  try {
    const allProducts = await Product.findAll();
    res.json(allProducts);
  } catch (err) {
    next(err);
  }
};

export const getProductsById = async (req, res, next) => {
  try {
    const productsById = await Product.findAll({
      where: {
        id: req.params.id,
      },
    });
    res.json(productsById[0]);
  } catch (err) {
    next(err);
  }
};

export const createProduct = async (req, res, next) => {
  try {
    await Product.create(req.body);
    res.json({
      message: "Product Created Successfully",
    });
  } catch (err) {
    next(err);
  }
};

export const updateProduct = async (req, res, next) => {
  try {
    await Product.update(req.body, { where: { id: req.params.id } });
    res.json({
      message: "Product Updated Successfully",
    });
  } catch (err) {
    next(err);
  }
};

export const deleteProduct = async (req, res, next) => {
  try {
    await Product.destroy(req.body, { where: { id: req.params.id } });
    res.json({
      message: "Product Deleted Successfully",
    });
  } catch (err) {
    next(err);
  }
};
