class Controller {

    /**
     * Permet d'instancier un nouveau controller
     * @param {Model} model Correpond à une class Model
     * @param {View} view Correspond à une class View
     */
    constructor(model, view) {
        this._model = model;
        this._view = view;
        
        this._startTime     = Date.now();
        this._lag           = 0;
        this._fps           = 60; // Frame rate.
        this._frameDuration = 1000 / this._fps; // Avec 60 frame par seconde, la frame va durer 16.7ms.

        this._model.BindDisplay(this.Display.bind(this));
        this._view.BindSetDirection(this.SetDirection.bind(this));
        this._view.BindGetTiles(this.GetTiles.bind(this));
        this._view.BindGetScore(this.GetScore.bind(this));
        this._model.BindEndGame(this.EndGame.bind(this));
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
     * ==================================================
     *            Méthode de Class Public
     * ==================================================
     */

    /**
     * Méthode de base pour faire fonctionner le Doodle
     */
    Update() {
        /* Calcul du deltaTime */
        let currentTime = Date.now();
        let deltaTime   = currentTime - this._startTime; // La durée entre deux appels (entre 2 frames).
        
        this._lag += deltaTime;
        this._startTime = currentTime;

        /* Mettre à jour la logique si la variable _lag est supérieure ou égale à la durée d'une frame */
        while (this._lag >= this._frameDuration) {
            /* Mise à jour de la logique */
            this._model.Move(this._fps);
            /* Réduire la variable _lag par la durée d'une frame */
            this._lag -= this._frameDuration;
        }
        
        requestAnimationFrame(this.Update.bind(this)); // La fonction de rappel est généralement appelée 60 fois par seconde.

    }

    /**
     * Récupère le tableaux de palteformes du Model
     * @param {Model} _model Permet de retourner un attribut du model
     * @returns this._model.Grid.Grid
     */
    GetTiles() {
        return this._model.Grid.Grid;
    }

    /**
     * ==================================================
     *              Méthode de callback
     * ==================================================
     */

    

    /**
     * Bind la méthode Display
     * @param {*} position 
     */
    Display(position) {
        this._view.Display(position);
    }

    /**
     * Bind la méthode Endgame
     * @param {*} position 
     */
    EndGame(position) {
        this._view.EndGame(position);
    }

    /**
     * Bind la méthode de Changement de direction
     * @param {*} newDirection 
     */
    SetDirection(newDirection) {
        this._model.Doodle.Direction = newDirection
    }

    /**
     * Bind la méthode pour récupérer les points du Doodle
     * @param {*} _model 
     * @returns this._model.Doodle.Points 
     */
    GetScore(_model){
        return this._model.Doodle.Points
    }
    
    
}