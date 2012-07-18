
function bullet_init() {
    
    Crafty.sprite(25, "img/bullet_laser.png", {
        bullet_laser: [0, 0]
    }, 3);
    
    Crafty.audio.add("bullet_laser", "audio/bullet_laser.wav");
    
    Crafty.c("Bullet", {
        init: function () {
            
            this.requires("2D, DOM, Collision, Move");
            
            this.collision(new Crafty.circle(12, 12, 8));
            
            this.onHit("Enemy", function (objects) {
                for(var i in objects) {
                    objects[i].obj.destroy();
                    this.destroy();
                }
            });
            
            this.bind("EnterFrame", function () {
                if(this.y < -16) { this.destroy(); }
            });
            
            Crafty.audio.play("bullet_laser");
            
        },
        bullet: function (direction) {
            return this.move(direction, 12);
        }
    });
    
}

function bullet(type, direction, x, y) {
    return Crafty.e("Bullet, bullet_" + type).bullet(direction).attr({x:x,y:y});
}
