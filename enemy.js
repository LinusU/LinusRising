
function enemy_init() {
    
    Crafty.sprite(32, "img/shuriken.png", {
        shuriken: [0, 0]
    });
    
    Crafty.c("Enemy", {
        init: function () {
            return this
                .requires("2D, DOM, Move")
                .move(Math.PI / 2, 2)
                .bind("Remove", function () {
                    explosion("small", this.x, this.y);
                })
                .bind("EnterFrame", function () {
                    if(this.y > H + 48) {
                        this.unbind("Remove");
                        this.destroy();
                    }
                });
        }
    });
    
}

function shuriken(x, y) {
    return Crafty
        .e("SpriteAnimation, Enemy, Collision, shuriken")
        .animate('rotate', 0, 0, 5)
        .animate('rotate', 6, -1)
        .collision(new Crafty.circle(16, 16, 14))
        .attr({x:x,y:y});
}
