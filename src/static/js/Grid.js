class Grid {
    
    static TILESWIDTH = 57
    static TILESHEIGHT = 15

    /**
     * Permet de créer un nouvel élément de type grid
     */
    constructor(width,height){
        this.width = width;
        this.height = height;
        this.jumpMax = 30;
        this.grid = [];

        
        this._InitGrid()
    }

    /**
     * ==================================================
     *          Gestion des Getters et Setters
     * ==================================================
     */

    /**
     * Retourne le nombre de ligne de mon tableau
     * @returns this.width 
     */
    get Width() { return this.width }

    /**
     * Retourne le nombre de colonne de mon tableau
     * @returns this.width
     */
    get Height (){ return this.height }

    /**
     * Retourne la grille de jeux
     * @returns this.grid qui est la grille
     */
    get Grid() {return this.grid}


    /**
     * ==================================================
     *               Méthode de Class
     * ==================================================
     */

    /**
     * Permet de remplir la grille de façon aléatoire au démarrage du jeux. Au départ, nous mettons uniquement des plateform verte
     */
    _InitGrid(){
         // hauteur plateform : 15, longueur 57
        this.grid.push(new StandardPlateform((this.width/2 - Grid.TILESWIDTH/2),this.height - Grid.TILESHEIGHT ))
        this.grid.push(new MoovingPlateform(50,50))
        this.grid.push(new BreakingPlateform(150,150))
        this.grid.push(new BreakingPlateform(50,50))
        this.grid[2].SetStateToOne()
        this.grid[3].SetStateToOne()
        // this.grid.push(new BreakingPlateform(50,50))
        console.log((this.height - Grid.TILESHEIGHT*2))
        for(let yCord = (this.height - Grid.TILESHEIGHT -40); yCord > 0; yCord -= 40){
            let xCord = Math.floor(Math.random()* (((this.width) - Grid.TILESWIDTH) - Grid.TILESWIDTH)+ Grid.TILESWIDTH)  // Récupère une valeur entre 0 et le nombre maximum de pixel du canvas
            this.grid.push(new StandardPlateform(xCord, yCord))
        } 
    }

    /**
     * Récupère une plateforme avec toutes ces propriétés
     * @param {int} xID Correspond à son numéro de ligne
     * @param {int} yID Correspond à son numéro de colonne
     * @returns une Platedform
     */
    GetPlateformByID(xID,yID){
        return this.grid[xID][yID]
    }

    /**
     * Gestion de la mise à jour des plateform sur la grille
     * @param {int} doodlePoints 
     */
    UpdateGridPlateform(doodlePoints){
        this.grid.forEach(element=>{
            element.yCord += doodlePoints
            if(element.yCord >= this.width){
                let index = this.grid.indexOf(element)
                this.grid.splice(index,1)
            } 
        })
    }

    /**
     * ==================================================
     *               Méthode de Class
     * ==================================================
     */

    /**
     * Update les plateformes de type 1&2*
     */
    Update(fps){
        this.grid.forEach(element => {
            switch(element.type){
                case 1:
                    element.Update(fps);
                    break;
                case 2:
                    element.Update(fps,this.Height);
                    if (element.toDestroy){
                        //console.log(this.grid.indexOf(element));
                        this.grid = this.grid.filter(item => item !== element);
                        console.log(this.grid);
                        break;
                    }

            }
        });
    }

}