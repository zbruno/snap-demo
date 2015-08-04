// var b = Snap('#svg-blobs');

// var counter = 0;
// var arr = [];
// var clickedItem;
// var clickedItemId;
// var numAnimations = 0;
// var svgCenterY = $('#svg').height()/2;
// var svgCenterX = $('#svg').width()/3;

// var createCircle = function(x, y, radius) {
//     t = b.circle(x, y, radius);
//     t.attr({id: 'ingredient-' + counter, class: 'circles', fill: '#777'});
//     clickHandler('ingredient-' + counter, t);
//     _onHover(t);
//     counter++;
//     arr.push(t);
// }

// var createSquare = function(x, y, w, h) {
//     t = b.rect(x, y, w * 2, h * 2);
//     t.attr({id: 'formula-' + counter, class: 'squares', fill: '#777'});
//     clickHandler('formula-' + counter, t);
//     _onHover(t);
//     counter++;
//     arr.push(t);
// }

// var clickHandler = function(id, snapObj) {
//     $('#' + id).on('click', function() {
//         if (!clickedItem) {
//             startAnim(id, snapObj);
//         }
//         else {
//             reset(id, snapObj);
//         }
//     });
// }

// var startAnim = function(id, snapObj) {
//     numAnimations = 0;
//     clickedItem = snapObj;
//     clickedItemId = id;
//     for (var i = 0; i < arr.length; i++) {
//         if(i !== parseInt(id[id.length-1])) {
//             fadeAll(arr[i]);
//         }
//     }
// }

// var reset = function(id, snapObj) {
//     $('.back-btn, .description-container').hide();
//     clickedItem.animate({
//         transform: 's1,1',
//         fill: "#777"
//     }, 500, null, function() {
//         for (var i = 0; i < arr.length; i++) {
//             if(i !== parseInt(id[id.length-1])) {
//                 unFadeAll(arr[i]);
//             }
//         }
//         clickedItem = null;
//     });
// }

// var fadeAll = function(snapObj) {
//     snapObj.animate({
//         opacity: 0,
//     }, 500, mina.backin, function() {
//         expandThis();
//     });
// }

// var unFadeAll = function(snapObj) {
//    snapObj.animate({
//        opacity: 1,
//    }, 500, mina.backout);
// }

// var expandThis = function() {
//     numAnimations++;
    
//     if(numAnimations === arr.length - 1) {
//         var bBox = clickedItem.getBBox()
//         var centerX = bBox.cx;
//         var centerY = bBox.cy;
//         var transY = svgCenterY - centerY;
//         var transX = svgCenterX - centerX;
//         var _transform = 's4,4T' + transX + ',' + transY;

//         clickedItem.animate({
//             transform: _transform,
//             fill: "#23b6d5"
//         }, 500, null, function() {
//             console.log('success')
//         });
//     }
// }

// var _onHover = function(el) {
//     el.hover(
//         function() {
//             this.animate({
//                 fill: "#23b6d5",
//                 r: diam/1.5
//             }, 250);
//         },
//         function() {
//             this.animate({
//                 fill: "#777",
//                 r: diam/2
//             }, 250);
//         }
//     )
// }

// var createBlobs = function(startX, startY, radius, numCir, spacingX, spacingY, createShapeFunction) {
//     var radius = radius;
//     var diam = radius*2;
//     var _startX = startX;
//     var _startY = startY;

//     for (var i = 0; i < numCir; i++) {
//         createShapeFunction(_startX, _startY, radius, radius);
//         _startX = _startX + spacingX;

//         if (i == 2) {
//             _startX = startX;
//             _startY = _startY + spacingY;
//         }

//     }
// }

// var diam = 100;
// var ratioSquareX = diam*1.3;
// var ratioSquareY = diam*1.3;
// var ratioCircleX = diam*1.8;
// var ratioCircleY = diam*1.45;
// createBlobs(200, 100, diam/2, 6, ratioCircleX, ratioCircleY, createCircle);


