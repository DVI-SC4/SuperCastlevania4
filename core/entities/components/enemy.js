Quintus.CastlevaniaEnemy = function(Q) {
    Q.load({
        'enemy_destroyed': 'enemy_destroyed.ogg'
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
                    this.destroy();
                }
            })
        }
    });
};