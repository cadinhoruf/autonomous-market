import { Request, Response, response } from "express";
import { Product, allProducts } from "./interfaces";
import { market } from "./database";

const createProduct = (req: Request, res: Response): Response => {
  const newProduct: Product = {
    id: market.length + 1,
    name: req.body.name,
    price: req.body.price,
    weight: req.body.weight,
    calories: req.body.calories,
    section: req.body.section,
    expirationDate: new Date(),
  };

  const expirationDateOneYearMore: Date = new Date(newProduct.expirationDate);
  expirationDateOneYearMore.setFullYear(
    expirationDateOneYearMore.getFullYear() + 1
  );
  newProduct.expirationDate = expirationDateOneYearMore;

  market.push(newProduct);
  return res.status(201).json(newProduct);
};

const readProducts = (req: Request, res: Response): Response => {
  const totalPrice = market.reduce((acc, product) => acc + product.price, 0);

  const allProducts: allProducts = {
    total: totalPrice,
    products: market,
  };
  return res.status(200).json(allProducts);
};

const readProductById = (req: Request, res: Response): Response => {
  const productIndex = res.locals.productIndex;

  return res.status(200).json(market[productIndex]);
};

const updateProduct = (req: Request, res: Response): Response => {
  const productIndex = res.locals.productIndex;
  const updatedProduct = (market[productIndex] = {
    ...market[productIndex],
    ...req.body,
  });

  return res.status(200).json(updatedProduct);
};

const deleteProduct = (req: Request, res: Response): Response => {
  const productIndex = res.locals.productIndex;

  market.splice(productIndex, 1);

  return res.status(204).json();
};

export default {
  createProduct,
  readProducts,
  readProductById,
  updateProduct,
  deleteProduct,
};
