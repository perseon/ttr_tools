'use strict'

const net = require('net')
const EventEmitter = require('events').EventEmitter


class Server extends EventEmitter {
  constructor (version, customPackets, hideErrors = false) {
    super()
    this.version = version
    this.socketServer = null
    this.clients = {}
    this.customPackets = customPackets
    this.hideErrors = hideErrors
  }

  parseMsg(data){
    let adaptation = data
  }

  listen (port, host) {
    const self = this
    self.socketServer = net.createServer()
    self.socketServer.on('connection', socket => {
      this.socket = socket
      //TODO: reasambleaza segmentele
      socket.on('data', data => {
        self.emit('message',data)
      })
      self.emit('connection',socket)
    })
    self.socketServer.on('error', function (err) {
      self.emit('error', err)
    })
    self.socketServer.on('close', function () {
      self.emit('close')
    })
    self.socketServer.on('listening', function () {
      self.emit('listening')
    })
    self.socketServer.listen(port, host)
  }

  close () {
    Object.keys(this.clients).forEach(clientId => {
      const client = this.clients[clientId]
      client.end('ServerShutdown')
    })
    this.socketServer.close()
  }

  writeToClients (clients, buffer) {
    if (clients.length === 0) return
    clients.forEach(client => client.writeRaw(buffer))
  }
}

module.exports = Server