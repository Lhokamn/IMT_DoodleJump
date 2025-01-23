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
        this.type = type;
        this.position = {x: xCord, y:yCord}
    }


    get Type() { return this.type }
    get XCord() { return this.position.x }
    get YCord() { return this.position.y }

}