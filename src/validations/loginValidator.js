const { check, body } = require("express-validator");
const { users } = require("../database");

module.exports = [
    check("email")
    .notEmpty()
    .withMessage("El email es obligatorio").bail()
    .isEmail()
    .withMessage("Email inválido"),

    body("email")
    .custom(value => {
        let user = users.find(user => user.email === value)/* si encuentro el suaurio me va a devolver el objeto con el usuario,en el vaso de que no lo encuetre me devuelve undefined */

        return user !==undefined;/* es un boleano, me devuelve true ya que es undefinded */
    })
   .withMessage("Email no registrado"),

    check('pass')
    .notEmpty()
    .withMessage('Debes escribir tu contraseña'),

    body("pass")
    .custom((value,  {req})=> {
        let user = users.find(user => user.email === req.body.email);/* en el caso de que no encuente le usuario solo mandara mensaje de rrorr */

        return user.pass === value;/*  en caso de que sea correcto retorna un true */
    })
    .withMessage("Contraseña inválida")/* menos informacion para la persona que quiere acceder al sistema de forma ilicita */



]