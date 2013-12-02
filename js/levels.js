;
Quintus.Levels = function(Q) {
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
    
    //-------------LEVEL11---------------
    Q.scene("level11", function(stage) {
        setupLevel(11, "background-castle.png", stage);
    });
    
    //-------------LEVEL12---------------
    Q.scene("level12", function(stage) {
        setupLevel(12, "background-sky.png", stage);
    });
    
    //-------------LEVEL13---------------
    Q.scene("level13", function(stage) {
        setupLevel(13, "background-castle.png", stage);
    });
    
    //-------------LEVEL14---------------
    Q.scene("level14", function(stage) {
        setupLevel(14, "background-sky.png", stage);
    });
    
    //-------------LEVEL15---------------
    Q.scene("level15", function(stage) {
        setupLevel(15, "background-sky.png", stage);
    });
    
    //-------------LEVEL16---------------
    Q.scene("level16", function(stage) {
        setupLevel(16, "background-castle.png", stage);
    });
    
    //-------------LEVEL17---------------
    Q.scene("level17", function(stage) {
        setupLevel(17, "background-castle.png", stage);
    });
    
    //-------------LEVEL18---------------
    Q.scene("level18", function(stage) {
        setupLevel(18, "background-sky.png", stage);
    });
    
    //-------------LEVEL19---------------
    Q.scene("level19", function(stage) {
        setupLevel(19, "background-castle.png", stage);
    });
    
    //-------------LEVEL20---------------
    Q.scene("level20", function(stage) {
        setupLevel(20, "background-sky.png", stage);
    });
    
    //-------------LEVEL21---------------
    Q.scene("level21", function(stage) {
        setupLevel(21, "background-sky.png", stage);
    });
    
    //-------------LEVEL22---------------
    Q.scene("level22", function(stage) {
        setupLevel(22, "background-sky.png", stage);
    });
    
    //-------------LEVEL23---------------
    Q.scene("level23", function(stage) {
        setupLevel(23, "background-castle.png", stage);
    });
    
    //-------------LEVEL24---------------
    Q.scene("level24", function(stage) {
        setupLevel(24, "background-sky.png", stage);
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
            //stage.on("complete", function() { Q.state.trigger('nextLevel'); });
        stage.on("complete", function() {
            var level = Q.state.get("level");
            var text = Q.asset("level" + level + ".json")[0][1].label;
            Q.stageScene("levelCompleted",2, { label: text }); 
        });
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
        var background = new Q.TileLayer({
                                dataAsset: 'level' + levelIdx + '.tmx',
                                layerIndex: 1,
                                sheet: 'tiles',
                                tileW: 70,
                                tileH: 70,
                                type: Q.SPRITE_NONE });
        stage.insert(background);
        
        //add in a tile layer, and make it the collision layer
        return stage.collisionLayer(new Q.TileLayer({
                                    dataAsset: 'level' + levelIdx + '.tmx',
                                    sheet: 'tiles',
                                    tileW: 70,
                                    tileH: 70}));
    }
    
    //-------------CHANGE LEVEL BEHAVIOR---------------
    Q.state.on("nextLevel",this, function() {
        //level change only possible on debug mode
        if(Q.state.get("debug")) {
           var level = Q.state.get("level");
            level += 1;
            changeLevel(level);
        }
    });
    
    Q.state.on("prevLevel",this, function() {
        //level change only possible on debug mode
        if(Q.state.get("debug")) {
            var level = Q.state.get("level");
            level -= 1;
            changeLevel(level);
        }
    });
    
    Q.state.on("restartLevel", this, function() {
        Q.clearStage(1); //remove overlays
        Q.clearStage(2); //remove overlays
        changeLevel(Q.state.get("level"), 0);
    });
    
    function changeLevel(levelIdx) {
        if(Q.state.get("debug")) {
            Q.stageScene("gameStats", 1);    
        }
        
        Q.state.set("level", levelIdx);
        Q.stageScene("level" + levelIdx, 0);
    }
}