import { cartDao } from "../daos/mongodb/cart.daos.js";
import { productDao } from "../daos/mongodb/product.daos.js";
import { CustomError } from "../utils/error.custom.js";

export const getAll = async () => {
    try {
        return await cartDao.getAll();
    } catch (error) {
        throw new Error(error);
    }
};

export const getById = async (idCart) => {
    try {
        const cart = await cartDao.getById(idCart);
        if (!cart) {
            throw new CustomError('El carrito no existe', 404);
        }
        return cart;
    } catch (error) {
        throw (error)
    }
};

export const create = async () => {
    try {
        return await cartDao.create();
    } catch (error) {
        throw (error)
    }
};

export const update = async (id, obj) => {
    try {
        for (const product of obj) {
            const existingProduct = await productDao.getById(product.id);
            if (!existingProduct) {
                throw new CustomError('Producto no encontrado', 404);
            }
        }
        const updatedCart = {
            products: obj.map((p) => ({
                product: p.id,
                quantity: p.quantity,
            })),
        };

        return await cartDao.update(id, updatedCart)
    } catch (error) {
        throw (error)
    }
};

export const remove = async (idCart) => {
    try {
        const deletedCart = await cartDao.remove(idCart);
        if (!deletedCart) {
            throw new CustomError('Carrito no encontrado', 404)
        }
        return deletedCart;
    } catch (error) {
        throw error;
    }
};

export const addToCart = async (idCart, idProd) => {
    try {
        //verifica si el producto existe
        const existProd = await productDao.getById(idProd);
        if (!existProd) throw new CustomError('El producto no existe', 404)
        //verifica si el carrito existe
        const existCart = await cartDao.getById(idCart);
        if (!existCart) throw new CustomError('El carrito no existe', 404);
        return await cartDao.addToCart(idCart, idProd);
    } catch (error) {
        throw (error)
    }
}

export const removeFromCart = async (idCart, idProd) => {
    try {
        const cart = await cartDao.getById(idCart);
        if (!cart) throw new CustomError('Carrito no encontrado', 404);

        const productExists = cart.products.some((p) => p.product.toString() === idProd);
        if (!productExists) throw new CustomError('El producto no se encuentra en el carrito', 404);

        return await cartDao.removeFromCart(idCart, idPrd);
    } catch (error) {
        throw (error)
    }
};
