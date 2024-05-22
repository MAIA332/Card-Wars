import express from 'express';
import http from 'http';
import { Server } from 'socket.io';

// Setup
const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Game state
let tabuleiro = {};
const Users = {};

let boards = {
    "player-board": [],
    "opponent-board": [],
    "gravewyard-board": []
};

let lastboard = "player-board";

// Routes
/* app.get('/', (req, res) => {
    res.sendFile(__dirname, '/public/');
}); */

// Socket setup
io.on("connection", (socket) => {
    console.log("Client connected:", socket.id);

    Users[socket.id] = { id: socket.id }; // Register user
    tabuleiro[socket.id] = { "player-id": socket.id, "player-cards": [],"graveyard-board": [] };

    console.log("=========================================");
    console.log("Users", Users);
    console.log("Tabuleiro", tabuleiro);
    console.log("Boards: ", boards);
    console.log("=========================================");

    socket.on('disconnect', () => {
        console.log("Client disconnected:", socket.id);

        // Unregister user and reset boards
        delete Users[socket.id];
        delete tabuleiro[socket.id];
        boards = {
            "player-board": [],
            "opponent-board": [],
            "graveyard-board": []
        };

        let state = { tabuleiro, "zoneId": "player-board", boards };
        io.emit('atualizarTabuleiro', state);

        console.log(Users);
    });

    socket.on("buy", (data) => {
        let card = { "cardId": data.cardId };
        
        if (boards[data.zoneId]) {

            boards[data.zoneId].push(card);
            tabuleiro[data.current_user.id]["player-cards"].push(card);

            console.log("BOARD AFTER BUY", boards);
            console.log("TABULEIRO AFTER BUY", tabuleiro);

            let state = { tabuleiro, "zoneId": data.zoneId, boards };
            io.emit('atualizarTabuleiro', state);

        } else {
            console.error(`Invalid zoneId: ${data.zoneId}`);
        }
    });

    socket.on('jogada', (data) => {
        console.log("WILL ADD: ", data.cardId);
        let card = { "cardId": data.cardId };
        console.log("ZONE ID DENTRO DE JOGADA: ",data.zoneId);

        // Remove the card from the player's card list in tabuleiro
        let cardIndex = tabuleiro[data.current_user.id]["player-cards"].findIndex(existingCard => existingCard.cardId === card.cardId);
        if (cardIndex > -1) {
            tabuleiro[data.current_user.id]["player-cards"].splice(cardIndex, 1);
        }

        // Remove the card from the last board
        if (lastboard && boards[lastboard]) {
            boards[lastboard] = boards[lastboard].filter(existingCard => existingCard.cardId !== card.cardId);
        }

        if (boards[data.zoneId]) {
            // Add the card to the new board and player's card list
            boards[data.zoneId].push(card);
            tabuleiro[data.current_user.id]["player-cards"].push(card);
            lastboard = data.zoneId;

            console.log("LASTBOARD: ", lastboard);
            console.log("CARD ADDED: ", card);
            console.log("ZoneID", data.zoneId);
            console.log("cardId", data.cardId);
            console.log(tabuleiro);

            let state = { tabuleiro, "zoneId": data.zoneId, boards };
            io.emit('atualizarTabuleiro', state);

        } else {
            console.error(`Invalid zoneId: ${data.zoneId}`);
        }
    });
});

// Static files
app.use(express.static('public'));

// Start server
server.listen(3000, () => {
    console.log(`> Server listening on port: 3000`);
});
