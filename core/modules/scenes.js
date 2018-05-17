Quintus.CastlevaniaScenes = function (Q) {
    let level = 1;
    let escena = 2;
    let MAX_ESCENA = 2;

    Q.scene('inicio',function(stage) {
        Q.state.reset({ monedasRecogidas: 0, lives: 3, puntuacion: 0});
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

    Q.scene('level', function(stage) {
        const nivel = "nivel" + level + "-scn" + escena + ".tmx";
        Q.stageTMX(nivel, stage);
    });
}