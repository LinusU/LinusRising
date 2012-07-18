
function level_init() {
    
    Crafty.sprite("level/0.png", {
        level0: [0, 0, 480, 3600]
    });
    
    Crafty.c("Level", {
        _lvly: H-3600,
        _speed: .5,
        init: function () {
            
            this.bind("EnterFrame", function () {
                if(this._speed > 0 && this.y < 0) {
                    this._lvly += this._speed;
                    var newy = Math.min(Math.round(this._lvly), 0);
                    if(this.y != newy) {
                        var diff = (newy - this.y);
                        this.attr('y', newy);
                        Crafty("Enemy, Explosion").each(function () {
                            this.attr('y', this.y + diff);
                        });
                    }
                }
            });
            
            setTimeout(function (o) { o._lvly = o.y; }, 0, this);
            
        }
    });
    
}

function Level(o) {
    
    var e = Crafty
        .e("2D, DOM, Level, level" + o.n)
        .attr({x: 0, y: H-3600});
    
    for(var k in o) {
        if(parseInt(k) == k) {
            setTimeout(function (k) {
                o[k].apply(e, []);
            }, k, k);
        }
    }
    
    return e;
}
