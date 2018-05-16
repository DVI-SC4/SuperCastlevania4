Quintus.Skeleton = function(Q) {
    Q.load('skeleton.png, skeleton.json', function () {
        Q.compileSheets('skeleton.png', 'skeleton.json');
    });

    Q.animations('skeleton', {
        camina_izquierda: { frames: [1,0], rate: 5/15 },
        camina_derecha: { frames: [2,3], rate: 5/15 },
        ataca_izquierda: { frames: [4,5,6], rate: 5/15 },
        ataca_derecha: { frames: [7,8,9], rate: 5/15 }
    });

    Q.Sprite.extend('Esqueleto',{
        init: function(p) {
            this._super(p, {
                sprite: 'skeleton',
                sheet: 'skeleton',
                scale: 2,
                vx: -50
            });
            this.add('2d, aiBounce, animation');
            this.on('bump.left', function(collision) {
                if (collision.obj.isA('Simon')) {
                    this.p.vx = 0;
                    this.play('ataca_izquierda');
                }
            });
            this.on('bump.right', function(collision) {
                if (collision.obj.isA('Simon')) {
                    this.p.vx = 0;
                    this.play('ataca_derecha');
                }
            });
        },
        step: function (dt){
            if (this.p.vx > 0) {
                this.play('camina_derecha');
            } else if (this.p.vx < 0) {
                this.play('camina_izquierda');
            }
        }
    });
};