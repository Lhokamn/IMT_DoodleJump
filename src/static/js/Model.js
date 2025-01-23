class Model {

    /**
     * Variable global du Model
     */
    static GRAVITY    = 20;
    static JUMP_FORCE = 500;
    static SPEED      = 200;

    constructor(){
        this.grid = new Grid(document.getElementById('my_canvas').offsetWidth, document.getElementById('my_canvas').offsetHeight);
        this.direction = 0;
        this.gravitySpeed = 0;
        this.doodle = new Doodle()

        console.log(this.grid)
    }

    /**
     * ==================================================
     *              Getters et Setters
     * ==================================================
     */

    get direction() { return this.direction }
    set direction(direction) { return direction }

    /**
     * ==================================================
     *              Méthode de Mouvement
     * ==================================================
     */

    Move(fps) {
        this._gravitySpeed += Model.GRAVITY;
        this._position.y += this._gravitySpeed / fps;
        this._position.x += this._direction * Model.SPEED / fps;

        if (this._position.y > 100) {
            this._Jump();
        }

        this.b_Display(this._position);
    }

    _Jump() {
        this._gravitySpeed = -Model.JUMP_FORCE;
    }


    /**
     * ==================================================
     *              Méthode de callback
     * ==================================================
     */

    BindDisplay(callback){
        this.b_Display = callback;
    }

    BindDoodlePoint(callback){
        this
    }

}

let model = new Model()

console.log(model)