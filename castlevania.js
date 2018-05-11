var level=1;
var escena = 2;
var MAX_ESCENA=2;
var game = function() {

	var Q = window.Q = Quintus({audioSupported: [ 'mp3','ogg','wav' ]})
						.include("Sprites, Scenes, Input, Touch, UI, Anim, TMX, 2D, Audio")
						.setup({width: 448, height: 448})
						.controls().touch().enableSound();

/*-----------------------------------------------------------------------------------------------------------*/
/*------------------------------------------- Cambio de zona ------------------------------------------------*/
/*-----------------------------------------------------------------------------------------------------------*/

Q.Sprite.extend("CambioZona",{

		init: function(p) {

			console.log("Estamos creando una instancia de Goomba");

			this._super(p, {
						asset: "simon_normal.png",
						w: 10,
						h: 10,
						type: Q.SPRITE_ENEMY,
						gravity:0,
						cambiandoZona: false,
						zonaNueva:false,
						temporizazdorZona:0,
						temporizazdorZonaNueva:0,
						sensor: true
					});

			this.add('2d, aiBounce, animation');
			console.log(this);
			this.on("bump.left,bump.right, bump.top, bump.bottom",function(collision) {

				console.log("taschocao");
				//console.log(this.stage.viewport);
				this.stage.del("viewport");
				this.p.cambiandoZona = true;
				this.p.type = Q.SPRITE_NONE;
				this.p.collisionMask = Q.SPRITE_NONE;


			});

		},//init
		step: function (dt){
			var opasidad = 0.1;
			if(this.p.cambiandoZona){
				this.p.temporizazdorZona++;
			}
			if((this.p.temporizazdorZona > 20) && this.p.cambiandoZona){

				this.p.cambiandoZona=false;
				this.p.zonaNueva=true;
				this.p.temporizazdorZona=0;
			}
			if(this.p.zonaNueva){
				opasidad += 0.01;
				this.p.temporizazdorZona++;
				var containerscore = this.stage.insert(new Q.UI.Container({x:(Q.width/2)+100, y:Q.width/2, w: 10000, h: 10000, fill: "rgba(0,0,0,"+opasidad+")" }));
			}
			if((this.p.temporizazdorZona>50) && this.p.zonaNueva){
				///AQUI SE PODRIA CARGAR UNA ESCENA FINAL
				if(escena == MAX_ESCENA){
					escena=0;
				}
				Q.clearStages();
			  escena++;
			  Q.stageScene('level');
			}

		}//step

	});


/*-----------------------------------------------------------------------------------------------------------*/
/*------------------------------------------- Cambio de zona ------------------------------------------------*/
/*-----------------------------------------------------------------------------------------------------------*/

Q.Sprite.extend("EscaleraArriba",{

		init: function(p) {

			console.log("Estamos creando una instancia de escalera");

			this._super(p, {
						/*asset: "simon_normal.png",*/
						w:10,
						h:10,
						gravity:0,
						type: Q.SPRITE_ENEMY
					});

			this.add('2d, aiBounce, animation');

			this.on("bump.left,bump.right, bump.top, bump.bottom",function(collision) {
				console.log("holaaaaaaaaaaaaaaaaaa");
				if(collision.obj.isA("Simon")) {
			 		collision.obj.p.vy = -300;
			 		console.log("HOLIIIIIIIIIII");
				}
			});
			//console.log(this);

		},//init
		step: function (dt){

		}//step

	});



/*-----------------------------------------------------------------------------------------------------------*/
/*----------------------------------------------- ESCENAS ---------------------------------------------------*/
/*-----------------------------------------------------------------------------------------------------------*/

	Q.scene("level",function(stage) {
		var nivel = "nivel"+level+"-scn"+escena+".tmx";
		//Q.audio.play( "music_main.ogg", { loop: true });
		Q.stageTMX(nivel,stage);
		console.log(Q.width);
		// Create the player and add them to the stage
		//var player = stage.insert(new Q.Simon());

	});//scene level1


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




	Q.loadTMX(" mario_small.png, mario_small.json,mainTitle1.jpg, nivel1-scn1.tmx,  nivel1-scn2.tmx, simon_intro.png, simon_intro.json, whip.png, basic_whip.png, simon_normal.png, simon_normal.json, simon_normal_andando.png, simon_normal_andando.json, simon_agachado.png, simon_agachado.json, simon_normal_atacando.png, simon_normal_atacando.json, simon_agachado_atacando.png, simon_agachado_atacando.json, simon_agachado_andando.png, simon_agachado_andando.json, simon_saltando.png, simon_saltando.json, simon_saltando_atacando.png, simon_saltando_atacando.json, simon_atacando_haciarriba.png, simon_atacando_haciarriba.json, simon_herido.png, simon_muerto.png, simon_muerto.json, simon_atacando_diagonal.png, simon_atacando_diagonal.json, simon_saltando_atacando_haciarriba.png, simon_saltando_atacando_haciarriba.json, simon_saltando_atacando_diagonalarriba.png, simon_saltando_atacando_diagonalarriba.json, simon_saltando_atacando_diagonalabajo.png, simon_saltando_atacando_diagonalabajo.json, simon_saltando_atacando_haciabajo.png, simon_saltando_atacando_haciabajo.json, simon_subescaleras.png, simon_subescaleras.json, simon_subescaleras_atacando.png, simon_subescaleras_atacando.json, simon_subescaleras_atacando_haciarriba.png, simon_subescaleras_atacando_haciarriba.json, simon_subescaleras_atacando_diagonal.png, simon_subescaleras_atacando_diagonal.json, simon_bajaescaleras.png, simon_bajaescaleras.json, simon_bajaescaleras_atacando.png, simon_bajaescaleras_atacando.json, simon_bajaescaleras_atacando_diagonal.png, simon_bajaescaleras_atacando_diagonal.json", function() {

	  Q.compileSheets("simon_normal.png", "simon_normal.json");
	  Q.compileSheets("simon_normal_andando.png", "simon_normal_andando.json");
	  Q.compileSheets("simon_agachado.png", "simon_agachado.json");
	  Q.compileSheets("simon_normal_atacando.png", "simon_normal_atacando.json");
	  Q.compileSheets("simon_agachado_atacando.png", "simon_agachado_atacando.json");
	  Q.compileSheets("simon_agachado_andando.png", "simon_agachado_andando.json");
	  Q.compileSheets("simon_saltando.png", "simon_saltando.json");
	  Q.compileSheets("simon_saltando_atacando.png", "simon_saltando_atacando.json");
	  Q.compileSheets("simon_atacando_haciarriba.png", "simon_atacando_haciarriba.json");
	  Q.compileSheets("simon_muerto.png", "simon_muerto.json");

	  Q.compileSheets("simon_atacando_diagonal.png", "simon_atacando_diagonal.json");
	  Q.compileSheets("simon_saltando_atacando_haciarriba.png", "simon_saltando_atacando_haciarriba.json");
	  Q.compileSheets("simon_saltando_atacando_diagonalarriba.png", "simon_saltando_atacando_diagonalarriba.json");
	  Q.compileSheets("simon_saltando_atacando_diagonalabajo.png", "simon_saltando_atacando_diagonalabajo.json");
	  Q.compileSheets("simon_saltando_atacando_haciabajo.png", "simon_saltando_atacando_haciabajo.json");

	  Q.compileSheets("simon_subescaleras.png", "simon_subescaleras.json");
	  Q.compileSheets("simon_subescaleras_atacando.png", "simon_subescaleras_atacando.json");
	  Q.compileSheets("simon_subescaleras_atacando_haciarriba.png", "simon_subescaleras_atacando_haciarriba.json");
	  Q.compileSheets("simon_subescaleras_atacando_diagonal.png", "simon_subescaleras_atacando_diagonal.json");
	  Q.compileSheets("simon_bajaescaleras.png", "simon_bajaescaleras.json");
	  Q.compileSheets("simon_bajaescaleras_atacando.png", "simon_bajaescaleras_atacando.json");
	  Q.compileSheets("simon_bajaescaleras_atacando_diagonal.png", "simon_bajaescaleras_atacando_diagonal.json");





	  Q.animations("andando_normal", {
	      anda_derecha: { frames: [0,1,2,3,4,5], rate: 5/15},
	      anda_izquierda: { frames: [6,7,8,9,10,11], rate: 5/15}
	  });

	  Q.animations("atacando", {
	      ataca_derecha: { frames: [0,1,2], rate: 2/15, loop:false, trigger: "showwhip"},
	      ataca_izquierda: { frames: [3,4,5], rate: 2/15, loop:false, trigger: "showwhip"}
	  });

	  Q.animations("agachado_atacando", {
	      ataca_agachado_derecha: { frames: [0,1,2], rate: 2/15, loop:false, trigger: "showwhip_ducked"},
	      ataca_agachado_izquierda: { frames: [3,4,5], rate: 2/15, loop:false, trigger: "showwhip_ducked"}
	  });

	  Q.animations("normalito", {
	      pose_normal_derecha: { frames: [0], rate: 5/15, loop:false},
	      pose_normal_izquierda: { frames: [1], rate: 5/15, loop:false}
	  });

	  Q.animations("agachado", {
	      pose_agachado_derecha: { frames: [0], rate: 5/15, loop:false},
	      pose_agachado_izquierda: { frames: [1], rate: 5/15, loop:false}
	  });

	  Q.animations("andando_agachado", {
	      pose_andando_agachado_derecha: { frames: [0,1,2,3,4], rate: 6/15},
	      pose_andando_agachado_izquierda: { frames: [5,6,7,8,9], rate: 6/15}
	  });

	  Q.animations("saltando", {
	      salta_derecha: { frames: [0], rate: 5/15},
	      salta_izquierda: { frames: [1], rate: 5/15}
	  });

	  Q.animations("saltando_atacando", {
	      saltataca_derecha: { frames: [0,1,2], rate: 3/15, loop:false, trigger: "showwhip_jumping"},
	      saltataca_izquierda: { frames: [3,4,5], rate: 3/15, loop:false, trigger: "showwhip_jumping"}
	  });

	  Q.animations("atacando_haciarriba", {
	      ataca_haciarriba_derecha: { frames: [0,1,2], rate: 2/15, loop:false, trigger: "showwhip_upwards"},
	      ataca_haciarriba_izquierda: { frames: [3,4,5], rate: 2/15, loop:false, trigger: "showwhip_upwards"}
	  });

	  Q.animations("atacando_diagonal", {
	      ataca_diagonal_derecha: { frames: [0,1,2], rate: 2/15, loop:false, trigger: "showwhip_diagonal"},
	      ataca_diagonal_izquierda: { frames: [3,4,5], rate: 2/15, loop:false, trigger: "showwhip_diagonal"}
	  });

	  Q.animations("saltando_atacando_haciarriba", {
	      saltataca_haciarriba_derecha: { frames: [0,1,2], rate: 2/15, loop:false, trigger: "showwhip_upwards_jumping"},
	      saltataca_haciarriba_izquierda: { frames: [3,4,5], rate: 2/15, loop:false, trigger: "showwhip_upwards_jumping"}
	  });

	  Q.animations("saltando_atacando_diagonalarriba", {
	      saltataca_diagonal_haciarriba_derecha: { frames: [0,1,2], rate: 2/15, loop:false, trigger: "showwhip_upwards_jumping_diagonal"},
	      saltataca_diagonal_haciarriba_izquierda: { frames: [3,4,5], rate: 2/15, loop:false, trigger: "showwhip_upwards_jumping_diagonal"}
	  });

	  Q.animations("saltando_atacando_diagonalabajo", {
	      saltataca_diagonal_haciabajo_derecha: { frames: [0,1,2], rate: 2/15, loop:false, trigger: "showwhip_downwards_jumping_diagonal"},
	      saltataca_diagonal_haciabajo_izquierda: { frames: [3,4,5], rate: 2/15, loop:false, trigger: "showwhip_downwards_jumping_diagonal"}
	  });

	  Q.animations("saltando_atacando_haciabajo", {
	      saltataca_haciabajo_derecha: { frames: [0,1,2], rate: 2/15, loop:false, trigger: "showwhip_downwards_jumping"},
	      saltataca_haciabajo_izquierda: { frames: [3,4,5], rate: 2/15, loop:false, trigger: "showwhip_downwards_jumping"}
	  });

	  Q.animations("simon_muriendo", {
	      muriendo: { frames: [0,1,2], rate: 6/15, loop:false} //se me olvidó hacer su versión hacia la izquierda, pero se podrá hacer un flip X aunque pierda algo de calidad
	  });


	  //CARMEN estas animaciones de abajo son las que te interesa activar para probar las escaleras en ciertos momentos del step de Simon
	  Q.animations("subiendo_escaleras", {
	      sube_escaleras_haciaderecha: { frames: [0,1,2,3,4,5,6], rate: 5/15, loop:false},
	      sube_escaleras_haciaizquierda: { frames: [7,8,9,10,11,12,13], rate: 5/15, loop:false}
	  });

	  Q.animations("subiendo_escaleras_atacando", {
	      sube_escaleras_haciaderecha_atacando: { frames: [0,1,2,3,4,5], rate: 5/15, loop:false},
	      sube_escaleras_haciaizquierda_atacando: { frames: [6,7,8,9,10,11], rate: 5/15, loop:false}
	  });

	  Q.animations("subiendo_escaleras_atacando_haciarriba", {
	      sube_escaleras_haciaderecha_atacando_haciarriba: { frames: [0,1,2], rate: 5/15, loop:false},
	      sube_escaleras_haciaizquierda_atacando_haciarriba: { frames: [3,4,5], rate: 5/15, loop:false}
	  });

	  Q.animations("subiendo_escaleras_atacando_diagonal", {
	      sube_escaleras_haciaderecha_atacando_diagonal: { frames: [0,1,2], rate: 5/15, loop:false},
	      sube_escaleras_haciaizquierda_atacando_diagonal: { frames: [3,4,5], rate: 5/15, loop:false}
	  });

	  Q.animations("bajando_escaleras", {
	      baja_escaleras_haciaizquierda: { frames: [0,1,2,3,4,5], rate: 5/15, loop:false},
	      baja_escaleras_haciaderecha: { frames: [6,7,8,9,10,11], rate: 5/15, loop:false}
	  });

	   Q.animations("bajando_escaleras_atacando", {
	      baja_escaleras_haciaizquierda_atacando: { frames: [0,1,2], rate: 5/15, loop:false},
	      baja_escaleras_haciaderecha_atacando: { frames: [3,4,5], rate: 5/15, loop:false}
	  });

	   Q.animations("bajando_escaleras_atacando_diagonal", {
	      baja_escaleras_haciaizquierda_atacando_diagonal: { frames: [0,1,2], rate: 5/15, loop:false},
	      baja_escaleras_haciaderecha_atacando_diagonal: { frames: [3,4,5], rate: 5/15, loop:false}
	  });




	  Q.stageScene("startGame");

	});
















	Q.Sprite.extend("Simon",{
	//SOLUCIONAR QUE SI DEJO PULSADO LATIGO MIENTRAS ATACO DE PIE, NO PUEDA SALTAR NI AGACHARSE HASTA QUE LO SUELTE.
	//Y MIENTRAS PULSO LATIGO AGACHADO, QUE NO PUEDA PONERSE EN PIE NI SALTAR HASTA QUE LO SUELTE
	//Y MIENTRAS ATACO HACIA ARRIBA, QUE TAMPOCO PUEDA HACER NADA MAS HASTA SOLTAR EL LATIGO
	//EN GENERAL, HAY QUE CAPARLE ALGUNOS MOVIMIENTOS MIENTRAS HACE LOS DIFERENTES TIPOS DE ATAQUE


		init: function(p) {

			console.log("Estamos creando una instancia de Simon");

			this._super(p, {
								sheet: "normalito",
								sprite: "normalito",
								x: 1200,//55,
								y: 528,
								gravity: 0.7,
								scale: 2,
								latigo: null,
								latigoMejorado: false,
								latigoActivado: false,
								agachado: false,
								saltando: false,
								andando: false,
								atacando_verticalmente: false,
								atacando_verticalmente_abajo: false,
								atacando_diagonalmente: false,
								atacando_diagonalmente_abajo: false

								//alturaActualDePie: 528
						   }
						); //_super

			this.add('2d, platformerControls, animation');

			this.on("showwhip",this,"dibujalatigo_depie");
			this.on("showwhip_ducked",this,"dibujalatigo_agachado");
			this.on("showwhip_jumping",this,"dibujalatigo_saltando");
			this.on("showwhip_upwards",this,"dibujalatigo_haciarriba");
			this.on("showwhip_diagonal",this,"dibujalatigo_diagonal");
			this.on("showwhip_upwards_jumping",this,"dibujalatigo_haciarriba_saltando");
			this.on("showwhip_upwards_jumping_diagonal",this,"dibujalatigo_haciarriba_saltando_diagonal");
			this.on("showwhip_downwards_jumping_diagonal",this,"dibujalatigo_haciabajo_saltando_diagonal");
			this.on("showwhip_downwards_jumping",this,"dibujalatigo_haciabajo_saltando");




		},//init

		cambiaSprite: function(nombreSprite, nombreAnimacionDerecha, nombreAnimacionIzquierda){
			this.sheet(nombreSprite, true);
			this.p.sprite = nombreSprite;
			if(this.p.direction == "right") this.play(nombreAnimacionDerecha);
			else if(this.p.direction == "left") this.play(nombreAnimacionIzquierda);
			Q._generateCollisionPoints(this);
		},

		gestionaAparicionLatigo: function(valorAngulo, valorAnguloIzq, despXmejorado, despYmejorado, despXizq, despYizq, despX, despY,despXmejoradoIzq, despYmejoradoIzq, creandolo){

			var valorFlip = "";
			var dibujoLatigo = "";
			if(this.p.latigoMejorado) dibujoLatigo = "whip.png";
			else dibujoLatigo = "basic_whip.png";

			
			if(this.p.direction == "right"){
				if(this.p.latigoMejorado){
					desplazamientoX = despXmejorado;
					desplazamientoY = despYmejorado;
				}
				else {
					desplazamientoX = despX;
					desplazamientoY = despY;
				}

				valorAngulo = valorAngulo;
			}
			else if(this.p.direction == "left"){
				valorFlip = "x";

				if(this.p.latigoMejorado){
					desplazamientoX = despXmejoradoIzq;
					desplazamientoY = despYmejoradoIzq;
				}
				else{
					desplazamientoX = despXizq;
					desplazamientoY = despYizq;
				}

				valorAngulo = valorAnguloIzq;
			}

			desplazamientoX *= this.p.scale;
			desplazamientoY *= this.p.scale;

			if(creandolo){
				this.p.latigo = this.stage.insert(new Q.Whip({asset: dibujoLatigo, x: this.p.x+desplazamientoX, y:this.p.y+desplazamientoY, angle: valorAngulo, flip: valorFlip}));
			}
			else{ //no lo creamos, mantenemos la posición que queremos durante el salto

				this.p.latigo.p.x = this.p.x+desplazamientoX;
				this.p.latigo.p.y = this.p.y+desplazamientoY;

			}

		},

		dibujalatigo_depie: function() {

			this.gestionaAparicionLatigo(null, null, 46, -8, -40, -9, 40, -9, -46, -8, true);
			//this.gestionaAparicionLatigo(valorAngulo, valorAnguloIzq, despXmejorado, despYmejorado, despXizq, despYizq, despX, despY, despXmejoradoIzq, despYmejoradoIzq);

		},

		dibujalatigo_agachado: function() {

			this.gestionaAparicionLatigo(null, null, 48, 0, -40, -1, 40, -1, -48, 0, true);
			//this.gestionaAparicionLatigo(valorAngulo, valorAnguloIzq, despXmejorado, despYmejorado, despXizq, despYizq, despX, despY, despXmejoradoIzq, despYmejoradoIzq);
		},

		dibujalatigo_saltando: function() {
			
			//this.gestionaAparicionLatigo(null, null, 46, -8, -40, -9, 40, -9, -46, -8);
			this.gestionaAparicionLatigo(null, null, 45, 0, -37, -7, 37, -7, -45, 0, true);
			//this.gestionaAparicionLatigo(valorAngulo, valorAnguloIzq, despXmejorado, despYmejorado, despXizq, despYizq, despX, despY, despXmejoradoIzq, despYmejoradoIzq);

		},

		dibujalatigo_haciarriba: function() {
			
			this.gestionaAparicionLatigo(-90, 90, 2, -this.p.h, -3, -this.p.h+7, 2, -this.p.h+7, -5, -this.p.h, true);
			//this.gestionaAparicionLatigo(valorAngulo, valorAnguloIzq, despXmejorado, despYmejorado, despXizq, despYizq, despX, despY, despXmejoradoIzq, despYmejoradoIzq);
		},

		dibujalatigo_diagonal: function() {
			
			this.gestionaAparicionLatigo(-45, 45, this.p.w+3, -this.p.h+7, -this.p.w+1, -this.p.h+11, this.p.w-3, -this.p.h+11, -this.p.w-4, -this.p.h+8, true);
			//this.gestionaAparicionLatigo(valorAngulo, valorAnguloIzq, despXmejorado, despYmejorado, despXizq, despYizq, despX, despY, despXmejoradoIzq, despYmejoradoIzq);

		},

		dibujalatigo_haciarriba_saltando: function() {
			
			this.gestionaAparicionLatigo(-90, 90, 2, -this.p.h, -5, -this.p.h+7, 2, -this.p.h+7, -5, -this.p.h, true);
			//this.gestionaAparicionLatigo(valorAngulo, valorAnguloIzq, despXmejorado, despYmejorado, despXizq, despYizq, despX, despY, despXmejoradoIzq, despYmejoradoIzq);
			
		},
		
		dibujalatigo_haciarriba_saltando_diagonal: function() {

			this.gestionaAparicionLatigo(-45, 45, this.p.w+9, -this.p.h+9, -this.p.w-4, -this.p.h+7, this.p.w-1, -this.p.h+11, -this.p.w-4, -this.p.h+7, true);
			//this.gestionaAparicionLatigo(valorAngulo, valorAnguloIzq, despXmejorado, despYmejorado, despXizq, despYizq, despX, despY, despXmejoradoIzq, despYmejoradoIzq);
		},

		dibujalatigo_haciabajo_saltando_diagonal: function() {
			
			this.gestionaAparicionLatigo(45, -45, 0, this.p.h+7, 0, this.p.h+7, 0, this.p.h+7, 0, this.p.h+7, true);
			//this.gestionaAparicionLatigo(valorAngulo, valorAnguloIzq, despXmejorado, despYmejorado, despXizq, despYizq, despX, despY, despXmejoradoIzq, despYmejoradoIzq);

		},

		dibujalatigo_haciabajo_saltando: function() {
			
			this.gestionaAparicionLatigo(90, -90, 3, this.p.h-21, -3, this.p.h-20, 5, this.p.h-20, -3, this.p.h-21, true);
			//this.gestionaAparicionLatigo(valorAngulo, valorAnguloIzq, despXmejorado, despYmejorado, despXizq, despYizq, despX, despY, despXmejoradoIzq, despYmejoradoIzq);

		},

		actuaIzq: function(){
			if(Q.inputs['left']){

				//console.log(this.p);

				if(this.p.latigoActivado){// && !this.p.saltando){

					if(!this.p.saltando && !Q.inputs['up']) this.p.x = this.p.posicionAtaque; //para que se quede quieto mientras ataca
					else if(!this.p.saltando && !this.p.atacando_diagonalmente){

						this.p.atacando_diagonalmente = true;
						this.cambiaSprite("atacando_diagonal", "ataca_diagonal_derecha", "ataca_diagonal_izquierda");
					}

				}
				else{
					this.p.andando = true;

					if(this.p.agachado){
					
						this.cambiaSprite("andando_agachado", "pose_andando_agachado_derecha", "pose_andando_agachado_izquierda");
					}
					else{

						if(this.p.direction == "right" && this.p.saltando){
							
							this.p.direction = "left";
							this.play("salta_izquierda");
						}

						if(!this.p.saltando && !this.p.latigoActivado){

							this.cambiaSprite("andando_normal", "anda_izquierda", "anda_izquierda");
						}

					}
				}


			}//pulsando izquierda
			else{ //ya no pulsa la izquierda
				if(this.p.agachado && !this.p.latigoActivado && this.p.direction == "left"){

					this.p.andando = false;
					this.cambiaSprite("agachado", "pose_agachado_derecha", "pose_agachado_izquierda");
				}
				else if(!this.p.agachado && this.p.andando && this.p.direction == "left"){

					this.p.andando = false;
					this.cambiaSprite("normalito", "pose_normal_izquierda", "pose_normal_izquierda");
				}


			}
		},

		actuaDer: function(){
			if(Q.inputs['right']){

				//console.log(this.p);


				if(this.p.latigoActivado){
					//if(Q.inputs['up']) console.log("pulsando arriba");
					//else console.log("no pulsando arriba");

					if(!this.p.saltando && !Q.inputs['up']) this.p.x = this.p.posicionAtaque; //para que se quede quieto mientras ataca
					else if(!this.p.saltando && !this.p.atacando_diagonalmente){

						this.p.atacando_diagonalmente = true;
						this.cambiaSprite("atacando_diagonal", "ataca_diagonal_derecha", "ataca_diagonal_izquierda");
					}
				}
				else{
					this.p.andando = true;

					if(this.p.agachado){
						
						this.cambiaSprite("andando_agachado", "pose_andando_agachado_derecha", "pose_andando_agachado_izquierda");
					}
					else{ //anda normal o salta hacia la derecha

						if(this.p.direction == "left" && this.p.saltando){
							
							this.p.direction = "right";
							this.play("salta_derecha");
						}

						if(!this.p.saltando && !this.p.latigoActivado){
							
							this.cambiaSprite("andando_normal", "anda_derecha", "anda_derecha");
						}

					}
				}



			}//pulsando derecha
			else{ //ya no pulsa la derecha
				if(this.p.agachado && !this.p.latigoActivado && this.p.direction == "right"){

					this.p.andando = false;
					this.cambiaSprite("agachado", "pose_agachado_derecha", "pose_agachado_izquierda");
				}
				else if(!this.p.agachado && this.p.andando && this.p.direction == "right"){

					this.p.andando = false;
					this.cambiaSprite("normalito", "pose_normal_derecha", "pose_normal_derecha");
				}

			}
		},

		step: function(dt) {


			//compruebo con cada step que todo esté consistente
			if(!this.p.latigo) this.p.latigoActivado = false;
			if(!Q.inputs['Q'] && !this.p.saltando && !Q.inputs['W'] && !Q.inputs['right'] && !Q.inputs['up'] && !Q.inputs['down'] && !Q.inputs['left']){
				this.p.latigoActivado = false;
				this.p.atacando_verticalmente = false;
				this.p.atacando_verticalmente_abajo = false;
				this.p.atacando_diagonalmente = false;
				this.p.atacando_haciarriba = false;
				this.p.atacando_diagonalmente_abajo = false;

				//SI HAY COMPORTAMIENTO RARO, COLOCAR AQUÍ TAMBIÉN QUE SU SPRITE CAMBIE AL DE POSE NORMAL SEGUN LA DIRECCION A LA QUE APUNTE
				/*this.sheet("normalito", true);
				this.p.sprite = "normalito";
				if(this.p.direction == "right") this.play("pose_normal_derecha");
				else if(this.p.direction == "left") this.play("pose_normal_izquierda");
				Q._generateCollisionPoints(this);*/
			}


			if(Q.inputs['Q'] && !this.p.saltando){
				
				this.p.saltando = true;
				this.cambiaSprite("saltando", "salta_derecha", "salta_izquierda");

			}//saltando


			if(this.p.saltando){
				if(Q.inputs['up'] && Q.inputs['W'] && !Q.inputs['right']  && !Q.inputs['left'] && !this.p.atacando_verticalmente){

					this.p.atacando_verticalmente = true;
					this.cambiaSprite("saltando_atacando_haciarriba", "saltataca_haciarriba_derecha", "saltataca_haciarriba_izquierda");
				}
				else if(Q.inputs['down'] && Q.inputs['W'] && !Q.inputs['right']  && !Q.inputs['left'] && !this.p.atacando_verticalmente && !this.p.atacando_verticalmente_abajo){

					this.p.atacando_verticalmente = true;
					this.p.atacando_verticalmente_abajo = true;

					//console.log("HOLA HOLA HOLA"); aqui se confundia a veces: al querer atacar diagonalmente hacia abajo a la izquierda se pensaba que quería atacar verticalmente hacia abajo (direccion izquierda)
					this.cambiaSprite("saltando_atacando_haciabajo", "saltataca_haciabajo_derecha", "saltataca_haciabajo_izquierda");
				}
				else if(Q.inputs['up'] && Q.inputs['W'] && (Q.inputs['right'] || Q.inputs['left'])  && !this.p.atacando_diagonalmente){

					this.p.atacando_diagonalmente = true;
					this.cambiaSprite("saltando_atacando_diagonalarriba", "saltataca_diagonal_haciarriba_derecha", "saltataca_diagonal_haciarriba_izquierda");
				}
				else if(Q.inputs['down'] && Q.inputs['W'] && (Q.inputs['right'] || Q.inputs['left']) && !this.p.atacando_diagonalmente){

					this.p.atacando_diagonalmente = true;
					this.p.atacando_diagonalmente_abajo = true;
					this.cambiaSprite("saltando_atacando_diagonalabajo", "saltataca_diagonal_haciabajo_derecha", "saltataca_diagonal_haciabajo_izquierda");
				}

			}

			if(Q.inputs['down']){

				if(!this.p.agachado && !this.p.atacando_diagonalmente && !this.p.atacando_verticalmente && !this.p.saltando){
					
					this.p.agachado = true;
					this.cambiaSprite("agachado", "pose_agachado_derecha", "pose_agachado_izquierda");
				}

			}//agachandose
			else{
				if(this.p.agachado == true){

					this.p.agachado = false;
					this.cambiaSprite("normalito", "pose_normal_derecha", "pose_normal_izquierda");
				}
			}

			if(Q.inputs['W'] && !this.p.latigoActivado){

				this.p.latigoActivado = true;
				this.p.posicionAtaque = this.p.x;


				if(this.p.saltando && !this.p.atacando_verticalmente && !this.p.atacando_diagonalmente){
					
					this.cambiaSprite("saltando_atacando", "saltataca_derecha", "saltataca_izquierda");
				}
				else if(!this.p.saltando && !this.p.agachado){
					
					if(!Q.inputs['up']){
						
						this.cambiaSprite("atacando", "ataca_derecha", "ataca_izquierda");
					}
					else if(!this.p.atacando_verticalmente && !Q.inputs['right']){

						this.p.atacando_verticalmente = true;
						this.cambiaSprite("atacando_haciarriba", "ataca_haciarriba_derecha", "ataca_haciarriba_izquierda");
					}
				}
				else if(this.p.agachado && !this.p.atacando_verticalmente && !this.p.atacando_diagonalmente){

					this.cambiaSprite("agachado_atacando", "ataca_agachado_derecha", "ataca_agachado_izquierda");
				}

			}//activando el latigo
			else if (!Q.inputs['W'] && this.p.latigo){ //al soltar tecla W y si sigue el latigo presente

				//VIGILAR, PORQUE EL LATIGO SE CREA AL TERMINAR LA ANIMACION DE ATAQUE,
				//SI PULSAMOS Y SOLTAMOS W MUY RAPIDO, LA ANIMACION NO TERMINA Y P.LATIGO NO APUNTA A NADA
				this.p.latigo.destroy();
				this.p.latigo = null;
				this.p.latigoActivado = false;
				this.p.posicionAtaque = null;
				this.p.atacando_verticalmente = false;
				this.p.atacando_verticalmente_abajo = false;
				this.p.atacando_diagonalmente = false;
				this.p.atacando_diagonalmente_abajo = false;
				console.log("has soltado P " + this.p.latigoActivado);

				if(this.p.saltando == true){
					
					this.cambiaSprite("saltando", "salta_derecha", "salta_izquierda");
				}
				else if(!this.p.agachado){
					
					this.cambiaSprite("normalito", "pose_normal_derecha", "pose_normal_izquierda");
				}
				else{
					
					this.cambiaSprite("agachado", "pose_agachado_derecha", "pose_agachado_izquierda");
				}

			}



			this.actuaDer();
			this.actuaIzq();
			

			if(this.p.saltando == true){
				if(this.p.vy == 0){ //si estaba saltando pero vuelve a estar plantado en el suelo

					this.p.saltando = false;
					this.cambiaSprite("normalito", "pose_normal_derecha", "pose_normal_izquierda");

					if(this.p.latigo){
						this.p.latigo.destroy();
						this.p.latigoActivado = false;
					}
					
				}
				else if(this.p.latigo){ //esta en el aire y con el latigo presente
					if(!this.p.atacando_verticalmente && !this.p.atacando_diagonalmente){
						
						this.gestionaAparicionLatigo(null, null, 45, -5, -37, -7, 37, -7, -45, 0, false);
						//this.gestionaAparicionLatigo(valorAngulo, valorAnguloIzq, despXmejorado, despYmejorado, despXizq, despYizq, despX, despY, despXmejoradoIzq, despYmejoradoIzq);
					}
					else if(this.p.atacando_verticalmente){
						if(!this.p.atacando_verticalmente_abajo){
							
							this.gestionaAparicionLatigo(null, null, 2, -this.p.h, -3, -this.p.h+7, 2, -this.p.h+7, -7, -this.p.h, false);
							//this.gestionaAparicionLatigo(valorAngulo, valorAnguloIzq, despXmejorado, despYmejorado, despXizq, despYizq, despX, despY, despXmejoradoIzq, despYmejoradoIzq);
						}
						else {
							if(!Q.inputs['left']){ //movidas de Quintus por pulsar varias teclas a la vez...es una ñapa pero así evito el error

								this.gestionaAparicionLatigo(null, null, 3, this.p.h-21, -3, this.p.h-20, 5, this.p.h-20, -3, this.p.h-21, false);
								//this.gestionaAparicionLatigo(valorAngulo, valorAnguloIzq, despXmejorado, despYmejorado, despXizq, despYizq, despX, despY, despXmejoradoIzq, despYmejoradoIzq);
							}
							else{

								this.gestionaAparicionLatigo(null, null, this.p.w+8, 35, -this.p.w-2, 27, this.p.w+2, 25, -this.p.w-2, 27, false);
								//this.gestionaAparicionLatigo(valorAngulo, valorAnguloIzq, despXmejorado, despYmejorado, despXizq, despYizq, despX, despY, despXmejoradoIzq, despYmejoradoIzq);
							}
							
						}

					}
					else if(this.p.atacando_diagonalmente){ // if atacando diagonalmente y saltando
						
						if(!this.p.atacando_diagonalmente_abajo){
							
							this.gestionaAparicionLatigo(null, null, this.p.w+8, -this.p.h+7, -this.p.w-4, -this.p.h+11, this.p.w-1, -this.p.h+11, -this.p.w-4, -this.p.h+11, false);
							//this.gestionaAparicionLatigo(valorAngulo, valorAnguloIzq, despXmejorado, despYmejorado, despXizq, despYizq, despX, despY, despXmejoradoIzq, despYmejoradoIzq);
						}
						else{

							this.gestionaAparicionLatigo(null, null, this.p.w+8, 35, -this.p.w-2, 27, this.p.w+2, 25, -this.p.w-2, 27, false);
							//this.gestionaAparicionLatigo(valorAngulo, valorAnguloIzq, despXmejorado, despYmejorado, despXizq, despYizq, despX, despY, despXmejoradoIzq, despYmejoradoIzq);
							
						}

					}
					
				}

			}//if saltando




			if(this.p["y"] > 444){

				//console.log("Tas caio lol");
				Q.stageScene("endGame",2, { label: "You Died" });
				this.destroy();
			}

			if((this.p.x >= Q.width/2)&&(this.p.x <= (this.p.AnchoMapa - Q.width/2))){
				this.stage.add("viewport").follow(this,{ x: true, y: false });
				this.stage.viewport.offsetX = 0;
				this.stage.viewport.offsetY = 60;
			}
			if((this.p.x > (this.p.AnchoMapa - Q.width/2)) || (this.p.x < Q.width/2)){
				this.stage.add("viewport").unfollow();
			}

		}//step

	});//extend Simon







	Q.Sprite.extend("Whip",{

		init: function(p) {

			console.log("Estamos creando una instancia de Whip");

			this._super(p, {
								asset: "basic_whip.png", //por defecto el personaje siempre empieza con el latigo basico, y éste se actualiza al recoger la mejora. Si el personaje pierde una vida, el latigo vuelve a ser basico
								x: 100,
								y: 528,
								yaColisionada: false,
								scale: 2,
								gravity: 0,
								sensor: true,
								collisionMask: Q.SPRITE_NONE,
								damage_hits: null //con el latigo basico hará falta dar el doble de golpes que con el mejorado, pues es menos potente.
						   }
						); //_super

			this.add('2d');
			this.on("bump.top,bump.left,bump.right,bump.bottom",function(collision) {

				//AQUI VAN LOS ENEMIGOS A LOS QUE PODRÁ DAÑAR EL LATIGO
				/*if(collision.obj.isA("Bloopa") || collision.obj.isA("Koopa")) {
					//this.destroy();
					console.log("latigo colisiona con bloopa O koopa");
					collision.obj.destroy();
				}*/

			});//on

		}/*,//init

		step: function(dt){
			//console.log(this.p); en principio no hará falta step para el latigo, borrar al terminar el juego

		}*/

	});//extend Whip


//----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------




}//funcion game
