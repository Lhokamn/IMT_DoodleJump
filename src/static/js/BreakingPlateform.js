class BreakingPlateform extends Plateform {

    /**
     * Crée une plateform standard qui ne bougent pas, ne disparais pas et ne se brise pas
     * Met la valeur Value à 1
     * @param {int} xCord Correpond à la coordonnées x de la grille
     * @param {int} yCord Correpond à la coordonénes y de la grille
     */
    constructor(xCord,yCord){
        super(2,xCord,yCord)
        this._state = 0
    }

    /**
     * Permet de récuéprer le nombre de hit restant de la plateform
     * @returns this.nbHit qui est le nombre de coup
     */
    get State() { return this._state }

    /**
     * Met à 0 le nombre de coup total
     */
    SetStateToOne(){
        this._state = 1
    }
}