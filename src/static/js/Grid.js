class Grid {
    
    /**
     * Permet de créer un nouvel élément de type grid
     */
    constructor(){
        this.nbLine = 15
        this.nbCol = 9
        this.grid.length = this.nbLine

        this.grid.length.forEach(element => {
            element.length = this.nbCol
        });
    }

}