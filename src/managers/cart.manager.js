import fs from "fs";
import { v4 as uuidv4 } from "uuid";
import path from "path";
import { prodMan } from "./product.manager.js";

class CartManager {
  constructor(path) {
    this.path = path;
  }

  //llamar a todos los carritos
  async getAllCarts() {
    try {
      if (fs.existsSync(this.path)) {
        const carts = await fs.promises.readFile(this.path, "utf-8");
        return JSON.parse(carts);
      } else return [];
    } catch (error) {
      throw new Error(error.message);
    }
  }

  //creacion del carrito
  async createCart() {
    try {
      const cart = {
        id: uuidv4(),
        products: [],
      };
      const carts = await this.getAllCarts();
      carts.push(cart);
      await fs.promises.writeFile(this.path, JSON.stringify(carts));
      return cart;
    } catch (error) {
      throw new Error(error);
    }
  }

  //llamar al carrito por id
  async getCartById(id) {
    try {
      const carts = await this.getAllCarts();
      return carts.find((c) => c.id === id);
    } catch (error) {
      throw new Error(error);
    }
  }

  //agregar producto al carrito
  async addToCart(cid, pid) {
    try {
      const prodIs = await prodMan.getById(pid);
      if (!prodIs) throw new Error("El producto no existe");
      let cart = await this.getAllCarts();
      const cartIs = await this.getCartById(cid);
      if (!cartIs) throw new Error("El carrito no existe");
      const productIsInCart = cartIs.products.find((p) => p.id === pid);
      if (!productIsInCart) {
        const product = {
          id: pid,
          quantity: 1
        };
        cartIs.products.push(product);
      } else productIsInCart.quantity += 1;

      const updatedCarts = cart.map((cart) => {
        if (cart.id === cid) return cartIs;
        return cart;
      });
      await fs.promises.writeFile(this.path, JSON.stringify(updatedCarts));
      return cartIs;
    } catch (error) {
      throw new Error(error);
    }
  }
}

export const cartManager = new CartManager(
  path.join(process.cwd(), "/data/carrito.json")
);
