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
								latigoMejorado: true,
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

		posicionaLatigo: function(valorAngulo, valorFlip, despXmejorado, despYmejorado, despXizq, despYizq, despX, despY,despXmejoradoIzq, despYmejoradoIzq){
			//var desplazamientoX = 0;
			//var desplazamientoY = 0;
			//var valorAngulo = -45;
			var dibujoLatigo = "";

			if(this.p.direction == "left"){
				if(this.p.latigoMejorado){
					desplazamientoX = despXmejoradoIzq;
					desplazamientoY = despYmejoradoIzq;
				}
				else{
					desplazamientoX = despXizq;
					desplazamientoY = despYizq;
				}

				valorAngulo = valorAngulo;
			}
			else if(this.p.direction == "right"){
				if(this.p.latigoMejorado){
					desplazamientoX = this.p.w+3;
					desplazamientoY = -this.p.h+7;
					dibujoLatigo = "whip.png";
				}
				else {
					desplazamientoX = this.p.w-1;
					desplazamientoY = -this.p.h+11;
					dibujoLatigo = "basic_whip.png";
				}
			}



			if(this.p.latigoMejorado){
				desplazamientoX = this.p.w+3;
				desplazamientoY = -this.p.h+7;
				dibujoLatigo = "whip.png";
			}
			else {
				desplazamientoX = this.p.w-1;
				desplazamientoY = -this.p.h+11;
				dibujoLatigo = "basic_whip.png";
			}

			if(this.p.direction == "left") {
				if(this.p.latigoMejorado){
					desplazamientoX = -this.p.w-4;
					desplazamientoY = -this.p.h+5;
				}
				else{
					desplazamientoX = -this.p.w-1;
					desplazamientoY = -this.p.h+11;
				}

				valorAngulo = -135;
			}

			desplazamientoX *= this.p.scale;
			desplazamientoY *= this.p.scale;

			this.p.latigo = this.stage.insert(new Q.Whip({asset: dibujoLatigo, x: this.p.x+desplazamientoX, y:this.p.y+desplazamientoY, angle: valorAngulo}));

		},

		//TODAS ESTAS FUNCIONES QUE HAY HASTA QUE COMIENZA EL STEP SE PUEDEN GENERALIZAR, SE HARÁ MÁS ADELANTE SE LIMPIARÁ+OPTIMIZARÁ EL CÓDIGO
		dibujalatigo_depie: function() {

			var desplazamientoX = 0;
			var desplazamientoY = 0;
			var valorFlip = "";
			var dibujoLatigo = "";

			if(this.p.latigoMejorado){
				desplazamientoX = 46;
				desplazamientoY = -8;
				dibujoLatigo = "whip.png";
			}
			else {
				desplazamientoX = 40;
				desplazamientoY = -9;
				dibujoLatigo = "basic_whip.png";
			}

			if(this.p.direction == "left") {
				desplazamientoX *= -1;
				valorFlip = "x";
			}

			desplazamientoX *= this.p.scale;
			desplazamientoY *= this.p.scale;

			this.p.latigo = this.stage.insert(new Q.Whip({asset: dibujoLatigo, x: this.p.x+desplazamientoX, y:this.p.y+desplazamientoY, flip: valorFlip}));

		},

		dibujalatigo_agachado: function() {

			var desplazamientoX = 0;
			var desplazamientoY = 0;
			var valorFlip = "";
			var dibujoLatigo = "";

			if(this.p.latigoMejorado){
				desplazamientoX = 48;
				dibujoLatigo = "whip.png";
			}
			else {
				desplazamientoX = 40;
				desplazamientoY = -1;
				dibujoLatigo = "basic_whip.png";
			}

			if(this.p.direction == "left") {
				desplazamientoX *= -1;
				valorFlip = "x";
			}

			desplazamientoX *= this.p.scale;
			desplazamientoY *= this.p.scale;

			this.p.latigo = this.stage.insert(new Q.Whip({asset: dibujoLatigo, x: this.p.x+desplazamientoX, y:this.p.y+desplazamientoY, flip: valorFlip}));
		},

		dibujalatigo_saltando: function() {

			var desplazamientoX = 0;
			var desplazamientoY = 0;
			var valorFlip = "";
			var dibujoLatigo = "";

			if(this.p.latigoMejorado){
				desplazamientoX = 45;
				desplazamientoY = -5;
				dibujoLatigo = "whip.png";
			}
			else {
				desplazamientoX = 37;
				desplazamientoY = -7;
				dibujoLatigo = "basic_whip.png";
			}

			if(this.p.direction == "left") {
				desplazamientoX *= -1;
				valorFlip = "x";
			}

			desplazamientoX *= this.p.scale;
			desplazamientoY *= this.p.scale;

			this.p.latigo = this.stage.insert(new Q.Whip({asset: dibujoLatigo, x: this.p.x+desplazamientoX, y:this.p.y+desplazamientoY, flip: valorFlip}));

		},

		dibujalatigo_haciarriba: function() {

			var desplazamientoX = 0;
			var desplazamientoY = 0;
			var valorAngulo = -90;
			var dibujoLatigo = "";

			if(this.p.latigoMejorado){
				desplazamientoX = 2;
				desplazamientoY = -this.p.h;
				dibujoLatigo = "whip.png";
			}
			else {
				desplazamientoX = 2;
				desplazamientoY = -this.p.h+7;
				dibujoLatigo = "basic_whip.png";
			}

			if(this.p.direction == "left") {
				desplazamientoX = -5;
			}

			desplazamientoX *= this.p.scale;
			desplazamientoY *= this.p.scale;

			this.p.latigo = this.stage.insert(new Q.Whip({asset: dibujoLatigo, x: this.p.x+desplazamientoX, y:this.p.y+desplazamientoY, angle: valorAngulo}));

		},

		dibujalatigo_diagonal: function() {

			var desplazamientoX = 0;
			var desplazamientoY = 0;
			var valorAngulo = -45;
			var dibujoLatigo = "";

			if(this.p.latigoMejorado){
				desplazamientoX = this.p.w+3;
				desplazamientoY = -this.p.h+7;
				dibujoLatigo = "whip.png";
			}
			else {
				desplazamientoX = this.p.w-1;
				desplazamientoY = -this.p.h+11;
				dibujoLatigo = "basic_whip.png";
			}

			if(this.p.direction == "left") {
				if(this.p.latigoMejorado == true){
					desplazamientoX = -this.p.w-4;
					desplazamientoY = -this.p.h+5;
				}
				else{
					desplazamientoX = -this.p.w-1;
					desplazamientoY = -this.p.h+11;
				}

				valorAngulo = -135;
			}

			desplazamientoX *= this.p.scale;
			desplazamientoY *= this.p.scale;

			this.p.latigo = this.stage.insert(new Q.Whip({asset: dibujoLatigo, x: this.p.x+desplazamientoX, y:this.p.y+desplazamientoY, angle: valorAngulo}));

		},

		dibujalatigo_haciarriba_saltando: function() {

			var desplazamientoX = 0;
			var desplazamientoY = 0;
			var valorAngulo = -90;
			var dibujoLatigo = "";

			if(this.p.latigoMejorado){
				desplazamientoX = 2;
				desplazamientoY = -this.p.h;
				dibujoLatigo = "whip.png";
			}
			else {
				desplazamientoX = 2;
				desplazamientoY = -this.p.h+7;
				dibujoLatigo = "basic_whip.png";
			}

			if(this.p.direction == "left") {
				desplazamientoX = -5;
			}

			desplazamientoX *= this.p.scale;
			desplazamientoY *= this.p.scale;

			this.p.latigo = this.stage.insert(new Q.Whip({asset: dibujoLatigo, x: this.p.x+desplazamientoX, y:this.p.y+desplazamientoY, angle: valorAngulo}));


		},

		dibujalatigo_haciarriba_saltando_diagonal: function() {

			var desplazamientoX = 0;
			var desplazamientoY = 0;
			var valorAngulo = -45;
			var dibujoLatigo = "";

			if(this.p.latigoMejorado){
				desplazamientoX = this.p.w+9;
				desplazamientoY = -this.p.h+9;
				dibujoLatigo = "whip.png";
			}
			else {
				desplazamientoX = this.p.w-1;
				desplazamientoY = -this.p.h+11;
				dibujoLatigo = "basic_whip.png";
			}

			if(this.p.direction == "left") {
				desplazamientoX = -this.p.w-4;
				desplazamientoY = -this.p.h+7;
				valorAngulo = -135;
			}

			desplazamientoX *= this.p.scale;
			desplazamientoY *= this.p.scale;

			this.p.latigo = this.stage.insert(new Q.Whip({asset: dibujoLatigo, x: this.p.x+desplazamientoX, y:this.p.y+desplazamientoY, angle: valorAngulo}));

		},

		dibujalatigo_haciabajo_saltando_diagonal: function() {

			var desplazamientoX = 0;
			var desplazamientoY = 0;
			var valorAngulo = 45;
			var dibujoLatigo = "";

			if(this.p.latigoMejorado){
				desplazamientoX = 0;
				desplazamientoY = this.p.h+7;
				dibujoLatigo = "whip.png";
			}
			else {
				desplazamientoX = 0;
				desplazamientoY = this.p.h+7;
				dibujoLatigo = "basic_whip.png";
			}

			if(this.p.direction == "left") {
				desplazamientoX *= -1;
				valorAngulo = 135;
			}

			desplazamientoX *= this.p.scale;
			desplazamientoY *= this.p.scale;

			this.p.latigo = this.stage.insert(new Q.Whip({asset: dibujoLatigo, x: this.p.x+desplazamientoX, y:this.p.y+desplazamientoY, angle: valorAngulo}));

		},

		dibujalatigo_haciabajo_saltando: function() {

			var desplazamientoX = 0;
			var desplazamientoY = 0;
			var valorAngulo = 90;
			var dibujoLatigo = "";

			if(this.p.latigoMejorado){
				desplazamientoX = 3;
				desplazamientoY = this.p.h-21;
				dibujoLatigo = "whip.png";
			}
			else {
				desplazamientoX = 5;
				desplazamientoY = this.p.h-20;
				dibujoLatigo = "basic_whip.png";
			}

			if(this.p.direction == "left") {
				desplazamientoX = -3;
			}

			desplazamientoX *= this.p.scale;
			desplazamientoY *= this.p.scale;

			this.p.latigo = this.stage.insert(new Q.Whip({asset: dibujoLatigo, x: this.p.x+desplazamientoX, y:this.p.y+desplazamientoY, angle: valorAngulo}));

		},

		step: function(dt) {

			/*
			if(Q.inputs['right']){
				//this.play("run_right");
			}
			else if(this.p.direction == "right") {
				//this.play("still_right");

			}

			if(Q.inputs['left']){
				//this.play("run_left");
			}
			else if(this.p.direction == "left") {
				//this.play("still_left");
			}
			*/

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
				//Q.inputs['up'] = false;
				//Q.audio.play("jump.mp3");
				/*if(this.p.direction == "right") {
					this.play("jump_right");
				}
				else if(this.p.direction == "left") {
					this.play("jump_left");
				}*/

				//console.log(this.p);
				this.p.saltando = true;

				this.sheet("saltando", true);
				this.p.sprite = "saltando";
				if(this.p.direction == "right") this.play("salta_derecha");
				else if(this.p.direction == "left") this.play("salta_izquierda");
				Q._generateCollisionPoints(this);

			}//saltando


			if(this.p.saltando){
				if(Q.inputs['up'] && Q.inputs['W'] && !Q.inputs['right']  && !Q.inputs['left'] && !this.p.atacando_verticalmente){
					this.p.atacando_verticalmente = true;

					this.sheet("saltando_atacando_haciarriba", true);
					this.p.sprite = "saltando_atacando_haciarriba";
					if(this.p.direction == "right") this.play("saltataca_haciarriba_derecha");
					else if(this.p.direction == "left") this.play("saltataca_haciarriba_izquierda");
					Q._generateCollisionPoints(this);
				}
				else if(Q.inputs['down'] && Q.inputs['W'] && !Q.inputs['right']  && !Q.inputs['left'] && !this.p.atacando_verticalmente && !this.p.atacando_verticalmente_abajo){
					this.p.atacando_verticalmente = true;
					this.p.atacando_verticalmente_abajo = true;

					//console.log("HOLA HOLA HOLA"); aqui se confundia a veces: al querer atacar diagonalmente hacia abajo a la izquierda se pensaba que quería atacar verticalmente hacia abajo (direccion izquierda)

					this.sheet("saltando_atacando_haciabajo", true);
					this.p.sprite = "saltando_atacando_haciabajo";
					if(this.p.direction == "right") this.play("saltataca_haciabajo_derecha");
					else if(this.p.direction == "left") this.play("saltataca_haciabajo_izquierda");
					Q._generateCollisionPoints(this);
				}
				else if(Q.inputs['up'] && Q.inputs['W'] && (Q.inputs['right'] || Q.inputs['left'])  && !this.p.atacando_diagonalmente){
					this.p.atacando_diagonalmente = true;

					this.sheet("saltando_atacando_diagonalarriba", true);
					this.p.sprite = "saltando_atacando_diagonalarriba";
					if(this.p.direction == "right") this.play("saltataca_diagonal_haciarriba_derecha");
					else if(this.p.direction == "left") this.play("saltataca_diagonal_haciarriba_izquierda");
					Q._generateCollisionPoints(this);
				}
				else if(Q.inputs['down'] && Q.inputs['W'] && (Q.inputs['right'] || Q.inputs['left']) && !this.p.atacando_diagonalmente){
					this.p.atacando_diagonalmente = true;
					this.p.atacando_diagonalmente_abajo = true;

					this.sheet("saltando_atacando_diagonalabajo", true);
					this.p.sprite = "saltando_atacando_diagonalabajo";
					if(this.p.direction == "right") this.play("saltataca_diagonal_haciabajo_derecha");
					else if(this.p.direction == "left") this.play("saltataca_diagonal_haciabajo_izquierda");
					Q._generateCollisionPoints(this);
				}

			}



			/*
			if(Q.inputs['up']){

				if(!this.p.agachado && !this.p.andando && this.p.latigoActivado){
					if(this.p.saltando){
						//ya haré esta animacion
					}
					else{
						this.sheet("atacando_haciarriba", true);
						this.p.sprite = "atacando_haciarriba";
						if(this.p.direction == "right") this.play("ataca_haciarriba_derecha");
						else if(this.p.direction == "left") this.play("ataca_haciarriba_izquierda");
						Q._generateCollisionPoints(this);
					}

				}

			}//pulsando arriba
			else{
				//Al soltar arriba, no me interesa interrumpir el ataque vertical


			}
			*/











			if(Q.inputs['down']){

				if(!this.p.agachado && !this.p.atacando_diagonalmente && !this.p.atacando_verticalmente && !this.p.saltando){
					console.log("se agacha");
					this.p.agachado = true;

					this.sheet("agachado", true);
					this.p.sprite = "agachado";
					if(this.p.direction == "right") this.play("pose_agachado_derecha");
					else if(this.p.direction == "left") this.play("pose_agachado_izquierda");

					//this.p.asset = "simon_bajo.png";
					this.p.y += 3;
					//this.size(true);
					//Q._generatePoints(this, true);
					Q._generateCollisionPoints(this);


				}

			}//agachandose
			else{
				if(this.p.agachado == true){
					this.p.agachado = false;
					console.log("desactivo agachado");

					this.sheet("normalito", true);
					this.p.sprite = "normalito";
					if(this.p.direction == "right") this.play("pose_normal_derecha");
					else if(this.p.direction == "left") this.play("pose_normal_izquierda");

					//this.p.asset = "simon_bajo.png";
					this.p.y -= 3;
					//this.size(true);
					//Q._generatePoints(this, true);
					Q._generateCollisionPoints(this);
				}
			}

			/*if(Q.inputs['P'] && !this.p.latigoActivado){
				//console.log("hoooooooola");
				if(this.p.agachado){
					alturaLatigo = this.p.y-9;
				}
				else{
					alturaLatigo = this.p.y-13;
				}

				this.p.asset = null;
				//this.p.sprite = "simon_normal_atacando";
				this.sheet("simon_normal_atacando", true);
				//this.p.sheet = "simon_normal_atacando";
				//this.size(true);
				//Q._generatePoints(this, true);
				Q._generateCollisionPoints(this);
				//this.play("atacando");

				this.p.latigo = this.stage.insert(new Q.Whip({x: this.p.x+41, y:alturaLatigo}));
				this.p.latigoActivado = true;

			}else if (!Q.inputs['P'] && this.p.latigo){
				this.p.latigo.destroy();
				this.p.latigo = null;
				this.p.latigoActivado = false;
			}*/

			/*if(Q.inputs['W']) {
				if(this.p.latigoActivado == true) console.log("LATIGO ACTIVADO");
				else console.log("LATIGO DESACTIVADO");
			}*/
			if(Q.inputs['W'] && !this.p.latigoActivado){

				this.p.latigoActivado = true;
				this.p.posicionAtaque = this.p.x;
				//console.log("recien activado");


				//console.log(this.p.agachado);

				if(this.p.saltando && !this.p.atacando_verticalmente && !this.p.atacando_diagonalmente){
					this.sheet("saltando_atacando", true);
					this.p.sprite = "saltando_atacando";
					if(this.p.direction == "right") this.play("saltataca_derecha");
					else if(this.p.direction == "left") this.play("saltataca_izquierda");
					Q._generateCollisionPoints(this);

					//this.p.latigo.p.x =
				}
				else if(!this.p.saltando && !this.p.agachado){
					//this.p.asset = null;
					//this.p.sprite = "simon_normal_atacando";
					//this.p.asset = null;
					if(!Q.inputs['up']){
						this.sheet("atacando", true);
						this.p.sprite = "atacando";
						if(this.p.direction == "right") this.play("ataca_derecha");
						else if(this.p.direction == "left") this.play("ataca_izquierda");
						Q._generateCollisionPoints(this);
						//this.play("atacando");
					}
					else if(!this.p.atacando_verticalmente && !Q.inputs['right']){
						this.p.atacando_verticalmente = true;
						this.sheet("atacando_haciarriba", true);
						this.p.sprite = "atacando_haciarriba";
						if(this.p.direction == "right") this.play("ataca_haciarriba_derecha");
						else if(this.p.direction == "left") this.play("ataca_haciarriba_izquierda");
						Q._generateCollisionPoints(this);
					}



				}
				else if(this.p.agachado && !this.p.atacando_verticalmente && !this.p.atacando_diagonalmente){

					this.sheet("agachado_atacando", true);
					this.p.sprite = "agachado_atacando";
					if(this.p.direction == "right") this.play("ataca_agachado_derecha");
					else if(this.p.direction == "left") this.play("ataca_agachado_izquierda");

					//console.log(this.sheet());
					Q._generateCollisionPoints(this);
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
					this.sheet("saltando", true);
					this.p.sprite = "saltando";
					if(this.p.direction == "right") this.play("salta_derecha");
					else if(this.p.direction == "left") this.play("salta_izquierda");
					Q._generateCollisionPoints(this);
				}
				else if(!this.p.agachado){
					this.sheet("normalito", true);
					this.p.sprite = "normalito";
					if(this.p.direction == "right") this.play("pose_normal_derecha");
					else if(this.p.direction == "left") this.play("pose_normal_izquierda");
					this.p.y += 3;
				}
				else{
					this.sheet("agachado", true);
					this.p.sprite = "agachado";
					if(this.p.direction == "right") this.play("pose_agachado_derecha");
					else if(this.p.direction == "left") this.play("pose_agachado_izquierda");
				}

				Q._generateCollisionPoints(this);

				//this.play("pose_normal");
			}




			if(Q.inputs['right']){

				//console.log(this.p);


				if(this.p.latigoActivado){
					//if(Q.inputs['up']) console.log("pulsando arriba");
					//else console.log("no pulsando arriba");

					if(!this.p.saltando && !Q.inputs['up']) this.p.x = this.p.posicionAtaque; //para que se quede quieto mientras ataca
					else if(!this.p.saltando && !this.p.atacando_diagonalmente){
						this.p.atacando_diagonalmente = true;
						this.sheet("atacando_diagonal", true);
						this.p.sprite = "atacando_diagonal";
						if(this.p.direction == "right") this.play("ataca_diagonal_derecha");
						else if(this.p.direction == "left") this.play("ataca_diagonal_izquierda");
						Q._generateCollisionPoints(this);
					}
				}
				else{
					this.p.andando = true;

					if(this.p.agachado){
						this.sheet("andando_agachado", true);
						this.p.sprite = "andando_agachado";
						if(this.p.direction == "right") this.play("pose_andando_agachado_derecha");
						else if(this.p.direction == "left") this.play("pose_andando_agachado_izquierda");
						Q._generateCollisionPoints(this);
					}
					else{ //anda normal o salta hacia la derecha

						if(this.p.direction == "left" && this.p.saltando){
							//this.sheet("saltando", true);
							//this.p.sprite = "saltando";
							//if(this.p.direction == "right") this.play("salta_derecha");
							//else if(this.p.direction == "left") this.play("salta_izquierda");
							//Q._generateCollisionPoints(this);
							this.p.direction = "right";
							this.play("salta_derecha");
						}

						if(!this.p.saltando && !this.p.latigoActivado){
							console.log("camina normal hacia la derecha");

							this.sheet("andando_normal", true);
							this.p.sprite = "andando_normal";
							this.play("anda_derecha");
							Q._generateCollisionPoints(this);
						}

					}
				}



			}//pulsando derecha
			else{ //ya no pulsa la derecha
				if(this.p.agachado && !this.p.latigoActivado && this.p.direction == "right"){
					this.p.andando = false;
					this.sheet("agachado", true);
					this.p.sprite = "agachado";
					if(this.p.direction == "right") this.play("pose_agachado_derecha");
					else if(this.p.direction == "left") this.play("pose_agachado_izquierda");
					Q._generateCollisionPoints(this);
				}
				else if(!this.p.agachado && this.p.andando && this.p.direction == "right"){
					this.p.andando = false;
					this.sheet("normalito", true);
					this.p.sprite = "normalito";
					this.play("pose_normal_derecha");
				}

			}



			if(Q.inputs['left']){

				//console.log(this.p);

				if(this.p.latigoActivado){// && !this.p.saltando){


					if(!this.p.saltando && !Q.inputs['up']) this.p.x = this.p.posicionAtaque; //para que se quede quieto mientras ataca
					else if(!this.p.saltando && !this.p.atacando_diagonalmente){
						this.p.atacando_diagonalmente = true;
						this.sheet("atacando_diagonal", true);
						this.p.sprite = "atacando_diagonal";
						if(this.p.direction == "right") this.play("ataca_diagonal_derecha");
						else if(this.p.direction == "left") this.play("ataca_diagonal_izquierda");
						Q._generateCollisionPoints(this);
					}




				}
				else{
					this.p.andando = true;

					if(this.p.agachado){
						this.sheet("andando_agachado", true);
						this.p.sprite = "andando_agachado";
						if(this.p.direction == "right") this.play("pose_andando_agachado_derecha");
						else if(this.p.direction == "left") this.play("pose_andando_agachado_izquierda");
						Q._generateCollisionPoints(this);
					}
					else{

						if(this.p.direction == "right" && this.p.saltando){
							//this.sheet("saltando", true);
							//this.p.sprite = "saltando";
							//if(this.p.direction == "right") this.play("salta_derecha");
							//else if(this.p.direction == "left") this.play("salta_izquierda");
							//Q._generateCollisionPoints(this);
							this.p.direction = "left";
							this.play("salta_izquierda");
						}

						if(!this.p.saltando && !this.p.latigoActivado){
							console.log("camina normal hacia la izquierda");

							this.sheet("andando_normal", true);
							this.p.sprite = "andando_normal";
							this.play("anda_izquierda");
							Q._generateCollisionPoints(this);
						}

					}
				}


			}//pulsando izquierda
			else{ //ya no pulsa la izquierda
				if(this.p.agachado && !this.p.latigoActivado && this.p.direction == "left"){
					this.p.andando = false;
					this.sheet("agachado", true);
					this.p.sprite = "agachado";
					if(this.p.direction == "right") this.play("pose_agachado_derecha");
					else if(this.p.direction == "left") this.play("pose_agachado_izquierda");
					Q._generateCollisionPoints(this);
				}
				else if(!this.p.agachado && this.p.andando && this.p.direction == "left"){
					this.p.andando = false;
					this.sheet("normalito", true);
					this.p.sprite = "normalito";
					this.play("pose_normal_izquierda");
				}


			}








			if(this.p.saltando == true){
				if(this.p.vy == 0){ //si estaba saltando pero vuelve a estar plantado en el suelo
					this.p.saltando = false;
					this.sheet("normalito", true);
					this.p.sprite = "normalito";
					if(this.p.direction == "right") this.play("pose_normal_derecha");
					else if(this.p.direction == "left") this.play("pose_normal_izquierda");
					Q._generateCollisionPoints(this);

					if(this.p.latigo){
						this.p.latigo.destroy();
						this.p.latigoActivado = false;
					}

				}
				else if(this.p.latigo){
					if(!this.p.atacando_verticalmente && !this.p.atacando_diagonalmente){
						var desplazamientoX = 0;
						var desplazamientoY = 0;

						if(this.p.latigoMejorado) {
							desplazamientoX = 45;
							desplazamientoY = -5;
						}
						else {
							desplazamientoX = 37;
							desplazamientoY = -7;
						}

						if(this.p.direction == "left") desplazamientoX *= -1;

						desplazamientoX *= this.p.scale;
						desplazamientoY *= this.p.scale;

						this.p.latigo.p.x = this.p.x+desplazamientoX;
						this.p.latigo.p.y = this.p.y+desplazamientoY;
					}
					else if(this.p.atacando_verticalmente){
						if(!this.p.atacando_verticalmente_abajo){
							if(this.p.latigoMejorado) {

								desplazamientoX = 2;
								desplazamientoY = -this.p.h;
							}
							else {

								desplazamientoX = 2;
								desplazamientoY = -this.p.h+7;
							}

							if(this.p.direction == "left") {
								desplazamientoX = -5;
								//desplazamientoY = -this.p.h+11;
							}

						}
						/*else {
							if(this.p.latigoMejorado) {
								console.log("AQUI AQUI AQUI"); //
								desplazamientoX = 3;
								desplazamientoY = this.p.h-21;
							}
							else {
								desplazamientoX = 5;
								desplazamientoY = this.p.h-20;
							}

							if(this.p.direction == "left") {
								desplazamientoX = -3;
								//desplazamientoY = -this.p.h+11;
							}

						}*/

						else {
							if(!Q.inputs['left']){ //movidas de Quintus por pulsar varias teclas a la vez...es una ñapa pero así evito el error
								if(this.p.latigoMejorado) {
									//console.log("AQUI AQUI AQUI"); //poniendo la comprobacion de left, evito una pequeña confusión del motor por pulsar combinaciones de teclas muy rapido
									desplazamientoX = 3;
									desplazamientoY = this.p.h-21;
								}
								else {
									desplazamientoX = 5;
									desplazamientoY = this.p.h-20;
								}

								if(this.p.direction == "left") {
									desplazamientoX = -3;
									//desplazamientoY = -this.p.h+11;
								}
							}
							else{
								if(this.p.latigoMejorado) {
									desplazamientoX = this.p.w+8;
									desplazamientoY = 35;
								}
								else {
									desplazamientoX = this.p.w+2;
									desplazamientoY = 25;
								}

								if(this.p.direction == "left") {
									desplazamientoX = -this.p.w-2;
									desplazamientoY = 27;
								}
							}


						}

						desplazamientoX *= this.p.scale;
						desplazamientoY *= this.p.scale;

						this.p.latigo.p.x = this.p.x+desplazamientoX;
						this.p.latigo.p.y = this.p.y+desplazamientoY;

					}
					else if(this.p.atacando_diagonalmente){ // if atacando diagonalmente y saltando

						var desplazamientoX = 0;
						var desplazamientoY = 0;
						if(!this.p.atacando_diagonalmente_abajo){
							if(this.p.latigoMejorado) {
								desplazamientoX = this.p.w+8;
								desplazamientoY = -this.p.h+7;
							}
							else {
								desplazamientoX = this.p.w-1;
								desplazamientoY = -this.p.h+11;
							}

							if(this.p.direction == "left") {
								desplazamientoX = -this.p.w-4;
								desplazamientoY = -this.p.h+11;
							}
						}
						else{

							if(this.p.latigoMejorado) {
								desplazamientoX = this.p.w+8;
								desplazamientoY = 35;
							}
							else {
								desplazamientoX = this.p.w+2;
								desplazamientoY = 25;
							}

							if(this.p.direction == "left") {
								desplazamientoX = -this.p.w-2;
								desplazamientoY = 27;
							}

						}

						desplazamientoX *= this.p.scale;
						desplazamientoY *= this.p.scale;

						this.p.latigo.p.x = this.p.x+desplazamientoX;
						this.p.latigo.p.y = this.p.y+desplazamientoY;
					}

				}
			}




			if(this.p["y"] > 444){

				console.log("Tas caio lol");
				Q.stageScene("endGame",2, { label: "You Died", sound: "music_die.ogg" });
				this.destroy();
			}
//
			if((this.p.x >= Q.width/2)&&(this.p.x <= (this.p.AnchoMapa - Q.width/2))){
				this.stage.add("viewport").follow(this,{ x: true, y: false });
				this.stage.viewport.offsetX = 0;
				this.stage.viewport.offsetY = 60;
			}
			if((this.p.x > (this.p.AnchoMapa - Q.width/2))&&(this.p.x < Q.width/2)){
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


				if(collision.obj.isA("Bloopa") || collision.obj.isA("Koopa")) {
					//this.destroy();
					console.log("latigo colisiona con bloopa O koopa");
					collision.obj.destroy();
				}
			});//on

		}/*,//init

		step: function(dt){
			//console.log(this.p);

		}*/

	});//extend Whip


//----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------




}//funcion game
