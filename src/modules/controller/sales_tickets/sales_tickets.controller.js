const {Response, Router} = require("express");
const {findAll, findEnable, findById, save, update, disable, enable} = require("./sales_tickets.gateway");
const {validateError} = require("../../../utils/functions");

const getAll = async (req, res = Response) => {
    try{
        const results = await findAll();
        res.status(200).json(results);
    }catch (err) {
        console.log(err);
        const message = validateError(err);
        res.status(400).json({message});
    }
};

const getEnable = async (req, res = Response) => {
    try{
        const results = await findEnable();
        res.status(200).json(results);
    }catch (err) {
        console.log(err);
        const message = validateError(err);
        res.status(400).json({message});
    }
};

const getById = async (req, res = Response) => {
    try{
        const {id} = req.params;
        const results = await findById(id);
        res.status(200).json(results);
    }catch (err) {
        console.log(err);
        const message = validateError(err);
        res.status(400).json({message});
    }
};

const insert = async (req, res = Response) => {
    try{
        const {movie_show_ste, client_spo, total_count} = req.body;
        const results = await save({movie_show_ste, client_spo, total_count});
        res.status(200).json({results});
    }catch (err) {
        console.log(err);
        const message = validateError(err);
        res.status(400).json({message});
    }
};

const modific = async (req, res = Response) => {
    try{
        const {movie_show_ste, client_spo, total_count, id_ste} = req.body;
        const results = await update({movie_show_ste, client_spo, total_count, id_ste});
        res.status(200).json({results});
    }catch (err) {
        console.log(err);
        const message = validateError(err);
        res.status(400).json({message});
    }
};

const disa = async (req, res = Response) => {
    try{
        const {id} = req.params;
        const results = await disable(id);
        res.status(200).json(results);
    }catch (err) {
        console.log(err);
        const message = validateError(err);
        res.status(400).json({message});
    }
};

const ena = async (req, res = Response) => {
    try{
        const {id} = req.params;
        const results = await enable(id);
        res.status(200).json(results);
    }catch (err) {
        console.log(err);
        const message = validateError(err);
        res.status(400).json({message});
    }
};

const salesTicketsRouter = Router();
salesTicketsRouter.get(`/all`, [], getAll);
salesTicketsRouter.get(`/all/enable`, [], getEnable);
salesTicketsRouter.get(`/:id`, [], getById);
salesTicketsRouter.post(`/save`, [], insert);
salesTicketsRouter.put(`/update`, [], modific);
salesTicketsRouter.put(`/disable/:id`, [], disa);
salesTicketsRouter.put(`/enable/:id`, [], ena);

module.exports = {
    salesTicketsRouter,
};