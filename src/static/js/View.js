class View {
    constructor() {
        
        this._canvas = document.getElementById('my_canvas');
        this._canvas.style.backgroundImage = 'url(../img/bck@2x.png)';
        this._canvas.style.backgroundSize = 'cover';
        this.ctx     = this._canvas.getContext('2d');
        
        this._hold_right = false;
        this._hold_left = false;
        
        /* Chargement des images */
        this.HEXTILES_IMAGE = new Image();
        this.HEXTILES_IMAGE.src = '../img/game-tiles.png';
        this.DOODLE_LEFT = new Image();
        this.DOODLE_LEFT.src = '../img/lik-left@2x.png';
        this.DOODLE_RIGHT = new Image();
        this.DOODLE_RIGHT.src = '../img/lik-right@2x.png';

        this.doodle = this.DOODLE_RIGHT;

        /* Les coordonnées des images dans le fichier game-tiles.png */
        this.green_slab = {x: 1, y: 1, w: 57, h: 15};
        this.blue_slab = {x: 1, y: 19, w: 57, h: 15};
        this.white_slab = {x: 1, y: 55, w: 57, h: 15};

        this.Events();
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
        let x = position.x;
        let y = position.y;
        console.log(position)
        
        this.ctx.clearRect(0, 0, this._canvas.width, this._canvas.height);
        
        // Dessiner les lignes.
        // this.ctx.beginPath(); // Nouveau tracé.
        // this.ctx.moveTo(100, 0); // Déplacement du crayon en (100, 0).
        // this.ctx.lineTo(100, 100); // Dessiner la ligne en (150, 100).
        // this.ctx.stroke(); // Afficher la ligne.
        // this.ctx.beginPath(); // Nouveau tracé.
        // this.ctx.moveTo(0, 100); // Déplacement du crayon en (100, 0).
        // this.ctx.lineTo(100, 100); // Dessiner la ligne en (150, 100).
        // this.ctx.stroke(); // Afficher la ligne.
        
        // Dessiner doodle.
        this.ctx.drawImage(this.doodle,0,0,140,120,x, y, 140/2.5, 120/2.5);
    }
}