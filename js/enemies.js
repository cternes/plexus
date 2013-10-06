;
Quintus.Enemies = function(Q) {
    //-----------SNAIL---------------
    Q.Sprite.extend("Snail", {
        init: function(p) {
            this._super(p, {
                sheet: 'snailWalk',
                sprite: "snailWalk", //setting the animation sprites
                type: Q.SPRITE_ENEMY,
                collisionMask: Q.SPRITE_DEFAULT | Q.SPRITE_FRIENDLY, //collide only with tile layer and player
                vx: 30 //speed
            });
            
            //fix sprite height
            this.p.h--;

            //add in gravity, basic AI, stompable and animation
            this.add('2d, animation, aiBounce, stompable');
        },
        step: function(dt) {
            if (this.p.vx >= 0) {
                this.play("run_left");
            } else if (this.p.vx < 0) {
                this.play("run_right");
            }
        }
    });

    //register snail animations
    Q.animations('snailWalk', {
        run_right: {frames: [0, 1], rate: 1},
        run_left: {frames: [2, 3], rate: 1},
    });

    //-----------SHOT---------------
    Q.Sprite.extend("Shot", {
        init: function(p) {
            this._super(p, {w: 3, h: 3, vx: 300, vy: 300});

            //this moves the shot straightly based on p.direction 
            this.add('movingStraight, deadly');

            this.on('hit', function(collision) {
                //if the shot collides with an object it will be removed
                this.destroy();
            });
        },
        draw: function(ctx) {
            //render a shot as a 3x3px box
            ctx.fillStyle = "grey";
            ctx.beginPath();
            ctx.fillRect(-this.p.cx, -this.p.cy, 3, 3);
            ctx.fill();
        }
    });
}