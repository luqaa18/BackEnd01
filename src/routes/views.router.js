import { Router } from "express";
import { prodMan } from "../managers/product.manager.js";

const router = Router();

router.get('/home', async (req, res)=>{
    const products = await prodMan.getAll();
    res.render('home', { products })
});
router.get('/realtimeproducts', (req, res)=>{
    res.render('realTimeProducts')
});

export default router;
