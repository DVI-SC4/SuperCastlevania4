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
                if (collision.obj.isA('Simon')) {
                    Q.state.dec("health",1);
                    this.p.vx = 0;
                    collision.obj.p.vx = -1000;
                    this.p.vx = -50;
                }
            });
            this.entity.on('hit.sprite', function (collision) {
                if (collision.obj.isA('Whip')) {
                    collision.obj.destroy();
                    this.destroy();
                    Q.audio.play('enemy_destroyed');
                    Q.state.inc("puntuacion",1);

                    const llama = new Q.Llama({x: this.p.x, y: this.p.y});
                    this.stage.insert(llama);
                    llama.play('muerte');
                }
            });
        }
    });
};