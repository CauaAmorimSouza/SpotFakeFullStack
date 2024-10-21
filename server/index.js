import Express from "express";

const app = Express()
app.use(Express.json())

app.post('/registro', (req, res) => {
    const {nome, sobrenome, email, senha, dataNascimento} = req.body
    console.log(email)
    res.send('tá funfando tbm')
})

app.listen(8000)
/*/app.get('/registro', (req, res) => {
    console.log('tá funfando')
    res.send('tá funfando tbm')
})/*/