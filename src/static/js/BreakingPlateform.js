const Plateform = require('./Plateform')

class BreakingPlateform extends Plateform {

    /**
     * Crée une plateform standard qui ne bougent pas, ne disparais pas et ne se brise pas
     * Met la valeur Value à 1
     * @param {int} xCord Correpond à la coordonnées x de la grille
     * @param {int} yCord Correpond à la coordonénes y de la grille
     */
    constructor(xCord,yCord){
        super(1,xCord,yCord)
        this.nbHit = 1
    }

    /**
     * Permet de récuéprer le nombre de hit restant de la plateform
     * @returns this.nbHit qui est le nombre de coup
     */
    GetNbHit(){
        return this.nbHit
    }

    /**
     * Met à 0 le nombre de coup total
     */
    SetNbHitToZero(){
        this.nbHit = 0
    }
}