;
Quintus.Levels = function(Q) {
    Q.state.set("level", 10);
    //-------------LEVEL1---------------
    Q.scene("level1", function(stage) {
        setupLevel(1, "background-sky.png", stage);
    });
    
    //-------------LEVEL2---------------
    Q.scene("level2", function(stage) {
        //add in a couple of stars
        //stage.insert(new Q.Star({x: 700, y: 210}));
        //stage.insert(new Q.Star({x: 800, y: 0}));

        // test
        //stage.insert(new Q.Shot({x: 800, y: 200, direction: 'left'}));

        setupLevel(2, "background-sky.png", stage);
    });
    
    //-------------LEVEL3---------------
    Q.scene("level3", function(stage) {
        setupLevel(3, "background-castle.png", stage);
    });
    
    //-------------LEVEL4---------------
    Q.scene("level4", function(stage) {
        setupLevel(4, "background-sky.png", stage);
    });
    
    //-------------LEVEL5---------------
    Q.scene("level5", function(stage) {
        setupLevel(5, "background-sky.png", stage);
    });
    
    //-------------LEVEL6---------------
    Q.scene("level6", function(stage) {
        setupLevel(6, "background-castle.png", stage);
    });
    
    //-------------LEVEL7---------------
    Q.scene("level7", function(stage) {
        setupLevel(7, "background-sky.png", stage);
    });
    
    //-------------LEVEL8---------------
    Q.scene("level8", function(stage) {
        setupLevel(8, "background-sky.png", stage);
    });
    
    //-------------LEVEL9---------------
    Q.scene("level9", function(stage) {
        setupLevel(9, "background-castle.png", stage);
    });
    
    //-------------LEVEL10---------------
    Q.scene("level10", function(stage) {
        setupLevel(10, "background-sky.png", stage);
    });
    
    function setupLevel(levelId, backgroundImage, stage) {
            //setup background and collision layer
            setupParallaxBackground(stage, backgroundImage);
            var tiles = setupCollisionLayer(stage, levelId);

            //create the player and add him to the stage
            var player = stage.insert(new Q.Player());

            //load objects
            stage.loadAssets("level" + levelId + ".json"); 

            setupViewport(stage, player, tiles);
            setupLevelChange(stage);
    };
    
    function setupLevelChange(stage) {
        //next level
        stage.on("complete", function() { Q.state.trigger('nextLevel'); });
    }
    
    function setupViewport(stage, player, tiles) {
        var scale = 1;
        var touchControlSize = 0;
        
        //if we're on a touch device, we have to move the viewport up a little bit in order 
        //to avoid overlapping of the UI touch controls. Scale will also apply only on touch devices.
        if(Q.touchDevice) {
            scale = 2;
            touchControlSize = 255;
        }
        
        stage.add("viewport").follow(player,{x: true, y: true},{minX: 0, maxX: tiles.p.w * scale, minY: 0, maxY: tiles.p.h * scale + touchControlSize});
        stage.viewport.scale = scale;
    }
    
    function setupParallaxBackground(stage, backgroundAsset) {
        stage.insert(new Q.Repeater({ asset: backgroundAsset, speedX: 0.5, speedY: 0.5 }));
    }
    
    function setupCollisionLayer(stage, levelIdx) {
        //add in a tile layer, and make it the collision layer
        return stage.collisionLayer(new Q.TileLayer({
                                    dataAsset: 'level' + levelIdx + '.tmx',
                                    sheet: 'tiles',
                                    tileW: 70,
                                    tileH: 70}));
    }
    
    //-------------CHANGE LEVEL BEHAVIOR---------------
    Q.state.on("nextLevel",this, function() {
        var level = Q.state.get("level");
        level += 1;
        changeLevel(level);
    });
    
    Q.state.on("prevLevel",this, function() {
        var level = Q.state.get("level");
        level -= 1;
        changeLevel(level);
    });
    
    Q.state.on("restartLevel", this, function() {
        Q.clearStage(1); //remove overlays
        changeLevel(Q.state.get("level"), 0);
    });
    
    function changeLevel(levelIdx) {
        Q.state.set("level", levelIdx);
        Q.stageScene("level" + levelIdx, 0);
    }
}