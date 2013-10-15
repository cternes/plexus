;
Quintus.Levels = function(Q) {
    Q.state.set("level", 1);
    //-------------LEVEL1---------------
    Q.scene("level1", function(stage) {
        setupParallaxBackground(stage, "background-sky.png");
        var tiles = setupCollisionLayer(stage, 1);
        
        //create the player and add him to the stage
        var player = stage.insert(new Q.Player());
        
        //load objects
        stage.loadAssets("level1.json"); 
        
        setupViewport(stage, player, tiles);
        setupLevelChange(stage);
    });
    
    //-------------LEVEL2---------------
    Q.scene("level2", function(stage) {
        
        setupParallaxBackground(stage, "background-sky.png");
        var tiles = setupCollisionLayer(stage, 2);

        //create the player and add him to the stage
        var player = stage.insert(new Q.Player());

        //add in a couple of stars
        //stage.insert(new Q.Star({x: 700, y: 210}));
        //stage.insert(new Q.Star({x: 800, y: 0}));

        // test
        //stage.insert(new Q.Shot({x: 800, y: 200, direction: 'left'}));

        //load objects
        stage.loadAssets("level2.json"); 
        
        setupViewport(stage, player, tiles);
        setupLevelChange(stage);
    });
    
    //-------------LEVEL3---------------
    Q.scene("level3", function(stage) {
        setupParallaxBackground(stage, "background-castle.png");
        var tiles = setupCollisionLayer(stage, 3);
        
        //create the player and add him to the stage
        var player = stage.insert(new Q.Player());
        
        //load objects
        stage.loadAssets("level3.json"); 
        
        setupViewport(stage, player, tiles);
        setupLevelChange(stage);
    });
    
    //-------------LEVEL4---------------
    Q.scene("level4", function(stage) {
        setupParallaxBackground(stage, "background-sky.png");
        var tiles = setupCollisionLayer(stage, 4);
        
        //create the player and add him to the stage
        var player = stage.insert(new Q.Player());
        
        //load objects
        stage.loadAssets("level4.json"); 
        
        setupViewport(stage, player, tiles);
        setupLevelChange(stage);
    });
    
    //-------------LEVEL4---------------
    Q.scene("level5", function(stage) {
        setupParallaxBackground(stage, "background-sky.png");
        var tiles = setupCollisionLayer(stage, 5);
        
        //create the player and add him to the stage
        var player = stage.insert(new Q.Player());
        
        //load objects
        stage.loadAssets("level5.json"); 
        
        setupViewport(stage, player, tiles);
        setupLevelChange(stage);
    });
    
    function setupLevelChange(stage) {
        //next level
        stage.on("complete", function() { Q.state.trigger('nextLevel'); });
    }
    
    function setupViewport(stage, player, tiles) {
        stage.add("viewport").follow(player,{x: true, y: true},{minX: 0, maxX: tiles.p.w, minY: 0, maxY: tiles.p.h});
        //stage.viewport.offsetY = 250; //move the camera a little bit to the top to avoid seeing empty space
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