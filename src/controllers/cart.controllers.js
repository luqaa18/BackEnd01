import * as services from '../services/cart.services.js';

export const getAll = async (req, res, next) => {
    try {
        const response = await services.getAll();
        res.json(response);
    } catch (error) {
        next(error)
    }
};

export const getById = async (req, res, next) => {
    try {
        const { idCart } = req.params;
        const response = await services.getById(idCart);
        res.json(response);
    } catch (error) {
        next(error);
    }
};

export const create = async(req, res, next)=>{
    try {
        const newCart = await services.create();
        res.json(newCart)
    } catch (error) {
        next(error)
    }
};

export const update = async (req, res, next) => {
    try {
        const { idCart } = req.params; // ID del carrito a actualizar
        const updatedProducts = req.body.products; // Productos a actualizar en el carrito (deberían venir en el cuerpo de la solicitud)
        
        // Verifica si los productos existen antes de intentar actualizarlos
        if (!updatedProducts || updatedProducts.length === 0) {
            throw new CustomError('No se proporcionaron productos para actualizar', 400);
        }

        // Llamar al servicio para actualizar el carrito
        const updatedCart = await services.update(idCart, updatedProducts);

        if (!updatedCart) {
            throw new CustomError('Carrito no encontrado', 404);
        }

        // Responde con el carrito actualizado
        res.json(updatedCart);
    } catch (error) {
        next(error); // Si hay algún error, lo pasas al middleware de manejo de errores
    }
};


export const remove = async (req, res, next) => {
    try {
        const { idCart } = req.params;
        const delCart = await services.remove(idCart);
        res.json({ msg: `Carrito ID: ${delCart._id} ha sido borrado` });
    } catch (error) {
        next(error)
    }
};

export const addToCart = async (req, res, next) => {
    try {
        const { idCart } = req.params;
        const { idProd } = req.params;
        const newProdToCart = await services.addToCart(idCart, idProd);
        res.json(newProdToCart)
    } catch (error) {
        next(error)
    }
};

export const removeFromCart = async (req, res, next)=>{
    try {
        const {idCart} = req.params;
        const {idProd} = req.params;
        const removeFromCart = await services.removeFromCart(idCart, idProd);
        res.json(removeFromCart);
    } catch (error) {
        next(error)
    }
};