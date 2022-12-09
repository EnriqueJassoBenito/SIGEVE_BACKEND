const {query} = require("../../../utils/mysql");

const findAll = async () => {
    const sql = `SELECT movie_shows.id_msw, movies.name_mve, rooms.number_room, movie_shows.start_show, 
                    movie_shows.end_show, movie_shows.date_show, movie_shows.availability_msw FROM movie_shows 
                    JOIN movies JOIN rooms ON movie_shows.movie = movies.id_mve && movie_shows.room = rooms.id_room;`;
    return await query(sql, []);
};

const findEnable = async () => {
    const sql = `SELECT movie_shows.id_msw, movies.name_mve, rooms.number_room, movie_shows.start_show, 
                    movie_shows.end_show, movie_shows.date_show, movie_shows.availability_msw FROM movie_shows 
                    JOIN movies JOIN rooms ON movie_shows.movie = movies.id_mve && movie_shows.room = rooms.id_room 
                    WHERE availability_msw = 1;`;
    return await query(sql, []);
};

const findById = async (id) => {
    if (Number.isNaN(id)) throw Error('Wrong type');
    if (!id) throw Error('Missing fields');
    const sql = `SELECT movie_shows.id_msw, movies.name_mve, rooms.number_room, movie_shows.start_show, 
                    movie_shows.end_show, movie_shows.date_show, movie_shows.availability_msw FROM movie_shows 
                    JOIN movies JOIN rooms ON movie_shows.movie = movies.id_mve && movie_shows.room = rooms.id_room 
                    WHERE id_msw = ?;`;
    return await query(sql, [id]);
};

const save = async (movie_shows) => {
    if (!movie_shows.movie || !movie_shows.room || !movie_shows.start_show || !movie_shows.end_show ||
        !movie_shows.date_show) throw Error('Missing fields');
    const sql = `INSERT INTO movie_shows(movie, room, start_show, end_show, date_show, availability_msw) 
                    VALUES(?, ?, ?, ?, ?, 1);`;
    const {insertedId} = await query(sql, [movie_shows.movie, movie_shows.room, movie_shows.start_show,
        movie_shows.end_show, movie_shows.date_show]);
    return {...movie_shows, id: insertedId};
};

const update = async (movie_shows) => {
    if (!movie_shows.movie || !movie_shows.room || !movie_shows.start_show || !movie_shows.end_show ||
        !movie_shows.date_show || !movie_shows.id_msw) throw Error('Missing fields');
    const sql = `UPDATE movie_shows SET movie = ?, room = ?, start_show = ?, end_show = ?, date_show = ?, 
                    availability_msw = 1 WHERE id_msw = ?;`;
    return await query(sql, [movie_shows.movie, movie_shows.room, movie_shows.start_show, movie_shows.end_show,
        movie_shows.date_show, movie_shows.id_msw]);
};

const disable = async (id) => {
    if (Number.isNaN(id)) throw Error('Wrong type');
    if (!id) throw Error('Missing fields');
    const sql = `UPDATE movie_shows SET availability_msw = 0 WHERE id_msw = ?;`;
    return await query(sql, [id]);
};

const enable = async (id) => {
    if (Number.isNaN(id)) throw Error('Wrong type');
    if (!id) throw Error('Missing fields');
    const sql = `UPDATE movie_shows SET availability_msw = 1 WHERE id_msw = ?;`;
    return await query(sql, [id]);
};

module.exports = {
    findAll, findEnable, findById, save, update, disable, enable,
};