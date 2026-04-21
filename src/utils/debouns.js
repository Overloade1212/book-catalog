// Delay function
export function debounce(action, ms = 500) {
    let id // Timeout ID to track and clear pending calls
    
    return function (...args) {
        const context = this // Keep original 'this' reference

        clearTimeout(id) // Cancel previous timer on each new input

        id = setTimeout(() => {
            action.apply(context, args) // Run original function with correct context and args
        }, ms)
    }
}