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
     *                 Getters et Setters
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
    set Grid(newGrid) { this._grid = newGrid }

    /**
     * Retourne le jump de la grid
     * @returns this._jumpMax
     */
    get Jump() { return this._jumpMax }

    /**
     * ==================================================
     *           Méthode de Class privée
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
     * Retourne la plateforme la plus sur le canvas (donc avec une position y la plus proche de 0)
     * @returns higher la plateform la plus haute du canvas
     */
    _GetHigherPlateform(){
        let higher = CANVASHEIGHT
        this._grid.forEach(element =>{
            if (element.YCord < higher) {
                higher = element.YCord
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
    _AddNewPlateformGrid(probaS, probaB,probaM){

        // Vérifiez que la somme des probabilités est valide
        if (probaS + probaB + probaM !== 100) {
            throw new Error("La somme des probabilités doit être égale à 100.");
        }
        let xCord = Math.floor(Math.random()* (((this._width) - PLATEFORMWIDTH) - 0)+ 0)  // Récupère une valeur entre 0 et le nombre maximum de pixel du canvas
        
        // Génération d'un nombre aléatoire pour choisir le type
        let randomValue = Math.random() * 100;
        if(randomValue < probaS){
            this._grid.push(new StandardPlateform(xCord,-30))
        }
        else if(randomValue < probaS + probaB){
            this._grid.push(new BreakingPlateform(xCord,-30))
        }
        else{
            this._grid.push(new MoovingPlateform(xCord,-30))
        }
    }


    /**
     * Permet d'ajouter une nouvelle valeur a notre liste
     * @param {*} doodlePoints Est les points du joueurs pour gérer la difficultés
     */
    _AddNewPlateform(doodlePoints){
        let higher = this._GetHigherPlateform()
        if(doodlePoints < 512 && higher > 10){
            // Correspond à un niveau facile
            this._AddNewPlateformGrid(100,0,0)

        }
        else if(doodlePoints < 1024 && higher > 10) {
             this._AddNewPlateformGrid(70,0,30)
        }
        else if(doodlePoints < 2500 && higher > 20){
            this._AddNewPlateformGrid(20,20,60)

        }
        else if(doodlePoints < 3400 && higher > 30){
            this._AddNewPlateformGrid(2,49,49)
        }
        else {
            if( higher > 50) {
                this._AddNewPlateformGrid(0,100,0)
            }

        } 
    }

    /**
     * Permet de retirer toutes les grilles qui dépassent du canvas
     * @param {*} canvasUp est la distance que le canvas descend
     */
    _DeletePlateformGrid(canvasUp){
        this._grid.forEach(element=>{
            element.YCord -= canvasUp
            if(element.YCord >= this._height){
                let index = this._grid.indexOf(element)
                this._grid.splice(index,1)
            } 
        })
    }



    /**
     * ==================================================
     *            Méthode de Class Public
     * ==================================================
     */

    /**
     * Update les plateform mouvante et cassable
     * @param {int} fps 
     */
    Update(fps){
        this._grid.forEach(element => {
            switch(element.Type){
                case 1:
                    element.Update(fps);
                    break;
                case 2:
                    element.Update(fps,this.Height);
                    if (element.toDestroy){
                        this.grid = this.grid.filter(item => item !== element);
                        break;
                    }

            }
        });
    }

    /**
     * Gestion de la mise à jour des plateform sur la grille
     * @param {int} doodlePoints 
     * @param {int} canvasUp 
     */
    UpdateGridPlateform(doodlePoints,canvasUp){
    
        this._DeletePlateformGrid(canvasUp)

        this._AddNewPlateform(doodlePoints)        
    }

}