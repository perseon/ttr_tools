'use strict'

const Register = require('./register.js');
const RegResponse = require('./reg_response.js');
const LipParser = require('./lip_parser.js');
const KaitaiStream = require('kaitai-struct/KaitaiStream');

class Parser{
    register(data){
        let adaptation  = data.readUInt16BE(0)
        if(data.length !==adaptation+2)
        { 
            this.error = 'Lungime invalida'
            return
         }
            
        if(data.readUInt8(2)==2) //registration
            {   
                const d = data.subarray(2)
                const r = new Register(new KaitaiStream(d))
                this.pduType =r.pduType,
                this.passNum =r.passNum,
                this.issi =r.issi
            }
    }

    registerResponse(data){
        let adaptation  = data.readUInt16BE(0)
        if(data.length !==adaptation+2)
        { 
            this.error = 'Lungime invalida'
            return
         }
            
        if(data.readUInt8(2)==3) //registration response
            {   
                const d = data.subarray(2)
                const r = new RegResponse(new KaitaiStream(d))
                this.pduType =r.pduType,
                this.passNum =r.passNum,
                this.issi =r.issi,
                this.regStatus = r.regStatus
            }
    }

    lipData(data){
        console.log(data)
        let adaptation  = data.readUInt16BE(0)
        if(data.length !==adaptation+2)
        { 
            this.error = 'Lungime invalida'
            return
        }
        const l = new LipParser(new KaitaiStream(data.subarray(2)))
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

}

module.exports = Parser