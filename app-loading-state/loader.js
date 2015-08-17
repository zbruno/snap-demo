var pulsateOpacityIn = function(t) {
    t.animate({
        'fill-opacity': 1,
        transform: 's1.1,1.1',
    }, 2000, mina.backin, function() {
        pulsateOpacityOut(t);
    });
}

var pulsateOpacityOut = function(t) {
    t.animate({
        'fill-opacity': .5,
        transform: 's1,1',
    }, 2000, mina.backout, function() {
        pulsateOpacityIn(t);
    });
}

var twinkle = function() {
    for (var i = 0; i < loaderArray.length; i++) {
        window.setTimeout(function() {
            loaderArray[i].animate({
                'fill-opacity': 1,
                transform: 's1.2,1.2',
            }, 100, null, function() {
                loaderArray[i].animate({
                    'fill-opacity': .5,
                    transform: 's1,1',
                }, 100, null);
            });
        }, 200);
    }
}

var createLoaderLogo = function(startX, startY, radius) {
    var radius = radius;
    var diam = radius*2;
    var startX = startX;
    var startY = startY;

    var lgCirPosX = [startX, startX, startX + diam + (diam*.22), startX + diam + (diam*.22), startX + diam + (diam*2.22), startX + diam + (diam*2.22), startX + diam + (diam*4.55), startX + diam + (diam*4.55), startX + diam + (diam*6.66), startX + diam + (diam*6.66)];
    var lgCirPosY = [startY + diam + (diam*2.22), startY + diam + (diam*4.55), startY + diam + (diam*.22), startY + diam + (diam*6.66), startY, startY + diam + (diam*7.77), startY, startY + diam + (diam*7.77), startY + diam + (diam*.22), startY + diam + (diam*6.66)];

    var smCirPosX = [startX + diam + (diam*.77), startX + diam + (diam*1.55), startX + diam + (diam*1.55), startX + diam + (diam*3.44), startX + diam + (diam*3.44), startX + diam + (diam*5.33), startX + diam + (diam*5.33)];
    var smCirPosY = [startY + diam + (diam*3.44), startY + diam + (diam*1.55), startY + diam + (diam*5.33), startY + diam + (diam*.77), startY + diam + (diam*6.11), startY + diam + (diam*1.55), startY + diam + (diam*5.33)];

    for (var i = 0; i < 10; i++) {
        createLoaderCircle(lgCirPosX[i], lgCirPosY[i], radius);
    }
    for (var i = 0; i < 7; i++) {
        createLoaderCircle(smCirPosX[i], smCirPosY[i], radius);
    }

}

var createLoaderCircle = function(x, y, radius) {
    t = l.circle(x, y, radius);
    t.attr({
        fill: '#fff',
        'fill-opacity': .5
    });
    pulsateOpacityIn(t);

}

createLoaderLogo(25, 25, 7);
