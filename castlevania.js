var level=1;
var escena = 1;
var game = function() {
	
	var Q = window.Q = Quintus({audioSupported: [ 'mp3','ogg','wav' ]})
						.include("Sprites, Scenes, Input, Touch, UI, Anim, TMX, 2D, Audio") 
						.setup({width: 448, height: 448}) 
						.controls().touch().enableSound();


	

/*-----------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------- MARIO ------------------------------------------------------*/
/*-----------------------------------------------------------------------------------------------------------*/

	Q.Sprite.extend("Mario",{

		// the init constructor is called on creation
		//Se puede redefinir un método definido en una superclase, 
		//y es posible invocar la versión redefinida con this._super(..).
		init: function(p) {

			console.log("Estamos creando una instancia de Mario");
 
			this._super(p, {
								sheet: "cosasmario", 
								sprite: "cosasmario",
								x: 55, 
								y: 10, 
								gravity: 0.5,
								puedeSaltar: true,
								inmune: false,
								temporizadorInmune: 0,
								grande: false,
								collisionMask: Q.SPRITE_DEFAULT
						   }
						); 

			this.add('2d, platformerControls, animation');

			/*
			Mario solo podrá saltar cuando este en el suelo, para así evitar que pueda saltar en el aire.
			*/
			this.on("bump.bottom",function(collision) {

				if(collision.obj.isA("TileLayer") || collision.obj.isA("LifeBlock")|| collision.obj.isA("BigBlock")|| collision.obj.isA("CoinBlock")) { 
					this.p.puedeSaltar = true;
				}

			});

		},//init 

		step: function(dt) {
			//console.log(Q.input);
			//console.log(this.p.direction);
			//console.log(this);

			if(Q.inputs['right']){
				this.play("run_right");
			}
			else if(this.p.direction == "right") {
				this.play("still_right");
			}
			
			if(Q.inputs['left']){
				this.play("run_left");
			}
			else if(this.p.direction == "left") {
				this.play("still_left");
			}

			if(Q.inputs['up']){
				//Q.inputs['up'] = false;
				//Q.audio.play("jump.mp3");
				if(this.p.puedeSaltar==true){
					this.p.puedeSaltar=false;
					this.p.vy = -400;
					if(this.p.direction == "right") {
						this.play("jump_right");
					}
					else if(this.p.direction == "left") {
						this.play("jump_left");
					}
				}
			}
			//Si Mario cae demasiado se considera que ha muerto
			if(this.p["y"] > 650){
				//this.p["x"] = 20;
				//this.p["y"] = 528;
				console.log("Tas caío lol");
				Q.stageScene("endGame",2, { label: "You Died", sound: "music_die.ogg" }); 
				this.destroy();
			}
			//La camara empieza a seguir a Mario cuando va por la mitad de la pantalla.
			if(this.p.x >= Q.width/2){
				this.stage.add("viewport").follow(this,{ x: true, y: false });
				this.stage.viewport.offsetX = 0;
				this.stage.viewport.offsetY = 60;
			}
			//Si Mario es inmune por que se ha chocado con un enemigo, empieza un contador y se le pone un poco transparente para que el usuario sepa que es inmune un tiempo.
			if (this.p.inmune) {
			  this.p.temporizadorInmune++;
	      this.p.opacity = 0.5;
	      if (this.p.temporizadorInmune >50) {
	        this.p.inmune = false;
	        this.p.opacity = 1;
	      }
		  }
		}//step

	});//extend Mario

/*-----------------------------------------------------------------------------------------------------------*/
/*----------------------------------------------- ESCENAS ---------------------------------------------------*/
/*-----------------------------------------------------------------------------------------------------------*/

	Q.scene("level",function(stage) {
		var nivel = "nivel"+level+"-scn"+escena+".tmx";
		//Q.audio.play( "music_main.ogg", { loop: true });
		Q.stageTMX(nivel,stage);

		// Create the player and add them to the stage
		var player = stage.insert(new Q.Mario());
	
	});//scene level1

	Q.scene("hud", function(stage){
		var containermonedas = stage.insert(new Q.UI.Container({x: Q.width/4, y: 30}));

		var imgmoneda = containermonedas.insert(new Q.UI.Button({
			asset: 'coin.gif',
      		x: 0,
      		y:0
    	}, function() {}));
   	var label = containermonedas.insert(new Q.Monedas({x:imgmoneda.p.w, y: -10}));
   	label.fontString = "800 24px 'Press Start'";
		containermonedas.fit(10);

		var containervidas = stage.insert(new Q.UI.Container({ x: (Q.width/4)*2, y: 30}));
		
		var imgvida = containervidas.insert(new Q.UI.Button({
			asset: 'vida.png',
      		x: -16,
      		w:32,
      		h:32,
      		scale: 0.05,
      		y:-16
    	}, function() {}));
 		var label = containervidas.insert(new Q.Vidas({x:imgvida.p.w, y: -10}));
 		label.fontString = "800 24px 'Press Start'";
 		containervidas.fit(10);

   	var containerscore = stage.insert(new Q.UI.Container({x: (Q.width/4)*3, y: 30}));
		
		var imgscore = containerscore.insert(new Q.UI.Button({
			asset: 'score.png',
      		x: 0,
      		y: 0
    	}, function() {}));
 		var label = containerscore.insert(new Q.Score({x:imgscore.p.w, y: -10}));
 		label.fontString = "800 24px 'Press Start'";
 		containerscore.fit(10);

   	var containerworld = stage.insert(new Q.UI.Container({x: (Q.width/2), y: 60}));
   	var label = containerworld.insert(new Q.UI.Text({label: "World\n"+level+" - "+MAX_LEVEL }));
   	label.fontString = "800 24px 'Press Start'";
   	containerscore.fit(10);
	});//scene hud


	Q.scene('endGame',function(stage) {

		Q.audio.stop("music_main.ogg");
		Q.audio.play(stage.options.sound);

		var container = stage.insert(new Q.UI.Container({x: Q.width/2, y: Q.height/2, fill: "rgba(0,0,0,0.5)"}));

		var button = container.insert(new Q.UI.Button({ x: 0, y: 0, fill: "#CCCCCC", label: "Play Again" }));
		var label = container.insert(new Q.UI.Text({x:10, y: -10 - button.p.h, label: stage.options.label }));

		button.on("click",function() {
			level = 1;
		  Q.clearStages();
		  Q.stageScene('startGame');
		});

		container.fit(20);

	});//scene endgame

	Q.scene('winGame',function(stage) {

		Q.audio.stop("music_main.ogg");
		Q.audio.play(stage.options.sound);

		var container = stage.insert(new Q.UI.Container({x: Q.width/2, y: Q.height/2, fill: "rgba(0,0,0,0.5)"}));
		if(level==MAX_LEVEL){
			var button = container.insert(new Q.UI.Button({ x: 0, y: 0, fill: "#CCCCCC", label: "Play Again" }));
			var label = container.insert(new Q.UI.Text({x:10, y: -10 - button.p.h, label: stage.options.label }));

			button.on("click",function() {
			  Q.state.reset({ monedasRecogidas: 0, lives: 3, puntuacion: 0});
			  Q.clearStages();
			  level=1;
			  Q.stageScene('level');
			  Q.stageScene("hud",1);
			});
		}else{
			var button = container.insert(new Q.UI.Button({ x: 0, y: 0, fill: "#CCCCCC", label: "Next Level" }));
			var label = container.insert(new Q.UI.Text({x:10, y: -10 - button.p.h, label: stage.options.label }));

			button.on("click",function() {
			  Q.clearStages();
			  level++;
			  Q.stageScene('level');
			  Q.stageScene("hud",1);
			});
		}
		
		container.fit(20);

	});

	Q.scene('startGame',function(stage) {
		
		Q.state.reset({ monedasRecogidas: 0, lives: 3, puntuacion: 0});

		var container = stage.insert(new Q.UI.Container({
															x: Q.width/2, 
															y: Q.height/2, 
															fill: "rgba(0,0,0,0.5)"
														}));

		var button = container.insert(new Q.UI.Button({ x:0 , y: 0, h: Q.height, w: Q.width, asset: "mainTitle1.jpg", })); 
		button.on("click",function() {
		  Q.stageScene('level');
		  //Q.stageScene("hud",1);
		});

		Q.input.on("confirm",stage,function() {
		  Q.stageScene('level');
		 	//Q.stageScene("hud",1);
		});
		

	});//scene startgame


	

/*
nivel1.tmx, nivel2.tmx, nivel3.tmx,nivel4.tmx, mario_small.png, mario_small.json, goomba.png, goomba.json, bloopa.png, bloopa.json, block1.png, block.json, koopa.png, koopa.json, princess.png, mainTitle.png,100.gif,200.gif,400.gif, music_main.ogg, music_level_complete.ogg, music_die.ogg, coin.ogg, coin.png, coin.json, life.png, jump.mp3, unlocked.mp3, coin.gif, vida.png, score.png, big.png
*/

	Q.loadTMX(" mario_small.png, mario_small.json,mainTitle1.jpg, nivel1-scn1.tmx", function() {
	  
	  Q.compileSheets("mario_small.png", "mario_small.json");
	  Q.compileSheets("goomba.png", "goomba.json");
	  Q.compileSheets("bloopa.png", "bloopa.json");
	  Q.compileSheets("coin.png", "coin.json");
	  Q.compileSheets("koopa.png", "koopa.json");
	  Q.compileSheets("block1.png", "block.json");

	  Q.animations("cosasmario", {
		  run_right: { frames: [1,2,3], rate: 2/15},
		  run_left: { frames: [15,16,17], rate: 2/15},
		  still_right: { frames: [0], rate: 1/15},
		  still_left: { frames: [14], rate: 1/15},
		  jump_right: { frames: [4], rate: 2/15},
		  jump_left: { frames: [18], rate: 2/15}
	  });

	  Q.animations("bloopa", {
		  normal: { frames: [0,1], rate: 8/15},
		  muere: { frames: [2], rate: 8/15}//, trigger: "died"}
	  });

	  Q.animations("goomba", {
		  normal: { frames: [0,1], rate: 8/15},
		  muere: { frames: [2], rate: 8/15}
	  });

	  Q.animations("koopa", {
		  normalIzq: { frames: [3,2,1,0], rate: 3/15},
		  normalDer: { frames: [7,6,5,4], rate: 3/15},
		  shellIzq: { frames: [8], rate: 8/15},
		  shellDer: { frames: [9], rate: 8/15},
		  enloquecido: { frames: [8, 9], rate: 3/15}
	  });

	  Q.animations("coin", {
		  normal: { frames: [0,1,2], rate: 5/15}
	  });


	  Q.animations("block", {
	  	normal: {frames: [0], rate: 5/10},
	    change: {frames: [1], rate: 5/10}
	  });

	  Q.stageScene("startGame");

	});

}//funcion game