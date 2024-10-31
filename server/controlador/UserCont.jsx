import { User } from "../db.js";

const Allusuario = async (req, res) => {
    const listaUsuarios = await User.findAll();
    res.send(listaUsuarios)
}

const Oneusuario = async (req, res) => {
    const {email} = req.body
    if(!email){
        res.send('Insira o email do usuario que você deseja pesquisar')
        return
    }
    const findUsuario = await User.findOne({where: {email:email}})
    res.send(findUsuario)
}


export {Allusuario, Oneusuario}