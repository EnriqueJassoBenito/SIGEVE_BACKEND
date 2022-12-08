const {Response, Router} = require("express");
const {findAll, findEnable, findById, save, update, disable, enable} = require("./movie_shows.gateway");
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
        const {movie, room, start_show, end_show, date_show, availability_msw} = req.body;
        const results = await save({movie, room, start_show, end_show, date_show, availability_msw});
        res.status(200).json({results});
    }catch (err) {
        console.log(err);
        const message = validateError(err);
        res.status(400).json({message});
    }
};

const modific = async (req, res = Response) => {
    try{
        const {movie, room, start_show, end_show, date_show, availability_msw, id_msw} = req.body;
        const results = await update({movie, room, start_show, end_show, date_show, availability_msw, id_msw});
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

const movieShowsRouter = Router();
movieShowsRouter.get(`/all`, [], getAll);
movieShowsRouter.get(`/all/enable`, [], getEnable);
movieShowsRouter.get(`/:id`, [], getById);
movieShowsRouter.post(`/save`, [], insert);
movieShowsRouter.put(`/update`, [], modific);
movieShowsRouter.put(`/disable/:id`, [], disa);
movieShowsRouter.put(`/enable/:id`, [], ena);

module.exports = {
    movieShowsRouter,
};