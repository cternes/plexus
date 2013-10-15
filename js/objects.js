;
Quintus.Objects = function(Q) {
    //------------DOOR--------------
    Q.Sprite.extend("Door", {
        init: function(p) {
            this._super(p, {sheet: 'door'});
        }
    });

    //------------STAR--------------
    Q.Sprite.extend("Star", {
        init: function(p) {
            this._super(p, {sheet: 'enemy', vx: 0});

            this.add('collectable');

            this.on('hit', function(collision) {
                if (collision.obj.isA("Player")) {
                    collision.obj.p.stars += 1;
                }
            });
        }
    });
    
    //----------WATER--------------
    Q.Sprite.extend("Water", {
        init: function(p) {
            this._super(p, {sheet: 'water', type: Q.SPRITE_ENEMY});
            
            this.add('deadly');
        }
        
    });
    
    //----------LAVA--------------
    Q.Sprite.extend("Lava", {
        init: function(p) {
            this._super(p, {sheet: 'lava', type: Q.SPRITE_ENEMY});
            
            this.add('deadly');
        }
        
    });
}