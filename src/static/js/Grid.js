class Grid {
    /**
     * Permet de créer un nouvel élément de type grid
     */
    constructor(){
        this.nbLine = 15;
        this.nbCol = 9;
        this.grid = [
            [

            ]
        ];
        console.log(this.grid);
    }

    /**
     * ==================================================
     *          Gestion des Getters et Setters
     * ==================================================
     */

    /**
     * Retourne le nombre de ligne de mon tableau
     * @returns this.nbLine 
     */
    GetNbLine(){
        return this.nbLine
    }

    /**
     * Retourne le nombre de colonne de mon tableau
     * @returns this.nbline
     */
    GetNbCol(){
        return this.nbCol
    }

    /**
     * Retourne la grille de jeux
     * @returns this.grid qui est la grille
     */
    GetGrid(){
        return this.grid
    }


    /**
     * ==================================================
     *               Méthode de Class
     * ==================================================
     */

    /**
     * Permet de remplir la grille de façon aléatoire au démarrage du jeux. Au départ, nous mettons uniquement des plateform verte
     */
    InitGrid(){
        for(let i = 0; i < this.nbLine -1; i++){
            for(let j = 0; j < this.nbCol; j++){
                let random = Math.floor(Math.random() * 2) // Correspond à si nous créons une nouvelle plateform ou non
                let xCord = Math.floor(Math.random() * this.nbLine)
                let yCord = Math.floor(Math.random() * this.nbCol)
                if(random == 1){
                    console.log(this.grid);
                    this.grid.push(new StandardPlateform(xCord,yCord)); 
                    // this.grid = new StandardPlateform(xCord,yCord); 
                    // let test = new StandardPlateform(xCord,yCord);
                    //this.grid.x.j = new StandardPlateform(xCord,yCord);
                }
            }
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
     * Retire la ligne d'indice nbLines
     */
    RemoveFirstLine(){
        this.grid.pop()
    }

    /**
     * Ajoute une ligne à l'indice 0
     * @param {[Plateform]} ligne 
     */
    AddLineEnd(ligne){
        this.grid.unshift(ligne)
    }

}

let grid = new Grid()
grid.InitGrid()

console.log(grid)