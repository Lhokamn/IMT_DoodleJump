class BreakingPlateform extends Plateform {

    /**
     * Crée une plateform standard qui ne bougent pas, ne disparais pas et ne se brise pas
     * Met la valeur Value à 1
     * @param {int} xCord Correpond à la coordonnées x de la grille
     * @param {int} yCord Correpond à la coordonénes y de la grille
     */

    static SPEED      = 100;
    static GRAVITY    = 40;

    constructor(xCord,yCord){
        super(2,xCord,yCord)
        this._state = 0
        this._gravitySpeed = 0;
        this._toDestroy = false;
    }

    /**
     * ==================================================
     *                 Getters et Setters
     * ==================================================
     */

    /**
     * Permet de récuéprer le nombre de hit restant de la plateform
     * @returns this.nbHit qui est le nombre de coup
     */
    get State() { return this._state }


    /**
     * ==================================================
     *           Méthode de Class privée
     * ==================================================
     */

    /**
     * Gère le mouvement en Y des plateforme 
     * @param {int} fps Correspond au nombre de fps du navigateur
     * @param {int} height Correspond à la taille du canvas
     */
    _Move(fps,height) {
        this._gravitySpeed += BreakingPlateform.GRAVITY;
        this._position.y += BreakingPlateform.SPEED / fps;


        if (this._position.y > height) {
            this._toDestroy = true;
        }
    }

    /**
     * ==================================================
     *            Méthode de Class Public
     * ==================================================
     */

    /**
     * Met à 1 le nombre de coup total
     */
    SetStateToOne(){
        this._state = 1
    }

    /**
     * Permet de gérer toutes les update de la class
     * @param {int} fps Correspond au nombre de fps du navigateur
     * @param {int} height Correspond à la taille du canvas
     */
    Update(fps,height){
        if(this._state == 1){
            this._Move(fps,height);
        }
    }
}