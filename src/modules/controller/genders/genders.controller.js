const {Response, Router} = require("express");
const {findAll, findEnable, findById, save, update, disable, enable,getNames} = require("./genders.gateway");
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
        const {name_gdr} = req.body;
        const existbefore=await getNames(name_gdr);
        if( /^[a-zA-Z]+$/.test(name_gdr)==false) throw Error("Invalid name");
        if(existbefore[0]!=null) throw Error('Gender already exist')
        const results = await save({name_gdr});
        res.status(200).json({results});
    }catch (err) {
        console.log(err);
        const message = validateError(err);
        res.status(400).json({message});
    }
};

const modific = async (req, res = Response) => {
    try{
        const {name_gdr, id_gdr} = req.body;
        const results = await update({name_gdr, id_gdr});
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

const genderRouter = Router();
genderRouter.get(`/all`, [], getAll);
genderRouter.get(`/all/enable`, [], getEnable);
genderRouter.get(`/:id`, [], getById);
genderRouter.post(`/save`, [], insert);
genderRouter.put(`/update`, [], modific);
genderRouter.put(`/disable/:id`, [], disa);
genderRouter.put(`/enable/:id`, [], ena);

module.exports = {
  genderRouter,
};