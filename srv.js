const Register = require('./srv/register')
const Response = require('./srv/response')
const Parser = require('./util/parser')
const Server = require('./srv/tetra_server')

const srv = new Server()
const parser = new Parser()

srv.listen(6006, '127.0.0.1')

const clients = []

let isRegistered = false

srv.on('connection', (socket)=>{
    console.log(`Conexiune noua de la ${socket.remoteAddress}`)
})

srv.on('message',(data)=>{
    parser.register(data)
    if(parser.error)
    {   
        console.error(parser.error,data )
        // TODO: intoarcem ceva cand nu putem parsa?
        return
    }
    reg = new Register(parser)
    if(reg.status_byte!==0)
    {
        console.error(reg.status)
        buff = new Response(data,reg.status_byte)
        console.log(reg)
        srv.socket.write(buff)
    }
  
    //simulam indisponibilitatea
    if(Math.random()<0){
        buff = new Response(data,0x03) 
    } else{
        isRegistered = true
        buff = new Response(data,0) 
    }
    srv.socket.write(buff)
})

setInterval(()=>{
    if(!isRegistered)
        return
    srv.socket.write(Buffer.from('000A2123006AD00F694CE120','hex'))
},3000)