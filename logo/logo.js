var svgCenterY = $('#svg').height()/2;
var svgCenterX = $('#svg').width()/3;

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

$('.back-btn, .description-container').hide();

$('.back-btn').click(function(id, snapObj, animTypeRev, resetParams) {
    $(this).hide();
    $('.description-container').hide();
    reset(id, snapObj, unscurry, {
        animation: {
            transform: 's1,1',
            fill: "#777"
        },
        duration: 250,
        timingFunc: null
    });
});  

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

createLogo(200, 100, 25, scurry, unscurry, hoverParams, resetParams, s);