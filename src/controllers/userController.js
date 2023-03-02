const { users, writeUsersJson } = require("../database");
const { validationResult } = require("express-validator");
const session = require("express-session");
module.exports = {
    login: (req, res) => {
        res.render("login", { session: req.session })
    },
    /* recibe los datos del login */
    processLogin: (req, res) => {
        let errors = validationResult(req) ;
/* si errores esta vacion usuario logueado */
        if (errors.isEmpty()) {
            let user = users.find(user => user.email === req.body.email);
            /* creo la sesion */
            req.session.user = {
                name: user.name,
                avatar: user.avatar,
                rol: user.rol

                /* ...user */ /*  me genera un clon de  todas las propiedades del objeto, en este caso me esta generando todas la propiedades del u¿objeti user, tambien lo puedo usar en array, pero no lo voy a  usar porque no quiero todas las propiedades */
            }

            /* asignar auna variable global ques este en local, es una variable global que permite acceder a datos */
            /* lo que hago es que se me guarden los datos de locals y session, loacls nos permite acceder desde la vista  */
            res.locals.user = req.session.user;

            res.redirect("/");


        }else{
            return res.render("login", {
                errors: errors.mapped(),
                session:req.session
            })
        }
    },

    register: (req, res) => {
        res.render("register"), 
        session.req.session
    },
    processRegister: (req, res) => {
        let errors = validationResult(req);

        if(errors.isEmpty()) {
            let lastId = 0;

            users.forEach(user => {
             if(user.id > lastId) {
                 lastId = user.id;
             }
            });
     
            let newUser = {
             id: lastId + 1,
             name: req.body.name,
             last_name: req.body.last_name,
             email: req.body.email,
             pass: req.body.pass1,
             avatar: req.file ? req.file.filename : "default-image.png",
             rol: "USER",
             tel: "",
             address: "",
             postal_code: "",
             province: "",
             city: ""
            };
     
            users.push(newUser);
     
            writeUsersJson(users);
     
            res.send("Usuario creado")
        } else {
            res.render("register", {
                errors: errors.mapped(),
                old: req.body,
                session: req.session
            })
        }
      
    }
}