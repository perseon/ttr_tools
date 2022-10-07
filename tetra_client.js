'use strict'
const net = require('net')
const EventEmitter = require('events').EventEmitter
const {
  log
} = require('./util/loggerTool')


class Client extends EventEmitter {
  constructor ({loggingEnabled}) {
    super()
    this.client = new net.Socket()
    this.client.on('data', data => {
      log("tetra_client:data", "info", data.toString('hex'))
      this.emit('message',data)
    })
    this.client.on('error', function (err) {
      log("tetra_client:error", "error", err)
      process.exit(1);
      this.emit('error', err)
    })
    this.client.on('close', function () {
      this.emit('close')
    })
    this.client.on('listening', function () {
      this.emit('listening')
    })
    this.socketServer = null
    this.passNum = null
    this.issi = null
    this.loggingEnabled = loggingEnabled
  }

  sendRegistration(){
    const buff = new Buffer.alloc(11)
    buff.writeUInt16BE(9,0) // Adaptation
    buff.writeUInt8(2,2)   // tip pdu
    buff.writeUInt32BE(this.passNum,3)
    this.writeUInt24BE(this.issi,buff,7)
    buff.writeUInt8(0x0,10)
    log("tetra_client:sendRegistration", "info",'Trimit inregistrarea...')
    this.writeToServer(buff)
  }


  writeUInt24BE (val,buff,pos){
    buff.writeInt16BE(val >> 8, pos + 0)
    buff.writeUInt8(val & 255, pos + 2)
  }

  connect (port, host, passNum, issi) {
    this.passNum = passNum
    this.issi = issi
    this.client.connect(port, host, function() {
      log("tetra_client:connect", "info",'Conectat la routerul SM')
    });    
  }


  writeToServer (buff) {
    this.client.write(buff);
    log("tetra_client:write", "info", buff.toString('hex'))
  }
}

module.exports = Client