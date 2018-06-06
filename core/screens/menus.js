Quintus.CastlevaniaMenus = function (Q) {
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

                    if(this.p.asset === "menu_principal/start.png"){
                      Q.stageScene("level"); 
                      Q.stageScene("hud",1);
                      Q.state.inc("puntuacion",1);
                      Q.state.inc("health",1);
                      Q.state.inc("vidas",1);
                    } 
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

    Q.load('menu_principal/fondo_menuprincipal.jpg, menu_principal/start.png, menu_principal/controls.png, menu_principal/credits.png, menu_principal/press_enter.png, menu_principal/selector.png, selector.json, menu_music.ogg, menu_music.ogg, menu_choice.ogg, menu_switching.ogg, controls.ogg, credits.ogg', function () {
        Q.compileSheets("menu_principal/selector.png", "selector.json");

        Q.animations("selector_llama", {
            selector_animado: { frames: [0,1,2,3,4], rate: 2/15}
        });

        Q.animations("pose_intro_juego", {
            da_latigazo: { frames: [0,1,2,3,4,5,6], rate: 5/15, loop: false}
        });
    });
}