Quintus.CastlevaniaScenes = function (Q) {
    

    Q.scene('inicio',function(stage) {
        Q.state.reset({puntuacion: -1, health: 15});
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
            Q.stageScene('level');
            Q.stageScene("hud",1);
            Q.state.inc("puntuacion",1);
            Q.state.inc("health",1);
        });
        Q.input.on("confirm",stage,function() {
            Q.stageScene('level');
            Q.stageScene("hud",1);
        });
    });

    Q.scene('level', function(stage) {
        console.log(escena);
        const nivel = "nivel" + level + "-scn" + escena + ".tmx";
        Q.stageTMX(nivel, stage);
    });
}