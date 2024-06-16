const Deck = [
    {
        name: "Ritual Profano",
        circulo: "Necromancia",
        ataque: null,
        defesa: null,
        efeito: null,
        textoEfeito: "Todo início de turno você poderá escolher pagar 2 de vida, se fizer isso, acrescente +2 de energia a sua base de energia.",
        imagem: "imagem_ritual_profano.jpg",
        type: "Passiva",
        subtype: null
    },
    {
        name: "Adaptação Forçada",
        circulo: "Natureza",
        ataque: null,
        defesa: null,
        efeito: null,
        textoEfeito: "Toda vez que você sofrer dano por uma fonte que não seja do naipe de seu comandante, você poderá pagar 4 de vida, se fizer isso, durante as próximas jogadas, anule todo o dano que seria causado a você por essa mesma fonte.",
        imagem: "imagem_adaptacao_forcada.jpg",
        type: "Passiva",
        subtype: null
    },
    {
        name: "Sorte dos Tolos",
        circulo: "Encantamento",
        ataque: null,
        defesa: null,
        efeito: null,
        textoEfeito: "Toda vez que você atacar com esta criatura, você pode escolher rolar um dado. Caso caia um número ímpar, seu dano será anulado. Caso caia par, o dano que seria dado é multiplicado por x2 (melhor aplicável em criaturas com 0 de defesa e uma boa força, ex: 5/0).",
        imagem: "imagem_sorte_dos_tolos.jpg",
        type: "Passiva",
        subtype: null
    },
    {
        name: "Kamikaze",
        circulo: "Necromancia",
        ataque: null,
        defesa: null,
        efeito: null,
        textoEfeito: "Toda vez que uma criatura sua for ser morta pelo dano de uma criatura do oponente, você poderá pagar x de energia. Se o fizer, adicione +x/+0 para sua criatura. Ao final do combate, sua criatura morre mesmo assim.",
        imagem: "imagem_kamikaze.jpg",
        type: "Passiva",
        subtype: null
    },
    {
        name: "Domínios",
        circulo: "Abjuração",
        ataque: null,
        defesa: null,
        efeito: null,
        textoEfeito: "Todas as criaturas de naipe igual ao seu comandante recebem +2/+2.",
        imagem: "imagem_dominios.jpg",
        type: "Passiva de Buff",
        subtype: null
    },
    {
        name: "Ressuscitar",
        circulo: "Necromancia",
        ataque: null,
        defesa: null,
        efeito: "Ressuscitar",
        textoEfeito: "Escolha uma criatura do campo de batalha. Se aquela criatura morrer neste turno ao invés de colocá-la no cemitério, ela volta para o campo de batalha sob seu controle até o final de seu próximo turno, adicione +1/+1 a aquela criatura, agora ela é do tipo zumbi, além dos outros tipos que já possuía.",
        imagem: "imagem_ressuscitar.jpg",
        type: "Habilidade Ativa",
        subtype: null
    },
    {
        name: "Raio",
        circulo: "Abjuração",
        ataque: null,
        defesa: null,
        efeito: "Raio",
        textoEfeito: "A criatura alvo recebe 3 de dano.",
        imagem: "imagem_raio.jpg",
        type: "Habilidade Ativa",
        subtype: null
    },
    {
        name: "Poção de Cura",
        circulo: "Natureza",
        ataque: null,
        defesa: null,
        efeito: "Poção de Cura",
        textoEfeito: "Você recebe +3 de vida.",
        imagem: "imagem_pocao_de_cura.jpg",
        type: "Habilidade Ativa",
        subtype: null
    },
    {
        name: "Poção de Força",
        circulo: "Natureza",
        ataque: null,
        defesa: null,
        efeito: "Poção de Força",
        textoEfeito: "A criatura alvo recebe +3/+0.",
        imagem: "imagem_pocao_de_forca.jpg",
        type: "Habilidade Ativa",
        subtype: null
    },
    {
        name: "Adrenalina",
        circulo: "Necromancia",
        ataque: null,
        defesa: null,
        efeito: "Adrenalina",
        textoEfeito: "Você recebe +3 de energia e perde -2 de vida.",
        imagem: "imagem_adrenalina.jpg",
        type: "Habilidade Ativa",
        subtype: null
    },
    {
        name: "Barreira",
        circulo: "Abjuração",
        ataque: null,
        defesa: null,
        efeito: "Barreira",
        textoEfeito: "Anule a magia alvo.",
        imagem: "imagem_barreira.jpg",
        type: "Habilidade Ativa",
        subtype: null
    },
    {
        name: "Neutralizar",
        circulo: "Abjuração",
        ataque: null,
        defesa: null,
        efeito: "Neutralizar",
        textoEfeito: "Destrua a carta do tipo domínio alvo.",
        imagem: "imagem_neutralizar.jpg",
        type: "Habilidade Ativa",
        subtype: null
    },
    {
        name: "Revitalizar",
        circulo: "Encantamento",
        ataque: null,
        defesa: null,
        efeito: "Revitalizar",
        textoEfeito: "Você recebe +1 de energia.",
        imagem: "imagem_revitalizar.jpg",
        type: "Habilidade Ativa",
        subtype: null
    },
    {
        name: "Aterrorizar",
        circulo: "Encantamento",
        ataque: null,
        defesa: null,
        efeito: "Aterrorizar",
        textoEfeito: "A criatura alvo recebe -1/-1.",
        imagem: "imagem_aterrorizar.jpg",
        type: "Habilidade Ativa",
        subtype: null
    },
    {
        name: "Aprimorar",
        circulo: "Encantamento",
        ataque: null,
        defesa: null,
        efeito: "Aprimorar",
        textoEfeito: "A criatura alvo recebe +1/+1.",
        imagem: "imagem_aprimorar.jpg",
        type: "Habilidade Ativa",
        subtype: null
    },
    {
        name: "Reciclar",
        circulo: "Natureza",
        ataque: null,
        defesa: null,
        efeito: "Reciclar",
        textoEfeito: "Descarte uma carta, em seguida compre uma carta.",
        imagem: "imagem_reciclar.jpg",
        type: "Habilidade Ativa",
        subtype: null
    },
    {
        name: "Agente do Caos",
        circulo: "Encantamento",
        ataque: null,
        defesa: null,
        efeito: "Agente do Caos",
        textoEfeito: "As criaturas do naipe X ganham +2/+1.",
        imagem: "imagem_agente_do_caos.jpg",
        type: "Habilidade Ativa",
        subtype: null
    },
    {
        name: "Trato Feito",
        circulo: "Encantamento",
        ataque: null,
        defesa: null,
        efeito: "Trato Feito",
        textoEfeito: "Anule a magia alvo. O seu controlador pode pagar 3 de energia. Se fizer isso, pode destruir uma criatura do mesmo naipe do seu comandante.",
        imagem: "imagem_trato_feito.jpg",
        type: "Habilidade Ativa",
        subtype: null
    },
    {
        name: "Estigma Divino",
        circulo: "Abjuração",
        ataque: null,
        defesa: null,
        efeito: "Estigma Divino",
        textoEfeito: "Até o fim do seu próximo turno, as criaturas do naipe X possuem: toda vez que está criatura causar dano a um jogador, você recebe em vida o dano causado.",
        imagem: "imagem_estigma_divino.jpg",
        type: "Habilidade Ativa",
        subtype: null
    }
]

export default Deck;