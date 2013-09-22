;
Quintus.Levels = function(Q) {
    //-------------LEVEL1---------------
    Q.scene("level1", function(stage) {

        // Add in a repeater for a little parallax action
        stage.insert(new Q.Repeater({ asset: "background-sky.png", speedX: 0.5, speedY: 0.5 }));

        // Add in a tile layer, and make it the collision layer
        stage.collisionLayer(new Q.TileLayer({
            dataAsset: 'level1.tmx',
            sheet: 'tiles',
            tileW: 70,
            tileH: 70}));

        // Create the player and add him to the stage
        var player = stage.insert(new Q.Player());

        // Give the stage a moveable viewport and tell it
        // to follow the player.
        stage.add("viewport").follow(player);
        stage.viewport.offsetY = 250; //move the camera a little bit to the top to avoid seeing empty space

        // Add in a couple of stars
        //stage.insert(new Q.Star({x: 700, y: 210}));
        stage.insert(new Q.Star({x: 800, y: 0}));

        // Add in a couple of enemies
        //stage.insert(new Q.Snail({x: 900, y: 210, shootingDelay: 100}));

        // test
        //stage.insert(new Q.Shot({x: 800, y: 200, direction: 'left'}));

        //add water
        stage.insert(new Q.Water({x: 3115, y: 1028}))
        stage.insert(new Q.Water({x: 4095, y: 1028}))
        stage.insert(new Q.Water({x: 4165, y: 1028}))

        // Finally add in the door goal
        stage.insert(new Q.Door({x: 6700, y: 925}));
    });
}