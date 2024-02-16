const bcrypt = require("bcrypt");
const SALT = 10;
function hashPassword(password) {
    return bcrypt.hashSync(password, SALT);
}

function comparePassword(password, hashedPassword) {
    return bcrypt.compareSync(password, hashedPassword);
}

module.exports = { hashPassword, comparePassword };
