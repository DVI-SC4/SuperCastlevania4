Quintus.CastlevaniaEnemy = function(Q) {
    Q.component('enemy', {
        added: function() {
            this.entity.on('bump.left', function(collision) {
                if (collision.obj.isA('Simon')) {
                    collision.obj.p.vy = -300;
                }
            });
            this.entity.on('bump.right', function(collision) {
                if (collision.obj.isA('Simon')) {
                    collision.obj.p.vy = -300;
                }
            });
        }
    });
};