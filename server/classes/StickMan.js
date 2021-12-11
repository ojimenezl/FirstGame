const Animation = require('./Animation');
var parar = 0
var idanfitrion = 0
var validacion, validacion_anidada
var random_ndfitrion = 0
var vector_jugadores = []
var conteo_para_anfitriom = 0
var conteo_para_jugadores = 0
var sala_jugador
var id_jugadores
var obj_jugadores = [{ 'sala_jugador': sala_jugador, 'vec_jugadores': [{ 'id': id_jugadores, 'anfitrion': false, 'jugador': false, 'quemado': false, 'totalQuemados': conteo_para_anfitriom, 'totalTopadas': conteo_para_jugadores, 'totalJugadores': validacion_anidada }] }]
var jugador = 0
var room_jugador
var buscar_jugador_quemado
var buscar_jugador_anfitrion
var listo_jugador_anfitrion
const actions = {
    NONE: 'none',
    HURT: 'hurt',
    ATTACK: {
        PUNCH: 'attack.punch'
    },
}

const attacks = {
    punch: {
        hitbox: {
            size: { x: 56, y: 24 },
            offset: { x: -56, y: -12 }
        }
    },
    punchR: {
        hitbox: {
            size: { x: 56, y: 24 },
            offset: { x: 0, y: -12 }
        }
    }
}

class StickMan {
    constructor(game, id, sala) {
        this.game = game;
        this.id = id;
        this.sala = sala;
        jugador = id;
        room_jugador = sala
        console.log("ob Stick:", obj_jugadores.findIndex(x => x.sala_jugador == this.sala))
        validacion = obj_jugadores.findIndex(x => x.sala_jugador == this.sala)

        if (validacion >= 0) {
            validacion_anidada = obj_jugadores[validacion].vec_jugadores.length
            console.log("validacion", validacion)
            if (obj_jugadores[validacion].vec_jugadores[0]) {
                conteo_para_anfitriom = obj_jugadores[validacion].vec_jugadores[0].totalQuemados
                conteo_para_jugadores = obj_jugadores[validacion].vec_jugadores[0].totalTopadas
                obj_jugadores[validacion].vec_jugadores[validacion_anidada] = ({ 'id': this.id, 'anfitrion': false, 'jugador': false, 'quemado': false, 'totalQuemados': conteo_para_anfitriom, 'totalTopadas': conteo_para_jugadores, 'totalJugadores': validacion_anidada })
                random_ndfitrion = Math.floor(Math.random() * (obj_jugadores[validacion].vec_jugadores.length - 0) + 0)
                obj_jugadores[validacion].vec_jugadores.forEach(e => e.anfitrion = false)
                obj_jugadores[validacion].vec_jugadores[random_ndfitrion].anfitrion = true

            } else {
                conteo_para_anfitriom = 0
                conteo_para_jugadores = 0
                obj_jugadores[validacion].vec_jugadores[validacion_anidada] = ({ 'id': this.id, 'anfitrion': false, 'jugador': false, 'quemado': false, 'totalQuemados': conteo_para_anfitriom, 'totalTopadas': conteo_para_jugadores, 'totalJugadores': validacion_anidada })
                random_ndfitrion = Math.floor(Math.random() * (obj_jugadores[validacion].vec_jugadores.length - 0) + 0)
                obj_jugadores[validacion].vec_jugadores.forEach(e => e.anfitrion = false)
                obj_jugadores[validacion].vec_jugadores[random_ndfitrion].anfitrion = true
            }

        } else {
            validacion_anidada = 0
            obj_jugadores.push({ sala_jugador: this.sala, vec_jugadores: [{ 'id': this.id, 'anfitrion': false, 'jugador': false, 'quemado': false, 'totalQuemados': 0, 'totalTopadas': 0, 'totalJugadores': 1 }] })
            validacion = obj_jugadores.findIndex(x => x.sala_jugador == this.sala)
        }


        this.position = { x: 400, y: 300 };
        this.hurtbox = {
            size: { x: 44, y: 12 },
            offset: { x: -22, y: -6 }
        };
        this.movespeed = { x: 6, y: 4 };
        this.facingRight = false;
        this.input = {};
        this.jugador = {};

        this.animations = {
            stand: new Animation('stickman', 0, 3, 4, true),
            standR: new Animation('stickmanR', 0, 3, 4, true),
            run: new Animation('stickman', 3, 4, 3, true),
            runR: new Animation('stickmanR', 3, 4, 3, true),
            hurt: new Animation('stickman', 7, 5, 3, false),
            hurtR: new Animation('stickmanR', 7, 5, 3, false),
            punch: new Animation('stickmanAttacks', 0, 6, 3, false),
            punchR: new Animation('stickmanAttacksR', 0, 6, 3, false),
        };

        this.animations.punch.onIndex(3, () => { this.game.doAttack(attacks.punch, this) });
        this.animations.punchR.onIndex(3, () => { this.game.doAttack(attacks.punchR, this) });

        this.action = actions.NONE;
        this.animation = this.animations['stand'];
    }


    update() {
        // Read inputs
        let xInput = 0;
        if (this.input.left) {
            if (idanfitrion == this.id) {
                xInput--;
                // xInput = xInput - 0.5;
            } else {
                validacion = obj_jugadores.findIndex(x => x.sala_jugador == this.sala)
                buscar_jugador_quemado = obj_jugadores[validacion].vec_jugadores.find(e => e.id == this.id)
                buscar_jugador_quemado = buscar_jugador_quemado.quemado

                if (parar == 0 || buscar_jugador_quemado == false) {
                    // xInput = xInput - 0.3;
                    xInput--;
                } else {
                    xInput;
                }

            }


        }
        if (this.input.right) {
            if (idanfitrion == this.id) {
                xInput++;
            } else {
                validacion = obj_jugadores.findIndex(x => x.sala_jugador == this.sala)
                buscar_jugador_quemado = obj_jugadores[validacion].vec_jugadores.find(e => e.id == this.id)
                buscar_jugador_quemado = buscar_jugador_quemado.quemado

                if (parar == 0 || buscar_jugador_quemado == false) {
                    xInput++;
                } else {
                    xInput;
                }

            }
        }
        let yInput = 0;
        if (this.input.up) {
            if (idanfitrion == this.id) {
                yInput--;
            } else {
                validacion = obj_jugadores.findIndex(x => x.sala_jugador == this.sala)
                buscar_jugador_quemado = obj_jugadores[validacion].vec_jugadores.find(e => e.id == this.id)
                buscar_jugador_quemado = buscar_jugador_quemado.quemado

                if (parar == 0 || buscar_jugador_quemado == false) {
                    yInput--;
                } else {
                    xInput;
                }

            }
        }
        if (this.input.down) {
            if (idanfitrion == this.id) {
                yInput++;
            } else {
                validacion = obj_jugadores.findIndex(x => x.sala_jugador == this.sala)
                buscar_jugador_quemado = obj_jugadores[validacion].vec_jugadores.find(e => e.id == this.id)
                buscar_jugador_quemado = buscar_jugador_quemado.quemado

                if (parar == 0 || buscar_jugador_quemado == false) {
                    yInput++;

                } else {
                    yInput;
                }

            }
        };

        this.animation.update();
        //COLICIONES
        switch (this.action) {
            case actions.NONE:
                // MOVE
                this.position.y += yInput * this.movespeed.y;



                if (this.position.x >= 0 && this.position.x <= 1330) {
                    this.position.x += xInput * this.movespeed.x;
                } else {
                    this.position.x = 0;
                }
                if (this.position.y >= 0 && this.position.y <= 580) {
                    this.position.y += yInput * this.movespeed.y;

                } else {
                    this.position.y = 0;

                }
                // TURN
                if (xInput > 0)
                    this.facingRight = true;
                else if (xInput < 0)
                    this.facingRight = false;

                // SET STAND OR RUN ANIMATION
                if (xInput === 0 && yInput === 0)
                    this.animation = (!this.facingRight) ? this.animations['stand'] : this.animations['standR'];
                else
                    this.animation = (!this.facingRight) ? this.animations['run'] : this.animations['runR'];

                // PUNCH
                if (this.input.attack) {
                    this.action = actions.ATTACK.PUNCH;
                    this.animation = (!this.facingRight) ? this.animations['punch'] : this.animations['punchR'];
                    validacion = obj_jugadores.findIndex(x => x.sala_jugador == this.sala)
                    console.log("==", validacion, this.sala, this.id)
                    jugador = this.id;
                    this.animation.reset();

                } else {
                    validacion = validacion
                    jugador = jugador
                }
                break;

            case actions.HURT:


                if (this.animation.isDone) {
                    this.action = actions.NONE;
                    this.animation = (!this.facingRight) ? this.animations['stand'] : this.animations['standR'];
                    this.animation.isDone = true;
                    validacion = obj_jugadores.findIndex(x => x.sala_jugador == this.sala)
                    idanfitrion = obj_jugadores[validacion].vec_jugadores.find(e => e.anfitrion == true)
                    idanfitrion = idanfitrion.id
                    if (idanfitrion == jugador) {
                        parar = obj_jugadores[validacion].vec_jugadores.find(e => e.id == this.id)
                        if (parar.quemado == false) {
                            obj_jugadores[validacion].vec_jugadores.forEach(function(dato) {
                                conteo_para_anfitriom = dato.totalQuemados
                                if (dato.quemado == false) {
                                    conteo_para_anfitriom = conteo_para_anfitriom + 1
                                }
                            })
                            obj_jugadores[validacion].vec_jugadores.forEach(e => e.totalQuemados = conteo_para_anfitriom)

                        }
                        parar.quemado = true

                    } else {
                        buscar_jugador_quemado = obj_jugadores[validacion].vec_jugadores.find(e => e.id == this.id)
                        buscar_jugador_quemado = buscar_jugador_quemado.quemado

                        if (buscar_jugador_quemado) {
                            parar = obj_jugadores[validacion].vec_jugadores.find(e => e.id == this.id)
                            parar.quemado = false
                            obj_jugadores[validacion].vec_jugadores.forEach(function(dato) {
                                conteo_para_anfitriom = dato.totalQuemados
                                if (dato.quemado == false) {
                                    conteo_para_anfitriom = conteo_para_anfitriom - 1
                                }
                            })
                            obj_jugadores[validacion].vec_jugadores.forEach(e => e.totalQuemados = conteo_para_anfitriom)
                        } else {
                            parar = 1;
                        }


                    }
                    if (this.id == idanfitrion) {
                        buscar_jugador_anfitrion = obj_jugadores[validacion].vec_jugadores.find(e => e.id == jugador)
                        listo_jugador_anfitrion = buscar_jugador_anfitrion.jugador
                        conteo_para_jugadores = buscar_jugador_anfitrion.totalTopadas
                        if (listo_jugador_anfitrion == false) {
                            conteo_para_jugadores = conteo_para_jugadores + 1
                            buscar_jugador_anfitrion.jugador = true
                        }
                        obj_jugadores[validacion].vec_jugadores.forEach(e => {
                            e.totalTopadas = conteo_para_jugadores
                            e.totalJugadores = obj_jugadores[validacion].vec_jugadores.length
                        })

                    }

                }
                break;

            case actions.ATTACK.PUNCH:
                if (this.animation.isDone) {
                    this.action = actions.NONE;
                    this.animation = (!this.facingRight) ? this.animations['stand'] : this.animations['standR'];


                }
                break;
        }
    }

    eliminar_jugador(desconectado) {
        validacion = obj_jugadores.findIndex(x => x.sala_jugador == this.sala)
        vector_jugadores = obj_jugadores[validacion].vec_jugadores.find(e => e.id == desconectado)
        var indice = obj_jugadores[validacion].vec_jugadores.findIndex(e => e.id == desconectado)

        if (vector_jugadores) {
            delete vector_jugadores.anfitrion
            delete vector_jugadores.id
            delete vector_jugadores.quemado
            conteo_para_anfitriom = vector_jugadores.totalQuemados
            delete vector_jugadores.totalQuemados
                //sumar un quemado
            validacion = obj_jugadores.findIndex(x => x.sala_jugador == this.sala)
            obj_jugadores[validacion].vec_jugadores.splice(indice, 1)
            validacion_anidada = obj_jugadores[validacion].vec_jugadores.length
        }
    }
    setButton(button, value) {
        this.input[button] = value;
    }

    hurt() {
        this.action = actions.HURT;
        this.animation = (!this.facingRight) ? this.animations.hurt : this.animations.hurtR;
        this.animation.reset();
    }

    getDrawInfo() {
        return {
            jugadores: obj_jugadores[validacion],
            sala: this.sala,
            position: this.position,
            facingRight: this.facingRight,
            animation: {
                spriteKey: this.animation.spriteKey,
                index: this.animation.getDrawIndex(),
            },
        }
    }
}

module.exports = StickMan;