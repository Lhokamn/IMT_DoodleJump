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

    get Direction() { return this.direction }
    set Direction(direction) { return direction }

    /**
     * ==================================================
     *              Méthode de Mouvement
     * ==================================================
     */

    Move(fps) {
        this.gravitySpeed += Model.GRAVITY;
        this.doodle.Position = {x:this.gravitySpeed / fps, y:this.direction * Model.SPEED / fps}


        if (this.doodle.Position.y > 100) {
            this._Jump();
        }

        this.b_Display(this.position);
    }

    _Jump() {
        this.gravitySpeed = -Model.JUMP_FORCE;
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