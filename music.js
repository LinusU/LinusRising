
(function () {
    
    var current = null;
    
    window.music_init = function () {
        Crafty.audio.add({
            music_interface: ["music/interface.mp3", "music/interface.ogg", "music/interface.wav"],
            music_level: ["music/level.mp3", "music/level.ogg", "music/level.wav"],
            music_game: ["music/game.mp3", "music/game.ogg", "music/game.wav"]
        });
    };
    
    window.music = function (id) {
        Crafty.audio.play("music_" + id, -1);
    };
    
})();
