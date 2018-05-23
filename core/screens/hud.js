Quintus.CastlevaniaHUD = function (Q) {
  Q.load('hud.png, numeros/0.png, numeros/1.png, numeros/2.png, numeros/3.png, numeros/4.png, numeros/5.png, numeros/6.png, numeros/7.png, numeros/8.png, numeros/9.png, vida.png, vida_no.png', function () {
        
  });
  let posicionesScore = [151,167,183,199,215,231,247,263,279];//31
  Q.scene("hud", function(stage){
    let containerHUD = stage.insert(new Q.UI.Container({x: Q.width/2, y: 40})); 
    let fondoHUD  = containerHUD.insert(new Q.UI.Button({
            asset: 'hud.png',
            x: 0,
            y:0,
            scale: 2
    }, function() {}));
   
    containerHUD.insert(new Q.Score());

    let assetNivel = "numeros/"+level+".png";
    stage.insert(new Q.Numero({asset: assetNivel, x:486, y:31}));

    let assetEscena = "numeros/"+escena+".png";
    stage.insert(new Q.Numero({asset: assetEscena, x:522, y:31}));

    containerHUD.insert(new Q.Salud());
  });

 Q.Sprite.extend('Numero',{
        init: function(p) {
            this._super(p, {
                asset: "numeros/0.png",
                gravity: 0,
                type: Q.SPRITE_NONE,
                collisionMask: Q.SPRITE_NONE,
                scale: 2
            });
        },
        step: function (dt){
            
        }
  });
 Q.Sprite.extend('Vida',{
        init: function(p) {
            this._super(p, {
                asset: "vida.png",
                gravity: 0,
                type: Q.SPRITE_NONE,
                collisionMask: Q.SPRITE_NONE,
                scale: 2
            });
        },
        step: function (dt){
            
        }
  });



Q.UI.Container.extend("Score",{ 

  

  init: function(p) {
    this._super(p, {
        
    }); 
    this.puntuaciones = [];
    Q.state.on("change.puntuacion",this,"update_puntos");
    
  },//init
  

  update_puntos: function(puntuacion) {
    let puntuacionAct = puntuacion.toString();
    let assetPuntos = "numeros/0.png";
    
    for(let i=0; i<9;i++){
      if(puntuacionAct[puntuacionAct.length - i - 1]){
        assetPuntos = "numeros/"+puntuacionAct[i]+".png";
      }else{
        assetPuntos = "numeros/0.png";
      }
      if(!this.puntuaciones[i]){
        let posX = posicionesScore[9 - i -1];
        let puntos = new Q.Numero({asset: assetPuntos, x:posX, y:31});
        this.puntuaciones[i] = puntos;
        this.stage.insert(this.puntuaciones[i]);
      }
      this.puntuaciones[i].p.asset = assetPuntos;
      
    }

  }
});


Q.UI.Container.extend("Salud",{ 

  

  init: function(p) {
    this._super(p, {
        
    }); 
    this.saludes = [];
    Q.state.on("change.health",this,"update_salud");
    
  },//init
  

  update_salud: function(health) {
    /*let puntuacionAct = puntuacion.toString();
    let asset = "numeros/0.png";*/
    console.log(health);
    let i=0;
    let posXs = 165;
    while(i<health){
      
      if(!this.saludes[i]){
        //let posX = posicionesScore[i];
        let salus = new Q.Vida({asset: "vida.png", x:posXs, y:47});
        this.saludes[i] = salus;
        this.stage.insert(this.saludes[i]);
      }
      this.saludes[i].p.asset = "vida.png";
      i++;
      posXs += 8;
    }
    while(i<16){
      
      if(!this.saludes[i]){
        //let posX = posicionesScore[i];
        let salus = new Q.Vida({asset: "vida_no.png", x:posXs, y:47});
        this.saludes[i] = salus;
        this.stage.insert(this.saludes[i]);
      }
      this.saludes[i].p.asset = "vida_no.png";
      i++;
      posXs += 8;
    }

  }
});


}