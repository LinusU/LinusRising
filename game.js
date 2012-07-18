
window.onload = function () {
    
    window.W = 480 + 160
    window.H = 480;
    
    Crafty.init(W, H);
    Crafty.canvas.init();
    
    level_init();
    music_init();
    bullet_init();
    effects_init();
    enemy_init();
    
    Crafty.sprite("img/player1_blue.png", {
        player1_blue_main: [0, 0, 56, 48]
    });
    
    Crafty.sprite("img/scorebar.png", {
        scorebar: [0, 0, 160, 480]
    });
    
    Crafty.c("Move", {
        _direction: 0,
        _speed: 0,
        init: function () {
            this.bind("EnterFrame", function () {
                if(this._speed == 0) { return ; }
                this.attr({
                    x: this.x + Math.cos(this._direction) * this._speed,
                    y: this.y + Math.sin(this._direction) * this._speed
                });
            });
        },
        move: function (direction, speed) {
            this._direction = direction || 0;
            this._speed = speed || 0;
            return this;
        }
    });
    
    Crafty.c("Constrain", {
        _minX: null, _minY: null,
        _maxX: null, _maxY: null,
        init: function () {
            this.bind("EnterFrame", function () {
                if(this._minX !== null) { this.x = Math.max(this.x, this._minX); }
                if(this._maxX !== null) { this.x = Math.min(this.x, this._maxX - this.w); }
                if(this._minY !== null) { this.y = Math.max(this.y, this._minY); }
                if(this._maxY !== null) { this.y = Math.min(this.y, this._maxY - this.h); }
            });
        },
        constrain: function (minX, maxX, minY, maxY) {
            this._minX = minX;
            this._maxX = maxX;
            this._minY = minY;
            this._maxY = maxY;
            return this;
        }
    });
    
    Crafty.c("LeftControls", {
        init: function() {
            this.requires('Keyboard, Multiway');
        },
        
        leftControls: function(speed) {
            this.multiway(speed, {W: -90, S: 90, D: 0, A: 180});
            this.bind('KeyDown', function (e) {
                if(e.keyCode === Crafty.keys.SPACE) {
                    bullet("laser", Math.PI * 1.5, this.x + 6, this.y + 8);
                    bullet("laser", Math.PI * 1.5, this.x + 16, this.y + 6);
                    bullet("laser", Math.PI * 1.5, this.x + 26, this.y + 8);
                }
            });
            return this;
        }
        
    });
    
    Crafty.scene("main", function () {
        
        music("game");
        
        var scorebar = Crafty
            .e("2D, DOM, scorebar")
            .attr({x: W-160, y: 0, z: 5000});
        
        window. player = Crafty
            .e("2D, DOM, LeftControls, Constrain, SpriteAnimation, solid, player1_blue_main")
            .attr({x: 320, y: 200, z: 1})
            .leftControls(6)
            .animate("move_left", [[56, 0], [112, 0], [168, 0]])
            .animate("move_left_rev", [[168, 0], [112, 0], [56, 0]])
            .animate("move_right", [[224, 0], [280, 0], [336, 0]])
            .constrain(0, W-160, 0, H)
            .bind("NewDirection",
                function (direction) {
                    if(direction.x < 0) {
                        if (!this.isPlaying("move_left"))
                            this.stop().animate("move_left", 3, 1);
                    }
                    if(direction.x > 0) {
                        if (!this.isPlaying("move_right"))
                            this.stop().animate("move_right", 3, 1);
                    }
                    if(!direction.x) {
                        this.stop();
                    }
                }
            );
        
        Level({
            n: 0,
            3500: function () {
                var many = false;
                for(var i=320; i<640; i+=Crafty.math.randomInt(many?1:16, many?24:64)) {
                    shuriken(Crafty.math.randomInt(48, W-160-48), -i);
                }
            },
            5500: function () {
                this._speed = 0;
                var many = false;
                for(var i=320; i<640; i+=Crafty.math.randomInt(many?1:16, many?24:64)) {
                    shuriken(Crafty.math.randomInt(48, W-160-48), -i);
                }
            },
            6500: function () {
                var many = true;
                for(var i=320; i<640; i+=Crafty.math.randomInt(many?1:16, many?24:64)) {
                    shuriken(Crafty.math.randomInt(48, W-160-48), -i);
                }
            },
            11000: function () {
                this._speed = 1;
                var many = false;
                for(var i=320; i<640; i+=Crafty.math.randomInt(many?1:16, many?24:64)) {
                    shuriken(Crafty.math.randomInt(48, W-160-48), -i);
                }
            },
            15000: function () {
                this._speed = 4;
                var many = true;
                for(var i=320; i<640; i+=Crafty.math.randomInt(many?1:16, many?24:64)) {
                    shuriken(Crafty.math.randomInt(48, W-160-48), -i);
                }
            },
            21000: function () {
                this._speed = 1;
                var many = false;
                for(var i=320; i<640; i+=Crafty.math.randomInt(many?1:16, many?24:64)) {
                    shuriken(Crafty.math.randomInt(48, W-160-48), -i);
                }
            }
        });
        
    });
    
    Crafty.scene("main");
    
};
