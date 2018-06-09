Quintus.CastlevaniaCredits = function (Q) {
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
}