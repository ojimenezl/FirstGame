var Player = require('./StickMan');
var sala
var salas = []
var sala_playe
class Game {

    constructor(io) {
        this.io = io;
        this.players = {};
        this.io.on("connection", (socket) => {
            socket.on('joinRoom', ({ username, room }) => {
                sala = room;
                socket.join(room)
                salas.push(room)
                this.players[socket.id] = new Player(this, socket.id, room);
            });

            io.sockets.in(sala).emit("messagess2", `Conectado ${socket.id} room: ${sala} `);
            socket.on('message', msg => {
                socket.broadcast.to(msg.roomId).emit('message', msg.content)
            });
            socket.on('ConteoQuemados', msg => {
                socket.broadcast.to(msg.room).emit('messages', { conteo: msg.conteo, topadas: msg.conteo_topadas, jugadores: msg.jugadores })
            })
            socket.on("disconnect", (reason) => {
                let player = this.players[socket.id];
                if (player) {
                    player.eliminar_jugador(socket.id)
                    io.to(sala).emit("messagess2", `DESCONECTADO ${socket.id} room ${sala}`);
                    delete this.players[socket.id];
                }
            });

            socket.on("setButton", ({ button, value, room }) => {
                let player = this.players[socket.id];
                var sala_playej = this.getsala(room);
                sala_playe = sala_playej
                if (player && room == player.sala) {
                    player.setButton(button, value);
                }
            });
        })
    }

    update() {
        Object.values(this.players).forEach((player) => {
            if (player) player.update();
        });
    }

    sendState() {
        let players = Object.values(this.players).map((player) => {
            return player.getDrawInfo();
        });
        this.io.to(sala_playe).emit("sendState", {
            players: players
        });
    }
    getsala(room) {
        var get_sala;
        Object.values(this.players).forEach((player) => {
            get_sala = salas.find(e => e == room);
        });
        return get_sala;
    }

    doAttack(attack, attacker) {
        Object.values(this.players).forEach((player) => {
            if (
                player.id !== attacker.id &&
                this.checkCollision(attack.hitbox, attacker.position, player.hurtbox, player.position)
            ) {
                player.hurt();
                attacker.animation.pause(5);
                player.animation.pause(5);
            }
        });
    }

    checkCollision(box1, box1Pos, box2, box2Pos) {
        return (
            box1Pos.x + box1.offset.x < box2Pos.x + box2.offset.x + box2.size.x &&
            box1Pos.x + box1.offset.x + box1.size.x > box2Pos.x + box2.offset.x &&
            box1Pos.y + box1.offset.y < box2Pos.y + box2.offset.y + box2.size.y &&
            box1Pos.y + box1.offset.y + box1.size.y > box2Pos.y + box2.offset.y
        );
    }
}

module.exports = Game;