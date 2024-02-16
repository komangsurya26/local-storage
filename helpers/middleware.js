function restrict(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }

    return res.redirect("/login");
}

function ensureNotLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        // Jika pengguna sudah masuk, arahkan ke halaman lain
        return res.redirect('/');
    }
    // Jika pengguna belum masuk, lanjutkan ke handler berikutnya
    next();
}

module.exports = { restrict, ensureNotLoggedIn };
