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
    scatter(id, snapCir);
}

var reset = function(id, snapCir) {
    clickedItem.animate({
        transform: 's1,1'
    }, 500, null, function() {
        unscatter(id, snapCir);
        clickedItem = null;
    });
}

var scatter = function(circleId, snapCir) {
    for (var i = 0; i < arr.length; i++) {
        if(i !== circleId) {
            scurry(arr[i]);
        }
    }
}

var unscatter = function(circleId, snapCir) {
    for (var i = 0; i < arr.length; i++) {
        if(i !== circleId) {
            unscurry(arr[i]);
        }
    }
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
 
for (var i = 0; i < 6; i++) {
    
    if (i == 0) {
        for (var z = 1; z < 6; z++) {
            var dist = 65 * z;        
            createCircle(dist, 25, 25);    
        }
    }
    if (i == 1) {
        for (var z = 1; z < 6; z++) {
            var dist = 65 * z;        
            createCircle(dist, 100, 25);    
        }
    }
    if (i == 2) {
        for (var z = 1; z < 3; z++) {
            var dist = 65 * z;        
            createCircle(dist, 175, 25);    
        }
    }
    if (i == 3) {
        for (var z = 1; z < 3; z++) {
            var dist = 65 * z;        
            createCircle(dist, 250, 25);    
        }
    }
    if (i == 4) {
        for (var z = 1; z < 6; z++) {
            var dist = 65 * z;        
            createCircle(dist, 325, 25);    
        }
    }
    if (i == 5) {
        for (var z = 1; z < 6; z++) {
            var dist = 65 * z;        
            createCircle(dist, 400, 25);    
        }
    }

}