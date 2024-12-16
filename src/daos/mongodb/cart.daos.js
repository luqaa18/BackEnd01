import { cartModel } from "./models/cart.model.js";

class CartDaoMongo {
    constructor(model) {
        this.model = model;
    }

    //llamar a todos los carritos
    async getAll() {
        try {
            return await this.model.find({})
        } catch (error) {
            throw new Error(error);
        }
    }

    //creacion del carrito
    async create() {
        try {
            return await this.model.create({
                products: [],
            }
            )
        } catch (error) {
            throw new Error(error);
        }
    }

    //llamar al carrito por id
    async getById(id) {
        try {
            return await this.model.findById(id).populate('products.product');
        } catch (error) {
            throw new Error(error);
        }
    }

    async update(id, obj) {
        try {
            const response = await this.model.findByIdAndUpdate(id, obj, { new: true });
            return response;
        } catch (error) {
            throw new Error(error);

        }
    }

    async remove(id) {
        try {
            return await this.model.findByIdAndDelete(id);
        } catch (error) {
            throw new Error(error);

        }
    }

    async existsProdInCart(cid, pid) {
        try {
            // Busca el carrito y verifica si contiene el producto
            const cart = await this.model.findOne(
                { _id: cid, 'products.product': pid },
                { 'products.$': 1 } // Solo devuelve el producto que coincide
            );
            return cart?.products[0] || null;
        } catch (error) {
            throw new Error(`Error verificando existencia del producto ${pid} en el carrito ${cid}: ${error.message}`);
        }
    }


    //agregar producto al carrito
    async addToCart(cid, pid) {
        try {
            const existsProdInCart = await this.existsProdInCart(cid, pid);

            if (existsProdInCart) {
                return await this.model.findOneAndUpdate(
                    { _id: cid, 'products.product': pid },
                    { $inc: { 'products.$.quantity': 1 } },
                    { new: true }
                );
            } else {
                return await this.model.findByIdAndUpdate(
                    cid,
                    { $push: { products: { product: pid, quantity: 1 } } },
                    { new: true }
                );
            }
        } catch (error) {
            throw new Error(`Error al agregar producto ${pid} al carrito ${cid}: ${error.message}`);
        }
    }

    async removeFromCart(cid, pid) {
        try {
            return await this.model.findByIdAndUpdate(
                cid,
                { $pull: { products: { product: pid } } },
                { new: true }
            );
        } catch (error) {
            throw new Error(error);
        }
    }

}

export const cartDao = new CartDaoMongo(cartModel);