import './assets/case'

import gsap from "gsap"
import getMousePosition from "./utils/dom"

class Dragon {
    constructor(elements){

        this.elements = typeof elements == 'string' ? document.querySelectorAll(elements) : elements;

        this.isDragging = false
        
        this.computedPosition = { x: 0, y: 0 };
        this.startPoint = { x: 0, y: 0 };
        this.latestPosition = { x: 0, y: 0 };
        this.dragDistance = { x: 0, y: 0 },

        this.target,
        this.zIndex = 0,

        this.bindEvents();

    }

    getStylePosition( element ){
        const style = getComputedStyle(element);
        const x = parseInt(style.getPropertyValue('left'));
        const y = parseInt(style.getPropertyValue('top'));

        // clean up 'auto' or other non-integer values
        this.computedPosition.x = isNaN( x ) ? 0 : x;
        this.computedPosition.y = isNaN( y ) ? 0 : y;
    }

    onDragStart( event ){
        if( event.button !== 0) return
    
        this.isDragging = true
    
        event.preventDefault()
     
        this.target = event.target;
    
        this.getStylePosition(this.target);
    
        this.startPoint.x = getMousePosition(event).x;
        this.startPoint.y = getMousePosition(event).y;
    
        this.latestPosition.x = this.computedPosition.x
        this.latestPosition.y = this.computedPosition.y
    
        gsap.set(this.target, {
            zIndex: 103,
        })
    }
    
    onDragMove( event ){
        if ( !this.isDragging ) return
        
        this.dragDistance.x = this.startPoint.x - getMousePosition(event).x,
        this.dragDistance.y = this.startPoint.y - getMousePosition(event).y;
    
        this.latestPosition.x = -this.dragDistance.x + this.computedPosition.x;
        this.latestPosition.y = -this.dragDistance.y + this.computedPosition.y;
        
        gsap.set(this.target, {
           x: -this.dragDistance.x,
           y: -this.dragDistance.y
        })
    
    }
    
    onDragEnd( event ){
        this.isDragging = false
        
        this.zIndex++

        gsap.set(this.target, {
            zIndex: 1 + this.zIndex,    
            x: 0,
            y: 0,
            left: this.latestPosition.x,
            top: this.latestPosition.y
        })
    
    }
    
    bindEvents(){
        this.elements.forEach(element => {
            element.addEventListener('mousedown', this.onDragStart.bind(this))
        })
        document.addEventListener('mousemove', this.onDragMove.bind(this))
        document.addEventListener('mouseup', this.onDragEnd.bind(this))
    }   
    
}

let elements = document.querySelectorAll('.item');

let drag = new Dragon(elements);
