var svgCenterY = $('#svg-ingredients').height()/2;
var svgCenterX = $('#svg-ingredients').width()/3;

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

$('.back-btn-ingredients').hide();

$('.back-btn-ingredients').click(function(id, snapObj, animTypeRev, resetParams) {
    $(this).hide();
    reset(id, snapObj, unFadeAll, {
        animation: {
            transform: 's1,1',
            fill: "#777"
        },
        duration: 250,
        timingFunc: null
    });
});

var fadeAll = function(snapObj) {
    snapObj.animate({
        opacity: 0,
    }, 500, mina.backin, function() {
        expandIngredient();
    });
}

var unFadeAll = function(snapObj) {
   snapObj.animate({
       opacity: 1,
   }, 500, mina.backout);
}

var expandIngredient = function() {
    numAnimations++;
    
    if(numAnimations === arr.length - 1) {
        var bBox = clickedItem.getBBox()
        var centerX = bBox.cx;
        var centerY = bBox.cy;
        var transY = svgCenterY - centerY;
        var transX = svgCenterX - centerX;
        var _transform = 's4,4T' + transX + ',' + transY;

        clickedItem.animate({
            transform: _transform,
            fill: "#23b6d5"
        }, 500, null, function() {
            $('.back-btn-ingredients').show();
        });
    }
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

var createIngredients = function(startX, startY, radius, numCir, spacingX, spacingY, createShapeFunction, svgCanvas) {
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
createIngredients(200, 100, diam/2, 6, ratioCircleX, ratioCircleY, createSquare, b);
