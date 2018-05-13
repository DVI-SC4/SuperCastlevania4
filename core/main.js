window.addEventListener('load', function () {
    let level = 1;
    let escena = 2;
    let MAX_ESCENA = 2;

    const Q = window.Q = Quintus({audioSupported: ['mp3', 'ogg', 'wav']})
        .include("Sprites, Scenes, Input, Touch, UI, Anim, TMX, 2D, Audio")
        .include("Simon")
        .include("Skeleton, Bat")
        .setup({width: 448, height: 448})
        .controls().touch().enableSound();

    Q.Sprite.extend("CambioZona", {
        init: function (p) {
            this._super(p, {
                asset: "simon_normal.png",
                w: 10,
                h: 10,
                type: Q.SPRITE_ENEMY,
                gravity: 0,
                cambiandoZona: false,
                zonaNueva: false,
                temporizazdorZona: 0,
                temporizazdorZonaNueva: 0,
                sensor: true
            });
            this.add('2d, aiBounce, animation');
            this.on("bump.left,bump.right, bump.top, bump.bottom", function (collision) {
                this.stage.del("viewport");
                this.p.cambiandoZona = true;
                this.p.type = Q.SPRITE_NONE;
                this.p.collisionMask = Q.SPRITE_NONE;
            });
        },
        step: function (dt) {
            let opacidad = 0.1;
            if (this.p.cambiandoZona) {
                this.p.temporizazdorZona++;
            }
            if ((this.p.temporizazdorZona > 20) && this.p.cambiandoZona) {

                this.p.cambiandoZona = false;
                this.p.zonaNueva = true;
                this.p.temporizazdorZona = 0;
            }
            if (this.p.zonaNueva) {
                opacidad += 0.01;
                this.p.temporizazdorZona++;
                const containerscore = this.stage.insert(new Q.UI.Container({
                    x: (Q.width / 2) + 100,
                    y: Q.width / 2,
                    w: 10000,
                    h: 10000,
                    fill: "rgba(0,0,0," + opacidad + ")"
                }));
            }
            if ((this.p.temporizazdorZona > 50) && this.p.zonaNueva) {
                if (escena === MAX_ESCENA) {
                    escena = 0;
                }
                Q.clearStages();
                escena++;
                Q.stageScene('level');
            }
        }
    });

    Q.Sprite.extend("EscaleraArriba", {
        init: function(p) {
            this._super(p, {
                w:10,
                h:10,
                gravity:0,
                type: Q.SPRITE_ENEMY
            });
            this.add('2d, aiBounce, animation');
            this.on("bump.left,bump.right, bump.top, bump.bottom",function(collision) {
                console.log("holaaaaaaaaaaaaaaaaaa");
                if(collision.obj.isA("Simon")) {
                    collision.obj.p.vy = -300;
                    console.log("HOLIIIIIIIIIII");
                }
            });
        },
        step: function (dt){}
    });

    Q.scene('level', function(stage) {
        const nivel = "nivel" + level + "-scn" + escena + ".tmx";
        Q.stageTMX(nivel, stage);
    });

    Q.scene('startGame',function(stage) {
        Q.state.reset({ monedasRecogidas: 0, lives: 3, puntuacion: 0});
        const container = stage.insert(new Q.UI.Container({
            x: Q.width / 2,
            y: Q.height / 2,
            fill: "rgba(0,0,0,0.5)"
        }));
        const button = container.insert(new Q.UI.Button({
            x: 0,
            y: 0,
            h: Q.height,
            w: Q.width,
            asset: "mainTitle1.jpg",
        }));
        button.on("click",function() {
            Q.stageScene('level');
        });
        Q.input.on("confirm",stage,function() {
            Q.stageScene('level');
        });
    });

    Q.loadTMX("mario_small.png, mario_small.json,mainTitle1.jpg, nivel1-scn1.tmx,  nivel1-scn2.tmx, simon_intro.png, simon_intro.json, whip.png, basic_whip.png, simon_normal.png, simon_normal.json, simon_normal_andando.png, simon_normal_andando.json, simon_agachado.png, simon_agachado.json, simon_normal_atacando.png, simon_normal_atacando.json, simon_agachado_atacando.png, simon_agachado_atacando.json, simon_agachado_andando.png, simon_agachado_andando.json, simon_saltando.png, simon_saltando.json, simon_saltando_atacando.png, simon_saltando_atacando.json, simon_atacando_haciarriba.png, simon_atacando_haciarriba.json, simon_herido.png, simon_muerto.png, simon_muerto.json, simon_atacando_diagonal.png, simon_atacando_diagonal.json, simon_saltando_atacando_haciarriba.png, simon_saltando_atacando_haciarriba.json, simon_saltando_atacando_diagonalarriba.png, simon_saltando_atacando_diagonalarriba.json, simon_saltando_atacando_diagonalabajo.png, simon_saltando_atacando_diagonalabajo.json, simon_saltando_atacando_haciabajo.png, simon_saltando_atacando_haciabajo.json, simon_subescaleras.png, simon_subescaleras.json, simon_subescaleras_atacando.png, simon_subescaleras_atacando.json, simon_subescaleras_atacando_haciarriba.png, simon_subescaleras_atacando_haciarriba.json, simon_subescaleras_atacando_diagonal.png, simon_subescaleras_atacando_diagonal.json, simon_bajaescaleras.png, simon_bajaescaleras.json, simon_bajaescaleras_atacando.png, simon_bajaescaleras_atacando.json, simon_bajaescaleras_atacando_diagonal.png, simon_bajaescaleras_atacando_diagonal.json", function() {
        Q.compileSheets("simon_normal.png", "simon_normal.json");
        Q.compileSheets("simon_normal_andando.png", "simon_normal_andando.json");
        Q.compileSheets("simon_agachado.png", "simon_agachado.json");
        Q.compileSheets("simon_normal_atacando.png", "simon_normal_atacando.json");
        Q.compileSheets("simon_agachado_atacando.png", "simon_agachado_atacando.json");
        Q.compileSheets("simon_agachado_andando.png", "simon_agachado_andando.json");
        Q.compileSheets("simon_saltando.png", "simon_saltando.json");
        Q.compileSheets("simon_saltando_atacando.png", "simon_saltando_atacando.json");
        Q.compileSheets("simon_atacando_haciarriba.png", "simon_atacando_haciarriba.json");
        Q.compileSheets("simon_muerto.png", "simon_muerto.json");

        Q.compileSheets("simon_atacando_diagonal.png", "simon_atacando_diagonal.json");
        Q.compileSheets("simon_saltando_atacando_haciarriba.png", "simon_saltando_atacando_haciarriba.json");
        Q.compileSheets("simon_saltando_atacando_diagonalarriba.png", "simon_saltando_atacando_diagonalarriba.json");
        Q.compileSheets("simon_saltando_atacando_diagonalabajo.png", "simon_saltando_atacando_diagonalabajo.json");
        Q.compileSheets("simon_saltando_atacando_haciabajo.png", "simon_saltando_atacando_haciabajo.json");

        Q.compileSheets("simon_subescaleras.png", "simon_subescaleras.json");
        Q.compileSheets("simon_subescaleras_atacando.png", "simon_subescaleras_atacando.json");
        Q.compileSheets("simon_subescaleras_atacando_haciarriba.png", "simon_subescaleras_atacando_haciarriba.json");
        Q.compileSheets("simon_subescaleras_atacando_diagonal.png", "simon_subescaleras_atacando_diagonal.json");
        Q.compileSheets("simon_bajaescaleras.png", "simon_bajaescaleras.json");
        Q.compileSheets("simon_bajaescaleras_atacando.png", "simon_bajaescaleras_atacando.json");
        Q.compileSheets("simon_bajaescaleras_atacando_diagonal.png", "simon_bajaescaleras_atacando_diagonal.json");

        Q.animations("andando_normal", {
            anda_derecha: { frames: [0,1,2,3,4,5], rate: 5/15},
            anda_izquierda: { frames: [6,7,8,9,10,11], rate: 5/15}
        });

        Q.animations("atacando", {
            ataca_derecha: { frames: [0,1,2], rate: 2/15, loop:false, trigger: "showwhip"},
            ataca_izquierda: { frames: [3,4,5], rate: 2/15, loop:false, trigger: "showwhip"}
        });

        Q.animations("agachado_atacando", {
            ataca_agachado_derecha: { frames: [0,1,2], rate: 2/15, loop:false, trigger: "showwhip_ducked"},
            ataca_agachado_izquierda: { frames: [3,4,5], rate: 2/15, loop:false, trigger: "showwhip_ducked"}
        });

        Q.animations("normalito", {
            pose_normal_derecha: { frames: [0], rate: 5/15, loop:false},
            pose_normal_izquierda: { frames: [1], rate: 5/15, loop:false}
        });

        Q.animations("agachado", {
            pose_agachado_derecha: { frames: [0], rate: 5/15, loop:false},
            pose_agachado_izquierda: { frames: [1], rate: 5/15, loop:false}
        });

        Q.animations("andando_agachado", {
            pose_andando_agachado_derecha: { frames: [0,1,2,3,4], rate: 6/15},
            pose_andando_agachado_izquierda: { frames: [5,6,7,8,9], rate: 6/15}
        });

        Q.animations("saltando", {
            salta_derecha: { frames: [0], rate: 5/15},
            salta_izquierda: { frames: [1], rate: 5/15}
        });

        Q.animations("saltando_atacando", {
            saltataca_derecha: { frames: [0,1,2], rate: 3/15, loop:false, trigger: "showwhip_jumping"},
            saltataca_izquierda: { frames: [3,4,5], rate: 3/15, loop:false, trigger: "showwhip_jumping"}
        });

        Q.animations("atacando_haciarriba", {
            ataca_haciarriba_derecha: { frames: [0,1,2], rate: 2/15, loop:false, trigger: "showwhip_upwards"},
            ataca_haciarriba_izquierda: { frames: [3,4,5], rate: 2/15, loop:false, trigger: "showwhip_upwards"}
        });

        Q.animations("atacando_diagonal", {
            ataca_diagonal_derecha: { frames: [0,1,2], rate: 2/15, loop:false, trigger: "showwhip_diagonal"},
            ataca_diagonal_izquierda: { frames: [3,4,5], rate: 2/15, loop:false, trigger: "showwhip_diagonal"}
        });

        Q.animations("saltando_atacando_haciarriba", {
            saltataca_haciarriba_derecha: { frames: [0,1,2], rate: 2/15, loop:false, trigger: "showwhip_upwards_jumping"},
            saltataca_haciarriba_izquierda: { frames: [3,4,5], rate: 2/15, loop:false, trigger: "showwhip_upwards_jumping"}
        });

        Q.animations("saltando_atacando_diagonalarriba", {
            saltataca_diagonal_haciarriba_derecha: { frames: [0,1,2], rate: 2/15, loop:false, trigger: "showwhip_upwards_jumping_diagonal"},
            saltataca_diagonal_haciarriba_izquierda: { frames: [3,4,5], rate: 2/15, loop:false, trigger: "showwhip_upwards_jumping_diagonal"}
        });

        Q.animations("saltando_atacando_diagonalabajo", {
            saltataca_diagonal_haciabajo_derecha: { frames: [0,1,2], rate: 2/15, loop:false, trigger: "showwhip_downwards_jumping_diagonal"},
            saltataca_diagonal_haciabajo_izquierda: { frames: [3,4,5], rate: 2/15, loop:false, trigger: "showwhip_downwards_jumping_diagonal"}
        });

        Q.animations("saltando_atacando_haciabajo", {
            saltataca_haciabajo_derecha: { frames: [0,1,2], rate: 2/15, loop:false, trigger: "showwhip_downwards_jumping"},
            saltataca_haciabajo_izquierda: { frames: [3,4,5], rate: 2/15, loop:false, trigger: "showwhip_downwards_jumping"}
        });

        Q.animations("simon_muriendo", {
            muriendo: { frames: [0,1,2], rate: 6/15, loop:false} //se me olvidó hacer su versión hacia la izquierda, pero se podrá hacer un flip X aunque pierda algo de calidad
        });

        Q.animations("subiendo_escaleras", {
            sube_escaleras_haciaderecha: { frames: [0,1,2,3,4,5,6], rate: 5/15, loop:false},
            sube_escaleras_haciaizquierda: { frames: [7,8,9,10,11,12,13], rate: 5/15, loop:false}
        });

        Q.animations("subiendo_escaleras_atacando", {
            sube_escaleras_haciaderecha_atacando: { frames: [0,1,2,3,4,5], rate: 5/15, loop:false},
            sube_escaleras_haciaizquierda_atacando: { frames: [6,7,8,9,10,11], rate: 5/15, loop:false}
        });

        Q.animations("subiendo_escaleras_atacando_haciarriba", {
            sube_escaleras_haciaderecha_atacando_haciarriba: { frames: [0,1,2], rate: 5/15, loop:false},
            sube_escaleras_haciaizquierda_atacando_haciarriba: { frames: [3,4,5], rate: 5/15, loop:false}
        });

        Q.animations("subiendo_escaleras_atacando_diagonal", {
            sube_escaleras_haciaderecha_atacando_diagonal: { frames: [0,1,2], rate: 5/15, loop:false},
            sube_escaleras_haciaizquierda_atacando_diagonal: { frames: [3,4,5], rate: 5/15, loop:false}
        });

        Q.animations("bajando_escaleras", {
            baja_escaleras_haciaizquierda: { frames: [0,1,2,3,4,5], rate: 5/15, loop:false},
            baja_escaleras_haciaderecha: { frames: [6,7,8,9,10,11], rate: 5/15, loop:false}
        });

        Q.animations("bajando_escaleras_atacando", {
            baja_escaleras_haciaizquierda_atacando: { frames: [0,1,2], rate: 5/15, loop:false},
            baja_escaleras_haciaderecha_atacando: { frames: [3,4,5], rate: 5/15, loop:false}
        });

        Q.animations("bajando_escaleras_atacando_diagonal", {
            baja_escaleras_haciaizquierda_atacando_diagonal: { frames: [0,1,2], rate: 5/15, loop:false},
            baja_escaleras_haciaderecha_atacando_diagonal: { frames: [3,4,5], rate: 5/15, loop:false}
        });

        Q.stageScene("startGame");
    });
});