class Doodle {

    /**
     * Instancie un nouveau Doodle
     * @param {*} xCord Correspond à la coordonnées X de départ du Doodle
     * @param {*} yCord Correspond à la coordonnées Y de départ du Doodle
     * @param {*} direction Correspond à la direction du Doodle
     */
    constructor(xCord,yCord, direction){
        this._points = 0                       
        this._position = {x:xCord, y:yCord}     
        this._direction = direction             
        this._isAlive = true                    // Correspond à l'état du Doodle
    }

    /**
     * ==================================================
     *                 Getters et Setters
     * ==================================================
     */

    /**
     * Getter et Setter de l'attribut point
     */
    get Points() { return this._points }
    set Points(points) { this._points = points }

    /**
     * Getter et Setter de l'attribut position
     */
    get Position() { return this._position}
    set Position(position) {this._position = position}

    /**
     * Getter et setters pour xCord et yCord
     */
    get XCord() { return this._position.x }
    set XCord(xCord) { this._position.x = xCord }

    get YCord() { return this._position.y }
    set YCord(yCord) { this._position.y = yCord }

    /**
     * Getter et setters pour la direction
     */
    get Direction() { return this._direction }
    set Direction(direction) { this._direction = direction }

    get LastDirection() { return this._lastDirection }

    /**
     * Getter et Setter de l'attribut isAlive
     */
    get IsAlive() { return this._isAlive }
    set IsAlive(isAlive) { this._isAlive = isAlive }

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

    /**
     * Positionne le doodle de l'autre coté de la grid
     * @param {*} xMin coordonnées minimal du canvas
     * @param {*} xMax Coordonnées maximal du canvas
     */
    IsOnBorder(xMin, xMax){
        if (this._position.x < xMin - DOODLEWIDTH/4){
            this._position.x = xMax + DOODLEWIDTH/4
        }
        else if (this._position.x >= xMax + DOODLEWIDTH/4 ) {
            this._position.x = xMin - DOODLEWIDTH/4
        }
    }
}