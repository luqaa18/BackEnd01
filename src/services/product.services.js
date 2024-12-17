import { productDao } from "../daos/mongodb/product.daos.js";
import { CustomError } from "../utils/error.custom.js";
import fs from 'fs'
import path from 'path'


export const getAll = async (page, limit, query, sort) => {
    try {
        return await productDao.getAll(page, limit, query, sort);
    } catch (error) {
        throw (error)
    }
};

export const getById = async (id) => {
    try {
        const prodExists = await productDao.getById(id);
        if (!prodExists) throw new CustomError('El producto no existe', 404);
        return prodExists;
    } catch (error) {
        throw (error)
    }
};

export const create = async (obj) => {
    try {
        const newProd = await productDao.create(obj);
        if (!newProd) throw new CustomError('Error al crear el producto', 400);
        return newProd;
    } catch (error) {
        throw (error)
    }
};

export const update = async (id, obj) => {
    try {
        const updProd = await productDao.update(id, obj);
        if (!updProd) throw new CustomError('Error al actualizar el producto', 400);
        return updProd;
    } catch (error) {
        throw (error)
    }
};

export const remove = async (id) => {
    try {
        const delProd = await productDao.delete(id);
        if (!delProd) throw new CustomError('Error al eliminar el prducto', 400);
        return `El producto con ID ${delProd._id} ha sido eliminado`;
    } catch (error) {
        throw (error)
    }
};