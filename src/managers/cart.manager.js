import fs from "fs";
import { v4 as uuidv4 } from "uuid";

class CartManager {
  constructor(path) {
    this.path = path;
  }

  async create(){
    try {
        const cart = {
            id: uuidv4(),
            products: []
        }
    } catch (error) {
        
    }
  }
}

const cartManager = new CartManager();
export default cartManager;