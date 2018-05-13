Quintus.Bat = function(Q) {
    Q.Sprite.extend("Murcielago",{
        init: function(p) {
            this._super(p, {});
            this.add('2d, aiBounce, animation');
        },
        step: function (dt){}
    });
};