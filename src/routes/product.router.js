import { Router } from "express";
import { requiredCategories } from "../middlewares/required.js";
import ProductManager from "../managers/product.manager.js";
const prodManager = new ProductManager("./products.json");

const router = Router();
//--------------ver productos
router.get("/", async (req, res) => {
  try {
    const prods = await prodManager.getAll();
    res.status(200).json(prods);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//--------------ver productos por id
router.get("/:pid", async (req, res) => {
  try {
    const { pid } = req.params;
    const prod = await prodManager.getById(pid);
    res.status(200).json(prod);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

//--------------crear producto
router.post("/", [requiredCategories], async (req, res) => {
  try {
    const prod = await prodManager.create(req.body);
    res.status(201).json(prod);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//--------------actualizar producto
router.put("/:pid", async (req, res) => {
  try {
    const { pid } = req.params;
    const prodUpd = await prodManager.update(req.body, pid);
    res.status(200).json(prodUpd);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//--------------eliminar producto por id
router.delete("/:pid", async (req, res) => {
  try {
    const { pid } = req.params;
    const prodDel = await prodManager.delete(pid);
    res
      .status(200)
      .json({
        message: `Se ha eliminado el producto con el siguiente id: ${prodDel.id}`,
      });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

//--------------eliminar todos los productos
router.delete("/", async (req, res) => {
  try {
    await prodManager.deleteAll();
    res.json({ message: "Se han eliminado todos los productos" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
