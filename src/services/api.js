// Search books through Open Library API
export async function searchBooks(query) {
    // Check if query is not empty
    if (!query || !query.trim()) {
        throw new Error("Query is empty")
    }

    //URL 
    const url = `https://openlibrary.org/search.json?q=${encodeURIComponent(query)}`

    try {
        const response = await fetch(url)
        // Check for HTTP errors
        if (!response.ok) {
            throw new Error("Network error")
        }
        const data = await response.json()
        // No books found
        if (!data.docs || data.docs.length === 0) {
            throw new Error("No result founds")
        }
        // Return 10 books
        return data.docs.slice(0, 10)
    } catch (error) {
        //catch error
        throw error
    }
}