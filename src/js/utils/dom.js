const getMousePosition = event => {
    let 
        x = event.clientX,
        y = event.clientY
    
    return { x, y }
}

export default getMousePosition