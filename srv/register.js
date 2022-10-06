const User = {
    passNum: 0x91120173,
    issi: 0x012345,
}

class Register{
    constructor({issi,passNum}) {
        if(issi === User.issi && passNum === User.passNum){
            this.status = 'User inregistrat'
            this.status_byte = 0
        }
        else if(issi !== User.issi){
            this.status ='issi invalid'
            this.status_byte = 2
        }
        else if(passNum !== User.passNum){
            this.status ='passNum invalid'
            this.status_byte = 4
        }
    }
}

module.exports = Register