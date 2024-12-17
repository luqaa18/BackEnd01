import { Router } from "express";
import * as controllers from '../controllers/product.controllers.js';

const router = Router();
//--------------ver productos
router.get("/", controllers.getAll);

//--------------ver productos por id
router.get("/:idProd", controllers.getById);

//--------------crear producto
router.post("/", controllers.create);

//--------------actualizar producto
router.put("/:idProd", controllers.update);

//--------------eliminar producto por id
router.delete("/:idProd", controllers.remove);




export default router;
