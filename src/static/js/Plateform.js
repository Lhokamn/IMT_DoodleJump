class Plateform{

    /**
     * Permet de créer une nouvelle plateform
     * @param {int} value Correspond au type de platforme voulu. Il est renseigné par les classe fille automatiquement
     * @param {int} xCord Correpond à la coordonnées x de la grille
     * @param {int} yCord Correpond à la coordonénes y de la grille
     */
    constructor(value, xCord, yCord){


        if (this.constructor == Plateform){
            throw new TypeError('Abstract class "Plateform" cannot be instantiated directly');
        }
        this.value = value;
        this.position = {x: xCord, y:yCord}
    }

    /**
     * Récupère la valeur de la plateforme
     * @returns this.value correspond à la valeur de la plateform
     */
    GetValue(){
        return this.value;
    }

    /**
     * Met à jour la valeur de la plateform
     * @param {*} newValue 
     */
    setValue(newValue){
        this.value = newValue;
    }

    
}