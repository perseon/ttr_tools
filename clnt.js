require('dotenv').config()
const Register = require('./srv/register')
const Response = require('./srv/response')
const Parser = require('./util/parser')
const Client = require('./tetra_client')


const client = new Client()

const parse = new Parser()


client.connect(process.env.PORT,process.env.SERVER,process.env.PASSOWRD,process.env.ISSI)



let isRegistered = false



client.on('connection', (socket)=>{
    console.log(`Conexiune noua de la ${socket.remoteAddress}`)
})

client.on('message',(data)=>{
    if(!isRegistered)
        {
            parse.registerResponse(data)
            console.log(data)
            if(parse.error)
            {   
                console.error(parse.error,data )
                // TODO: intoarcem ceva cand nu putem parsa?
                return
            }
            if (parse.regStatus !== 0){
                
                console.table(parse)
                //TODO: reincerci inregistrarea
            } else{
                console.log('Inregistrat')
                isRegistered = true
            }
        } else {
            // LIP?
            parse.lipData(data)

            if(parse.error)
            {   
                console.error(parse.error,data )
                // TODO: intoarcem ceva cand nu putem parsa?
                return
            }

        }
    
})
