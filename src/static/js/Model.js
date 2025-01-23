class Model {

    /**
     * Variable global du Model
     */
    static GRAVITY    = 20;
    static JUMP_FORCE = 500;
    static SPEED      = 200;

    static CANVASWIDTH = document.getElementById('my_canvas').offsetWidth
    static CANVASHEIGHT = document.getElementById('my_canvas').offsetHeight 

    constructor(){
        this.grid = new Grid(Model.CANVASWIDTH, Model.CANVASHEIGHT );
        this.direction = 0;
        this.gravitySpeed = 0;
        this.doodle = new Doodle((Model.CANVASWIDTH/2 - 25), Model.CANVASHEIGHT - 30)
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
        this.doodle.Position.x += this.direction * Model.SPEED / fps,
        this.doodle.Position.y += this.gravitySpeed / fps;


        if (this.doodle.Position.y > 440) {
            this._Jump();
        }

        this.b_Display(this.doodle.Position);

        /**
         * Update les plateformes
         */
        this.grid.Update(fps);


        this.doodle.IsOnBorder(0,Model.CANVASWIDTH)
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
}