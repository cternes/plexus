;
Quintus.Objects = function(Q) {
    //------------Door--------------
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
}