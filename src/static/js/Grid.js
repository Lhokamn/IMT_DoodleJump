class Grid {
    /**
     * Permet de créer un nouvel élément de type grid
     */
    constructor(width,height){
        this.width = width;
        this.height = height;
        this.jumpMax = 30;
        this.grid = [];

        // hauteur plateform : 15, longueur 57
        this.grid.push(new StandardPlateform((width/2 - 57/2),height - 15 ))
        this.InitGrid()
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
    Getheight(){
        return this.height
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
        for(let yCord = 40; yCord < this.height; yCord += 40){
            let xCord = Math.floor(Math.random()* (this.width) - 57)  // Récupère une valeur entre 0 et le nombre maximum de pixel du canvas
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
     * Retire la ligne d'indice widths
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

    /**
     * ==================================================
     *               Méthode de Class
     * ==================================================
     */

}