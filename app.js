require('dotenv').config()
const express = require("express");
const session = require("express-session");
const { router } = require("./routes");
const passport = require("./helpers/passport");
const pg = require('pg')
const pgSession = require('connect-pg-simple')(session)

const PORT = 3000;

const app = express();

app.use(express.urlencoded({ extended: false }));
// app.use(express.json());  //Tidak Perlu Diaktifkan

const pgPool = new pg.Pool({
    user: process.env.USERNAME,
    host: process.env.HOST,
    database: process.env.DATABASE,
    password: process.env.PASSWORD,
    port: process.env.PORT
})

app.use(
  session({
    store: new pgSession({
        pool: pgPool,
        createTableIfMissing: true, //untuk membuat table jika tidak ada(wajib)
        tableName: 'user_sessions', // Nama tabel yang diinginkan
    }),
    secret: 'secret-key',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 }, // 30 days
  })
);

// Tambahkan middleware session
app.use(passport.initialize());
app.use(passport.session());

app.set("view engine", "ejs");
app.use(router);

app.listen(PORT, () => console.log("Server running on port:", PORT));
