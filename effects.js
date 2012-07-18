
function effects_init() {
    
    Crafty.sprite(32, "img/expl_small.png", {
        expl_small: [0, 0]
    }, 1);
    
    Crafty.audio.add("expl_small", ["audio/expl_small.mp3", "audio/expl_small.ogg", "audio/expl_small.wav"]);
    
    Crafty.c("Explosion", {
        init: function () {
            
            Crafty.audio.play("expl_small");
            
            return this
                .requires("2D, DOM, SpriteAnimation")
                .bind("AnimationEnd", this.destroy);
            
        },
        explosion: function (type) {
            return this
                .requires("expl_" + type)
                .animate("explosion", 0, 0, 12)
                .animate("explosion", 12, 0);
        }
    });
    
}

function explosion(type, x, y) {
    return Crafty.e("Explosion").explosion(type).attr({x:x,y:y});
}
