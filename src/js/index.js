import './assets/case'

import gsap from "gsap"
import getMousePosition from "./utils/dom"

class Drag {
    constructor(elements){
        this.element = document.querySelectorAll(elements);

        this.dragState = false
        
        this.drag = {
            startX: 0,
            startY: 0,
            endX: 0,
            endY: 0,
            x: 0,
            y: 0
        }

        this.addEventListeners()

    }

    onDragStart( event ){
        this.dragState = true
        event.preventDefault()

        const 
            x = getMousePosition(event).x,
            y = getMousePosition(event).y

        this.drag.startX = x
        this.drag.startY = y



        gsap.set(event.target, {
            zIndex: 43
        })
    }

    onDragMove( event ){
        if( !this.dragState ) return
        
        const elements = this.element


        elements.forEach(element => {
          console.log(this)
        })

        let 
            x = getMousePosition(event).x,
            y = getMousePosition(event).y

        this.distanceX = this.drag.startX - x
        this.distanceY = this.drag.startY - y

        this.drag.y = this.drag.endY + this.distanceY
        this.drag.x = this.drag.endX + this.distanceX

        gsap.set(event.target, {
            x: -this.drag.x,
            y: -this.drag.y,
        })
    }

    onDragEnd(event){
        this.dragState = false
        this.drag.endX = this.drag.x
        this.drag.endY = this.drag.y

        let dragX = this.drag.x,
        dragY = this.drag.y;
        console.log(dragY, dragX)
        console.log(event)
    }

    addEventListeners() {
        const elements = this.element


        elements.forEach(element => {
            element.addEventListener('mousedown', this.onDragStart.bind(this))
            element.addEventListener('mousemove', this.onDragMove.bind(this))
            element.addEventListener('mouseup', this.onDragEnd.bind(this))
        })
        document.addEventListener('mouseup', this.onDragEnd.bind(this))

    }

}   

const drag = new Drag('.item')
