const passport = require("passport");
const { User } = require("../models");

class AuthController {
  static async register(req, res) {
    const { username, password } = req.body;

    try {
      if (username === "" || password === "") {
        return res.redirect("/register");
      }

      await User.create({ username, password });
      return res.redirect("/login");
    } catch (error) {
      return res.redirect("/register");
    }
  }

  static login = passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureMessage: true,
  });

  static logout(req, res) {
    req.logout(() => {
      res.redirect("/login");
    });
  }
}

class AuthPageController {
    static registerPage(req, res) {
        res.render("register");
    }

    static loginPage(req, res) {
        let message = "";
        
        if (req.session) {
            if (req.session.messages) {
                message = req.session.messages[0];
                req.session.messages = [];
            }
        }

        return res.render("login", { message });
    }

    static async greet(req, res) {
        try {
            const sessionUserId = req.session.passport.user;
            const user = await User.findByPk(sessionUserId);
            return res.render("greet", { message: `Hello ${user.username}` });
        } catch (error) {
            return res.redirect("/login");
        }
    }
}

// Hanya untuk login behaviornya beda sendiri


module.exports = { AuthController, AuthPageController };
