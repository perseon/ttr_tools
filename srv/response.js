class Response{
    constructor(buff,status_byte) {
        const chunks = []; 
        buff.writeUInt16BE(0x0A,0) // Adaptation
        buff.writeUInt8(0x03,2) // PDU Type
        chunks.push(buff)
        chunks.push(Buffer.from([status_byte]))
        return Buffer.concat(chunks)
    }
}
module.exports = Response