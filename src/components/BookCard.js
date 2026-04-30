import { addToFavorites } from "../services/storage"
import { getFavorites } from "../services/storage"
import { removeFromFavorites } from "../services/storage"


export function createBookCard(book, onFavorite) {
    //Create DOM elements for the card stucture
    const card = document.createElement('div')
    const imageCard = document.createElement('img')
    const nameBook = document.createElement("h3")
    const authorName = document.createElement("p")
    const yearBook = document.createElement("p")
    const button = document.createElement("button")
    //Set basic text content 
    nameBook.textContent = book.title || "No title"
    button.textContent = "Add to favorites"
    imageCard.alt = book.title || "Book cover"
    //Css classes for styling
    button.classList.add("favorite-btn")
    card.classList.add('book-card');
    imageCard.classList.add("book-cover")
    nameBook.classList.add("book-title")
    authorName.classList.add("book-author")
    yearBook.classList.add("book-year")

    //use API cover or fallback placeholder
    if (book.cover_i) {
        imageCard.src = `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
    } else {
        imageCard.src = "/placeholder.svg"
    }
    //join array or show default text
    if (book.author_name) {
        authorName.textContent = book.author_name.join(", ")
    }
    else {
        authorName.textContent = "Unknown author"
    }
    //handle publication year with fallback
    if (book.first_publish_year) {
        yearBook.textContent = book.first_publish_year
    }
    else {
        yearBook.textContent = "Unknown year"
    }
    // Check if book is already in favorites to set correct button state
    const favoriteList = getFavorites();
    if (favoriteList.some(el => el.key === book.key)) {
        button.textContent = "Remove from favorites"
    } else {
        button.textContent = "Add to favorites"
    }
    // Add click handler for toggle favorite functionality
    button.addEventListener('click', function () {
        const favoriteList = getFavorites();
        //if book exists in favorites => remove it
        if (favoriteList.some(el => el.key === book.key)) {

            removeFromFavorites(book.key)
            onFavorite()
            button.textContent = "Add to favorites"
        // If book not in favorites -> add it
        } else {
            addToFavorites(book)
            onFavorite()
            button.textContent = "Remove from favorites"

        }

    })

    // Assemble the card by appending all child elements
    card.append(
        imageCard,
        nameBook,
        authorName,
        yearBook,
        button
    )

    return card;
}