const {Response, Router} = require("express");
const {findAll, findEnable, findById, save, update, disable, enable,getNames} = require("./movies.gateway");
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
        const {name_mve, duration, gender, image_mve} = req.body;
        const movieExist=await getNames(name_mve);
        if(movieExist[0]!=null)throw Error('Movie already exist');
        const results = await save({name_mve, duration, gender, image_mve});
        res.status(200).json({results});
    }catch (err) {
        console.log(err);
        const message = validateError(err);
        res.status(400).json({message});
    }
};

const modific = async (req, res = Response) => {
    try{
        const {name_mve, duration, gender, image_mve, id_mve} = req.body;
        const results = await update({name_mve, duration, gender, image_mve, id_mve});
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

const movieRouter = Router();
movieRouter.get(`/all`, [], getAll);
movieRouter.get(`/all/enable`, [], getEnable);
movieRouter.get(`/:id`, [], getById);
movieRouter.post(`/save`, [], insert);
movieRouter.put(`/update`, [], modific);
movieRouter.put(`/disable/:id`, [], disa);
movieRouter.put(`/enable/:id`, [], ena);

module.exports = {
  movieRouter,
};