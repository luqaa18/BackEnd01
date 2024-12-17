import * as services from '../services/product.services.js';

export const getAll = async (req, res, next) => {
    try {
        const { page, limit, sort, ...query } = req.query;
        const response = await services.getAll(page, limit, query, sort);
        res.json({
            results: response.docs,
            info: {
                // status: results==response.docs? "success" : 'error',
                payload: response.limit,
                totalPages: response.totalPages,
                prevPage: response.prevPage,
                nextPage: response.nextPage,
                page: response.page,
                hasPrevPage: response.hasPrevPage,
                hasNextPage: response.hasNextPage,
                prevLink: response.hasPrevPage ? `http://localhost:8080/api/products?page=${response.prevPage}` : null,
                nextLink: response.hasNextPage ? `http://localhost:8080/api/products?page=${response.nextPage}` : null
            }
        });
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
