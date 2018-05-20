var level = 1;
var escena = 2;
var MAX_ESCENA = 2;

window.addEventListener('load', function () {
    const Q = window.Q = Quintus({audioSupported: ['ogg', 'mp3']})
        .include("Sprites, Scenes, Input, Touch, UI, Anim, TMX, 2D, Audio")
        .include("CastlevaniaScenes, CastlevaniaLevels, CastlevaniaControls")
        .include("CastlevaniaCredits, CastlevaniaMenus, CastlevaniaIntro, CastlevaniaEscaleras")
        .include("CastlevaniaEnemy")
        .include("Simon, Skeleton, Bat")
        .setup({width: 584, height: 448})
        .controls().touch().enableSound();

    Q.load('simon_intro.png, simon_intro.json, whip.png, basic_whip.png, simon_normal.png, simon_normal.json, simon_normal_andando.png, simon_normal_andando.json, simon_agachado.png, simon_agachado.json, simon_normal_atacando.png, simon_normal_atacando.json, simon_agachado_atacando.png, simon_agachado_atacando.json, simon_agachado_andando.png, simon_agachado_andando.json, simon_saltando.png, simon_saltando.json, simon_saltando_atacando.png, simon_saltando_atacando.json, simon_atacando_haciarriba.png, simon_atacando_haciarriba.json, simon_herido.png, simon_muerto.png, simon_muerto.json, simon_atacando_diagonal.png, simon_atacando_diagonal.json, simon_saltando_atacando_haciarriba.png, simon_saltando_atacando_haciarriba.json, simon_saltando_atacando_diagonalarriba.png, simon_saltando_atacando_diagonalarriba.json, simon_saltando_atacando_diagonalabajo.png, simon_saltando_atacando_diagonalabajo.json, simon_saltando_atacando_haciabajo.png, simon_saltando_atacando_haciabajo.json, simon_subescaleras.png, simon_subescaleras.json, simon_subescaleras_atacando.png, simon_subescaleras_atacando.json, simon_subescaleras_atacando_haciarriba.png, simon_subescaleras_atacando_haciarriba.json, simon_subescaleras_atacando_diagonal.png, simon_subescaleras_atacando_diagonal.json, simon_bajaescaleras.png, simon_bajaescaleras.json, simon_bajaescaleras_atacando.png, simon_bajaescaleras_atacando.json, simon_bajaescaleras_atacando_diagonal.png, simon_bajaescaleras_atacando_diagonal.json', function () {
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

        Q.compileSheets("simon_intro.png", "simon_intro.json");

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
            sube_escaleras_haciaderecha: { frames: [0,1,2,3,4,5,6], rate: 5/15},
            sube_escaleras_haciaizquierda: { frames: [7,8,9,10,11,12,13], rate: 5/15},
            sube_escaleras_parado_haciaderecha: { frames: [6], rate: 5/15,loop:false},
            sube_escaleras_parado_haciaizquierda: { frames: [13], rate: 5/15,loop:false}
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
            baja_escaleras_haciaizquierda: { frames: [0,1,2,3,4,5], rate: 5/15},
            baja_escaleras_haciaderecha: { frames: [6,7,8,9,10,11], rate: 5/15},
            baja_escaleras_parado_haciaderecha: { frames: [11], rate: 5/15,loop:false},
            baja_escaleras_parado_haciaizquierda: { frames: [5], rate: 5/15,loop:false}
        });

        Q.animations("bajando_escaleras_atacando", {
            baja_escaleras_haciaizquierda_atacando: { frames: [0,1,2], rate: 5/15, loop:false},
            baja_escaleras_haciaderecha_atacando: { frames: [3,4,5], rate: 5/15, loop:false}
        });

        Q.animations("bajando_escaleras_atacando_diagonal", {
            baja_escaleras_haciaizquierda_atacando_diagonal: { frames: [0,1,2], rate: 5/15, loop:false},
            baja_escaleras_haciaderecha_atacando_diagonal: { frames: [3,4,5], rate: 5/15, loop:false}
        });
    });

    Q.loadTMX("controls/menu_press_enter.png, controls/controls.png, credits/nombre_juego.png, credits/introduccion_nombres.png, credits/nombre_cesar.png, credits/foto_cesar.jpg, credits/nombre_carmen.png, credits/foto_carmen.jpg, credits/nombre_sergio.png, credits/foto_sergio.jpg, credits/disclaimer.png, credits/nombre_asignatura.png, credits/nombre_uni.png, credits/logo_konami.jpg, credits/logo_principal.png, nivel1-scn1.tmx,  nivel1-scn2.tmx", function() {
        Q.stageScene("inicio");
    });
});