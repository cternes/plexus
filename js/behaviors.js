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
    Q.component('shooting', {
        added: function() {
            var entity = this.entity;
            entity.p.frameCount = 0;
            entity.p.lastX = 0;
            entity.on('step', this, 'step');
        },
        step: function(dt) {
            var p = this.entity.p;
            
            p.frameCount++;
            if(p.frameCount % 100 === 0) {
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
                      Q.stageScene("endGame",1, { label: "You Died" }); 
                      collision.obj.destroy();
                    }
                });
                this.on("bump.top",function(collision) {
                    if(collision.obj.isA("Player")) { 
                      this.destroy();
                      collision.obj.p.vy = -300;
                    }
                });   
            });
        }
    });

};