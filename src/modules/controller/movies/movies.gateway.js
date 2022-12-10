const {query} = require("../../../utils/mysql");

const findAll = async () => {
    const sql = `SELECT movies.id_mve, movies.name_mve, movies.duration, genders.name_gdr, movies.availability_mve, movies.image_mve 
                        FROM movies JOIN genders ON movies.gender = genders.id_gdr;`;
    return await query(sql, []);
};
const getNames = async (name) => {
    const sql = "SELECT * FROM cinema.movies where name_mve like ? ;";
    return await query(sql, [name]);
};

const findEnable = async () => {
    const sql = `SELECT movies.id_mve, movies.name_mve, movies.duration, genders.name_gdr, movies.availability_mve, movies.image_mve 
                        FROM movies JOIN genders ON movies.gender = genders.id_gdr WHERE availability_mve = 1;`;
    return await query(sql, []);
};

const findById = async (id) => {
    if (Number.isNaN(id)) throw Error('Wrong type');
    if (!id) throw Error('Missing fields');
    const sql = `SELECT movies.id_mve, movies.name_mve, movies.duration, genders.name_gdr, movies.availability_mve, movies.image_mve 
                        FROM movies JOIN genders ON movies.gender = genders.id_gdr WHERE id_mve = ?;`;
    return await query(sql, [id]);
};

const save = async (movie) => {
    if (!movie.name_mve || !movie.duration || !movie.gender || !movie.image_mve) throw Error('Missing fields');
    const sql = `INSERT INTO movies(name_mve, duration, gender, availability_mve, image_mve) VALUES(?, ?, ?, 1, ?);`;
    const {insertedId} = await query(sql, [movie.name_mve, movie.duration, movie.gender, movie.image_mve]);
    return {...movie, id: insertedId};
};

const update = async (movie) => {
    if (!movie.name_mve || !movie.duration || !movie.gender || !movie.image_mve || !movie.id_mve) throw Error('Missing fields');
    const sql = `UPDATE movies SET name_mve = ?, duration = ?, gender = ?, availability_mve = 1, image_mve = ? WHERE id_mve = ?;`;
    return await query(sql, [movie.name_mve, movie.duration, movie.gender, movie.image_mve, movie.id_mve]);
};

const disable = async (id) => {
    if (Number.isNaN(id)) throw Error('Wrong type');
    if (!id) throw Error('Missing fields');
    const sql = `UPDATE movies SET availability_mve = 0 WHERE id_mve = ?`;
    return await query(sql, [id]);
};

const enable = async (id) => {
    if (Number.isNaN(id)) throw Error('Wrong type');
    if (!id) throw Error('Missing fields');
    const sql = `UPDATE movies SET availability_mve = 1 WHERE id_mve = ?;`;
    return await query(sql, [id]);
};

module.exports = {
  findAll, findEnable, findById, save, update, disable, enable,getNames
};