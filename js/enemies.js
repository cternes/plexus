;
Quintus.Enemies = function(Q) {
    //-----------SNAIL---------------
    Q.Sprite.extend("Snail", {
        init: function(p) {
            this._super(p, {
                sheet: 'snailWalk',
                sprite: 'snailWalk', //setting the animation sprites
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
    
    //-----------SLIME---------------
    Q.Sprite.extend("Slime", {
        init: function(p) {
            this._super(p, {
                sheet: 'slimeWalk',
                sprite: 'slimeWalk', //setting the animation sprites
                type: Q.SPRITE_ENEMY,
                collisionMask: Q.SPRITE_DEFAULT | Q.SPRITE_FRIENDLY, //collide only with tile layer and player
                vx: 150 //speed
            });
            
            //fix sprite height
            //this.p.h--;

            //add in gravity, basic AI, stompable and animation
            this.add('2d, animation, aiBounce, stompable, cliffChecker');
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
    Q.animations('slimeWalk', {
        run_right: {frames: [0, 1], rate: 1/3},
        run_left: {frames: [2, 3], rate: 1/3},
    });
    
    //-----------FLY---------------
    Q.Sprite.extend("Fly", {
        init: function(p) {
            this._super(p, {
                sheet: 'fly',
                sprite: 'fly', //setting the animation sprites
                type: Q.SPRITE_ENEMY,
                collisionMask: Q.SPRITE_DEFAULT | Q.SPRITE_FRIENDLY, //collide only with tile layer and player
                vy: 150, //speed
                rangeY: 100, //range
                gravity: 0
            });

            //add in gravity, stompable and animation
            this.add('2d, animation, stompable, flyingVertical');
        },
        step: function(dt) {
            this.play("fly");
        }
    });
    
    //register fly animations
    Q.animations('fly', {
        fly: {frames: [0, 1], rate: 0.9},
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