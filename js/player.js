;
Quintus.Player = function(Q) {
    Q.Sprite.extend("Player", {
        // the init constructor is called on creation
        init: function(p) {

            this._super(p, {
                sheet: "player", // Setting a sprite sheet sets sprite width and height
                sprite: "player", // Setting the animation sprites
                x: 110, // starting location x (110)
                y: 1700, // starting location y (1700)
                stars: 0,
                jumpSpeed: -500,
                speed: 300, //300
                gravity: 1.2,
                type: Q.SPRITE_FRIENDLY,
            });

            //add in gravity, controls and animation
            this.add('2d, platformerControls, animation');
            
            Q.state.on("playerDead",this, function() {
                if(!this.p.isDead) {
                    Q.audio.play('dead.mp3');
                    Q.stageScene("endGame",1, { label: "You Died" });     
                }
                
                this.p.isDead = true;
            });

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
            if(this.p.isDead) {
                this.p.collisionMask = Q.SPRITE_NONE;
                this.play("dead");
            }
            else if((this.p.vy < 0 || this.p.vy > 0) && this.p.vx >= 0) {
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
            
            //check for level bounds
            if(this.p.y > Q.stage()._collisionLayer.p.h) {
                Q.state.trigger('playerDead');
                this.destroy();
            }
            
            //DEBUG ONLY, show x position of player
            Q("UI.Text",1).items[0].p.label = "x:" + Math.floor(this.p.x) + " y:" + Math.floor(this.p.y);
        }
    });

    //register player animations
    Q.animations('player', {
        run_right: {frames: [0, 1, 2, 3], rate: 1 / 5},
        run_left: {frames: [4, 5, 6, 7], rate: 1 / 5},
        stand: {frames: [0], rate: 1 / 5},
        jump_right: {frames: [8], rate: 1 / 5},
        jump_left: {frames: [9], rate: 1 / 5},
        dead: {frames: [10], rate: 1 / 5},
    });
    
}