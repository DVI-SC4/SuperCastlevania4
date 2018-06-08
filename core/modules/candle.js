Quintus.CastlevaniaVelas = function (Q) {
  Q.load('velas.png, life.png, whip_upgrade.png', function () {  }); 

    Q.Sprite.extend("Vela",{

    init: function(p) {
        console.log("Estamos creando una instancia de CoinBlock");

     
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


  Q.Sprite.extend("Life",{

    init: function(p) {

      console.log("Estamos creando una instancia de Coin");

      this._super(p, {
                asset: "life.png",
                gravity: 1,
                //vx: 100,
                scale: 1.5//,
                //type: Q.SPRITE_ENEMY
               }
            ); //_super
      this.add('2d, aiBounce, animation');
      this.on("bump.top,bump.left,bump.right,bump.bottom",function(collision) {
        if(collision.obj.isA("Simon")) {
          console.log("HOALAGSKDGDGS");
          this.destroy();
          Q.state.inc("vidas",1); // add 1 to lives
          
        }
      });//on

    },//init 

    step: function(dt){
    }

  });

   Q.Sprite.extend("Latigo",{

    init: function(p) {

      this._super(p, {
                asset: "whip_upgrade.png",
                gravity: 1,
                //vx: 100,
                scale: 1.5//,
                //type: Q.SPRITE_ENEMY
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