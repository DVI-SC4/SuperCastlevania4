Quintus.CastlevaniaVelas = function (Q) {
  Q.load('velas.png, life.png, whip_upgrade.png', function () {  }); 

    //Velas con objetos recogibles segun el objeto que tenga como parametro crea o un corazon o un latigo
    //Se rompen cuando Simon las ataca con el latigo
    Q.Sprite.extend("Vela",{

    init: function(p) {

      this._super(p, {
                      asset: "velas.png",
                      scale: 1.5,
                      h: 22.5,
                      w: 27,
                      gravity: 0,
                      type: Q.SPRITE_ACTIVE,
                      collisionMask: Q.SPRITE_NONE
                    });

      this.add('2d, animation, tween');
      
      this.on("hit.sprite", function (collision) {

        if (collision.obj.isA('Whip')) {
            collision.obj.p.yaColisionado=true;
            collision.obj.p.collisionMask = Q.SPRITE_NONE;
            collision.obj.p.type = Q.SPRITE_NONE;
            var xAntigua = this.p.x;
            var yAntigua = this.p.y;
            if(this.p.objeto == "corazon"){
                this.stage.insert(new Q.Life({ x: xAntigua, y: yAntigua - 12 }));
            }
            if(this.p.objeto == "latigo"){
                this.stage.insert(new Q.Latigo({ x: xAntigua, y: yAntigua - 12 }));
            }
            this.destroy();
         }

      });//on
    },

    step: function(p){}
  });

  //Vida que incrementa en 1 el contador de vidas una vez detecta colision con el jugador
  Q.Sprite.extend("Life",{

    init: function(p) {

      this._super(p, {
                asset: "life.png",
                gravity: 1,
                scale: 1.5
               }
            ); //_super
      this.add('2d, aiBounce, animation');
      this.on("bump.top,bump.left,bump.right,bump.bottom",function(collision) {
        if(collision.obj.isA("Simon")) {
          this.destroy();
          Q.state.inc("vidas",1); // add 1 to lives
          
        }
      });//on

    },//init 

    step: function(dt){
    }

  });

   // Mejora del latigo del jugador, y asi podra hacer el doble de daño
   Q.Sprite.extend("Latigo",{

    init: function(p) {

      this._super(p, {
                asset: "whip_upgrade.png",
                gravity: 1,
                scale: 1.5
               }
            ); //_super
      this.add('2d, aiBounce, animation');
      this.on("bump.top,bump.left,bump.right,bump.bottom",function(collision) {
        if(collision.obj.isA("Simon")) {
            this.destroy();
            collision.obj.p.latigoMejorado = true;
        }
      });//on

    },//init 

    step: function(dt){
    }

  });

}