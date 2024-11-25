import express from "express"
import { Allusuario, Oneusuario, Deletaruser, trocarSenha } from "../controlador/UserCont.js"

const rotasUser = express.Router()

rotasUser.get('/user', Allusuario )

rotasUser.delete('/delete', Deletaruser)

rotasUser.get('/oneuser', Oneusuario )

rotasUser.put('/trocasenha', trocarSenha)

export {rotasUser}