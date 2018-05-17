Quintus.CastlevaniaEnemy = function(Q) {
    Q.load({
        'enemy_destroyed': 'enemy_destroyed.ogg',
        'muerte_enemigo.png': 'muerte_enemigo.png',
        'muerte_enemigo.json': 'muerte_enemigo.json'
    }, function () {
        Q.compileSheets('muerte_enemigo.png', 'muerte_enemigo.json');
    });

    Q.animations('muerte_enemigo', {
        muerte: { frames: [0,1,2,3,4], rate: 1/15 }
    });

    Q.component('enemy', {
        added: function() {
            this.entity.on('bump.left, bump.right', function(collision) {
                if (collision.obj.isA('Simon')) {
                    this.p.vx = 0;
                    collision.obj.p.vx = -1000;
                    this.p.vx = -50;
                }
            });
            this.entity.on('hit.sprite', function (collision) {
                if (collision.obj.isA('Whip')) {
                    Q.audio.play('enemy_destroyed');
                    this.p.sheet = 'muerte_enemigo';
                    this.play('muerte');
                    this.destroy();
                }
            })
        }
    });
};