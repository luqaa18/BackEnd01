import { Router } from "express";
import * as controllers from '../controllers/cart.controllers.js'

const router = Router();

//Llamar a todos los carritos
router.get("/", controllers.getAll);
//Llamar carrito por id
router.get('/:idCart', controllers.getById);
//Crear carrito
router.post('/', controllers.create);
//Actualizar carrito
router.put('/:idCart', controllers.update);
//Eliminar carrito
router.delete('/:idCart', controllers.remove);
//Agregar producto al carrito
router.put('/:idCart/products/:idProd', controllers.addToCart);
//Eliminar del carrito
router.delete('/:idCart/products/:idProd', controllers.removeFromCart);

export default router;