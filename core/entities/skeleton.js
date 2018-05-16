Quintus.Skeleton = function(Q) {
    Q.load('skeleton.png, skeleton.json', function () {
        Q.compileSheets('skeleton.png', 'skeleton.json');
    });

    Q.animations('skeleton', {
        camina_izquierda: { frames: [1,0], rate: 5/15 },
        camina_derecha: { frames: [2,3], rate: 5/15 }
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
        },
        step: function (dt){
            if (this.p.vx > 0) {
                this.play('camina_derecha');
            } else {
                this.play('camina_izquierda');
            }
        }
    });
};