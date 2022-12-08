const {Response, Router} = require("express");
const {findAll, findEnable, findById, save, update, disable, enable} = require("./rooms.gateway");
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
        const {number_room, status_room, capacity} = req.body;
        const results = await save({number_room, status_room, capacity});
        res.status(200).json({results});
    }catch (err) {
        console.log(err);
        const message = validateError(err);
        res.status(400).json({message});
    }
};

const modific = async (req, res = Response) => {
    try{
        const {number_room, status_room, capacity, id_room} = req.body;
        const results = await update({number_room, status_room, capacity, id_room});
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

const roomRouter = Router();
roomRouter.get(`/all`, [], getAll);
roomRouter.get(`/all/enable`, [], getEnable);
roomRouter.get(`/:id`, [], getById);
roomRouter.post(`/save`, [], insert);
roomRouter.put(`/update`, [], modific);
roomRouter.put(`/disable/:id`, [], disa);
roomRouter.put(`/enable/:id`, [], ena);

module.exports = {
    roomRouter,
};