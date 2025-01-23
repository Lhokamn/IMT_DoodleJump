class Doodle {

    /**
     * Permet de créer un nouveau joueur
     */
    constructor(xCord,yCord){
        this.points = 0             // Correspond au point du Doodle
        this.position = {x:xCord, y:yCord}  // Correspond à la position du doodle
        this.isAlive = 0            // Correspond à l'état du 
    }

    /**
     * Getter et Setter de l'attribut point
     */
    get Points() { return this.points }
    set Points(points) { this.points = points }

    /**
     * Getter et Setter de l'attribut position
     */
    get Position() { return this.position}
    set Position(position) {this.position = position}

    /**
     * Getter et Setter de l'attribut position
     */
    get IsAlive() { return this.isAlive }
    set IsAlive(isAlive) { this.isAlive = isAlive }

    /**
     * ==================================================
     *              Méthode du Doodle
     * ==================================================
     */


    /**
     * Positionne le doodle de l'autre coté de la grid
     * @param {*} xMin 
     * @param {*} xMax 
     */
    IsOnBorder(xMin, xMax){
        if (this.position.x < xMin){
            this.position.x = xMax - 35
        }
        else if (this.position.x > xMax) {
            this.position.x = xMin 
        }
    }
}