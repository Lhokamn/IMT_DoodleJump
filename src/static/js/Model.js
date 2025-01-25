class Model {

    /**
     * Variable global du Model
     */
    static GRAVITY    = 20;
    static JUMP_FORCE = 500;
    static SPEED      = 200;

    static CANVASWIDTH = document.getElementById('my_canvas').offsetWidth
    static CANVASHEIGHT = document.getElementById('my_canvas').offsetHeight 

    static DOODLEWIDTH = 140/2.5
    static DOODLEHEIGHT = 120/2.5

    constructor(){
        this._grid = new Grid(Model.CANVASWIDTH, Model.CANVASHEIGHT );
        this._gravitySpeed = 0;
        this._doodle = new Doodle((Model.CANVASWIDTH/2) - (Model.DOODLEWIDTH/2), Model.CANVASHEIGHT - 30, 0)
    }

    /**
     * ==================================================
     *              Getters et Setters
     * ==================================================
     */

    get Grid() { return this._grid }


    get Doodle() { return this._doodle }

    /**
     * ==================================================
     *              Méthode de Mouvement
     * ==================================================
     */

    Move(fps) {
        this._gravitySpeed += Model.GRAVITY;
        this._doodle.XCord += this._doodle.Direction * Model.SPEED / fps,
        this._doodle.YCord += this._gravitySpeed / fps;


        if (this._doodle.YCord > 440) {
            this._Jump();
        }

        this.b_Display(this._doodle.Position);

        /**
         * Update les plateformes
         */
        this._grid.Update(fps);


        this._doodle.IsOnBorder(0,Model.CANVASWIDTH)
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
}