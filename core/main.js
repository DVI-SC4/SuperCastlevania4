window.addEventListener('load', function () {
    let level = 1;
    let escena = 2;
    let MAX_ESCENA = 2;

    const Q = window.Q = Quintus({audioSupported: ['ogg', 'mp3']})
        .include("Sprites, Scenes, Input, Touch, UI, Anim, TMX, 2D, Audio")
        .include("Simon")
        .include("Skeleton, Bat")
        .setup({width: 584, height: 448})
        .controls().touch().enableSound();

    /********************************************* NIVEL *******************************************************/
    //
    //
    /***********************************************************************************************************/

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

        //stage.insert(new Q.Esqueleto({ x: 250, y: 200 }));
        //stage.insert(new Q.Murcielago({ x: 350, y: 300 }));
    });

    /***************************************** PANTALLA DE INICIO **********************************************/
    //
    //
    /***********************************************************************************************************/

    Q.scene('inicio',function(stage) {
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
            asset: "intro/mainTitle.jpg",
        }));
        button.on("click",function() {
            Q.stageScene('introLogos');
        });
        Q.input.on("confirm",stage,function() {
            Q.stageScene('introLogos');
        });
    });//inicio

    /********************************************* CONTROLES ***************************************************/
    //
    //
    /***********************************************************************************************************/

    Q.Sprite.extend("ilustracionControl", {
        init: function(p) {
            this._super(p, {
                gravity:0,
                opacity: 1
            });
            
        },
        step: function (dt){}
    });

    Q.scene('controles',function(stage) {
        
        //console.log("estas en el tutorial de controles");
        Q.audio.play("controls.ogg",{loop:true});
        
        stage.insert(new Q.ilustracionControl({asset: "controls/controls.png", x:292, y:224}));
        stage.insert(new Q.ilustracionControl({asset: "controls/menu_press_enter.png", x:292, y:410, scale:0.4}));


        Q.input.on("confirm",stage,function() { //pulsamos enter volver a menu
            Q.audio.stop("controls.ogg");
            Q.clearStages();
            Q.stageScene('menuPrincipal');
        });
    });

    /********************************************* CREDITOS *****************************************************/
    //
    //
    /***********************************************************************************************************/

    Q.Sprite.extend("elementoCreditos", {
        init: function(p) {
            this._super(p, {
                gravity: 0,
                opacity: 0,
                horaCreacion: 0,
                duracionSegundosVida: 0,
                duracionVisible: 0,
                id: 0,
                puedeDesvanecerse: false
            });

            this.add('animation');
            
        },

        fadeIn: function(){
            if(this.p.opacity < 1 && !this.p.puedeDesvanecerse){
                this.p.opacity += 0.015;
                if(this.p.opacity > 1) {
                    this.p.opacity = 1;
                    this.p.puedeDesvanecerse = true;
                    this.p.horaVisible = (new Date().getTime())/1000;
                }
            } 
        },

        fadeOut: function(horaActual){
            if(this.p.puedeDesvanecerse && horaActual >= this.p.horaVisible+this.p.duracionVisible){
                this.p.opacity -= 0.015;
                if(this.p.opacity < 0) this.p.opacity = 0;
            }
        },

        step: function (dt){

            if(this.p.duracionSegundosVida !== 0){
                let horaActual = new Date().getTime()/1000;
                if(horaActual >= this.p.horaCreacion+this.p.duracionSegundosVida) {
                    this.destroy();
                    if(this.p.id === 14){
                        Q.clearStages();
                        Q.stageScene('menuPrincipal');
                    }
                }

                if(horaActual >= this.p.horaCreacion){
                    this.fadeIn();
                    if(this.p.id === 2 && this.p.puedeDesvanecerse){
                        if(this.p.y > 60) this.p.y -= 1;
                    }
                    if(this.p.id === 14 && this.p.puedeDesvanecerse){
                        if(horaActual < this.p.horaVisible+2) this.play("da_latigazo");
                    }
                    this.fadeOut(horaActual);
                } 
            }

        }//step elementoCreditos
    });

    Q.scene('creditos',function(stage) {
        
        //console.log("estas en los creditos");
        Q.audio.play("credits.ogg");
        let horaActual = (new Date().getTime())/1000;

        stage.insert(new Q.elementoCreditos({asset: "controls/menu_press_enter.png", x:292, y:410, opacity: 1, scale:0.4}));

        let nombreJuego = stage.insert(new Q.elementoCreditos({asset: "credits/nombre_juego.png", x:292, y:224, scale:2, horaCreacion: horaActual, duracionSegundosVida: 6, duracionVisible: 3, id: 1}));

        let introNombres = stage.insert(new Q.elementoCreditos({asset: "credits/introduccion_nombres.png", x:292, y:210, scale:1.4, horaCreacion: horaActual+nombreJuego.p.duracionSegundosVida, duracionSegundosVida: 34, duracionVisible: 25.5, id: 2}));

        let nombreCesar = stage.insert(new Q.elementoCreditos({asset: "credits/nombre_cesar.png", x:292, y:340, scale:1.4, horaCreacion: horaActual+nombreJuego.p.duracionSegundosVida+5, duracionSegundosVida: 15, duracionVisible: 4.5, id: 3}));
        let fotoCesar = stage.insert(new Q.elementoCreditos({asset: "credits/foto_cesar.jpg", x:292, y:210, scale:0.7, horaCreacion: horaActual+nombreJuego.p.duracionSegundosVida+5, duracionSegundosVida: 15, duracionVisible: 4.5, id: 4}));

        let nombreCarmen = stage.insert(new Q.elementoCreditos({asset: "credits/nombre_carmen.png", x:292, y:340, scale:1.4, horaCreacion: horaActual+nombreJuego.p.duracionSegundosVida+13, duracionSegundosVida: 30, duracionVisible: 4.5, id: 5}));
        let fotoCarmen = stage.insert(new Q.elementoCreditos({asset: "credits/foto_carmen.jpg", x:292, y:210, scale:0.7, horaCreacion: horaActual+nombreJuego.p.duracionSegundosVida+13, duracionSegundosVida: 30, duracionVisible: 4.5, id: 6}));

        let nombreSergio = stage.insert(new Q.elementoCreditos({asset: "credits/nombre_sergio.png", x:292, y:340, scale:1.4, horaCreacion: horaActual+nombreJuego.p.duracionSegundosVida+21, duracionSegundosVida: 34, duracionVisible: 4.5, id: 7}));
        let fotoSergio = stage.insert(new Q.elementoCreditos({asset: "credits/foto_sergio.jpg", x:292, y:210, scale:0.7, horaCreacion: horaActual+nombreJuego.p.duracionSegundosVida+21, duracionSegundosVida: 34, duracionVisible: 4.5, id: 8}));

        let disclaimer = stage.insert(new Q.elementoCreditos({asset: "credits/disclaimer.png", x:292, y:330, scale:1.4, horaCreacion: horaActual+fotoSergio.p.duracionSegundosVida, duracionSegundosVida: 8, duracionVisible: 5, id: 9}));
        let fotoKonami = stage.insert(new Q.elementoCreditos({asset: "credits/logo_konami.jpg", x:292, y:170, scale:0.5, horaCreacion: horaActual+fotoSergio.p.duracionSegundosVida, duracionSegundosVida: 8, duracionVisible: 5, id: 10}));

        let nombreAsignatura = stage.insert(new Q.elementoCreditos({asset: "credits/nombre_asignatura.png", x:292, y:170, scale:1.6, horaCreacion: disclaimer.p.horaCreacion+disclaimer.p.duracionSegundosVida, duracionSegundosVida: 8, duracionVisible: 5, id: 11}));
        let nombreUni = stage.insert(new Q.elementoCreditos({asset: "credits/nombre_uni.png", x:292, y:270, scale:1.6, horaCreacion: disclaimer.p.horaCreacion+disclaimer.p.duracionSegundosVida, duracionSegundosVida: 8, duracionVisible: 5, id: 12}));
        
        let logoPrincipal = stage.insert(new Q.elementoCreditos({asset: "credits/logo_principal.png", x:292, y:140, horaCreacion: nombreAsignatura.p.horaCreacion+disclaimer.p.duracionSegundosVida, duracionSegundosVida: 210, duracionVisible: 205, id: 13}));
        let simonCreditos = stage.insert(new Q.elementoCreditos({sprite: "pose_intro_juego", sheet: "pose_intro_juego", x:292, y:310, scale: 0.80, horaCreacion: logoPrincipal.p.horaCreacion+2, duracionSegundosVida: 210, duracionVisible: 203, id: 14}));

        Q.input.on("confirm",stage,function() { //pulsamos enter durante los creditos para volver al menu
            Q.audio.stop("credits.ogg");
            Q.clearStages();
            Q.stageScene('menuPrincipal');
        });


    });

    /********************************************* INTRO *******************************************************/
    //
    //
    /***********************************************************************************************************/

    Q.Sprite.extend("parte2intro", {
        init: function(p) {
            this._super(p, {
                asset: "intro/parte2.png",
                x:-300,
                y:230,
                gravity:0,
                scale: 1.2
            });
            
        },
        step: function (dt){
            
            if(this.p.x < 300)  this.p.x += 18;

            if(this.p.x >= 300){
                if(this.p.parte1.p.opacity < 1) this.p.parte1.p.opacity = 1;
                if(this.p.parte0.p.opacity === 0) this.p.parte0.p.opacity = 1;
                if(this.p.y < 800) this.p.y += 18;
            }

            if(this.p.y >= 800) {
                this.destroy();
                this.p.parte1.p.ready = true;
            }
        }
    });

    Q.Sprite.extend("parte1intro", {
        init: function(p) {
            this._super(p, {
                asset: "intro/parte1.png",
                x:292,
                y:224,
                gravity:0,
                opacity: 0,
                scale: 1.1,
                ready: false
            });

        },
        step: function (dt){
            
            if(this.p.ready){
                
                if(this.p.opacity === 1) Q.audio.play("sonido_logotipo_intro.ogg");
                this.p.opacity -= 0.020;
                if(this.p.opacity <= 0.05) {
                    this.p.ready = false;
                    this.p.horaDeCambiar = (new Date().getTime()/1000)+3;
                }
            }

            let horaActual = (new Date().getTime())/1000;
            if(horaActual >= this.p.horaDeCambiar) {
                Q.clearStages();
                Q.stageScene('menuPrincipal');
            }
            
        }
    });

    Q.Sprite.extend("parte0intro", {
        init: function(p) {
            this._super(p, {
                asset: "intro/parte0.png",
                x:292,
                y:224,
                gravity:0,
                scale: 1.1,
                opacity: 0
            });
            
        },
        step: function (dt){}
    });

    Q.scene('introLogos',function(stage) {
        
        //console.log("estas en la intro");

        let parte0 = stage.insert(new Q.parte0intro());
        let parte1 = stage.insert(new Q.parte1intro({parte0: parte0}));
        let parte2 = stage.insert(new Q.parte2intro({parte1: parte1, parte0: parte0}));

        Q.input.on("confirm",stage,function() { //pulsamos enter durante la intro para saltarla
            Q.audio.stop("sonido_logotipo_intro.ogg");
            Q.clearStages();
            Q.stageScene('menuPrincipal');
        });
    });

    /********************************************* MENU PRINCIPAL************************************************/
    //
    //
    /***********************************************************************************************************/


    Q.Sprite.extend("fondoMenuPrincipal", {
        init: function(p) {
            this._super(p, {
                asset: "menu_principal/fondo_menuprincipal.jpg",
                x:292,
                y:224,
                gravity:0,
                opacity: 1
            });
            
        },
        step: function (dt){
            //console.log(this.p.y);
        }
    });

    Q.Sprite.extend("opcionMenu", {
        init: function(p) {
            this._super(p, {
                asset: "",
                x:292,
                y:290,
                gravity:0,
                scale: 0.5,
                opacity: 1,
                elegida: false,
                horaElegida: 0
            });
            
        },
        step: function (dt){
            //console.log(this.p.y);

            if(this.p.elegida) {
                if(this.p.opacity === 1) this.p.opacity = 0;
                else this.p.opacity = 1;

                //Q.audio.stop("menu_music.ogg");
                //Q.audio.play("menu_choice.ogg");

                let horaActual = new Date().getTime();
                //this.p.horaDeEntrar = horaActual+3000;

                if(horaActual-this.p.horaElegida >= 2000){
                    Q.clearStages();

                    if(this.p.asset === "menu_principal/start.png") Q.stageScene("level");
                    else if(this.p.asset === "menu_principal/controls.png") Q.stageScene("controles"); //console.log("escena de controles");
                    else if(this.p.asset === "menu_principal/credits.png") Q.stageScene("creditos"); //console.log("escena de creditos");
                }

                
            }
        }
    });

    Q.Sprite.extend("SelectorMenu", {
        init: function(p) {
            this._super(p, {
                sprite: "selector_llama",
                sheet: "selector_llama",
                x:292,
                y:370,
                gravity:0,
                scale: 1.5,
                opacity: 1,
                animacion_activada: false,
                opcion_apuntada: 0,
                coordenadas_opciones_s1: [{x:225,y:285}, {x:195,y:325}, {x:205,y:365}],
                coordenadas_opciones_s2: [{x:360,y:285}, {x:390,y:325}, {x:380,y:365}],
                num_selector: 0,
                puede_usarse: true,
                momento_yapuede: 0,
                inhabilitado: false
            });

            this.add('animation', 'platformerControl');
            
        },

        actualizaCoordenadas: function(){
            if(this.p.num_selector === 1){
                this.p.x = this.p.coordenadas_opciones_s1[this.p.opcion_apuntada].x;
                this.p.y = this.p.coordenadas_opciones_s1[this.p.opcion_apuntada].y;
            }
            else if(this.p.num_selector === 2){
                this.p.x = this.p.coordenadas_opciones_s2[this.p.opcion_apuntada].x;
                this.p.y = this.p.coordenadas_opciones_s2[this.p.opcion_apuntada].y;
            }
        },

        step: function (dt){
            if(!this.p.animacion_activada){
                this.play("selector_animado");
                this.p.animacion_activada = true;
            }
            
            if(!this.p.inhabilitado){
                if(Q.inputs['down'] && this.p.puede_usarse){

                    Q.audio.play("menu_switching.ogg");
                    this.p.puede_usarse = false;
                    this.p.momento_yapuede = new Date().getTime() + 200; //0.1 segundos de margen entre pulsacion

                    if(this.p.opcion_apuntada === 2) this.p.opcion_apuntada = 0;
                    else this.p.opcion_apuntada++;

                    this.actualizaCoordenadas();
                }
                else if(Q.inputs['up'] && this.p.puede_usarse){

                    Q.audio.play("menu_switching.ogg");
                    this.p.puede_usarse = false;
                    this.p.momento_yapuede = new Date().getTime() + 200; //0.1 segundos de margen entre pulsacion

                    if(this.p.opcion_apuntada === 0) this.p.opcion_apuntada = 2;
                    else this.p.opcion_apuntada--;

                    this.actualizaCoordenadas();
                }

                if(!this.p.puede_usarse){
                    let horaActual = new Date().getTime();
                    if(horaActual >= this.p.momento_yapuede) this.p.puede_usarse = true;
                }
            }
            

        }//step selector
    });

    Q.scene('menuPrincipal',function(stage) {
        
        Q.audio.play("menu_music.ogg", {loop: true});

        //console.log("estas en el menu principal");
        let fondo = stage.insert(new Q.fondoMenuPrincipal());
        let opcion0 = stage.insert(new Q.opcionMenu({asset: "menu_principal/start.png", x:292, y:290 }));
        let opcion1 = stage.insert(new Q.opcionMenu({asset: "menu_principal/controls.png", x:292, y: 330}));
        let opcion2 = stage.insert(new Q.opcionMenu({asset: "menu_principal/credits.png", x:292, y:370 }));
        let press_enter = stage.insert(new Q.opcionMenu({asset: "menu_principal/press_enter.png", x:292, y:420, scale: 0.35}));

        let selector1 = stage.insert(new Q.SelectorMenu({x:220, y:285, num_selector:1}));
        let selector2 = stage.insert(new Q.SelectorMenu({x:360, y:285, num_selector:2}));

        Q.input.on("confirm",stage,function() { //pulsamos enter para elegir una opcion
            //Q.clearStages();
            //Q.stageScene('level');

            //console.log(selector1.p.opcion_apuntada);

            

            if(!selector1.p.inhabilitado){

                Q.audio.stop("menu_music.ogg");
                Q.audio.play("menu_choice.ogg");

                selector1.p.inhabilitado = true;
                selector2.p.inhabilitado = true;

                if(selector1.p.opcion_apuntada == 0){
                    opcion0.p.elegida = true;
                    opcion0.p.horaElegida = new Date().getTime();
                }
                else if(selector1.p.opcion_apuntada == 1){
                    opcion1.p.elegida = true;
                    opcion1.p.horaElegida = new Date().getTime();
                }
                else{
                    opcion2.p.elegida = true;
                    opcion2.p.horaElegida = new Date().getTime();
                }
            }
            
        });
        
    });

    /************************************ CARGA DE RECURSOS Y ANIMACIONES***************************************/
    //
    //
    /***********************************************************************************************************/

    Q.loadTMX("intro/mainTitle.jpg, sonido_logotipo_intro.ogg, intro/parte0.png, intro/parte1.png, intro/parte2.png, menu_principal/fondo_menuprincipal.jpg, menu_principal/start.png, menu_principal/controls.png, menu_principal/credits.png, menu_principal/press_enter.png, menu_principal/selector.png, selector.json, menu_music.ogg, menu_music.ogg, menu_choice.ogg, menu_switching.ogg, controls.ogg, credits.ogg, controls/menu_press_enter.png, controls/controls.png, credits/nombre_juego.png, credits/introduccion_nombres.png, credits/nombre_cesar.png, credits/foto_cesar.jpg, credits/nombre_carmen.png, credits/foto_carmen.jpg, credits/nombre_sergio.png, credits/foto_sergio.jpg, credits/disclaimer.png, credits/nombre_asignatura.png, credits/nombre_uni.png, credits/logo_konami.jpg, credits/logo_principal.png, nivel1-scn1.tmx,  nivel1-scn2.tmx, simon_intro.png, simon_intro.json, whip.png, basic_whip.png, simon_normal.png, simon_normal.json, simon_normal_andando.png, simon_normal_andando.json, simon_agachado.png, simon_agachado.json, simon_normal_atacando.png, simon_normal_atacando.json, simon_agachado_atacando.png, simon_agachado_atacando.json, simon_agachado_andando.png, simon_agachado_andando.json, simon_saltando.png, simon_saltando.json, simon_saltando_atacando.png, simon_saltando_atacando.json, simon_atacando_haciarriba.png, simon_atacando_haciarriba.json, simon_herido.png, simon_muerto.png, simon_muerto.json, simon_atacando_diagonal.png, simon_atacando_diagonal.json, simon_saltando_atacando_haciarriba.png, simon_saltando_atacando_haciarriba.json, simon_saltando_atacando_diagonalarriba.png, simon_saltando_atacando_diagonalarriba.json, simon_saltando_atacando_diagonalabajo.png, simon_saltando_atacando_diagonalabajo.json, simon_saltando_atacando_haciabajo.png, simon_saltando_atacando_haciabajo.json, simon_subescaleras.png, simon_subescaleras.json, simon_subescaleras_atacando.png, simon_subescaleras_atacando.json, simon_subescaleras_atacando_haciarriba.png, simon_subescaleras_atacando_haciarriba.json, simon_subescaleras_atacando_diagonal.png, simon_subescaleras_atacando_diagonal.json, simon_bajaescaleras.png, simon_bajaescaleras.json, simon_bajaescaleras_atacando.png, simon_bajaescaleras_atacando.json, simon_bajaescaleras_atacando_diagonal.png, simon_bajaescaleras_atacando_diagonal.json", function() {

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

        Q.compileSheets("menu_principal/selector.png", "selector.json");
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

        Q.animations("selector_llama", {
            selector_animado: { frames: [0,1,2,3,4], rate: 2/15}
        });

        Q.animations("pose_intro_juego", {
            da_latigazo: { frames: [0,1,2,3,4,5,6], rate: 5/15, loop: false}
        });

        Q.stageScene("inicio");
    });
});