import bcryptjs from "bcryptjs";
import { User } from "../db.js";

// Rota para buscar todos os usuários
const Allusuario = async (req, res) => {
    try {
        const allUsers = await User.findAll();
        res.status(200).json(allUsers);
    } catch (error) {
        console.error("Erro ao buscar usuários:", error);
        res.status(500).json({ error: "Erro ao buscar usuários" });
    }
};

// Rota para buscar um usuário específico pelo email
const Oneusuario = async (req, res) => {
    const { email } = req.body;

    if (!email) {
        res.status(400).json({ error: "Insira o email do usuário na qual você gostaria de verificar." });
        return;
    }

    try {
        const user = await User.findOne({ where: { email } });
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ error: "Usuário não encontrado." });
        }
    } catch (error) {
        console.error("Erro ao buscar usuário:", error);
        res.status(500).json({ error: "Erro ao buscar usuário" });
    }
};

// Rota para deletar um usuário pelo email
const Deletaruser = async (req, res) => {
    const { email } = req.body

    if (!email) {
        res.send('Insira o email do usuário na qual você gostaria de deletar.');
        return
    }
    
    const ByeUser = await User.destroy({ where: { email: email } })
    if (ByeUser) {
        res.send("Usuário deletado");
    } else {
        res.send("Usuário não encontrado.");
    }
}

// Rota para trocar a senha do usuário
const trocarSenha = async (req, res) => {
    const { id, senhaAtual, novaSenha } = req.body;

    if (!id || !senhaAtual || !novaSenha) {
        res.status(400).json({ error: "Todos os campos devem ser preenchidos" });
        return;
    }

    try {
        const user = await User.findByPk(id);
        if (!user) {
            res.status(404).json({ error: "Usuário não encontrado." });
            return;
        }

        const senhaValida = bcryptjs.compareSync(senhaAtual, user.senha);
        if (!senhaValida) {
            res.status(401).json({ error: "Senha inválida" });
            return;
        }

        const senhaCriptografada = bcryptjs.hashSync(novaSenha, 10);
        user.senha = senhaCriptografada;
        await user.save();
        res.status(200).json({ message: "Senha atualizada com sucesso." });
    } catch (error) {
        console.error("Erro ao atualizar senha:", error);
        res.status(500).json({ error: "Erro ao atualizar senha" });
    }
}

const ChangePass = async (req, res) => {
    const data = req.body;
    const user = await User.findOne({ where: { email: data.email } });
    if (!user) {
        res.send("Usuário não encontrado.")
        return
    }
}

const SaveProfilePic = async (req, res) => {
    try {
        const data = req.body
        const user = await User.findOne({ where: { email: data.email } })
        if (!user) {
            return res.send("Usuário não encontrado.")
        }

        console.log(data.foto)
        const update = await User.update({ foto: data.foto }, { where: { email: data.email } })
        res.send('Foto de perfil atualizada com sucesso.')
    } catch (error) {
        console.log(error)
    }
    
}



export { Allusuario, Oneusuario, Deletaruser, trocarSenha, SaveProfilePic, ChangePass };
