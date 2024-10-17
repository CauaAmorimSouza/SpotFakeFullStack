import { createServer } from 'node:http'

const servidor = createServer ((request, resposta) => {
    console.log('Ligou')
    resposta.write('funciona12234')
    return resposta.end()
})

servidor.listen(8000)