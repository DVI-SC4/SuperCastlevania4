Quintus.Rowdain = function(Q) {
    Q.load('rowdain.png, rowdain.json', function() {
        Q.compileSheets('rowdain.png', 'rowdain.json');
    });

    Q.animations('rowdain', {
        camina_caballo_izquierda: { frames: [ 0,1 ], rate: 1.5 },
        camina_caballo_derecha: { frames: [ 2,3 ], rate: 1.5 },
        ataca_caballo_izquierda: { frames: [ 4,5 ], rate: 1.5 },
        ataca_caballo_derecha: { frames: [ 6,7 ], rate: 1.5 },
        camina_izquierda: { frames: [ 8,9 ], rate: 1.5 },
        camina_derecha: { frames: [ 10,11 ], rate: 1.5 },
        ataca_izquierda: { frames: [ 12,13 ], rate: 1.5 },
        ataca_derecha: { frames: [ 14,15 ], rate: 1.5 }
    });

    Q.Sprite.extend('Boss-1', {
        init: function (p) {
            this._super(p, {
                sprite: 'rowdain',
                sheet: 'rowdain',
                scale: 2
            });
        },
        step: function (dt) {

        }
    });
};