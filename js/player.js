;
Quintus.Player = function(Q) {
    Q.Sprite.extend("Player", {
        // the init constructor is called on creation
        init: function(p) {

            this._super(p, {
                sheet: "player", // Setting a sprite sheet sets sprite width and height
                sprite: "player", // Setting the animation sprites
                x: 80, // starting location x
                y: 700, // starting location y
                stars: 0,
                jumpSpeed: -500,
                speed: 300, //300
                gravity: 1.2,
            });

            //fix sprite height
            this.p.h--;

            //add in gravity, controls and animation
            this.add('2d, platformerControls, animation');

            //hit.sprite is called everytime the player collides with a sprite
            this.on("hit.sprite", function(collision) {
                // Check the collision, if it's the Tower, you win!
                if (collision.obj.isA("Door")) {
                    // Stage the endGame scene above the current stage
                    Q.stageScene("endGame", 1, {label: "You Won!"});
                    // Remove the player to prevent them from moving
                    this.destroy();
                }
                
                if(collision.obj.isA("Water")) { 
                    Q.stageScene("endGame",1, { label: "You Died" }); 
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