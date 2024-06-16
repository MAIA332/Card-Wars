class Card {
    constructor(idPlayer, name, type, subtype, circulo, ataque, defesa, efeito, textoEfeito, imagem) {
        this.id = this.uuidv4();
        this.idPlayer = idPlayer;
        this.zone = 'playable'; // Zona inicial onde a carta está
        this.zoneType = 'onhand'; // Tipo de zona inicial

        // Novas propriedades
        this.name = name
        this.circulo = circulo;
        this.ataque = ataque !== undefined ? ataque : null; // Defina null se não for uma criatura
        this.defesa = defesa !== undefined ? defesa : null; // Defina null se não for uma criatura
        this.efeito = typeof efeito === 'function' ? efeito : null; // Efeito como função
        this.textoEfeito = textoEfeito;
        this.imagem = imagem;
        this.type = type;
        this.subtype = subtype != undefined? subtype:null;
    }

    // Método para gerar UUID
    uuidv4() {
        return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, c =>
            (+c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> +c / 4).toString(16)
        );
    }
}

export default Card;