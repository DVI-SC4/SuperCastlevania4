Quintus.CastlevaniaEscaleras = function (Q) {
    Q.Sprite.extend("EscaleraArriba", {
        init: function(p) {
            this._super(p, {
                /*asset: "simon_normal.png",*/
                w:10,
                h:1,
                gravity:0,
                type: Q.SPRITE_FRIENDLY
            });
            this.add('2d, aiBounce, animation');
            this.on("bump.left,bump.right, bump.top, bump.bottom",function(collision) {
                
                if ( collision.obj.isA("Simon") && (((this.p.direccion == "derecha") && Q.inputs['up'] && Q.inputs['right']) || ((this.p.direccion == "izquierda") && Q.inputs['up'] && Q.inputs['left']))) {
                    collision.obj.p.x = this.p.posicion_inicial;
                    collision.obj.p.subiendoEscaleras = true;
                    collision.obj.p.direccionEscaleras = this.p.direccion;
                    console.log(collision.obj.p.collisionMask);
                    collision.obj.p.collisionMask = Q.SPRITE_FRIENDLY;

                }
            });
        },
        step: function (dt){}
    });
 }