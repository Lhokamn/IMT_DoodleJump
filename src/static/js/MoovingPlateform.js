class MoovingPlateform extends Plateform {

    /**
     * Crée une plateform standard qui ne bougent pas, ne disparais pas et ne se brise pas
     * Met la valeur Value à 2
     * @param {int} xCord Correpond à la coordonnées x de la grille
     * @param {int} yCord Correpond à la coordonénes y de la grille
     */
    constructor(xCord,yCord){
        super(1,xCord,yCord);
        this.SPEED      = 100;
        this.direction = Math.random() < 0.5 ? -1 : 1;

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

    Move(fps) {
        this.position.x += this.direction * this.SPEED / fps;
    }

    /**
     * Vérifie si la plateform est en collision avec les murs
     */

    checkCollision(){
        if(this.position.x > 350 - 57){
            this.direction = -1;
        } else if(this.position.x < 0){
            this.direction = 1;
        }
    }

    Update(fps){
        this.checkCollision();
        this.Move(fps);
    }
}