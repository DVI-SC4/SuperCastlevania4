Quintus.CastlevaniaEnemy = function(Q) {
    Q.component('enemy', {
        added: function() {
            this.entity.on('bump.left', function(collision) {
                if (collision.obj.isA('Simon')) {
                    this.p.vx = 0;
                    collision.obj.p.vy = -200;
                    this.p.vx = -50;
                }
            });
        }
    });
};