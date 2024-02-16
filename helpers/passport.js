const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const { User } = require("../models");
const { comparePassword } = require("./password");

const authenticate = async (username, password, done) => {
    try {
        let user = await User.findOne({ where: { username } });

        if (!comparePassword(password, user.password)) {
            return done(null, false, { message: "Wrong password!" });
        }

        done(null, user);
    } catch (error) {
        return done(null, false, { message: "User not found!" });
    }
};

passport.use(
  new LocalStrategy(
    {
      usernameField: "username",
      passwordField: "password",
    },
    authenticate
  )
);

// Serialize user digunakan untuk membuat sesi ketika user berhasil login
passport.serializeUser((user, done) => {
    return done(null, user.id);
});

// Deserialize user digunakan untuk menghapus sesi ketika user logout
passport.deserializeUser(async (id, done) => {
    const user = await User.findByPk(id);
    return done(null, user);
});

module.exports = passport;
