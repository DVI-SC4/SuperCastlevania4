Quintus.CastlevaniaControls = function (Q) {
    Q.Sprite.extend("ilustracionControl", {
        init: function(p) {
            this._super(p, {
                gravity:0,
                opacity: 1
            });

        },
        step: function (dt){}
    });

    Q.scene('controles',function(stage) {

        //console.log("estas en el tutorial de controles");
        Q.audio.play("controls.ogg",{loop:true});

        stage.insert(new Q.ilustracionControl({asset: "controls/controls.png", x:292, y:224}));
        stage.insert(new Q.ilustracionControl({asset: "controls/menu_press_enter.png", x:292, y:410, scale:0.4}));


        Q.input.on("confirm",stage,function() { //pulsamos enter volver a menu
            Q.audio.stop("controls.ogg");
            Q.clearStages();
            Q.stageScene('menuPrincipal');
        });
    });
}