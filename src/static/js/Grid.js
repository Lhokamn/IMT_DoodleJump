class Grid {

    /**
     * Permet de créer un nouvel élément de type grid
     */
    constructor(width,height){
        this._width = width;
        this._height = height;
        this._jumpMax = 30;
        this._grid = [];

        
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
    get Width() { return this._width }

    /**
     * Retourne le nombre de colonne de mon tableau
     * @returns this.width
     */
    get Height (){ return this._height }

    /**
     * Retourne la grille de jeux
     * @returns this.grid qui est la grille
     */
    get Grid() {return this._grid}

    /**
     * 
     */
    get Jump() { return this._jumpMax }

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
        this._grid.push(new StandardPlateform((this._width/2 - PLATEFORMWIDTH/2),this._height - PLATEFORMHEIGHT ))
        for(let yCord = (this._height - PLATEFORMHEIGHT -40); yCord > 0; yCord -= 40){
            let xCord = Math.floor(Math.random()* (((this._width) - PLATEFORMWIDTH) - PLATEFORMWIDTH)+ PLATEFORMWIDTH) 
            this._grid.push(new StandardPlateform(xCord, yCord))
        } 
    }

    /**
     * Récupère une plateforme avec toutes ces propriétés
     * @param {int} xID Correspond à son numéro de ligne
     * @param {int} yID Correspond à son numéro de colonne
     * @returns une Platedform
     */
    GetPlateformByID(xID,yID){
        return this._grid[xID][yID]
    }

    /**
     * Retourne la plateforme la plus sur le canvas (donc avec une position y la plus proche de 0)
     * @returns higher la plateform la plus haute du canvas
     */
    _GetHigherPlateform(){
        let higher = CANVASHEIGHT

        this._grid.forEach(element =>{
            if (element.yCord < higher) {
                higher = element.yCord
            }
        })
        return higher
    }

    /**
     * Ajoute une nouvelle plateforme où le type est alétoire en fonction des probabilités 
     * @param {*} probaS La valeur doit être comprise entre 0 et 100. Correpond à la probabilité d'avoir une Plateform Standard
     * @param {*} probaB La valeur doit être comprise entre 0 et 100. Correpond à la probabilité d'avoir une Plateform Cassable
     * @param {*} probaM La valeur doit être comprise entre 0 et 100. Correpond à la probabilité d'avoir une Plateform Mouvante
     */
    _AddNewPlateform(probaS, probaB,probaM){

        // Vérifiez que la somme des probabilités est valide
        if (probaS + probaB + probaM !== 100) {
            throw new Error("La somme des probabilités doit être égale à 100.");
        }
        let xCord = Math.floor(Math.random()* (((this.width) - Grid.TILESWIDTH) - Grid.TILESWIDTH)+ Grid.TILESWIDTH)  // Récupère une valeur entre 0 et le nombre maximum de pixel du canvas
        
        // Génération d'un nombre aléatoire pour choisir le type
        let randomValue = Math.random() * 100;
        if(randomValue < probaS){
            this._grid.push(new StandardPlateform(xCord,0))
        }
        else if(randomValue < probaS + probaB){
            this._grid.push(new BreakingPlateform(xCord,0))
        }
        else{
            this._grid.push(new MouvementPlateform(xCord,0))
        }
    }

    /**
     * Gestion de la mise à jour des plateform sur la grille
     * @param {int} doodlePoints 
     */
    UpdateGridPlateform(doodlePoints){
        this._grid.forEach(element=>{
            element.yCord += doodlePoints
            if(element.yCord >= this._width){
                let index = this.grid.indexOf(element)
                this._grid.splice(index,1)
            } 
        })
        if(doodlePoints < 512 && this._GetHigherPlateform() > 40){
            // Correspond à un niveau facile
            this._AddNewPlateform(100,0,0)

        }
        else if(doodlePoints < 1024 && this._GetHigherPlateform() > 40) {
             this._AddNewPlateform(70,15,15)
        }
        else if(this.doodlePoints < 1300 && this._GetHigherPlateform() > 60){
            this._AddNewPlateform(20,40,40)

        }
        else if(this.doodlePoints < 2000 && this._GetHigherPlateform() > 80){
            this._AddNewPlateform(2,49,49)
        }
        else {
            if(this._GetHigherPlateform() > 80){
                this._AddNewPlateform(0,100,0)
            }
        } 
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
        this._grid.forEach(element => {
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