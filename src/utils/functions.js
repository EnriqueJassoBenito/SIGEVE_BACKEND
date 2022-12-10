const bcrypt = require("bcryptjs");

const validateError = (error) => {
    switch(error.message) {
        case "Wrong type":
            return "Review request fields";
        case "Missing fields":
            return "Validate fields";
        case "Inexistent role":
            return "Role not registered";
        case "Nothing found":
            return "No data found";
        case "Password mismatch":
            return "Credentials mismatch";
        case "User disabled":
            return "User disabled";
        case "User not found":
            return "Unkown or disabled user"
        case "Gender already exist":
            return "Gender already exist";
        case "Movie already exist":
            return error.message;
        case "Invalid name":
            return error.message;
        case "Invalid email":
            return error.message;
        case "Email already in use":
            return error.message;
        default:
            return "Review request";
    }
};

const hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(15);
    return await bcrypt.hash(password, salt);
};

const validatePassword = async (password, hashedPassword) => {
    return await bcrypt.compare(password, hashedPassword);
};

module.exports = {
    validateError,
    hashPassword,
    validatePassword,
};