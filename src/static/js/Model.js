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


    /**
     * ==================================================
     *           Méthode de Class privée
     * ==================================================
     */

    _Jump() {
        this._gravitySpeed = -Model.JUMP_FORCE;
    }
    
    _EndGame(){
        this.b_EndGame(this.Doodle.Position);
        this.Doodle.Position.x = (CANVASWIDTH/2) - (DOODLEWIDTH/2);
        this.Doodle.Position.y = 100;
    }

    _CheckCollision(fps){

        if(this._gravitySpeed >= 0){
            if (this._doodle.YCord + DOODLEHEIGHT < CANVASHEIGHT) {

                this._grid.Grid.forEach(plateform => {
                    /**
                     * Si doodle au dessus ou sur la plateform & prochaine frame inférieur à la plateform
                     */
                    
                    
                    if (plateform.XCord - 15 <= this._doodle.XCord + DOODLETRUNK &&  this._doodle.XCord + DOODLEWIDTH - DOODLETRUNK*2 <= plateform.XCord + PLATEFORMWIDTH +15 ){
                       
                        /**
                         * Si Doodle est au dessus de la plateform
                         */
                        if (this._doodle.YCord + DOODLEHEIGHT <= plateform.YCord ){


                            /**
                             * Si Doodle est en dessous la plateform la prochaine frame
                             */

                            if ((this._doodle.YCord + DOODLEHEIGHT + (this._gravitySpeed / fps)) >= plateform.YCord){
                                
                                this._Jump()
                                                                
                                if (plateform.Type == 2){
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

    /**
     * ==================================================
     *            Méthode de Class Public
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
        this._CheckCollision(fps);


        this.b_Display(this._doodle.Position);

        if (!this._doodle.IsAlive){
            this._EndGame()
            this._grid.Grid = []
        } 

        
        // Update les plateformes
        this._grid.Update(fps);

        // Met à jour le doodle si il dépasse la taille du canvas
        this._doodle.IsOnBorder(0,CANVASWIDTH)
    } 
    

    /**
     * ==================================================
     *              Méthode de callback
     * ==================================================
     */

    BindDisplay(callback){
        this.b_Display = callback;
    }

    BindEndGame(callback){
        this.b_EndGame = callback;
    }
}