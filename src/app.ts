import { json } from "body-parser";
import express, { Application } from "express";
import logic from "./logic";
import {
  ensureIdExists,
  ensureProductNameExists,
} from "./middlewares";

const app: Application = express();

app.use(json());

app.use("/products/:id", ensureIdExists);

app.post("/products", ensureProductNameExists, logic.createProduct);
app.get("/products", logic.readProducts);
app.get("/products/:id", logic.readProductById);
app.patch("/products/:id", ensureProductNameExists, logic.updateProduct);
app.delete("/products/:id", logic.deleteProduct);

const PORT: number = 3000;
const runningMsg = `Server is running on http://localhost:${PORT}`;
app.listen(PORT, () => console.log(runningMsg));
