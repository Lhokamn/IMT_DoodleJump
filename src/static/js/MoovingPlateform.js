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
        this._direction = Math.random() < 0.5 ? -1 : 1;

    }

    /**
     * ==================================================
     *                 Getters et Setters
     * ==================================================
     */

    /**
     * ==================================================
     *           Méthode de Class privée
     * ==================================================
     */

    /**
     * Permet de faire bouger une plateform
     * @param {*} fps Correspond au fps du navigateur
     */
    _Move(fps) {
        this._position.x += this._direction * this.SPEED / fps;
    }

    /**
     * Vérifie si la plateform est en collision avec les murs et si c'est le change la direction
     */
    _CheckCollision(){
        if(this._position.x > 350 - 57){
            this._direction = -1;
        } else if(this._position.x < 0){
            this._direction = 1;
        }
    }

    /**
     * ==================================================
     *            Méthode de Class Public
     * ==================================================
     */

    /**
     * Méthode appelé pour gérer le mouvement des plateformes mouvante
     * @param {*} fps Correspond au fps du navigateur
     */
    Update(fps){
        this._CheckCollision();
        this._Move(fps);
    }
}