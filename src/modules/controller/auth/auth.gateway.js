const { query } = require('../../../utils/mysql');
const { generateToken } = require('../../../config/jwt');

const login = async (email, password) => {
    console.log(email, password);
    if (!email || !password) throw Error('User fields');
    const sql = `SELECT * FROM users WHERE email_usr = ? && password_usr = ? && status_usr = 1;`;
    const existsUser = await query(sql, [email, password]);
    if (existsUser.length === 0) throw Error('User not found or not enable');
    if (await !existsUser[0].password) {
        return {
            token: generateToken({
                id: existsUser[0].id_usr,
                email: email,
                password: password,
                role: existsUser[0].role_usr
            }),
        };
    }
};

module.exports = { login };
