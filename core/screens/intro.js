Quintus.CastlevaniaIntro = function (Q) {
    Q.load('intro/mainTitle.jpg, sonido_logotipo_intro.ogg, intro/parte0.png, intro/parte1.png, intro/parte2.png');

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
}