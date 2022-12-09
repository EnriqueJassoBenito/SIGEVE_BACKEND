const {query} = require("../../../utils/mysql");

const findAll = async () => {
    const sql = `SELECT * FROM rooms;`;
    return await query(sql, []);
};

const findEnable = async () => {
    const sql = `SELECT * FROM rooms WHERE status_room = 1;`;
    return await query(sql, []);
};

const findById = async (id) => {
    if (Number.isNaN(id)) throw Error('Wrong type');
    if (!id) throw Error('Missing fields');
    const sql = `SELECT * FROM rooms WHERE id_room = ?;`;
    return await query(sql, [id]);
};

const save = async (rooms) => {
    if (!rooms.number_room || !rooms.capacity) throw Error('Missing fields');
    const sql = `INSERT INTO rooms(number_room, status_room, capacity) VALUES(?, 1, ?);`;
    const {insertedId} = await query(sql, [rooms.number_room, rooms.capacity]);
    return {...rooms, id: insertedId};
};

const update = async (rooms) => {
    if (!rooms.number_room || !rooms.capacity || !rooms.id_room) throw Error('Missing fields');
    const sql = `UPDATE rooms SET number_room = ?, status_room = 1, capacity = ? WHERE id_room = ?;`;
    return await query(sql, [rooms.number_room, rooms.capacity, rooms.id_room]);
};

const disable = async (id) => {
    if (Number.isNaN(id)) throw Error('Wrong type');
    if (!id) throw Error('Missing fields');
    const sql = `UPDATE rooms SET status_room = 0 WHERE id_room = ?;`;
    return await query(sql, [id]);
};

const enable = async (id) => {
    if (Number.isNaN(id)) throw Error('Wrong type');
    if (!id) throw Error('Missing fields');
    const sql = `UPDATE rooms SET status_room = 1 WHERE id_room = ?;`;
    return await query(sql, [id]);
};

module.exports = {
    findAll, findEnable, findById, save, update, disable, enable,
};