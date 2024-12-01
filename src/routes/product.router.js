import { Router } from "express";
import { requiredCategories } from "../middlewares/required.js";
import {prodMan} from "../managers/product.manager.js";
// const prodManager = new prodMan("./products.json");

const router = Router();
//--------------ver productos
router.get("/", async (req, res) => {
  try {
    const prods = await prodMan.getAll();
    res.status(200).json(prods);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//--------------ver productos por id
router.get("/:pid", async (req, res) => {
  try {
    const { pid } = req.params;
    const prod = await prodMan.getById(pid);
    res.status(200).json(prod);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

//--------------crear producto
router.post("/", [requiredCategories], async (req, res) => {
  try {
    const prod = await prodMan.create(req.body);
    res.status(201).json(prod);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//--------------actualizar producto
router.put("/:pid", async (req, res) => {
  try {
    const { pid } = req.params;
    const prodUpd = await prodMan.update(req.body, pid);
    res.status(200).json(prodUpd);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//--------------eliminar producto por id
router.delete("/:pid", async (req, res) => {
  try {
    const { pid } = req.params;
    const prodDel = await prodMan.delete(pid);
    res.status(200).json({
      message: `Se ha eliminado el producto "${prodDel.title}" con el siguiente id: ${prodDel.id}`,
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

//--------------eliminar todos los productos
router.delete("/", async (req, res) => {
  try {
    await prodMan.deleteAll();
    res.json({ message: "Se han eliminado todos los productos" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
