// Key for localStorage
const STORAGE_KEY = "favorite"

// Get favorites array from localStorage
function getFavorites() {
    const data = localStorage.getItem(STORAGE_KEY)
    
    // If nothing saved yet, return empty array
    if (data === null) {
        return []
    }
    try {
        return JSON.parse(data)
    }
    catch (error) {
        // If error return []
        return []
        

    }
}

// Save favorites array to localStorage
function saveFavorites(array) {
    const json = JSON.stringify(array)
    localStorage.setItem(STORAGE_KEY, json)
}

// Add book to favorites (if not already there)
function addToFavorites(book) {
    const favorite = getFavorites();
    
    // Check if book already exists by key
    const alreadyExist = favorite.some(el => el.key === book.key)
    if (alreadyExist) {
        return
    }
    favorite.push(book)
    saveFavorites(favorite)
}

// Remove book from favorites by id
function removeFromFavorites(id){
    const remove = getFavorites();
    // Filter out the book with matching id
    const unRemove = remove.filter(el=>el.key!==id)
    saveFavorites(unRemove)
}

export {
  getFavorites,
  addToFavorites,
  removeFromFavorites
}