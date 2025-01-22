const Plateform = require('./Plateform')

class BreakingPlateform extends Plateform {

    constructor(xCord,yCord){
        super(2,xCord,yCord)
    }

    SetXCord(xCord){
        this.xCord = xCord
    }

    SetYCord(yCord){
        this.yCord = yCord
    }
}