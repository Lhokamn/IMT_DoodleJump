class Model {

    /**
     * Variable global du Model
     */
    static GRAVITY    = 20;
    static JUMP_FORCE = 600;
    static SPEED      = 200;

    constructor(){
        this._grid = new Grid(CANVASWIDTH, CANVASHEIGHT );
        this._gravitySpeed = 0;
        this._doodle = new Doodle((CANVASWIDTH/2) - (DOODLEWIDTH/2), CANVASHEIGHT - DOODLEHEIGHT-75, 0)
    }

    /**
     * ==================================================
     *              Getters et Setters
     * ==================================================
     */

    get Grid() { return this._grid }


    get Doodle() { return this._doodle }

    Score(){
        return Doodle.Points;
    }

    /**
     * ==================================================
     *              Méthode de Mouvement
     * ==================================================
     */

    Move(fps) {
        this._gravitySpeed += Model.GRAVITY;

        if (this._doodle.YCord <= CANVASHEIGHT * 0.4 && this._gravitySpeed < 0){ // Si on dépasse les 60% du canvas
            this._grid.UpdateGridPlateform(this._doodle.Points,this._gravitySpeed / fps)
            this._doodle.Points -= this._gravitySpeed / fps;
        }else{
            this._doodle.YCord += this._gravitySpeed / fps;
        }
        
        
        
        this._doodle.XCord += this._doodle.Direction * Model.SPEED / fps,
        this.CheckCollision(fps);


        //  if (this._doodle.YCord > CANVASHEIGHT) {
        //     this._Jump();
        //     this._doodle.YCord = CANVASHEIGHT-10;
        // }

        this.b_Display(this._doodle.Position);

        if (!this._doodle.IsAlive){
            this.EndGame()
            this._grid.Grid = []
        } 

        /**
         * Update les plateformes
         */
        this._grid.Update(fps);


        this._doodle.IsOnBorder(0,CANVASWIDTH)
    }

    _Jump() {
        this._gravitySpeed = -Model.JUMP_FORCE;
    }

    CheckCollision(fps){

        if(this._gravitySpeed > 0){
            if (this._doodle.YCord + DOODLEHEIGHT < CANVASHEIGHT) {

                this._grid.Grid.forEach(plateform => {
                    /**
                     * Si doodle au dessus ou sur la plateform & prochaine frame inférieur à la plateform
                     */
                    let startDoddle;
                    let endDoddle;

                    if (this._doodle._lastDirection == 1){ // Doodle est à droite
                        startDoddle = {x: this._doodle.Position.x, y: this._doodle.Position.y}
                        endDoddle = {x: this._doodle.Position.x+DOODLEWIDTH+DOODLETRUNK, y: this._doodle.Position.y+DOODLEHEIGHT}
                    }else{ // Doodle est à gauche
                        startDoddle = {x: this._doodle.Position.x, y: this._doodle.Position.y}
                        endDoddle = {x: this._doodle.Position.x+DOODLEWIDTH-DOODLETRUNK, y: this._doodle.Position.y+DOODLEHEIGHT}

                    }
                    /**
                     * Si doodle sur dans la même "colonne" que la plateform
                     */
                    if (
                        (plateform.XCord <= startDoddle.x && startDoddle.x < plateform.XCord + PLATEFORMWIDTH)
                            ||
                        (plateform.XCord <= endDoddle.x && endDoddle.x < plateform.XCord + PLATEFORMWIDTH)
                    ){
                        /**
                         * Si Doodle est au dessus de la plateform
                         */
                        if (endDoddle.y < plateform.YCord ){

                            /**
                             * Si Doodle est en dessous la plateform la prochaine frame
                             */

                            if ((endDoddle.y + (this._gravitySpeed / fps)) >= plateform.YCord){
                                this._Jump();
                                if (plateform._type == 2){
                                    plateform.SetStateToOne();
                                }
                            }

                        }

                    }

                });
            }   
            else {
                this._doodle.IsAlive = false
            }
        }
    }

    EndGame(){
        this.b_EndGame(this.Doodle.Position);
        this.Doodle.Position.x = (CANVASWIDTH/2) - (DOODLEWIDTH/2);
        this.Doodle.Position.y = 100;
    }
    BindEndGame(callback){
        this.b_EndGame = callback;
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