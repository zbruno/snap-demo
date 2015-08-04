var s = Snap('#svg');
var b = Snap('#svg-blobs');

var svgCenterY = $('#svg').height()/2;
var svgCenterX = $('#svg').width()/3;
var arr = [];
var clickedItem;
var clickedItemId;
var numAnimations = 0;

$('.back-btn, .description-container').hide();

// $('.back-btn').click(function() {
//     $(this).hide();
//     $('.description-container').hide();
//     reset(clickedItemId, clickedItem, unscurry, {}, 250);
// });

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

var createLogo = function(startX, startY, radius, animType, animTypeRev, hoverParams, resetParams, svgCanvas) {
    var radius = radius;
    var diam = radius*2;
    var startX = startX;
    var startY = startY;

    var lgCirPosX = [startX, startX, startX + diam + (diam*.22), startX + diam + (diam*.22), startX + diam + (diam*2.22), startX + diam + (diam*2.22), startX + diam + (diam*4.55), startX + diam + (diam*4.55), startX + diam + (diam*6.66), startX + diam + (diam*6.66)];
    var lgCirPosY = [startY + diam + (diam*2.22), startY + diam + (diam*4.55), startY + diam + (diam*.22), startY + diam + (diam*6.66), startY, startY + diam + (diam*7.77), startY, startY + diam + (diam*7.77), startY + diam + (diam*.22), startY + diam + (diam*6.66)];

    var smCirPosX = [startX + diam + (diam*.77), startX + diam + (diam*1.55), startX + diam + (diam*1.55), startX + diam + (diam*3.44), startX + diam + (diam*3.44), startX + diam + (diam*5.33), startX + diam + (diam*5.33)];
    var smCirPosY = [startY + diam + (diam*3.44), startY + diam + (diam*1.55), startY + diam + (diam*5.33), startY + diam + (diam*.77), startY + diam + (diam*6.11), startY + diam + (diam*1.55), startY + diam + (diam*5.33)];

    for (var i = 0; i < 10; i++) {
        createCircle(lgCirPosX[i], lgCirPosY[i], radius, 'logo-circle', animType, animTypeRev, hoverParams, resetParams, svgCanvas);
    }
    for (var i = 0; i < 7; i++) {
        createCircle(smCirPosX[i], smCirPosY[i], radius, 'logo-circle', animType, animTypeRev, hoverParams, resetParams, svgCanvas);
    }

}

var hoverParams = {
    hoverInParams: {
        fill: "#23b6d5",
    },
    hoverOutParams: {
        fill: "#777"
    },
    hoverDuration: 250
}

var resetParams = {
    animation: {
        transform: 's1,1',
        fill: "#777"
    },
    duration: 250,
    timingFunc: null
}

createLogo(200, 100, 25, scurry, unscurry, hoverParams, resetParams, s);

// NEW SVG SECTION

var fadeAll = function(snapObj) {
    snapObj.animate({
        opacity: 0,
    }, 500, mina.backin, function() {
        expandThis();
    });
}

var unFadeAll = function(snapObj) {
   snapObj.animate({
       opacity: 1,
   }, 500, mina.backout);
}


var createSquare = function(x, y, w, h, prefix, animType, animTypeRev, hoverParams, resetParams, svgCanvas) {
    t = svgCanvas.rect(x, y, w * 2, h * 2);
    t.attr({
        id: 'formula-' + counter,
        class: 'squares',
        fill: '#777'
    });
    clickHandler(prefix + '-' + counter, t, animType, animTypeRev, resetParams);
    _onHover(t, hoverParams);
    counter++;
    arr.push(t);
}

var createBlobs = function(startX, startY, radius, numCir, spacingX, spacingY, createShapeFunction, svgCanvas) {
    var radius = radius;
    var diam = radius*2;
    var _startX = startX;
    var _startY = startY;

    for (var i = 0; i < numCir; i++) {
        createShapeFunction(_startX, _startY, radius, radius, 'formula', fadeAll, unFadeAll, hoverParams, resetParams, svgCanvas);
        _startX = _startX + spacingX;

        if (i == 2) {
            _startX = startX;
            _startY = _startY + spacingY;
        }

    }
}



var diam = 100;
var ratioSquareX = diam*1.3;
var ratioSquareY = diam*1.3;
var ratioCircleX = diam*1.8;
var ratioCircleY = diam*1.45;
createBlobs(200, 100, diam/2, 6, ratioCircleX, ratioCircleY, createSquare, b);





