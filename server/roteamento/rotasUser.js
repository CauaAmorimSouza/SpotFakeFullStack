import express from "express";
import { Allusuario, Oneusuario, Deletaruser, trocarSenha, ChangePass, SaveProfilePic } from "../controlador/UserCont.js";

const rotasUser = express.Router();

rotasUser.get('/user', Allusuario);
rotasUser.delete('/delete', Deletaruser);
rotasUser.get('/oneuser', Oneusuario);
rotasUser.put('/mudar_senha', ChangePass)
rotasUser.put('/mudar_foto', SaveProfilePic)
rotasUser.put('/trocasenha', trocarSenha);

export { rotasUser };
