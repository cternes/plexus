;
Quintus.Player = function(Q) {
    Q.Sprite.extend("Player", {
        // the init constructor is called on creation
        init: function(p) {

            this._super(p, {
                sheet: "player", // Setting a sprite sheet sets sprite width and height
                sprite: "player", // Setting the animation sprites
                x: 110, // starting location x
                y: 1700, // starting location y
                stars: 0,
                jumpSpeed: -500,
                speed: 700, //300
                gravity: 1.2,
                type: Q.SPRITE_FRIENDLY,
            });

            //fix sprite width
            this.p.w = this.p.w - 2;

            //fix sprite height
            this.p.h--;

            //add in gravity, controls and animation
            this.add('2d, platformerControls, animation');

            //hit.sprite is called everytime the player collides with a sprite
            this.on("hit.sprite", function(collision) {
                if (collision.obj.isA("Door")) {
                    //fire complete event
                    this.stage.trigger("complete");
                    
                    //remove the player to prevent them from moving
                    this.destroy();
                }
                
            });
        },
        step: function(dt) {
            if((this.p.vy < 0 || this.p.vy > 0) && this.p.vx > 0) {
                this.play("jump_right");
            }
            else if((this.p.vy < 0 || this.p.vy > 0) && this.p.vx < 0) {
                this.play("jump_left");
            }
            else if (this.p.vx > 0) {
                this.play("run_right");
            } else if (this.p.vx < 0) {
                this.play("run_left");
            }
            else {
                this.play("stand");
            }
            
            if(this.p.landed > 0 && (Q.inputs['up'] || Q.inputs['action'])) {
                Q.audio.play('jump.mp3');
            }
        }
    });

    //register player animations
    Q.animations('player', {
        run_right: {frames: [1, 2, 3, 4], rate: 1 / 5},
        run_left: {frames: [5, 6, 7, 8], rate: 1 / 5},
        stand: {frames: [0], rate: 1 / 5},
        jump_right: {frames: [9], rate: 1 / 5},
        jump_left: {frames: [10], rate: 1 / 5},
    });
    
}