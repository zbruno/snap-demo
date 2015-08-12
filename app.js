var arr = [];
var clickedItem;
var clickedItemId;
var numAnimations = 0;  

var _onHover = function(el, hoverParams) {
    el.hover(
        function() {
            this.animate(hoverParams.hoverInParams, hoverParams.hoverDuration);
        },
        function() {
            this.animate(hoverParams.hoverOutParams, hoverParams.hoverDuration);
        }
    )
}

var clickHandler = function(id, snapObj, animType, animTypeRev, resetParams) {
    snapObj.node.onclick = function() {
        if (!clickedItem) {
            startAnim(id, snapObj, animType);
        }
        else {
            reset(id, snapObj, animTypeRev, resetParams);
        }
    }
}

var startAnim = function(id, snapObj, animType) {
    numAnimations = 0;
    clickedItem = snapObj;
    clickedItemId = id;
    for (var i = 0; i < arr.length; i++) {
        if (i !== parseInt(id[id.length-1])) {
            animType(arr[i]);
        }
    }
}

var reset = function(id, snapObj, animTypeRev, resetParams) {
    clickedItem.animate(
        resetParams.animation,
        resetParams.duration,
        resetParams.timingFunc,
        function() {
            for (var i = 0; i < arr.length; i++) {
                if(i !== parseInt(id[id.length-1])) {
                    animTypeRev(arr[i]);
                }
            }
            clickedItem = null;
        });
}

var scurry = function(snapObj) {
    var delay = Math.random() * 1000;
    window.setTimeout(function() {
        snapObj.animate({
            transform: 'T1000',
        }, 500, mina.backin, function() {
            expandThis();
        });
    }, delay);
}

var unscurry = function(snapObj) {
    var delay = Math.random() * 1000;
    window.setTimeout(function() {
        snapObj.animate({
            transform: 'matrix(1,0,0,1,0,0)',
        }, 750, mina.backout);
    }, delay);
}

var expandThis = function() {
    numAnimations++;
    
    if(numAnimations === arr.length - 1) {
        var bBox = clickedItem.getBBox()
        var centerX = bBox.cx;
        var centerY = bBox.cy;
        var transY = svgCenterY - centerY;
        var transX = svgCenterX - centerX;
        var _transform = 's7,7T' + transX + ',' + transY;

        clickedItem.animate({
            transform: _transform,
            fill: "#23b6d5"
        }, 500, null, function() {
            $('.back-btn').show();
            var thisOne = clickedItem.node.id;

            $.getJSON( "letter-c/data.json", function( data ) {
                var fillTitle = data.descriptions[thisOne].title;
                var fillText = data.descriptions[thisOne].description;
                $('.description-container').find('h3').html(fillTitle);
                $('.description-container').find('p').html(fillText);
                $('.description-container').show();
            });
        });
    }
}

var counter = 0;
var createCircle = function(x, y, radius, prefix, animType, animTypeRev, hoverParams, resetParams, svgCanvas) {
    t = svgCanvas.circle(x, y, radius);
    t.attr({
        id: prefix + '-' + counter, 
        class: 'circles', 
        fill: '#777'
    });
    clickHandler(prefix + '-' + counter, t, animType, animTypeRev, resetParams);
    _onHover(t, hoverParams);
    counter++;
    arr.push(t);
}








