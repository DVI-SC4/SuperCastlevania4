Quintus.CastlevaniaEnemy = function(Q) {
    Q.load({
        'enemy_destroyed': 'enemy_destroyed.ogg',
        'muerte_enemigo.png': 'muerte_enemigo.png',
        'muerte_enemigo.json': 'muerte_enemigo.json'
    }, function () {
        Q.compileSheets('muerte_enemigo.png', 'muerte_enemigo.json');
    });

    Q.animations('muerte_enemigo', {
        muerte: { frames: [0,1,2,3,4], rate: 3/15, loop: false, trigger: 'muerto' }
    });

    Q.Sprite.extend('Llama', {
        init: function(p) {
            this._super(p, {
                sprite: 'muerte_enemigo',
                sheet: 'muerte_enemigo',
                scale: 2
            });
            this.add('animation');
            this.on('muerto', this, 'destruir');
        },
        destruir: function () {
            this.destroy();
        }
    });

    Q.component('enemy', {
        added: function() {
            this.entity.on('bump.left, bump.right', function(collision) {
                if (collision.obj.isA('Simon') && !collision.obj.p.inmune) {
                    this.p.vx = 0;
                    collision.obj.p.x -= 30;
                    this.p.vx = -50;
                    collision.obj.p.inmune=true;
                    collision.obj.p.temporizadorInmune = 0;
                    if(Q.state.get("health") > 0){
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
                }
             
            });
            this.entity.on('hit.sprite', function (collision) {
                if (collision.obj.isA('Whip') && !collision.obj.p.yaColisionado) {
                  collision.obj.p.yaColisionado=true;
                  collision.obj.p.collisionMask = Q.SPRITE_NONE;
                  collision.obj.p.type = Q.SPRITE_NONE;
                    if(collision.obj.p.mejorado == true){
                        this.p.golpes -=2;
                    }else{
                        this.p.golpes -=1;
                    }
                    if(this.p.golpes == 0){
                      
                      this.destroy();
                      Q.audio.play('enemy_destroyed');
                      Q.state.inc("puntuacion",100);

                      const llama = new Q.Llama({x: this.p.x, y: this.p.y});
                      this.stage.insert(llama);
                      llama.play('muerte'); 
                    }
                    
                }
            });
        }
    });
};