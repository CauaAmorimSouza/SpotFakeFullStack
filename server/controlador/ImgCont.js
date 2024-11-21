import { User } from '../db.js'

const ChangeProfilePicture = async (req, res) => {
    const { id } = req.params; // ID do usuário vindo da URL
    const { imagemPerfil } = req.body; // Caminho da nova imagem enviado no corpo da requisição

    if (!imagemPerfil) {
        res.status(400).send('A nova imagem de perfil deve ser fornecida.');
        return;
    }

    try {
        const user = await User.findByPk(id);
        if (!user) {
            res.status(404).send("Usuário não encontrado.");
            return;
        }

        user.imagemPerfil = imagemPerfil; // Atualiza o campo da imagem de perfil
        await user.save();
        res.status(200).send('Imagem de perfil atualizada com sucesso.');
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro ao atualizar a imagem de perfil.');
    }
};

export { ChangeProfilePicture };
