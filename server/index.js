import Express from "express";
import { criarTabelas, User } from "./db.js";

const app = Express()
app.use(Express.json())
//criarTabelas()

app.post('/registro', async (req, res) => {
    const {nome, sobrenome, email, senha, dataNascimento} = req.body

    if(!nome || !sobrenome || !email || !senha || !dataNascimento){
        res.send('você deve preecher todos os campos')
        return
    }
    const teste = await User.create({nome, sobrenome, email, senha, dataNascimento})
    console.log(email)
    res.send('usuário criado')
})

app.post('/login', (req, res) => {
    const {email, senha} = req.body

    if(!email || !senha ){
        res.send('você deve preecher todos os campos')
        return
    }
    console.log(email)
    res.send('usuário criado')
})

app.listen(8000)