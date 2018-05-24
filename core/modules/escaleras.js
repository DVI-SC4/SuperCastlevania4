Quintus.CastlevaniaEscaleras = function (Q) {
    Q.Sprite.extend("EscaleraArriba", {
        init: function(p) {
            this._super(p, {
                asset: "simon_normal.png",
                w:50,
                h:1,
                gravity:0,
                vecesColisionado: 0,
                type: Q.SPRITE_FRIENDLY
            });
            this.add('2d, aiBounce, animation');
            this.on("bump.left,bump.right, bump.top, bump.bottom",function(collision) {
                
                /* if ( collision.obj.isA("Simon")){
                    console.log(collision.obj.p.x);
                 }*/
                 //console.log("holi");

                if ( collision.obj.isA("Simon") && (((this.p.direccion == "derecha") && Q.inputs['up'] && Q.inputs['right']) || ((this.p.direccion == "izquierda") && Q.inputs['up'] && Q.inputs['left']))) {
                    console.log(collision.obj.p.subiendoEscaleras);
                    if(!collision.obj.p.subiendoEscaleras){
                        collision.obj.p.x = this.p.posicion_inicial;
                        //collision.obj.p.vy = -10;
                        collision.obj.p.subiendoEscaleras = true;
                        collision.obj.p.direccionEscaleras = this.p.direccion;
                        collision.obj.p.subeObaja = "sube";
                        collision.obj.p.derOizq = this.p.direccion;
                        collision.obj.p.collisionMask = Q.SPRITE_FRIENDLY;
                        for(let i=0; i<this.stage.items.length;i++){
                            if(this.stage.items[i].isA("FinEscalera")){
                                this.stage.items[i].p.collisionMask = Q.SPRITE_DEFAULT;
                            }
                        }
                    }
                }
                 if ( collision.obj.isA("Simon") && !(Q.inputs['up']) ){
                    console.log(collision.obj.p.subiendoEscaleras);
                    if(collision.obj.p.subiendoEscaleras){
                       collision.obj.p.subiendoEscaleras = false;
                        collision.obj.p.collisionMask = Q.SPRITE_DEFAULT;
                        collision.obj.p.subeObaja == " ";
                        console.log("ADSGASGASG"); 
                    }
                }
            });
        },
        step: function (dt){}
    });

     Q.Sprite.extend("EscaleraAbajo", {
        init: function(p) {
            this._super(p, {
               /* asset: "simon_normal.png",*/
                w:10,
                h:1,
                gravity:0,
                type: Q.SPRITE_FRIENDLY
            });
           // console.log(this.p.x);
            this.add('2d, aiBounce, animation');
            this.on("bump.left,bump.right, bump.top, bump.bottom",function(collision) {
                
                if ( collision.obj.isA("Simon") && (((this.p.direccion == "derecha") && Q.inputs['down'] && Q.inputs['right']) || ((this.p.direccion == "izquierda") && Q.inputs['down'] && Q.inputs['left']))) {
                   //console.log("HOLI);");
                    if(!collision.obj.p.subiendoEscaleras){
                        collision.obj.p.x = this.p.posicion_inicial;
                        collision.obj.p.subiendoEscaleras = true;
                        collision.obj.p.direccionEscaleras = this.p.direccion;
                        collision.obj.p.subeObaja = "baja";
                        collision.obj.p.derOizq = this.p.direccion;
                        collision.obj.p.collisionMask = Q.SPRITE_FRIENDLY;
                        for(let i=0; i<this.stage.items.length;i++){
                            if(this.stage.items[i].isA("FinEscalera")){
                                this.stage.items[i].p.collisionMask = Q.SPRITE_DEFAULT;
                            }
                        }
                    }else{
                        this.p.collisionMask = Q.SPRITE_NONE;
                        collision.obj.p.subiendoEscaleras = false;
                        collision.obj.p.collisionMask = Q.SPRITE_DEFAULT;
                        collision.obj.p.subeObaja == " ";
                    }
                }
            });
        },
        step: function (dt){}
    });

    Q.Sprite.extend("FinEscalera", {
        init: function(p) {
            this._super(p, {
                asset: "simon_normal.png",
                w:10,
                h:10,
                gravity:0,
                sensor: true,
                type: Q.SPRITE_FRIENDLY
            });
            //console.log(this.p.y);
            this.add('2d, aiBounce, animation');
            this.on("bump.left,bump.right, bump.top, bump.bottom",function(collision) {
                 if ( collision.obj.isA("Simon")){
                    
                    this.p.collisionMask = Q.SPRITE_NONE;
                    collision.obj.p.subiendoEscaleras = false;
                    collision.obj.p.collisionMask = Q.SPRITE_DEFAULT;
                    if(collision.obj.p.subeObaja == "sube"){
                       collision.obj.p.y = this.p.posicionFin; 
                    }
                    collision.obj.p.subeObaja == " ";
                    
                }
                
            });
        },
        step: function (dt){}
    });
 }