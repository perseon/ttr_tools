'use strict'
const net = require('net')
const EventEmitter = require('events').EventEmitter


class Client extends EventEmitter {
  constructor () {
    super()
    this.socketServer = null
    this
  }


  writeUInt24BE (val,buff,pos){
    buff.writeInt16BE(val >> 8, pos + 0)
    buff.writeUInt8(val & 255, pos + 2)
  }

  connect (port, host, passNum, issi) {
    const self = this
    self.client = new net.Socket()
    self.client.connect(port, host, function() {
      const SendRegistration = ()=>{
          const buff = new Buffer.alloc(11)
          buff.writeUInt16BE(9,0) // Adaptation
          buff.writeUInt8(2,2)   // tip pdu
          buff.writeUInt32BE(passNum,3)
          self.writeUInt24BE(issi,buff,7)
          buff.writeUInt8(0x0,10)
          self.client.write(buff);
      }
      console.log('Connected');
      // Registering
      SendRegistration()
  });
    self.client.on('data', data => {
        self.emit('message',data)
    })
    self.client.on('error', function (err) {
      self.emit('error', err)
    })
    self.client.on('close', function () {
      self.emit('close')
    })
    self.client.on('listening', function () {
      self.emit('listening')
    })
    
  }

  close () {
    Object.keys(this.clients).forEach(clientId => {
      const client = this.clients[clientId]
      client.end('ServerShutdown')
    })
    this.socketServer.close()
  }

  writeToServer (clients, buffer) {
    if (clients.length === 0) return
    clients.forEach(client => client.writeRaw(buffer))
  }
}

module.exports = Client