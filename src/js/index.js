import {getMousePosition, getTransformValues, addClass, removeClass} from "./utils/dom"

import './assets/images'

class Draggula {
    constructor(elements, options) {
        this.$elements = typeof elements === 'string' ? document.querySelectorAll(elements) : elements
        this.options = options

        this.isDragging = false
        this.zIndex = 0
        this.dragDistance = { x: 0, y: 0 }
        this.startPoint = { x: 0, y: 0 }
    }

    onDragStart(event) {
        event.preventDefault()

        // checks if mouse left button was clicked, not mouse wheel or mouse right button
        if (event.button !== 0) return

        this.isDragging = true

        this.target = event.target

        this.startPoint.x = getMousePosition(event, true).x - getTransformValues(this.target).x
        this.startPoint.y = getMousePosition(event, true).y - getTransformValues(this.target).y

        addClass(this.target, this.options.activeClass)
        this.target.style.zIndex = `${1 + ++this.zIndex}`
    }

    onDragMove(event) {
        if (!this.isDragging) return

        this.dragDistance.x = this.startPoint.x - getMousePosition(event, true).x
        this.dragDistance.y = this.startPoint.y + (-getMousePosition(event, true).y)

        this.transformUpdate(-this.dragDistance.x, -this.dragDistance.y)
    }

    onDragEnd() {
        if (this.isDragging) {
            const
                elementLastPositionX = -this.dragDistance.x,
                elementLastPositionY = -this.dragDistance.y

            this.isDragging = false

            removeClass(this.target, this.options.activeClass)
            this.target.style.zIndex = `${1 + this.zIndex}`
            this.transformUpdate(elementLastPositionX, elementLastPositionY)
        }
    }

    transformUpdate(xValue, yValue) {
        this.target.style.transform = `translate(${xValue}px, ${yValue}px)`
    }

    init() {
        this.onDragStartHandler = this.onDragStart.bind(this)
        this.onDragMoveHandler = this.onDragMove.bind(this)
        this.onDragEndHandler = this.onDragEnd.bind(this)

        this.$elements.forEach(element => {
            element.addEventListener('mousedown', this.onDragStartHandler)
        })
        document.addEventListener('mousemove', this.onDragMoveHandler)
        document.addEventListener('mouseup', this.onDragEndHandler)
    }

    destroy() {
        this.$elements.forEach(element => {
            if (this.options.clearTransformStyleOnDestroy) {
                element.style.transform = ''
            }

            element.removeEventListener('mousedown', this.onDragStartHandler)
        })
        document.removeEventListener('mousemove', this.onDragMoveHandler)
        document.removeEventListener('mouseup', this.onDragEndHandler)
    }
}

const drag = new Draggula(document.querySelectorAll('.js-draggable'), {
    activeClass: 'active',
    clearTransformStyleOnDestroy: false
})

drag.init()

document.getElementById('destroy').addEventListener('click', ()=> {
    drag.destroy()
})

document.getElementById('init').addEventListener('click', ()=> {
    drag.init()
})
