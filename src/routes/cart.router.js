import { Router } from "express";
import { cartManager } from "../managers/cart.manager.js";
const router = Router();

//crear un carrito nuevo
router.post("/", async (req, res) => {
  try {
    res.json(await cartManager.createCart());
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});
//debe listar los productos que hayan en el carrito con esa id
router.get("/:cid", async (req, res) => {
  try {
    const { cid } = req.params;
    res.json(await cartManager.getCartById(cid));
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});
//debe agregar el producto elegido al carrito elegido
router.post("/:cid/product/:pid", async (req, res) => {
  try {
    const { cid } = req.params;
    const { pid } = req.params;
    const prodFinal = await cartManager.addToCart(cid, pid);
    res.json(prodFinal);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
export default router;
