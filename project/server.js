import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import Card from './schemas/card.js'

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

let state =[]

// Socket setup
io.on("connection", (socket) => {
    console.log("Client connected:", socket.id);

    Users.push({ id: socket.id }); // Register user

    console.log("=========================================");
    console.log("Users", Users);
    console.log("Boards: ", boards);
    console.log("Cards: ",cards);
    console.log("=========================================");

  

    socket.on('disconnect', () => {
        console.log("Client disconnected:", socket.id);

        // Unregister user and reset boards
        Users = Users.filter((user)=>user.id!=socket.id)
        
        boards = {
            "playable-board": [],
            "gravewyard-board": []
        };

        cards = []

        state ={boards,Users,cards}

        io.emit('atualizarTabuleiro', cards);

        console.log(Users);
    });

    socket.on("buy", (data) => {
        console.log(`JOGADOR: ${data.current_user.id} COMPROU UMA CARTA`);

        const card = new Card(data.current_user.id);

        console.log(`CARTA QUE FOI COMPRADA: ${card.id} E ATRIBUIDA PARA O JOGADOR: ${card.idPlayer}`);

        cards.push(card)

        boards['playable-board'].push(card)

        state ={boards,Users,cards}

        io.emit('atualizarTabuleiro', cards);
    });

    socket.on('jogada', (data) => {

        // ALTERAR O idPlayer NA CARTA MOVIDA
        let idAlterPlayer = Users.filter((user)=>user.id!=data.current_user.id) // ID do player oponente
        console.log("ID ALTER PLAYER: ",idAlterPlayer);

        let movedCardIndex = cards.findIndex(card => card.id === data.cardId); // Encontra o índice do cartão movido
        
        if (movedCardIndex !== -1) { // Verifica se o cartão foi encontrado
            cards[movedCardIndex].idPlayer = idAlterPlayer[0].id; // Atualiza o campo idPlayer do cartão movido
        }

        state ={boards,Users,cards}

        io.emit('atualizarTabuleiro', cards);

      
    });
});

// Static files
app.use(express.static('public'));

// Start server
server.listen(3000, () => {
    console.log(`> Server listening on port: 3000`);
});
