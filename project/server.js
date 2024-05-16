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

const Users = {};

// [SETUP DE SOCKET]
io.on("connection",(socket)=>{
    console.log("Client connected:",socket.id);

    Users[socket.id] = {id:socket.id}; // Registra um usuário
    
    console.log(Users);


    socket.on('disconnect',()=>{
        console.log("Cliente desconectado:",socket.id);

        delete Users[socket.id]; // desregistra um usuário

        console.log(Users);
    })
});

// [SETUP PUBLIC]
app.use(express.static('public'));

// [START SERVER]

server.listen(3000, () => {
    console.log(`> Server listening on port: 3000`);
});
