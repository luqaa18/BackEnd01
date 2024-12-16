import * as services from '../services/product.services.js';

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
        const { idProd } = req.params;
        const product = await services.getById(idProd);
        res.json(product);
    } catch (error) {
        next(error)
    }
};

export const create = async (req, res, next) => {
    try {
        const newProd = await services.create(req.body);
        res.json(newProd);
    } catch (error) {
        next(error)
    }
};

export const update = async (req, res, next) => {
    try {
        const { idProd } = req.params;
        const updProd = await services.update(idProd);
        res.json(updProd);
    } catch (error) {
        next(error)
    }
};

export const remove = async (req, res, next) => {
    try {
        const { idProd } = req.params;
        const delProd = await services.remove(idProd);
        res.json(delProd);
    } catch (error) {
        next(error)
    }
};