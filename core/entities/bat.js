Quintus.Bat = function(Q) {
    Q.load('murcielago_volando.png, bat.json', function () {
        Q.compileSheets('murcielago_volando.png', 'bat.json');
    });

    Q.animations('bat', {
        vuela_derecha: { frames: [1, 0], rate: 5/15 }
    });

    Q.Sprite.extend('Murcielago',{
        init: function(p) {
            this._super(p, {
                sprite: 'bat',
                sheet: 'bat',
                scale: 2,
                gravity: 0,
                vx: -50
            });
            this.add('2d, aiBounce, animation');
        },
        step: function (dt){
            if (this.p.vx > 0) {
                this.play('vuela_derecha');
            } else {
                this.play('vuela_derecha');
            }
        }
    });
};