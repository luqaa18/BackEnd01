import { productModel } from "./models/product.model.js";

class ProductDaoMongo {
  constructor(model) {
    this.model = model
  }

  async getAll(page = 1, limit = 10, query = {}, sort) {
    try {
      // const filter = title ? { 'title': title } : {};
      const filter = { ...query };
      if (filter.title) filter.title = { $regex: filter.title, $options: 'i' };
      let sortOrder = {};
      if (sort) sortOrder.price = sort === 'asc' ? 1 : sort === 'desc' ? -1 : null;
      return await this.model.paginate(filter, { page, limit, sort: sortOrder })
    } catch (error) {
      throw new Error(error);
    }
  }

  async getById(id) {
    try {
      return await this.model.findById(id)
      // this.model.findOne({ _id: id })
      //db.products.findOne({ _id: ObjectId('fsfsdfsdf') })
    } catch (error) {
      throw new Error(error);
    }
  }

  async create(obj) {
    try {
      return await this.model.create(obj)
      //db.products.insertOne(obj)
    } catch (error) {
      throw new Error(error);
    }
  }

  async update(id, obj) {
    try {
      return await this.model.findByIdAndUpdate(id, obj, { new: true });
    } catch (error) {
      throw new Error(error);
    }
  }

  async delete(id) {
    try {
      return await this.model.findByIdAndDelete(id)
    } catch (error) {
      throw new Error(error);
    }
  }
}

export const productDao = new ProductDaoMongo(productModel);
