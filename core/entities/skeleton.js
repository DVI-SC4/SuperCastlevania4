Quintus.Skeleton = function(Q) {
    Q.Sprite.extend("Esqueleto",{
        init: function(p) {
            this._super(p, {});
            this.add('2d, aiBounce, animation');
        },
        step: function (dt){}
    });
};