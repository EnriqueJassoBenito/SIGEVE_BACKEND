const {query} = require("../../../utils/mysql");
const { decodeToken } = require('../../../config/jwt');

const findAll = async () => {
    const sql = `SELECT sales_tickets.id_ste, sales_tickets.movie_show_ste, users.name_usr, 
                    sales_tickets.total_count, sales_tickets.status_ste FROM sales_tickets 
                    JOIN movie_shows JOIN users ON sales_tickets.movie_show_ste = movie_shows.id_msw 
                    && sales_tickets.client_spo = users.id_usr;`;
    return await query(sql, []);
};

const findEnable = async () => {
    const sql = `SELECT sales_tickets.id_ste, sales_tickets.movie_show_ste, users.name_usr, 
                    sales_tickets.total_count, sales_tickets.status_ste FROM sales_tickets 
                    JOIN movie_shows JOIN users ON sales_tickets.movie_show_ste = movie_shows.id_msw 
                    && sales_tickets.client_spo = users.id_usr WHERE status_ste = 1;`;
    return await query(sql, []);
};

const findById = async (id) => {
    if (Number.isNaN(id)) throw Error('Wrong type');
    if (!id) throw Error('Missing fields');
    const sql = `SELECT sales_tickets.id_ste, sales_tickets.movie_show_ste, users.name_usr, 
                    sales_tickets.total_count, sales_tickets.status_ste FROM sales_tickets 
                    JOIN movie_shows JOIN users ON sales_tickets.movie_show_ste = movie_shows.id_msw 
                    && sales_tickets.client_spo = users.id_usr WHERE client_spo = ?;`;
    return await query(sql, [id]);
};

const save = async (sales_tickets) => {
    if (!sales_tickets.movie_show_ste || !sales_tickets.token || !sales_tickets.total_count) throw Error('Missing fields');
    const decodedToken= await decodeToken(sales_tickets.token)
    console.log(decodedToken.id)
    const sql = `INSERT INTO sales_tickets(movie_show_ste, client_spo, total_count) VALUES(?, ?, ?);`;
    const {insertedId} = await query(sql, [sales_tickets.movie_show_ste, decodedToken.id, sales_tickets.total_count]);
    return {...sales_tickets, id: insertedId};
};

const update = async (sales_tickets) => {
    if (!sales_tickets.movie_show_ste || !sales_tickets.client_spo || !sales_tickets.total_count || !sales_tickets.id_ste) throw Error('Missing fields');
    const sql = `UPDATE sales_tickets SET movie_show_ste = ?, client_spo = ?, total_count = ?, status_ste = 1 WHERE id_ste = ?;`;
    return await query(sql, [sales_tickets.movie_show_ste, sales_tickets.client_spo, sales_tickets.total_count, sales_tickets.id_ste]);
};

const disable = async (id) => {
    if (Number.isNaN(id)) throw Error('Wrong type');
    if (!id) throw Error('Missing fields');
    const sql = `UPDATE sales_tickets SET status_ste = 0 WHERE id_ste = ?;`;
    return await query(sql, [id]);
};

const enable = async (id) => {
    if (Number.isNaN(id)) throw Error('Wrong type');
    if (!id) throw Error('Missing fields');
    const sql = `UPDATE sales_tickets SET status_ste = 1 WHERE id_ste = ?;`;
    return await query(sql, [id]);
};

module.exports = {
    findAll, findEnable, findById, save, update, disable, enable,
};
