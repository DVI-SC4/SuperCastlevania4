Quintus.CastlevaniaLevels = function (Q) {
    Q.Sprite.extend("CambioZona", {
        init: function (p) {
            this._super(p, {
               /* asset: "simon_normal.png",*/
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
                    Q.clearStages();
                    Q.stageScene('GameOver', {label: "youwin.png"});
                }else{
                  Q.clearStages();
                  escena++;
                  Q.stageScene('level');
                  Q.stageScene("hud",1);
                  Q.state.inc("puntuacion",1);
                  Q.state.inc("health",1);
                  Q.state.dec("puntuacion",1);
                  Q.state.dec("health",1); 
                  Q.state.inc("vidas",1);
                  Q.state.dec("vidas",1);
                }
                
            }
        }
    });
};