Quintus.Simon = function(Q) {
    Q.load({
        'normal_whip': 'normal_whip.ogg'
    });
    var vX = 0;
    var vY = 0;
    Q.Sprite.extend("Simon", {
        //holiSOLUCIONAR QUE SI DEJO PULSADO LATIGO MIENTRAS ATACO DE PIE, NO PUEDA SALTAR NI AGACHARSE HASTA QUE LO SUELTE.
        //Y MIENTRAS PULSO LATIGO AGACHADO, QUE NO PUEDA PONERSE EN PIE NI SALTAR HASTA QUE LO SUELTE
        //Y MIENTRAS ATACO HACIA ARRIBA, QUE TAMPOCO PUEDA HACER NADA MAS HASTA SOLTAR EL LATIGO
        //EN GENERAL, HAY QUE CAPARLE ALGUNOS MOVIMIENTOS MIENTRAS HACE LOS DIFERENTES TIPOS DE ATAQUE


        init: function (p) {
            this._super(p, {
                    sheet: "normalito",
                    sprite: "normalito",
                    gravity: 0.6,
                    scale: 2,
                    latigo: null,
                    latigoMejorado: false,
                    latigoActivado: false,
                    agachado: false,
                    en_aire: false,
                    andando: false,
                    inmune: false,
                    temporizadorInmune: 0,
                    andando_agachado: false,
                    listoAtacarDenuevo: true,
                    atacando_agachado: false,
                    atacando_verticalmente: false,
                    atacando_verticalmente_abajo: false,
                    atacando_diagonalmente: false,
                    atacando_diagonalmente_abajo: false,
                    subiendoEscaleras: false,
                    direccionEscaleras: " ",
                    subeObaja: " ",
                    derOizq: " "
                }
            );
            this.add('2d, platformerControls, animation');
        
            this.on("showwhip", this, "dibujalatigo_depie");
            this.on("showwhip_ducked", this, "dibujalatigo_agachado");
            this.on("showwhip_jumping", this, "dibujalatigo_saltando");
            this.on("showwhip_upwards", this, "dibujalatigo_haciarriba");
            this.on("showwhip_diagonal", this, "dibujalatigo_diagonal");
            this.on("showwhip_upwards_jumping", this, "dibujalatigo_haciarriba_saltando");
            this.on("showwhip_upwards_jumping_diagonal", this, "dibujalatigo_haciarriba_saltando_diagonal");
            this.on("showwhip_downwards_jumping_diagonal", this, "dibujalatigo_haciabajo_saltando_diagonal");
            this.on("showwhip_downwards_jumping", this, "dibujalatigo_haciabajo_saltando");
        },

        cambiaSprite: function (nombreSprite, nombreAnimacionDerecha, nombreAnimacionIzquierda) {

            if(nombreSprite === "normalito" || nombreSprite === "agachado") {
                this.p.y += 6;
            }

            this.sheet(nombreSprite, true);
            this.p.sprite = nombreSprite;
            if (this.p.direction === "right") this.play(nombreAnimacionDerecha);
            else if (this.p.direction === "left") this.play(nombreAnimacionIzquierda);
            Q._generateCollisionPoints(this);
        },

        gestionaAparicionLatigo: function (valorAngulo, valorAnguloIzq, despXmejorado, despYmejorado, despXizq, despYizq, despX, despY, despXmejoradoIzq, despYmejoradoIzq, creandolo) {
            let valorFlip = "";
            let dibujoLatigo = "";
            if (this.p.latigoMejorado) {
                dibujoLatigo = "whip.png";
            } else {
                dibujoLatigo = "basic_whip.png";
            }
            if (this.p.direction === "right") {
                if (this.p.latigoMejorado) {
                    desplazamientoX = despXmejorado;
                    desplazamientoY = despYmejorado;
                }
                else {
                    desplazamientoX = despX;
                    desplazamientoY = despY;
                }
                valorAngulo = valorAngulo;
            }
            else if (this.p.direction === "left") {
                valorFlip = "x";

                if (this.p.latigoMejorado) {
                    desplazamientoX = despXmejoradoIzq;
                    desplazamientoY = despYmejoradoIzq;
                }
                else {
                    desplazamientoX = despXizq;
                    desplazamientoY = despYizq;
                }

                valorAngulo = valorAnguloIzq;
            }

            desplazamientoX *= this.p.scale;
            desplazamientoY *= this.p.scale;

            if (creandolo) {
                this.p.latigo = this.stage.insert(new Q.Whip({
                    asset: dibujoLatigo,
                    x: this.p.x + desplazamientoX,
                    y: this.p.y + desplazamientoY,
                    angle: valorAngulo,
                    flip: valorFlip
                }));
                Q.audio.play('normal_whip');
                this.p.latigo.horaDeDesaparicion = (new Date().getTime()/1000)+0.15; //coge la hora actual, en segundos, y le digo que debe desaparecer 0.15 segundos después de aparecer

            }
            else {
                this.p.latigo.p.x = this.p.x + desplazamientoX;
                this.p.latigo.p.y = this.p.y + desplazamientoY;
            }
        },//gestionaAparicionLatigo

        dibujalatigo_depie: function () {
            this.gestionaAparicionLatigo(null, null, 46, -8, -40, -9, 40, -9, -46, -8, true);
        },
        dibujalatigo_agachado: function () {
            this.gestionaAparicionLatigo(null, null, 48, 0, -40, -1, 40, -1, -48, 0, true);
        },
        dibujalatigo_saltando: function () {
            this.gestionaAparicionLatigo(null, null, 45, 0, -37, -7, 37, -7, -45, 0, true);
        },
        dibujalatigo_haciarriba: function () {
            this.gestionaAparicionLatigo(-90, 90, 2, -this.p.h, -3, -this.p.h + 7, 2, -this.p.h + 7, -5, -this.p.h, true);
        },
        dibujalatigo_diagonal: function () {
            this.gestionaAparicionLatigo(-45, 45, this.p.w + 3, -this.p.h + 7, -this.p.w + 1, -this.p.h + 11, this.p.w - 3, -this.p.h + 11, -this.p.w - 4, -this.p.h + 8, true);
        },
        dibujalatigo_haciarriba_saltando: function () {
            this.gestionaAparicionLatigo(-90, 90, 2, -this.p.h, -5, -this.p.h + 7, 2, -this.p.h + 7, -5, -this.p.h, true);
        },
        dibujalatigo_haciarriba_saltando_diagonal: function () {
            this.gestionaAparicionLatigo(-45, 45, this.p.w + 9, -this.p.h + 9, -this.p.w - 4, -this.p.h + 7, this.p.w - 1, -this.p.h + 11, -this.p.w - 4, -this.p.h + 7, true);
        },
        dibujalatigo_haciabajo_saltando_diagonal: function () {
            this.gestionaAparicionLatigo(45, -45, 0, this.p.h + 7, 0, this.p.h + 7, 0, this.p.h + 7, 0, this.p.h + 7, true);
        },
        dibujalatigo_haciabajo_saltando: function () {
            this.gestionaAparicionLatigo(90, -90, 3, this.p.h - 21, -3, this.p.h - 20, 5, this.p.h - 20, -3, this.p.h - 21, true);
        },
        actuaIzq: function () {
            if (Q.inputs['left']) {
                if (this.p.latigoActivado) {
                    if ((!this.p.en_aire && this.p.atacando_diagonalmente) || this.p.atacando_agachado) this.p.x = this.p.posicionAtaque; //para que se quede quieto mientras ataca
                    else if (!this.p.en_aire && !this.p.atacando_diagonalmente) {
                        this.p.atacando_diagonalmente = true;
                        this.cambiaSprite("atacando_diagonal", "ataca_diagonal_derecha", "ataca_diagonal_izquierda");
                    }
                }
                else {
                    //this.p.andando = true;

                    if (this.p.agachado && !this.p.andando_agachado && this.p.direction == "left") {
                        this.p.andando = true;
                        this.p.andando_agachado = true;
                        this.cambiaSprite("andando_agachado", "pose_andando_agachado_derecha", "pose_andando_agachado_izquierda");
                    }
                    if(!this.p.agachado) {
                        if (this.p.direction === "right" && this.p.en_aire) {
                            this.p.direction = "left";
                            this.play("salta_izquierda");
                        }
                        if (!this.p.en_aire && !this.p.latigoActivado && !this.p.atacando_diagonalmente) {
                            this.p.andando = true;
                            this.p.andando_agachado = false;
                            this.cambiaSprite("andando_normal", "anda_izquierda", "anda_izquierda");
                        }
                    }
                }
            }//pulsando izquierda
            else { //ya no pulsa la izquierda

                if (this.p.agachado && !this.p.latigoActivado && this.p.direction == "left" && !this.p.atacando_agachado && this.p.andando) {
                    this.p.andando = false;
                    this.p.andando_agachado = false;
                    this.cambiaSprite("agachado", "pose_agachado_derecha", "pose_agachado_izquierda");
                }
                else if (!this.p.agachado && this.p.andando && this.p.direction == "left") {
                    this.p.andando = false;
                    this.p.andando_agachado = false;
                    this.cambiaSprite("normalito", "pose_normal_izquierda", "pose_normal_izquierda");
                }
            }
        },//actuaIzq

        actuaDer: function () {
            if (Q.inputs['right']) {

                //console.log(this.p);


                if (this.p.latigoActivado) {
                    //if(Q.inputs['up']) console.log("pulsando arriba");
                    //else console.log("no pulsando arriba");

                    if ((!this.p.en_aire && this.p.atacando_diagonalmente) || this.p.atacando_agachado) this.p.x = this.p.posicionAtaque; //para que se quede quieto mientras ataca
                    else if (!this.p.en_aire && !this.p.atacando_diagonalmente) {

                        this.p.atacando_diagonalmente = true;
                        this.cambiaSprite("atacando_diagonal", "ataca_diagonal_derecha", "ataca_diagonal_izquierda");
                    }
                }
                else {

                    if (this.p.agachado && !this.p.andando_agachado && this.p.direction == "right") {
                        this.p.andando = true;
                        this.p.andando_agachado = true;
                        this.cambiaSprite("andando_agachado", "pose_andando_agachado_derecha", "pose_andando_agachado_izquierda");
                    }
                    if(!this.p.agachado) { //anda normal o salta hacia la derecha

                        if (this.p.direction == "left" && this.p.en_aire) {

                            this.p.direction = "right";
                            this.play("salta_derecha"); //esto es para cambiar de direccion durante el salto, lo mismo pasa en actuaIzq
                        }

                        if (!this.p.en_aire && !this.p.latigoActivado && !this.p.atacando_diagonalmente) {
                            this.p.andando = true;
                            this.p.andando_agachado = false;
                            this.cambiaSprite("andando_normal", "anda_derecha", "anda_derecha");
                        }

                    }
                }


            }//pulsando derecha
            else { //ya no pulsa la derecha



                if (this.p.agachado && !this.p.latigoActivado && this.p.direction == "right" && !this.p.atacando_agachado && this.p.andando) {

                    this.p.andando = false;
                    this.p.andando_agachado = false;
                    this.cambiaSprite("agachado", "pose_agachado_derecha", "pose_agachado_izquierda");
                }
                else if (!this.p.agachado && this.p.andando && this.p.direction == "right") {

                    this.p.andando = false;
                    this.p.andando_agachado = false;
                    this.cambiaSprite("normalito", "pose_normal_derecha", "pose_normal_derecha");
                }

            }
        },//actuaDer

        controlaEnAire: function(){
            if(!this.p.latigo && !this.p.latigoActivado && this.p.vy >= 70 && !Q.inputs['down'] &&  !this.p.atacando_verticalmente && !this.p.en_aire){ //no está saltando como tal pero se ha dejado caer desde una altura
                //console.log("hola");
                this.cambiaSprite("saltando", "salta_derecha", "salta_izquierda");
                //console.log(this.p.vy);
                this.p.en_aire = true;
            }


            if (this.p.en_aire == true) {

                if (this.p.vy == 0) { //si estaba saltando pero vuelve a estar plantado en el suelo

                    this.p.en_aire = false;
                    this.cambiaSprite("normalito", "pose_normal_derecha", "pose_normal_izquierda");

                    if (this.p.latigo) {
                        this.p.latigo.destroy();
                        this.p.latigoActivado = false;
                    }

                }
                else if (this.p.latigo) { //esta en el aire y con el latigo presente
                    if (!this.p.atacando_verticalmente && !this.p.atacando_diagonalmente) {

                        this.gestionaAparicionLatigo(null, null, 45, -5, -37, -7, 37, -7, -45, 0, false);
                        //this.gestionaAparicionLatigo(valorAngulo, valorAnguloIzq, despXmejorado, despYmejorado, despXizq, despYizq, despX, despY, despXmejoradoIzq, despYmejoradoIzq);
                    }
                    else if (this.p.atacando_verticalmente) {
                        if (!this.p.atacando_verticalmente_abajo) {

                            this.gestionaAparicionLatigo(null, null, 2, -this.p.h, -3, -this.p.h + 7, 2, -this.p.h + 7, -7, -this.p.h, false);
                            //this.gestionaAparicionLatigo(valorAngulo, valorAnguloIzq, despXmejorado, despYmejorado, despXizq, despYizq, despX, despY, despXmejoradoIzq, despYmejoradoIzq);
                        }
                        else {
                            if (!Q.inputs['left']) { //movidas de Quintus por pulsar varias teclas a la vez...es una ñapa pero así evito el error

                                this.gestionaAparicionLatigo(null, null, 3, this.p.h - 21, -3, this.p.h - 20, 5, this.p.h - 20, -3, this.p.h - 21, false);
                                //this.gestionaAparicionLatigo(valorAngulo, valorAnguloIzq, despXmejorado, despYmejorado, despXizq, despYizq, despX, despY, despXmejoradoIzq, despYmejoradoIzq);
                            }
                            else {

                                this.gestionaAparicionLatigo(null, null, this.p.w + 8, 35, -this.p.w - 2, 27, this.p.w + 2, 25, -this.p.w - 2, 27, false);
                                //this.gestionaAparicionLatigo(valorAngulo, valorAnguloIzq, despXmejorado, despYmejorado, despXizq, despYizq, despX, despY, despXmejoradoIzq, despYmejoradoIzq);
                            }

                        }

                    }
                    else if (this.p.atacando_diagonalmente) { // if atacando diagonalmente y saltando

                        if (!this.p.atacando_diagonalmente_abajo) {

                            this.gestionaAparicionLatigo(null, null, this.p.w + 8, -this.p.h + 7, -this.p.w - 4, -this.p.h + 11, this.p.w - 1, -this.p.h + 11, -this.p.w - 4, -this.p.h + 11, false);
                            //this.gestionaAparicionLatigo(valorAngulo, valorAnguloIzq, despXmejorado, despYmejorado, despXizq, despYizq, despX, despY, despXmejoradoIzq, despYmejoradoIzq);
                        }
                        else {

                            this.gestionaAparicionLatigo(null, null, this.p.w + 8, 35, -this.p.w - 2, 27, this.p.w + 2, 25, -this.p.w - 2, 27, false);
                            //this.gestionaAparicionLatigo(valorAngulo, valorAnguloIzq, despXmejorado, despYmejorado, despXizq, despYizq, despX, despY, despXmejoradoIzq, despYmejoradoIzq);

                        }

                    }

                }

            }//if está en el aire
        },

        actuaAbajo: function(){
            if (Q.inputs['down'] && !this.p.subiendoEscaleras) {

                if (!this.p.agachado && !this.p.atacando_diagonalmente && !this.p.atacando_verticalmente && !this.p.en_aire) {

                    this.p.agachado = true;
                    //console.log("entra");
                    this.cambiaSprite("agachado", "pose_agachado_derecha", "pose_agachado_izquierda");
                }

            }//agachandose
            else {
                if (this.p.agachado == true) {

                    this.p.agachado = false;
                    this.cambiaSprite("normalito", "pose_normal_derecha", "pose_normal_izquierda");
                }
            }
        },

        gestionaViewport: function(){
            if ((this.p.x >= Q.width / 2) && (this.p.x <= (this.p.AnchoMapa - Q.width / 2))) {
                this.stage.add("viewport").follow(this, {x: true, y: false});
                this.stage.viewport.offsetX = 0;
                this.stage.viewport.offsetY = 60;
            }
            if ((this.p.x > (this.p.AnchoMapa - Q.width / 2)) || (this.p.x < Q.width / 2)) {
                this.stage.add("viewport").unfollow();
            }
        },

        compruebaCaida: function(){
            if (this.p["y"] > 444) {

                console.log("Tas caio lol");
                if(Q.state.get("vidas") > 0){ 
                    Q.state.dec("vidas",1);
                    Q.clearStages();
                    let salud = Q.state.get("health");
                    Q.state.dec("health",salud);
                    Q.stageScene('level');
                    Q.stageScene("hud",1);
                    Q.state.inc("health",16);
                    Q.state.inc("puntuacion",1);
                    Q.state.dec("puntuacion",1);
                }else{
                    Q.clearStages();
                    Q.stageScene('GameOver', {label: "end_title.png"});
                }
                this.destroy();
            }
        },

        subeEscalera: function(){
            
            if(this.p.subiendoEscaleras){
                this.del('platformerControls');
                if((this.p.derOizq == "derecha") && (Q.inputs['right']) && !(Q.inputs['left']) && this.p.subeObaja == "sube" ){
                    vY = -100;
                    vX = 100;
                    this.p.direction = "right";
                }else if((this.p.derOizq == "derecha") && !(Q.inputs['right']) && (Q.inputs['left']) && this.p.subeObaja == "sube" ){
                    vY = 100;
                    vX = -100;
                    this.p.direction = "left";
                } else if((this.p.derOizq == "izquierda") && (Q.inputs['right']) && !(Q.inputs['left']) && this.p.subeObaja == "sube" ){
                    vY = 100;
                    vX = 100;
                    this.p.direction = "right";
                }else if((this.p.derOizq == "izquierda") && !(Q.inputs['right']) && (Q.inputs['left']) && this.p.subeObaja == "sube" ){
                    vY = -100;
                    vX = -100;
                    this.p.direction = "left";
                }else if((this.p.derOizq == "derecha") && (Q.inputs['right']) && !(Q.inputs['left']) && this.p.subeObaja == "baja" ){
                    vY = 100;
                    vX = 100;
                    this.p.direction = "right";
                }else if((this.p.derOizq == "derecha") && !(Q.inputs['right']) && (Q.inputs['left']) && this.p.subeObaja == "baja" ){
                    vY = -100;
                    vX = -100;
                    this.p.direction = "left";
                } else if((this.p.derOizq == "izquierda") && (Q.inputs['right']) && !(Q.inputs['left']) && this.p.subeObaja == "baja" ){
                    vY = -100;
                    vX = 100;
                    this.p.direction = "right";
                }else if((this.p.derOizq == "izquierda") && !(Q.inputs['right']) && (Q.inputs['left']) && this.p.subeObaja == "baja" ){
                    vY = 100;
                    vX = -100;
                    this.p.direction = "left";
                }
            }else{
                this.add('platformerControls');
            }
            
            if (this.p.subiendoEscaleras && !this.p.latigoActivado && ((Q.inputs['right']) || (Q.inputs['left']))) {
                if(vY < 0){
                    this.p.vy = vY;
                    this.p.vx = vX;
                    this.p.gravity = 0;
                    this.cambiaSprite("subiendo_escaleras", "sube_escaleras_haciaderecha", "sube_escaleras_haciaizquierda");
                }
                if(vY > 0){
                    this.p.vy = vY;
                    this.p.vx = vX;
                    this.p.gravity = 0;
                    this.cambiaSprite("bajando_escaleras", "baja_escaleras_haciaderecha", "baja_escaleras_haciaizquierda");
                }
                
            }
            if(this.p.subiendoEscaleras && !this.p.latigoActivado && !Q.inputs['right'] && !Q.inputs['left'] ){
                this.p.vy = 0;
                this.p.vx = 0;
                if(vY < 0){
                    this.cambiaSprite("subiendo_escaleras", "sube_escaleras_parado_haciaderecha", "sube_escaleras_parado_haciaizquierda");
                }
                if(vY > 0){
                    this.cambiaSprite("bajando_escaleras", "baja_escaleras_parado_haciaderecha", "baja_escaleras_parado_haciaizquierda");
                }
                 
            }
        },

        step: function (dt) {

            
            if(this.p.en_aire && this.p.vy >= 0 && !this.p.subiendoEscaleras) 
                this.p.gravity = 0.6;

            //compruebo con cada step que todo esté consistente
            if (!this.p.latigo) this.p.latigoActivado = false;
            if (!Q.inputs['Q'] && !Q.inputs['W'] && !this.p.en_aire && !Q.inputs['right'] && !Q.inputs['up'] && !Q.inputs['down'] && !Q.inputs['left'] && !this.p.subiendoEscaleras) {
                this.p.latigoActivado = false;
                this.p.andando_agachado = false;
                this.p.atacando_agachado = false;
                this.p.atacando_verticalmente = false;
                this.p.atacando_verticalmente_abajo = false;
                this.p.atacando_diagonalmente = false;
                this.p.atacando_haciarriba = false;
                this.p.atacando_diagonalmente_abajo = false;
                this.p.gravity = 0.6;
            }


            if (Q.inputs['Q'] && !this.p.en_aire && !this.p.agachado && !this.p.subiendoEscaleras) {

                this.p.en_aire = true;
                this.cambiaSprite("saltando", "salta_derecha", "salta_izquierda");

            }//saltando


            if (this.p.en_aire && this.p.listoAtacarDenuevo) {
                if (Q.inputs['up'] && Q.inputs['W'] && !Q.inputs['right'] && !Q.inputs['left'] && !this.p.atacando_verticalmente) {

                    this.p.atacando_verticalmente = true;
                    this.cambiaSprite("saltando_atacando_haciarriba", "saltataca_haciarriba_derecha", "saltataca_haciarriba_izquierda");
                }
                else if (Q.inputs['down'] && Q.inputs['W'] && !Q.inputs['right'] && !Q.inputs['left'] && !this.p.atacando_verticalmente && !this.p.atacando_verticalmente_abajo) {

                    this.p.atacando_verticalmente = true;
                    this.p.atacando_verticalmente_abajo = true;

                    //console.log("HOLA HOLA HOLA"); aqui se confundia a veces: al querer atacar diagonalmente hacia abajo a la izquierda se pensaba que quería atacar verticalmente hacia abajo (direccion izquierda)
                    this.cambiaSprite("saltando_atacando_haciabajo", "saltataca_haciabajo_derecha", "saltataca_haciabajo_izquierda");
                }
                else if (Q.inputs['up'] && Q.inputs['W'] && (Q.inputs['right'] || Q.inputs['left']) && !this.p.atacando_diagonalmente) {

                    this.p.atacando_diagonalmente = true;
                    this.cambiaSprite("saltando_atacando_diagonalarriba", "saltataca_diagonal_haciarriba_derecha", "saltataca_diagonal_haciarriba_izquierda");
                }
                else if (Q.inputs['down'] && Q.inputs['W'] && (Q.inputs['right'] || Q.inputs['left']) && !this.p.atacando_diagonalmente) {

                    this.p.atacando_diagonalmente = true;
                    this.p.atacando_diagonalmente_abajo = true;
                    this.cambiaSprite("saltando_atacando_diagonalabajo", "saltataca_diagonal_haciabajo_derecha", "saltataca_diagonal_haciabajo_izquierda");
                }

            }

            
            this.actuaAbajo();

            if (Q.inputs['W'] && !this.p.latigoActivado && this.p.listoAtacarDenuevo) {

                this.p.latigoActivado = true;
                this.p.posicionAtaque = this.p.x;


                if (this.p.en_aire && !this.p.atacando_verticalmente && !this.p.atacando_diagonalmente) {

                    this.cambiaSprite("saltando_atacando", "saltataca_derecha", "saltataca_izquierda");
                }
                else if (!this.p.en_aire && !this.p.agachado) {

                    if (!Q.inputs['up']) {
                        this.p.andando = false;
                        this.cambiaSprite("atacando", "ataca_derecha", "ataca_izquierda");
                    }
                    else if (!this.p.atacando_verticalmente && !Q.inputs['right']) {

                        this.p.atacando_verticalmente = true;
                        this.cambiaSprite("atacando_haciarriba", "ataca_haciarriba_derecha", "ataca_haciarriba_izquierda");
                    }
                }
                else if (this.p.agachado && !this.p.atacando_verticalmente && !this.p.atacando_diagonalmente) {

                    this.p.atacando_agachado = true;
                    this.p.andando_agachado = false;
                    this.cambiaSprite("agachado_atacando", "ataca_agachado_derecha", "ataca_agachado_izquierda");
                }

            }//activando el latigo

            //if (!Q.inputs['W']){// && this.p.latigo) { //no se pulsa  W y si sigue el latigo presente

            //VIGILAR, PORQUE EL LATIGO SE CREA AL TERMINAR LA ANIMACION DE ATAQUE,
            //SI PULSAMOS Y SOLTAMOS W MUY RAPIDO, LA ANIMACION NO TERMINA Y P.LATIGO NO APUNTA A NADA

            if(this.p.latigo){
                var horaActual = new Date().getTime()/1000;

                if(horaActual >= this.p.latigo.horaDeDesaparicion){
                    this.p.latigo.destroy();

                    this.p.latigo = null;
                    this.p.latigoActivado = false;
                    this.p.posicionAtaque = null;
                    this.p.atacando_agachado = false;
                    this.p.atacando_verticalmente = false;
                    this.p.atacando_verticalmente_abajo = false;
                    this.p.atacando_diagonalmente = false;
                    this.p.atacando_diagonalmente_abajo = false;
                    //console.log("has soltado W " + this.p.latigoActivado);

                    this.p.listoAtacarDenuevo = false;
                    if (this.p.en_aire == true) {

                        this.cambiaSprite("saltando", "salta_derecha", "salta_izquierda");
                    }
                    else if (!this.p.agachado) {

                        this.cambiaSprite("normalito", "pose_normal_derecha", "pose_normal_izquierda");
                    }
                    else {

                        this.cambiaSprite("agachado", "pose_agachado_derecha", "pose_agachado_izquierda");
                    }
                }
            }

            if(!Q.inputs['W'] && !this.p.en_aire) {
                this.p.listoAtacarDenuevo = true;
                //console.log("ya puedes");
            }

            //}

            this.subeEscalera();
            if(!this.p.subiendoEscaleras){
               this.actuaDer();
               this.actuaIzq();
               this.controlaEnAire();
               this.compruebaCaida(); 
            }
            
            
            this.gestionaViewport();
            if (this.p.inmune) {
              this.p.temporizadorInmune++;
              this.p.opacity = 0.5;
              if (this.p.temporizadorInmune >50) {
                this.p.inmune = false;
                this.p.opacity = 1;
              }
            }

        }//step

    });//extend Simon

    //---------------------------------------------------------------------------------------------------------------------------

    Q.Sprite.extend("Whip", {

        init: function (p) {

            console.log("Estamos creando una instancia de Whip");

            this._super(p, {
                    asset: "basic_whip.png", //por defecto el personaje siempre empieza con el latigo basico, y éste se actualiza al recoger la mejora. Si el personaje pierde una vida, el latigo vuelve a ser basico
                    x: 100,
                    y: 528,
                    yaColisionada: false,
                    scale: 2,
                    gravity: 0,
                    horaDeDesaparicion: null,
                    sensor: true,
                    collisionMask: Q.SPRITE_NONE,
                    damage_hits: null //con el latigo basico hará falta dar el doble de golpes que con el mejorado, pues es menos potente.
                }
            ); //_super

            this.add('2d');
            this.on("bump.top,bump.left,bump.right,bump.bottom", function (collision) {

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
};