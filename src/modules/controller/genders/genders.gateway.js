const {query} = require("../../../utils/mysql");

const findAll = async () => {
    const sql = `SELECT * FROM genders;`;
    return await query(sql, []);
};

const findEnable = async () => {
  const sql = `SELECT * FROM genders WHERE status_gdr = 1;`;
  return await query(sql, []);
};

const findById = async (id) => {
    if (Number.isNaN(id)) throw Error('Wrong type');
    if (!id) throw Error('Missing fields');
    const sql = `SELECT * FROM genders WHERE id_gdr = ?;`;
    return await query(sql, [id]);
};

const save = async (gender) => {
    if (!gender.name_gdr) throw Error('Missing fields');
    const sql = `INSERT INTO genders (name_gdr, status_gdr) VALUES(?, 1);`;
    const {insertedId} = await query(sql, [gender.name_gdr]);
    return {...gender, id: insertedId};
};

const update = async (gender) => {
    if (!gender.name_gdr || !gender.id_gdr) throw Error('Missing fields');
    const sql = `UPDATE genders SET name_gdr = ?, status_gdr = 1 WHERE id_gdr = ?;`;
    return await query(sql, [gender.name_gdr, gender.id_gdr]);
};

const disable = async (id) => {
    if (Number.isNaN(id)) throw Error('Wrong type');
    if (!id) throw Error('Missing fields');
    const sql = `UPDATE genders SET status_gdr = 0 WHERE id_gdr = ?;`;
    return await query(sql, [id]);
};

const enable = async (id) => {
    if (Number.isNaN(id)) throw Error('Wrong type');
    if (!id) throw Error('Missing fields');
    const sql = `UPDATE genders SET status_gdr = 1 WHERE id_gdr = ?;`;
    return await query(sql, [id]);
};

module.exports = {
  findAll, findEnable, findById, save, update, disable, enable,
};