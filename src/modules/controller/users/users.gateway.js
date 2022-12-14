const {query} = require("../../../utils/mysql");
const {decodeToken} = require("../../../config/jwt");

const findAll = async () => {
    const sql = `SELECT * FROM users;`;
    return await query(sql, []);
};

const findEnable = async () => {
    const sql = `SELECT * FROM users WHERE status_usr = 1;`;
    return await query(sql, []);
};

const findById = async (id) => {
    if (Number.isNaN(id)) throw Error('Wrong type');
    if (!id) throw Error('Missing fields');
    const sql = `SELECT * FROM users WHERE id_usr = ?;`;
    return await query(sql, [id]);
};

const save = async (users) => {
    if (!users.name_usr || !users.email_usr || !users.password_usr || !users.role_usr || !users.saldo_usr) throw Error('Missing fields');
    const sql = `INSERT INTO users(name_usr, email_usr, password_usr, status_usr, role_usr, saldo_usr) VALUES(?, ?, ?, 1, ?, ?);`;
    const {insertedId} = await query(sql, [users.name_usr, users.email_usr, users.password_usr, users.role_usr, users.saldo_usr]);
    return {...users, id: insertedId};
};
const saveus = async (users) => {
    if (!users.name || !users.email || !users.password) throw Error('Faltan campos');
    const sql = `INSERT INTO users(name_usr, email_usr, password_usr, status_usr, role_usr, saldo_usr) VALUES(?, ?, ?, 0, 1, 0);`;
    const {insertedId} = await query(sql, [users.name, users.email, users.password]);
    return {...users, id: insertedId};
};

const update = async (users) => {
    if (!users.name_usr || !users.email_usr || !users.password_usr || !users.role_usr || !users.saldo_usr || !users.id_usr) throw Error('Missing fields');
    const sql = `UPDATE users SET name_usr = ?, email_usr = ?, password_usr = ?, status_usr = 1, role_usr = ?, saldo_usr = ? WHERE id_usr = ?;`;
    return await query(sql, [users.name_usr, users.email_usr, users.password_usr, users.role_usr, users.saldo_usr, users.id_usr]);
};

const disable = async (id) => {
    if (Number.isNaN(id)) throw Error('Wrong type');
    if (!id) throw Error('Missing fields');
    const sql = `UPDATE users SET status_usr = 0 WHERE id_usr = ?;`;
    return await query(sql, [id]);
};

const enable = async (token) => {
    if (!token) throw Error('Missing fields');
    const decodedToken= await decodeToken(token);
    const sql = `UPDATE users SET status_usr = 1 WHERE email_usr = ?;`;
    console.log(decodedToken)
    return await query(sql, [decodedToken.email]);
};

const emailexist=async(email)=>{
    if(!email) throw Error('Missing fields');
    const sql="SELECT * FROM users WHERE email_usr = ?;"
    return await query(sql,[email]);
}

module.exports = {
    emailexist, findAll, findEnable, findById, save, saveus, update, disable, enable,
};
