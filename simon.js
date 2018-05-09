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
								x: 60,//55,
								y: 10,
								gravity: 0.7,
								latigo: null,
								latigoMejorado: false,
								latigoActivado: false,
								agachado: false,
								saltando: false,
								andando: false,
								atacando_verticalmente: false,
								atacando_verticalmente_abajo: false,
								atacando_diagonalmente: false,
								atacando_diagonalmente_abajo: false,
								scale: 2.0
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
			//console.log(this.p.x);
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

						this.p.latigo.p.x = this.p.x+desplazamientoX;
						this.p.latigo.p.y = this.p.y+desplazamientoY;
					}
					
				}
			}




			if(this.p["y"] > 444){
				
				console.log("Tas caio lol");
				//Q.stageScene("endGame",2, { label: "You Died", sound: "music_die.ogg" }); 
				this.destroy();
			}
			//console.log(this);
			if(this.p.x >= Q.width/2){
				//console.log(this.stage);
				this.stage.add("viewport").follow(this,{ x: true, y: false });
				this.stage.viewport.offsetX = 0;
				this.stage.viewport.offsetY = 60;
				//console.log(this.stage);
			}

		}//step

	});//extend Simon




