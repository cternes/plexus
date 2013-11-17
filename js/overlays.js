;
Quintus.Overlays = function(Q) {

    //dialog overlay
    Q.scene("endGame", function(stage) {
        var container = stage.insert(new Q.UI.Container({
            x: Q.width / 2, y: Q.height / 2, fill: "rgba(0,0,0,0.5)"
        }));

        var button = container.insert(new Q.UI.Button({x: 0, y: 0, fill: "#CCCCCC",
            label: "Play Again"}));
        var label = container.insert(new Q.UI.Text({x: 10, y: -10 - button.p.h,
            label: stage.options.label}));
        
        button.on("click", function() {
            Q.clearStages();
            Q.state.trigger("restartLevel");
        });

        // Expand the container to visibily fit it's contents
        container.fit(20);
    });
    
    // not december warning
    Q.scene("notDecemberWarning", function(stage) {
        var statsContainer = stage.insert(new Q.UI.Container({
            fill: "rgba(240,202,94,0.5)",
            x: Q.width / 2,
            y: Q.height / 2,
            border: 0,
            shadow: 0,
            shadowColor: "rgba(0,0,0,0.5)",
            w: Q.width / 2,
            h: 150
        }));

        stage.insert(new Q.UI.Text({ 
            label: "Schade, es ist noch nicht Dezember.",
            color: "white",
            x: 0,
            y: 0
        }),statsContainer);
    });
    
    // level completed
    Q.scene("levelCompleted", function(stage) {
        var statsContainer = stage.insert(new Q.UI.Container({
            fill: "rgba(94,240,89,0.5)",
            x: Q.width / 2,
            y: Q.height / 2,
            border: 0,
            shadow: 0,
            shadowColor: "rgba(0,0,0,0.5)",
            w: Q.width / 2,
            h: 150
        }));

        stage.insert(new Q.UI.Text({ 
            label: stage.options.label,
            color: "white",
            x: 0,
            y: 0
        }),statsContainer);
    });
    
    Q.scene("gameStats", function(stage) {
        var statsContainer = stage.insert(new Q.UI.Container({
            fill: "gray",
            x: Q.width / 2,
            y: 30,
            border: 1,
            shadow: 3,
            shadowColor: "rgba(0,0,0,0.5)",
            w: Q.width / 2,
            h: 40
        }));

        var lives = stage.insert(new Q.UI.Text({ 
            label: "Lives x 3",
            color: "white",
            x: -300,
            y: 0
        }),statsContainer);
        
        var coins = stage.insert(new Q.UI.Text({ 
            label: "Coins x 0",
            color: "white",
            x: 300,
            y: 0
        }),statsContainer);
        
    });
}