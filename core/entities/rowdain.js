Quintus.Rowdain = function(Q) {
    Q.load('rowdain.png, rowdain.json', function() {
        Q.compileSheets('rowdain.png', 'rowdain.json');
    });

    Q.animations('rowdain', {
        camina_caballo_izquierda: { frames: [ 0,1, 4,5], rate: 0.8 },
        camina_caballo_derecha: { frames: [ 2,3, 6,7 ], rate: 0.8 },
        /*ataca_caballo_izquierda: { frames: [  ], rate: 1.5 },
        ataca_caballo_derecha: { frames: [  ], rate: 1.5 },*/
        camina_izquierda: { frames: [ 8,9 ], rate: 0.8 },
        camina_derecha: { frames: [ 10,11 ], rate: 0.8 },
        ataca_izquierda: { frames: [ 12,13 ], rate: 1.5 },
        ataca_derecha: { frames: [ 14,15 ], rate: 1.5 }
    });

    Q.Sprite.extend('Boss-1', {
        init: function (p) {
            this._super(p, {
                sprite: 'rowdain',
                sheet: 'rowdain',
                scale: 2,
                contadorTeletransporte: 0,
                contadorOpacidad: 0,
                teletransportando: false,
                vx: -80
            });
            this.add('2d, aiBounce, animation');
            //this.add('enemy');

            this.on('bump.left, bump.right', function(collision) {
                if (collision.obj.isA('Simon') && !collision.obj.p.inmune) {
                    //this.p.vx = 0;
                    collision.obj.p.x -= 30;
                    //this.p.vx = -80;
                    collision.obj.p.inmune=true;
                    collision.obj.p.temporizadorInmune = 0;
                    if(Q.state.get("health") > 0){
                        console.log("estoy decreciendo la salud");
                        Q.state.dec("health",1); 
                    }else{
                        if(Q.state.get("vidas") > 0){ 
                            
                            Q.clearStages();
                            Q.stageScene('level');
                            Q.stageScene("hud",1);
                            Q.state.dec("vidas",1);
                            Q.state.inc("health",16);
                            Q.state.inc("puntuacion",1);
                            Q.state.dec("puntuacion",1);
                            Q.state.inc("enemylife",1);
                            Q.state.dec("enemylife",1);
                        }else{
                            Q.clearStages();
                            Q.stageScene('GameOver');
                        }
                        

                    }
                    console.log(Q.state.get("health"));
                }
             
            });
            this.on('hit.sprite', function (collision) {
                if (collision.obj.isA('Whip') && !collision.obj.p.yaColisionado) {
                  console.log("hey");
                  collision.obj.p.yaColisionado=true;
                  collision.obj.p.collisionMask = Q.SPRITE_NONE;
                  collision.obj.p.type = Q.SPRITE_NONE;
                    if(collision.obj.p.mejorado == true){
                        Q.state.dec("enemylife",2);

                    }else{
                        Q.state.dec("enemylife",1);
                    }
                    let vidaEnemy = Q.state.get("enemylife");
                    if(vidaEnemy == 0){
                      
                      this.destroy();
                      Q.audio.play('enemy_destroyed');
                     
                      Q.clearStages();
                      Q.stageScene('GameOver', {label: "youwin.png"});
                    }
                    
                }
            });
        

        },
        changeOpacity: function(){
          if(this.p.opacity == 1){
            this.p.opacity = 0.7;
          }else{
            this.p.opacity = 1;
          }
        },
        step: function (dt) {
          let anchomapa = this.p.AnchoMapa;
          let posicionteletransporte = Math.floor(Math.random() * (anchomapa-100)) + 800;
          let vidaenemigo = Q.state.get("enemylife");
          if ((this.p.vx > 0) && (vidaenemigo > 7)) {
              this.play('camina_caballo_derecha');
          } else if ((this.p.vx < 0)  && (vidaenemigo > 7)) {
              this.play('camina_caballo_izquierda');
          }else if ((this.p.vx > 0)  && (vidaenemigo <= 7)) {
            this.p.vx = 100;
            this.play('camina_derecha');
            Q._generateCollisionPoints(this);
          }else if ((this.p.vx < 0)  && (vidaenemigo <= 7)) {
            this.p.vx = -100;
            this.play('camina_izquierda');
            Q._generateCollisionPoints(this);
          }


          if((vidaenemigo <= 7)&& (!this.p.teletransportando)){
            this.p.contadorTeletransporte++;
          }
          if(this.p.contadorTeletransporte >=100){
            this.p.teletransportando = true;
          }
          if(this.p.teletransportando){
            this.changeOpacity();
            this.p.contadorOpacidad++;
            
          }
          if(this.p.teletransportando && this.p.contadorOpacidad >=50){
            this.p.contadorTeletransporte = 0;
            this.p.contadorOpacidad = 0;
            this.p.teletransportando = false;
            this.p.x = posicionteletransporte;
          }

        }
    });
};