class View {
    constructor(img_path) {
        
        this._canvas = document.getElementById('my_canvas');
        this._scoreElement = document.getElementById('score');
        
        this.ctx = this._canvas.getContext('2d');

        this.HEXTILES_IMAGE = new Image();
        this.DOODLE_LEFT = new Image();
        this.DOODLE_RIGHT = new Image();

        /* Les coordonnées des images dans le fichier game-tiles.png */
        this.green_slab = {x: 1, y: 1, w: PLATEFORMWIDTH, h: PLATEFORMHEIGHT};
        this.blue_slab = {x: 1, y: 19, w: PLATEFORMWIDTH, h: PLATEFORMHEIGHT};
        this.white_slab = {x: 1, y: 55, w: PLATEFORMWIDTH, h: PLATEFORMHEIGHT};
        this.white_brock_slab = {x: 1, y: 73, w: PLATEFORMWIDTH, h: PLATEFORMHEIGHT};

        this._InitView()
        this.Events();
    }

    _InitView(){
        this._canvas.style.backgroundImage = 'url(static/img/bck@2x.png)';
        this._canvas.style.backgroundSize = 'cover';
        this._canvas.style.borderRadius = '10px';
        this._canvas.style.alignContent = 'center';
        this._canvas.style.display = 'block';
        this._canvas.style.margin = '0 auto';

        this._hold_right = false;
        this._hold_left = false;

        this.HEXTILES_IMAGE.src = 'static/img/game-tiles.png';
        this.DOODLE_LEFT.src = 'static/img/lik-left@2x.png';
        this.DOODLE_RIGHT.src = 'static/img/lik-right@2x.png';
        
        this.doodle = this.DOODLE_RIGHT;
        this.doodle_last_direction = 1; // RIGHT  
        
    }

    BindSetDirection(callback) {
        this.b_SetDirection = callback;
    }

    Events() {
        document.addEventListener('keydown', (evt) => {                
            if (evt.key == 'ArrowLeft' || evt.key == 'ArrowRight') {
                switch (evt.key) {
                    case 'ArrowLeft': // Move left.
                        this._hold_left = true;
                        this.b_SetDirection(-1);
                        this.doodle = this.DOODLE_LEFT;
                        break;
                    case 'ArrowRight': // Move right.
                        this._hold_right = true;
                        this.b_SetDirection(1);
                        this.doodle = this.DOODLE_RIGHT;
                        break;
                }
            }
        });

        document.addEventListener('keyup', (evt) => {
            switch (evt.key) {
                case 'ArrowLeft': // Move left.
                    if (!this._hold_right) {
                        this.b_SetDirection(0);
                    }
                    this._hold_left = false;
                    break;
                case 'ArrowRight': // Move right.
                    if (!this._hold_left) {
                        this.b_SetDirection(0);
                    }
                    this._hold_right = false;
                    break;
            }
        });
    }

    Display(position) {

        this.ctx.clearRect(0, 0, CANVASWIDTH, CANVASHEIGHT);

        // Dessiner les tuiles.
        this.GetTiles().Grid.Grid.forEach(element => {

            // Recupere la tuile correspondante.
            let tile;
            switch (element.Type){
                case 0:
                    tile = this.green_slab;
                    break;
                case 1:
                    tile = this.blue_slab;
                    break;
                case 2:
                    if (element.State == 1){
                        tile = this.white_slab;
                    } else {
                        tile = this.white_brock_slab;
                    }
                    tile = this.white_slab;
                    break;
            };
            this.ctx.drawImage(this.HEXTILES_IMAGE,tile.x,tile.y,tile.w,tile.h,element.XCord,element.YCord,tile.w,tile.h);
        });

        // Dessiner doodle.
        this.ctx.drawImage(this.doodle,0,0,DOODLEWIDTH*RESIZE,DOODLEHEIGHT*RESIZE,position.x, position.y, DOODLEWIDTH, DOODLEHEIGHT);
    }

    // Met à jour le score dans l'interface utilisateur
    UpdateScore(newScore) {
        this._scoreElement.textContent = `Score: ${newScore}`;
    }

    BindGetTiles(callback){
        this.GetTiles = callback
    }
}