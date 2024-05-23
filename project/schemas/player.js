class Player{

    constructor(idPlayer){
        this.id = idPlayer
        this.life = 23;
        this.circle = 0; // Adicionando uma propriedade zone para rastrear onde a carta está
        this.energy = 1
    }

}

export default Player