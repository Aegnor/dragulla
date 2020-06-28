import './assets/case'

import gsap from "gsap"
import getMousePosition from "./utils/dom"


// мы могли это сделать и через класс
let elements = document.querySelectorAll('.item');

let dragState = false

let position = { x: 0, y: 0 };
let startPoint = { x: 0, y: 0 };
let dragPoint = { x: 0, y: 0 };

let 
    target,
    zIndex = 0,
    lastPosX = 0,
    lastPosY = 0,
    distanceX = 0,
    distanceY = 0;

function getPositionCoord( styleSide, measure ) {
    if ( styleSide.indexOf('%') != -1 ) {
      // convert percent into pixel for Safari, #75
      var parentSize = getSize( this.element.parentNode );
      // prevent not-in-DOM element throwing bug, #131
      return !parentSize ? 0 :
        ( parseFloat( styleSide ) / 100 ) * parentSize[ measure ];
    }
    return parseInt( styleSide, 10 );
};

function getStylePosition( element ){
    var style = getComputedStyle(element);
    var x = getPositionCoord( style.left, 'width' );
    var y = getPositionCoord( style.top, 'height' );
    // clean up 'auto' or other non-integer values
    position.x = isNaN( x ) ? 0 : x;
    position.y = isNaN( y ) ? 0 : y;
}

function onDragStart( event ){
    if( event.button !== 0) return

    dragState = true

    event.preventDefault()
 
    target = event.target;

    getStylePosition(target);

    zIndex++

    startPoint.x = getMousePosition(event).x;
    startPoint.y = getMousePosition(event).y;

    lastPosX = position.x
    lastPosY = position.y

    gsap.set(target, {
        zIndex: 103,
    })
}

function onDragMove( event ){
    if ( !dragState ) return

    dragPoint.x = getMousePosition(event).x;
    dragPoint.y = getMousePosition(event).y;
    
    distanceX = startPoint.x - dragPoint.x,
    distanceY = startPoint.y - dragPoint.y;

    console.log(distanceX, distanceY)

    console.log(distanceX !== 0, distanceY !== 0)

    lastPosX = -distanceX + position.x;
    lastPosY = -distanceY + position.y;
    

    gsap.set(target, {
       x: -distanceX,
       y: -distanceY
    })

}

function onDragEnd( event ){
    dragState = false

    gsap.set(target, {
        zIndex: 1 + zIndex,
        x: 0,
        y: 0,
        left: lastPosX,
        top: lastPosY
    })

}

elements.forEach(element => {
    element.addEventListener('mousedown', onDragStart)
})
document.addEventListener('mousemove', onDragMove)
document.addEventListener('mouseup', onDragEnd)
