var s = Snap('#svg');

var svgCenterY = $('#svg').height()/2;
var svgCenterX = $('#svg').width()/2;

var arr = [];

var clickedItem;
var clickedItemId;

var numAnimations = 0;

$('.back-btn').hide();

$('.back-btn').click(function() {
    $(this).hide();
    reset(clickedItemId, clickedItem);
});

var _onHover = function(el) {
    el.hover(
        function() {
            this.attr({
                fill: "red"
            });
        },
        function() {
            this.attr({
                fill: "black"
            });
        }
    )
}

var clickHandler = function(id, snapCir) {
    $('#' + id).on('click', function() {
        if (!clickedItem) {
            startAnim(id, snapCir);
        }
        else {
            reset(id, snapCir);
        }
    });    
}

var startAnim = function(id, snapCir) {
    numAnimations = 0;
    clickedItem = snapCir;
    clickedItemId = id;
    for (var i = 0; i < arr.length; i++) {
        if(i !== id) {
            scurry(arr[i]);
        }
    }
}

var reset = function(id, snapCir) {
    clickedItem.animate({
        transform: 's1,1'
    }, 500, null, function() {
        for (var i = 0; i < arr.length; i++) {
            if(i !== id) {
                unscurry(arr[i]);
            }
        }
        clickedItem = null;
    });
}

var scurry = function(snapCir) {
    var delay = Math.random() * 1000;
    window.setTimeout(function() {
        snapCir.animate({
            transform: 'T1000',
        }, 500, mina.backin, function() {
            expandThis();
        });
    }, delay);
}

var unscurry = function(snapCir) {
    var delay = Math.random() * 1000;
    window.setTimeout(function() {
        snapCir.animate({
            transform: 'matrix(1,0,0,1,0,0)',
        }, 750, mina.backout);
    }, delay);

    $('.back-btn').hide();
}

var expandThis = function() {
    numAnimations++;
    
    if(numAnimations === arr.length - 1) {
        var bBox = clickedItem.getBBox()
        var centerX = bBox.cx;
        var centerY = bBox.cy;
        var transY = svgCenterY - centerY;
        var transX = svgCenterX - centerX;
        var _transform = 's5,5T' + transX + ',' + transY;

        $('.back-btn').show();

        clickedItem.animate({
            transform: _transform
        }, 500);
    }
}

var counter = 0;
var createCircle = function(x, y, circum) {
    t = s.circle(x, y, circum);
    t.attr({id: counter, class: 'circles'});
    clickHandler(counter, t);
    _onHover(t);
    counter++;
    arr.push(t);
}


var createLogo = function(startX, startY, radius) {
    var radius = radius;
    var diam = radius*2;
    var startX = startX;
    var startY = startY;

    var lgCirPosX = [startX, startX, startX + diam + (diam*.22), startX + diam + (diam*.22), startX + diam + (diam*2.22), startX + diam + (diam*2.22), startX + diam + (diam*4.55), startX + diam + (diam*4.55), startX + diam + (diam*6.66), startX + diam + (diam*6.66)];
    var lgCirPosY = [startY + diam + (diam*2.22), startY + diam + (diam*4.55), startY + diam + (diam*.22), startY + diam + (diam*6.66), startY, startY + diam + (diam*7.77), startY, startY + diam + (diam*7.77), startY + diam + (diam*.22), startY + diam + (diam*6.66)];

    var smCirPosX = [startX + diam + (diam*.77), startX + diam + (diam*1.55), startX + diam + (diam*1.55), startX + diam + (diam*3.44), startX + diam + (diam*3.44), startX + diam + (diam*5.33), startX + diam + (diam*5.33)];
    var smCirPosY = [startY + diam + (diam*3.44), startY + diam + (diam*1.55), startY + diam + (diam*5.33), startY + diam + (diam*.77), startY + diam + (diam*6.11), startY + diam + (diam*1.55), startY + diam + (diam*5.33)];

    for (var i = 0; i < 10; i++) {
        createCircle(lgCirPosX[i], lgCirPosY[i], radius);
    }
    for (var i = 0; i < 7; i++) {
        createCircle(smCirPosX[i], smCirPosY[i], radius);
    }

}

createLogo(100, 0, 25);

