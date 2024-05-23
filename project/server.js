import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import Card from './schemas/card.js'
import Player from './schemas/player.js'

// Setup
const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Game state
let Users = [];
let boards = {
    "playable-board": [],
    "gravewyard-board": []
};
let cards = []
let players = []
let state =[]
let currentTurn = null;

function getNextPlayer() {

    if (Users.length < 2) return null;

    const currentPlayerIndex = Users.findIndex(user => user.id === currentTurn);
    const nextPlayerIndex = (currentPlayerIndex + 1) % Users.length;
    return Users[nextPlayerIndex].id;
}

// Socket setup
io.on("connection", (socket) => {

    console.log("Client connected:", socket.id);

    Users.push({ id: socket.id }); // Register user
    let player= new Player(socket.id)
    players.push(player)

    console.log("=========================================");
    console.log("Users", Users);
    console.log("Boards: ", boards);
    console.log("Cards: ",cards);
    console.log("Player on game: ",players);
    

    // Inicializa o turno para o primeiro jogador   
    if (Users.length >= 1) {
        currentTurn = socket.id;
        io.emit('turnoAtual', currentTurn);
    }

    console.log("TURNO: ",currentTurn);
    console.log("=========================================");

    io.emit('atualizaPlayers',players)

    socket.on('disconnect', () => {
        console.log("Client disconnected:", socket.id);

        // Unregister user and reset boards
        Users = Users.filter((user)=>user.id!=socket.id)

        if (currentTurn == socket.id && Users.length > 0) {
            currentTurn = getNextPlayer();
        }
        
        boards = {
            "playable-board": [],
            "gravewyard-board": []
        };

        cards = []
        players = players.filter((player)=>player.id != socket.id)

        state ={boards,Users,cards,currentTurn,players }

        io.emit('atualizarTabuleiro', cards);
        io.emit('turnoAtual',currentTurn)

        console.log(Users);
    });

    socket.on("buy", (data) => {
        console.log(`JOGADOR: ${data.current_user.id} COMPROU UMA CARTA`);

        const card = new Card(data.current_user.id);

        console.log(`CARTA QUE FOI COMPRADA: ${card.id} E ATRIBUIDA PARA O JOGADOR: ${card.idPlayer} DURANTE O TURNO DE ${currentTurn}`);

        cards.push(card)

        boards['playable-board'].push(card)

        state ={boards,Users,cards,currentTurn }

        io.emit('atualizarTabuleiro', cards);
    });

    socket.on('jogada', (data) => {

        let movedCardIndex = cards.findIndex(card => card.id === data.cardId); // Encontra o índice do cartão movido

        if (movedCardIndex !== -1) { // Verifica se o cartão foi encontrado

            if (data.zone === 'graveyard') {
                cards[movedCardIndex].zone = 'graveyard';
                cards[movedCardIndex].zoneType = 'graveyard'
                
                //cards[movedCardIndex].idPlayer = "ou-of-game";
                console.log(`A CARTA DO ÍNDICE ${movedCardIndex} FOI MOVIDA PARA ${data.zoneType} QUE POSSUI A PROPRIEDADE ${data.zone} PELO JOGADOR: ${data.current_user.id}`);


            } 
            else if(data.zone === 'commander'){
                cards[movedCardIndex].zone = 'playable';
                cards[movedCardIndex].zoneType = 'commander'

                console.log(`A CARTA DO ÍNDICE ${movedCardIndex} FOI MOVIDA PARA ${data.zoneType} QUE POSSUI A PROPRIEDADE ${data.zone} PELO JOGADOR: ${data.current_user.id}`);
            }   
            
            else {

                cards[movedCardIndex].zone = 'playable';

                //let idAlterPlayer = Users.filter(user => user.id != data.current_user.id); // ID do player oponente
                //cards[movedCardIndex].idPlayer = idAlterPlayer[0].id; // Atualiza o campo idPlayer do cartão movido
                
                cards[movedCardIndex].idPlayer = data.current_user.id
                cards[movedCardIndex].zoneType = data.zoneType

                console.log(`A CARTA DO ÍNDICE ${movedCardIndex} FOI MOVIDA PARA ${data.zoneType} QUE POSSUI A PROPRIEDADE ${data.zone} PELO JOGADOR: ${data.current_user.id}`);
            }

            
        }

        state ={boards,Users,cards,currentTurn }

        io.emit('atualizarTabuleiro', cards);

      
    });

    socket.on('endTurn', (data) => {
        if (data.current_user.id != currentTurn) return;

        currentTurn = getNextPlayer();
        io.emit('turnoAtual', currentTurn);
    });
});

// Static files
app.use(express.static('public'));

// Start server
server.listen(3000, () => {
    console.log(`> Server listening on port: 3000`);
});
