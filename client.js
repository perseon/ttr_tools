require('dotenv').config()
const Register = require('./srv/register')
const Response = require('./srv/response')
const Parser = require('./util/parser')
const Client = require('./tetra_client')

const {
    log
  } = require('./util/loggerTool')


const client = new Client({loggingEnabled:true})

const parse = new Parser()


client.connect(process.env.PORT,process.env.SERVER,process.env.PASSOWRD,process.env.ISSI)


let isRegistered = false



const setupRegisteringSequence = ()=>{
    setInterval(()=>{
    if(!isRegistered){
        client.sendRegistration()
    }
    },2000)
  }



client.on('message',(data)=>{
    if(isRegistered)
        {
            // LIP?
            parse.lipData(data)

            if(parse.error)
            {   
                log("client:parse:lip", "error",parse.error,data )
                // TODO: intoarcem ceva cand nu putem parsa?
                return
            }
    
        } else {
            parse.registerResponse(data)
            if(parse.error)
            {   
                log("client:parse", "error",parse.error,data )
                // TODO: intoarcem ceva cand nu putem parsa?
                return
            }
            if (parse.regStatus !== 0){
                log("client:registration", "error",'eroare inregistrare '+data.toString('hex'))
                console.table(parse)
                //TODO: reincerci inregistrarea
            } else{
                log("client:registration", "info",'Inregistrat')
                isRegistered = true
            }

        }
    
})

setupRegisteringSequence()
