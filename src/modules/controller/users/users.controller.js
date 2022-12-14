const {Response, Router} = require("express");
const {emailexist, findAll, findEnable, findById, save, saveus, update, disable, enable} = require("./users.gateway");
const {validateError} = require("../../../utils/functions");
const { transporter, template } = require('../../../utils/email-service');
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
        const {name_usr, email_usr, password_usr, role_usr, saldo_usr} = req.body;
        const results = await save({name_usr, email_usr, password_usr, role_usr, saldo_usr});
        res.status(200).json({results});
    }catch (err) {
        console.log(err);
        const message = validateError(err);
        res.status(400).json({message});
    }
};
const register = async (req, res = Response) => {
    try{
        const emailexis = await emailexist(req.body.email);
        console.log(emailexis);
        if( /^[a-zA-Z]+$/.test(req.body.name)==false) throw Error("Invalid name");
        if(/^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i.test(req.body.email) == false) throw Error("Invalid email");
        if(emailexis[0] != null) throw Error("Email already in use");
        const {name, email, password} = req.body;
        const results = await saveus({name, email, password});
        // const info = await transporter.sendMail({
        //     from: `Pochopolis <${ process.env.EMAIL_USER }>`,
        //     to: email,
        //     subject: 'Se registro correctamente',
        //     html: template(name, 'Se registro correctamente', email)
        // });
        // console.log(info);
        res.status(200).json({results});
    }catch (err) {
        console.log(err);
        const message = validateError(err);
        res.status(400).json({message});
    }
};


const modific = async (req, res = Response) => {
    try{
        const {name_usr, email_usr, password_usr, role_usr, saldo_usr, id_usr} = req.body;
        const results = await update({name_usr, email_usr, password_usr, role_usr, saldo_usr, id_usr});
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
userRouter.post(`/register`, [], register);
userRouter.put(`/update`, [], modific);
userRouter.put(`/disable/:id`, [], disa);
userRouter.put(`/enable/:id`, [], ena);

module.exports = {
    userRouter,
};