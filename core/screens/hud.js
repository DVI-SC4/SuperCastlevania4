Quintus.CastlevaniaHUD = function (Q) {
  Q.load('hud.png, numeros/0.png, numeros/1.png, numeros/2.png, numeros/3.png, numeros/4.png, numeros/5.png, numeros/6.png, numeros/7.png, numeros/8.png, numeros/9.png', function () {
        
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

   // let containerScore = containerHUD.insert(new Q.UI.Container({
            /*asset: 'numeros/0.png',*/
           
   // }));
    containerHUD.insert(new Q.Score());


    
  });

 Q.Sprite.extend('Puntos',{
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



Q.UI.Container.extend("Score",{ 

  

  init: function(p) {
    this._super(p, {
        /*x: -76,
        w: 144,
        h: 16,
        radius:0,
        y:-11*/
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
        let puntos = new Q.Puntos({asset: assetPuntos, x:posX, y:31});
        this.puntuaciones[i] = puntos;
        this.stage.insert(this.puntuaciones[i]);
      }
      this.puntuaciones[i].p.asset = assetPuntos;
      
    }

  }
});


}