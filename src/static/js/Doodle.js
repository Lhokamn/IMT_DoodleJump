class Doodle {

    /**
     * Permet de créer un nouveau joueur
     */
    constructor(){
        this.points = 0             // Correspond au point du Doodle
        this.position = {x:0, y:0}  // Correspond à la position du doodle
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

    
}