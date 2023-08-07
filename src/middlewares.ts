import { NextFunction, Request, Response } from "express";
import { Product } from "./interfaces";
import { market } from "./database";

const ensureIdExists = (req: Request, res: Response, next: NextFunction) => {
  const productId: number = Number(req.params.id);
  const productIndex: number = market.findIndex(
    (product: Product): boolean => product.id === productId
  );

  if (productIndex === -1) {
    return res.status(404).json({ message: "Product not found." });
  }
  res.locals.productIndex = productIndex;

  return next();
};

const ensureProductNameExists = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const nameExist = market.some((product) => product.name === req.body.name);
  if (nameExist) {
    return res.status(409).json({ message: "Product already registered." });
  }

  res.locals.nameExist = nameExist;
  return next();
};

export { ensureIdExists, ensureProductNameExists };
