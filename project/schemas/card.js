class Card{

    constructor(idPlayer){
        this.id = this.uuidv4()
        this.idPlayer = idPlayer;
        this.zone = 'playable'; // Adicionando uma propriedade zone para rastrear onde a carta está
    }

    uuidv4() {
        return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, c =>
            (+c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> +c / 4).toString(16)
        );
    }

}

export default Card