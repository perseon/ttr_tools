const User = {
    passNum: 91120173,
    issi: 012345,
    registered: false,
    socket: null
}
const Register = require('../util/register.js');
const KaitaiStream = require('kaitai-struct/KaitaiStream');

// const parsedReg = new Register(new KaitaiStream(buff))
// console.log(parsedReg.issi)


const net = require('net');


const register = require('../util/register.js');

var server = net.createServer(function(socket) {
    socket.setEncoding('binary');
    socket.on('data', (data) => { 
        console.log('Received '+data.length+' Bytes')
        const d = new Buffer.from(data, 'binary');
        
        const r = new Register(new KaitaiStream(d))
        console.log('Primit de la client:')
        console.table({
            pduType:r.pduType,
            passNum:r.passNum,
            issi:r.issi
        })
        let status_byte = 0
        if(r.issi === User.issi && r.passNum === User.passNum){
            console.log('User inregistrat')
            User.registered = true
            User.socket = socket
            status_byte = 0
        }
        else if(r.issi !== User.issi){
            console.log('issi invalid')
            status_byte = 2
        }
        else if(r.passNum !== User.passNum){
            console.log('passNum invalid')
            status_byte = 4
        }
        const chunks = [];    
        // PDU Type
        d.writeUInt8(03,0)
        chunks.push(d)
        chunks.push(Buffer.from([status_byte]))
        socket.write(Buffer.concat(chunks))
        //socket.pipe(socket)
      }); 
	//socket.pipe(socket);
});

function MockLipPackage(){
    //buff = Buffer.from([0x21, 0x23, 0x00, 0x6A, 0xD0, 0x0F, 0x69, 0x4C, 0xE0, 0x90 ])
    //11 1C 71 C2 00 00 01 02 20 00 
    buff = Buffer.from('2123006AD00F694CE120','hex')
    // buff = Buffer.alloc(10)
    // buff.writeUInt8(0,0)
    // buff.writeUInt32BE(PASSOWRD,1)
    // writeUInt24BE(ISSI,buff,5)
    // buff.writeUInt8(0,8)
    return buff
}

setInterval(()=>{
    if(!User.registered)
        return
    lip_data = MockLipPackage()
    User.socket.write(lip_data)
},3000)


server.listen(3337, '127.0.0.1');

