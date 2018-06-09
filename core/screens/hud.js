Quintus.CastlevaniaHUD = function (Q) {
  Q.load('hud.png, numeros/0.png, numeros/1.png, numeros/2.png, numeros/3.png, numeros/4.png, numeros/5.png, numeros/6.png, numeros/7.png, numeros/8.png, numeros/9.png, vida.png, vida_no.png', function () {
        
  });
  let posicionesScore = [151,167,183,199,215,231,247,263,279];
  Q.scene("hud", function(stage){
    let containerHUD = stage.insert(new Q.UI.Container({x: Q.width/2, y: 40})); 
    let fondoHUD  = containerHUD.insert(new Q.UI.Button({
            asset: 'hud.png',
            x: 0,
            y:0,
            scale: 2
    }, function() {}));
   
    containerHUD.insert(new Q.Score());

    //Las variables de escena y de nivel no cambian a no ser que cambie la escena y entonces la informacion del HUD se recarga.
    let assetNivel = "numeros/"+level+".png";
    stage.insert(new Q.Numero({asset: assetNivel, x:486, y:31}));

    let assetEscena = "numeros/"+escena+".png";
    stage.insert(new Q.Numero({asset: assetEscena, x:522, y:31}));

    containerHUD.insert(new Q.Salud());

    containerHUD.insert(new Q.VidasJugador());

    containerHUD.insert(new Q.SaludEnemigo());

  });

  //Esta clase nos permite insertar los numeros en el HUd dependiendo del asset con el que se genere
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

  //Clase que sirve para el nivel de salud del jugador y del jefe final
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


//Clase que se encarga de actualizar la puntuacion en el HUD cada vez que se actualiza
//Dependiendo de si la puntuacion se ha generado con anterioridad se crea de nuevo o se actualiza su asset
//Esta variable se actualiza cada vez que matamos a un enemigo
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
        assetPuntos = "numeros/"+puntuacionAct[puntuacionAct.length - i - 1]+".png";
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

//Clase que se encarga de actualizar la salud del jugador en el HUD cada vez que se actualiza
//Dependiendo de si la salud se ha generado con anterioridad se crea de nuevo o se actualiza su asset
//Esta variable se actualiza cada vez que algun enemigo golpea a Simon
Q.UI.Container.extend("Salud",{ 

  init: function(p) {
    this._super(p, {
        
    }); 
    this.saludes = [];
    Q.state.on("change.health",this,"update_salud");
  },//init
  
  update_salud: function(health) {
    let i=0;
    let posXs = 165;
    while((i<health)&& (i<16)){
      
      if(!this.saludes[i]){
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

//Clase que se encarga de actualizar la salud del enemigo en el HUD cada vez que se actualiza
//Dependiendo de si la salud se ha generado con anterioridad se crea de nuevo o se actualiza su asset
//Esta variable se actualiza cada vez que Simon golpea al enemigo
Q.UI.Container.extend("SaludEnemigo",{ 

  init: function(p) {
    this._super(p, {
    }); 
    this.saludes = [];
    Q.state.on("change.enemylife",this,"update_salude");
    
  },//init
  
  update_salude: function(enemylife) {
    let i=0;
    let posXs = 165;
    while((i<enemylife)&& (i<16)){
      
      if(!this.saludes[i]){
        let salus = new Q.Vida({asset: "vida.png", x:posXs, y:63});
        this.saludes[i] = salus;
        this.stage.insert(this.saludes[i]);
      }
      this.saludes[i].p.asset = "vida.png";
      i++;
      posXs += 8;
    }
    while(i<16){
      
      if(!this.saludes[i]){
        let salus = new Q.Vida({asset: "vida_no.png", x:posXs, y:63});
        this.saludes[i] = salus;
        this.stage.insert(this.saludes[i]);
      }
      this.saludes[i].p.asset = "vida_no.png";
      i++;
      posXs += 8;
    }

  }
});


//Clase que se encarga de actualizar las vidas en el HUD cada vez que se actualiza
//Dependiendo de si las vidas se ha generado con anterioridad se crea de nuevo o se actualiza su asset
//Esta variable se actualiza o cuando muere o cuando recoge una vida
Q.UI.Container.extend("VidasJugador",{ 

  init: function(p) {
    this._super(p, {
        
    }); 
    this.vidasJugador = [];
    Q.state.on("change.vidas",this,"update_vidas");
    
  },//init

  update_vidas: function(vidas) {
    
    let vidasAct = vidas;
    vidasAct = vidasAct.toString();
    let assetVidas = "numeros/0.png";
    let posX = 424;
    for(let i=0; i<2;i++){
      if(vidasAct[vidasAct.length - i - 1]){
        assetPuntos = "numeros/"+vidasAct[vidasAct.length - i - 1]+".png";
      }else{
        assetPuntos = "numeros/0.png";
      }
     if(!this.vidasJugador[i]){
       
        let vidasJ = new Q.Numero({asset: assetPuntos, x:posX, y:48});
        this.vidasJugador[i] = vidasJ;
        this.stage.insert(this.vidasJugador[i]);
      }
      this.vidasJugador[i].p.asset = assetPuntos;
      
      posX -= 16;
      
    }

  }
});

}

