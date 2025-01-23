class MoovingPlateform extends Plateform {

    /**
     * Crée une plateform standard qui ne bougent pas, ne disparais pas et ne se brise pas
     * Met la valeur Value à 2
     * @param {int} xCord Correpond à la coordonnées x de la grille
     * @param {int} yCord Correpond à la coordonénes y de la grille
     */
    constructor(xCord,yCord){
        super(1,xCord,yCord)
    }

    set XCordord(xCord) { this.position.x = xCord}

}