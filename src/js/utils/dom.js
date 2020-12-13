export const getMousePosition = (event, isByPage = false) => {
    if (isByPage) {
        return {
            x: event.pageX,
            y: event.pageY
        }
    }

    return {
        x: event.clientX,
        y: event.clientY
    }
}

export const getTransformValues = selector => {
    const style = getComputedStyle(selector)
    const matrix = style.transform

    if (matrix === 'none') {
        return {
            x: 0,
            y: 0,
        }
    }

    const matrixValues = matrix.match(/matrix.*\((.+)\)/)[1].split(', ')

    return {
        x: matrixValues[4],
        y: matrixValues[5]
    }
}

export const addClass = (selector, className) => {
    selector.classList.add(className)
}

export const removeClass = (selector, className) => {
    selector.classList.remove(className)
}
