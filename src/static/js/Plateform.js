class Plateform{

    /**
     * Permet de créer une nouvelle plateform
     * @param {int} type Correspond au type de platforme voulu. Il est renseigné par les classe fille automatiquement
     * @param {int} xCord Correpond à la coordonnées x de la grille
     * @param {int} yCord Correpond à la coordonénes y de la grille
     */
    constructor(type, xCord, yCord){


        if (this.constructor == Plateform){
            throw new TypeError('Abstract class "Plateform" cannot be instantiated directly');
        }
        this._type = type;
        this._position = {x: xCord, y:yCord}
    }


    /**
     * ==================================================
     *                 Getters et Setters
     * ==================================================
     */

    get Type() { return this._type }
    get XCord() { return this._position.x }
    get YCord() { return this._position.y }

    set YCord(yCord) {this._position.y = yCord}

     /**
     * ==================================================
     *           Méthode de Class privée
     * ==================================================
     */

    /**
     * ==================================================
     *            Méthode de Class Public
     * ==================================================
     */

}