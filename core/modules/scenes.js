Quintus.CastlevaniaScenes = function (Q) {
  Q.load('end_title.png, escena1.ogg, escena2.ogg, escena3.ogg, escena4.ogg', function () {
        
  });  
    //Escena inicial
    Q.scene('inicio',function(stage) {
        Q.state.reset({puntuacion: -1, health: 15, enemylife: 15, vidas: 3});
        const container = stage.insert(new Q.UI.Container({
            x: Q.width / 2,
            y: Q.height / 2,
            fill: "rgba(0,0,0,0.5)"
        }));
        const button = container.insert(new Q.UI.Button({
            x: 0,
            y: 0,
            h: Q.height,
            w: Q.width,
            asset: "intro/mainTitle.jpg",
        }));
        button.on("click",function() {
            Q.stageScene('introLogos');
        });
        Q.input.on("confirm",stage,function() {
            Q.stageScene('introLogos');
        });
    });

    //Escena que carga el TMX en funcion de la variable escena y level
    Q.scene('level', function(stage) {
        const nivel = "nivel" + level + "-scn" + escena + ".tmx";
        Q.audio.stop();
        Q.audio.play('escena' + escena + '.ogg');
        Q.stageTMX(nivel, stage);
    });

    //Escena del final, carga la pantalla de GameOver o YouWin dependiendo de quien la llama
    Q.scene('GameOver',function(stage) {
        escena=1;
        level=1;
        Q.state.reset({puntuacion: -1, health: 15, enemylife: 15, vidas: 3});
        const container = stage.insert(new Q.UI.Container({
            x: Q.width / 2,
            y: Q.height / 2,
            fill: "rgba(0,0,0,0.5)"
        }));
        const button = container.insert(new Q.UI.Button({
            x: 0,
            y: 0,
            h: Q.height,
            w: Q.width,
            asset: stage.options.label,
        }));
        button.on("click",function() {
            Q.stageScene('level');
            Q.stageScene("hud",1);
            Q.state.inc("puntuacion",1);
            Q.state.inc("health",1);
            Q.state.inc("vidas",1);
            Q.state.inc("enemylife",1);
        });
        Q.input.on("confirm",stage,function() {
            Q.stageScene('level');
            Q.stageScene("hud",1);
            Q.state.inc("puntuacion",1);
            Q.state.inc("health",1);
            Q.state.inc("vidas",1);
            Q.state.inc("enemylife",1);
        });
    });
}