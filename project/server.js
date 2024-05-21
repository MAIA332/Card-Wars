import { log } from 'console';
import { Socket } from 'dgram';
import express from 'express';
import http from 'http';
import { Server } from 'socket.io';

const app = express();
const server = http.createServer(app);
const io = new Server(server);


// [ROTAS DO APP]
/* app.get('/',(req,res)=>{
    res.sendFile(__dirname,'/public/')
}) */
let tabuleiro = {};

const Users = {};

let boards = {
    "player-board":[],
    "opponent-board":[]
}

let lastboard = ""

// [SETUP DE SOCKET]
io.on("connection",(socket)=>{
    console.log("Client connected:",socket.id);

    Users[socket.id] = {id:socket.id}; // Registra um usuário
    tabuleiro[socket.id] = {"player-id":socket.id,"player-cards":[]}

    console.log("=========================================");
    console.log("Users",Users);
    console.log("Tabuleiro",tabuleiro);
    console.log("Boards: ",boards);
    console.log("=========================================");

    socket.on('disconnect',()=>{
        console.log("Cliente desconectado:",socket.id);

        delete Users[socket.id]; // desregistra um usuário
        delete tabuleiro[socket.id]; // desregistra um usuário do tabuleiro

        boards = {
            "player-board":[],
            "opponent-board":[]
        }

        console.log(Users);
    });

    socket.on("buy", function(data){
        let card ={ "cardId": data.cardId }
        boards[data.zoneId].push(card);
        tabuleiro[data.current_user.id]["player-cards"].push(card);
        console.log("BOARD AFTER BUY",boards);
        console.log("TABULEIRO AFTER BUY",tabuleiro);
    });

    // Evento de jogada recebido do cliente
    socket.on('jogada', function (data) {
        console.log("WILL ADD: ", data.cardId);

        // Criar o objeto card
        let card = { "cardId": data.cardId };

        // Adicionar o card ao tabuleiro do jogador atual
        tabuleiro[data.current_user.id]["player-cards"].push(card);

        console.log("BOARDS: ", boards);

        // Remover o card da board anterior, se houver
        if (lastboard && boards[lastboard]) {
            boards[lastboard] = boards[lastboard].filter(existingCard => existingCard.cardId !== card.cardId);
        }

        // Adicionar o card à board atual
        boards[data.zoneId].push(card);

        // Atualizar a variável lastboard
        lastboard = data.zoneId;
        
        console.log("LASTBOARD: ", lastboard);

        // Log para depuração
        console.log("INDEXOF: ", tabuleiro[data.current_user.id]["player-cards"].indexOf(card));
        console.log("CARD ADDED: ", card);
        console.log("ZoneID", data.zoneId);
        console.log("cardId", data.cardId);
        console.log(tabuleiro);

        let state = { tabuleiro, "zoneId": data.zoneId, boards };

        // Emitir evento para atualizar todos os clientes com o novo estado do tabuleiro
        io.emit('atualizarTabuleiro', state);
    });
});

// [SETUP PUBLIC]
app.use(express.static('public'));

// [START SERVER]

server.listen(3000, () => {
    console.log(`> Server listening on port: 3000`);
});
