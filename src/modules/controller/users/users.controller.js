const {Response, Router} = require("express");
const {findAll, findEnable, findById, save, update, disable, enable} = require("./users.gateway");
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
        const {name_usr, email_usr, password_usr, status_usr, role_usr, saldo_usr} = req.body;
        const results = await save({name_usr, email_usr, password_usr, status_usr, role_usr, saldo_usr});
        res.status(200).json({results});
    }catch (err) {
        console.log(err);
        const message = validateError(err);
        res.status(400).json({message});
    }
};

const modific = async (req, res = Response) => {
    try{
        const {name_usr, email_usr, password_usr, status_usr, role_usr, saldo_usr, id_usr} = req.body;
        const results = await update({name_usr, email_usr, password_usr, status_usr, role_usr, saldo_usr, id_usr});
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

const userRouter = Router();
userRouter.get(`/all`, [], getAll);
userRouter.get(`/all/enable`, [], getEnable);
userRouter.get(`/:id`, [], getById);
userRouter.post(`/save`, [], insert);
userRouter.put(`/update`, [], modific);
userRouter.put(`/disable/:id`, [], disa);
userRouter.put(`/enable/:id`, [], ena);

module.exports = {
    userRouter,
};