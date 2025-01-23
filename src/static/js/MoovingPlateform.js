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

    /**
     * Met à jour la coordonées X de la plateform
     * @param {int} xCord 
     */
    SetXCord(xCord){
        this.xCord = xCord
    }

    /**
     * Met à jour la coordonées Y de la plateforme
     * @param {int} yCord 
     */
    SetYCord(yCord){
        this.yCord = yCord
    }
}