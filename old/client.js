const net = require('net');
const RegResponse = require('../util/reg_response.js');
const LipParser = require('../util/lip_parser.js');
const KaitaiStream = require('kaitai-struct/KaitaiStream');

const PASSOWRD = 0x91120173
const ISSI = 0x012345
const SERVER = '127.0.0.1'
const PORT = 6006

let registered = false


const writeUInt24BE = (val,buff,pos) =>{
    buff.writeInt16BE(val >> 8, pos + 0)
    buff.writeUInt8(val & 255, pos + 2)
}

const client = new net.Socket();
client.connect(PORT, SERVER, function() {
    const SendRegistration = ()=>{
        buff = new Buffer.alloc(11)
        buff.writeUInt16BE(08,0)
        buff.writeUInt8(02,2)
        buff.writeUInt32BE(PASSOWRD,3)
        writeUInt24BE(ISSI,buff,7)
        buff.writeUInt8(0,10)
        client.write(buff);
    }
    console.log('Connected');
    client.setEncoding('binary')
    // Registering
    SendRegistration()
});

client.on('data', function(data) {
    if (registered)
        {
            console.log('am primit '+data.length + ' octeti')
            if(data.length === 10)
                {
                    const d = new Buffer.from(data, 'binary');
                    const l = new LipParser(new KaitaiStream(d))
                    console.table({
                        pduType:l.pduType,
                        timeElapsed:l.timeElapsed,
                        longitude:l.longitude,
                        latitude:l.latitude,
                        positionError:l.positionError,
                        horizontalVelocity:l.horizontalVelocity,
                        directionOfTravel:l.directionOfTravel,
                        aditionalData:l.aditionalData,
                        reasonSending:l.reasonSending,
                        userDefinedData:l.userDefinedData,
                    })
                }
                
        } else{
            const d = new Buffer.from(data, 'binary');
            const r = new RegResponse(new KaitaiStream(d))
            const register = {
                pduType:r.pduType,
                passNum:r.passNum,
                issi:r.issi,
                regType:r.regType,
                regStatus:r.regStatus
            }
            if(r.regStatus === 0)
                registered = true
            console.log('Receptionat ' + data.length + ' octeti de la server: ');
            console.table(register);

        }
    

    //client.destroy(); 
});

client.on('close', function() {
    console.log('Connection closed');
});
