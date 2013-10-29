;Quintus.Behaviors = function(Q) {

    //can picked up by player
    Q.component('collectable', {
        added: function() {
            this.entity.on("hit", function(collision) {
                if (collision.obj.isA("Player")) {
                    this.destroy();
                }
            });
        }
    });
    
    //move an entity in a direction as long as possible
    //requirements:
    //              -entity needs to have a property direction {left,right,up,down}
    Q.component('movingStraight', {
        added: function() {
            var entity = this.entity;
            Q._defaults(entity.p,{
            vx: 0,
            vy: 0,
            ax: 0,
            ay: 0,
            gravity: 0,
            collisionMask: Q.SPRITE_DEFAULT
          });
      
            entity.on('step', this, 'step');
        },
        
        step: function(dt) {
            var p = this.entity.p,
            dtStep = dt;
            
            dt = Math.min(1/30,dtStep);
            
            if(p.direction === 'left') {
                p.x -= p.vx * dt;
            }
            else if(p.direction === 'right'){
                p.x += p.vx * dt;    
            }
            else if(p.direction === 'up') {
                p.y -= p.vy * dt;
            }
            else {
                //down
                p.y += p.vy * dt;
            }

            this.entity.stage.collide(this.entity);
            dtStep -= dt;
        }
    });
    
    //shoot in the direction of walking
    //requirements:
    //              -entity should move on x-axis
    //              -entity should have a property shootingDelay (frames between shots)
    Q.component('shooting', {
        added: function() {
            var entity = this.entity;
            entity.p.frameCount = 0;
            entity.p.lastX = 0;
            
            //if property shootingDelay is not defined, we set the delay to 100 (shoots every 100 frames)
            if(entity.p.shootingDelay === undefined) {
                entity.p.shootingDelay = 100; 
            }
            
            entity.on('step', this, 'step');
        },
        step: function(dt) {
            var p = this.entity.p;
            
            p.frameCount++;
            if(p.frameCount % p.shootingDelay === 0) {
                //calculate the walking direction 
                if(p.x > p.lastX) {
                    p.direction = 'right';
                }
                else {
                    p.direction = 'left';
                }
                
                //calculate the bound (x-coordinate) of the entity at which we can release the shot
                //always release the shot at the side of walking
                var firstNonCollidingX = (p.direction === 'left') ? p.x - p.w : p.x + p.w;
                
                //shoot in the direction of walking
                Q.stage().insert(new Q.Shot({x: firstNonCollidingX, y: p.y, direction: p.direction}));
            }
            
            //save current x coordinate
            p.lastX = p.x;
        }
    });
    
    //entity can be destroyed by stomping from top, if bumped from another direction the player gets destroyed
    Q.component('stompable', {
        added: function() {
            this.entity.on("hit", function(collision) {
                this.on("bump.left,bump.right,bump.bottom",function(collision) {
                    if(collision.obj.isA("Player")) { 
                      Q.state.trigger('playerDead');
                    }
                });
                this.on("bump.top",function(collision) {
                    if(collision.obj.isA("Player")) { 
                      this.destroy();
                      collision.obj.p.vy = -400;
                    }
                });   
            });
        }
    });
    
    Q.component('deadly', {
        added: function() {
            this.entity.on("hit", function(collision) {
                if(collision.obj.isA("Player")) { 
                    Q.state.trigger('playerDead');
                }
            });
        }
    });
    
    //entity will move vertically (up & down) in a defined range
    //requirements:
    //              -entity should have gravity: 0
    //              -entity must have a property rangeY which defines the vertical range (default 100)
    Q.component('flyingVertical', {
        added: function() {
            var entity = this.entity;
            entity.p.initialY = entity.p.y; //store initial y position
            
            if(entity.p.rangeY === undefined) {
                entity.p.rangeY = 100; 
            }
            
            entity.on('step', this, 'step');
        },
        step: function() {
            var p = this.entity.p;
            var dirY = p.vy/Math.abs(p.vy);
    
            if(p.y - p.initialY >= p.rangeY && p.vy > 0) {
                p.vy = -p.vy;
            } 
            else if(-p.y + p.initialY >= p.rangeY && p.vy < 0) {
                p.vy = -p.vy;
            }
            else if(p.vy === 0) {
                p.flip = "y";
            }
        }
    });
    
    //entity checks for cliffs and will change walking direction if a cliff is near
    Q.component('cliffChecker', {
        added: function() {
            var entity = this.entity;
            entity.on('step', this, 'step');
        },
        step: function() {
            var p = this.entity.p;
            var dirX = p.vx/Math.abs(p.vx);
            var ground = Q.stage().locate(p.x, p.y + p.h/2 + 1, Q.SPRITE_DEFAULT);
            var nextTile = Q.stage().locate(p.x + dirX * p.w/2 + dirX, p.y + p.h/2 + 1, Q.SPRITE_DEFAULT);
            
            //if we are on ground and there is a cliff
            if(!nextTile && ground) {
                if(p.vx > 0) {
                    if(p.defaultDirection === "right") {
                        p.flip = "x";
                    }
                    else {
                        p.flip = false;
                    }
                }
                else {
                    if(p.defaultDirection === "left") {
                        p.flip = "x";
                    }
                    else {
                        p.flip = false;
                    }
                }
                p.vx = -p.vx;
            }
        }
    });

};