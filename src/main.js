import './styles/main.css'
import { searchBooks } from './services/api.js'
import { createBookCard } from './components/BookCard.js'
import { getFavorites } from './services/storage.js'
import { debounce } from './utils/debouns.js' 
import { toggleTheme, initTheme, getTheme } from './theme/themeManager.js'

// Grab main DOM elements
const bookContainer = document.getElementById("book-container")
const searchInput = document.getElementById("search-input")
const statusEl = document.getElementById("status")
const favoriteCard = document.getElementById("favorite-card")
const themeButton = document.getElementById("theme-toggle")
const authorInput = document.getElementById("author-filter")

// Debounced handlers to avoid spamming API on every keystroke
const handleSearchD = debounce(handleSearch)
const handleAuthorFilterD = debounce(handleAuthorFilter)

// Cache current search results 
let currentBooks = []

// Attach live search and author filter listeners
authorInput.addEventListener("input", handleAuthorFilterD)
searchInput.addEventListener("input", handleSearchD)

// Run on page load: render favorites and apply saved theme
function init() {
    renderFavorites()
    initTheme()
    updateThemeIcon()
}

// Clear container & draw new book cards
function renderBooks(books) {
    bookContainer.innerHTML = ''
    books.forEach(book => {
        const card = createBookCard(book, renderFavorites)
        bookContainer.appendChild(card)
    })
}

// Update toggle button icon based on active theme
function updateThemeIcon() {
    const current = getTheme()
    themeButton.textContent = current === "dark" ? "☀️" : "🌙"
}

// Show error & clear results
function showError(message) {
    statusEl.textContent = message
    clearBooks()
}

// Helper to wipe book container
function clearBooks() {
    bookContainer.innerHTML = ''
}

// Show loading state
function showLoading() {
    statusEl.textContent = "Loading..."
    clearBooks()
}

// Show "nothing found" state
function showEmpty() {
    statusEl.textContent = "Nothing found"
    clearBooks()
}

// Clear status text
function clearStatus() {
    statusEl.textContent = ""
}

// Main search flow: validate → fetch → render
async function handleSearch() {
    const text = searchInput.value.trim()
    if (!text) {
        showError("Please enter a book name")
        return
    }

    showLoading()
    try {
        const response = await searchBooks(text)
        if (response.length === 0) {
            showEmpty()
        } else {
            clearStatus()
            // Render up to 10 results & cache for filtering
            renderBooks(response.slice(0, 10))
            currentBooks = response
        }
    } catch (error) {
        showError("Network error")
    }
}

//Favorites list from localStorage
function renderFavorites() {
    const favoritesArr = getFavorites()
    favoriteCard.innerHTML = ''

    if (favoritesArr.length === 0) {
        const empty = document.createElement('p')
        empty.textContent = 'No favorites yet'
        empty.style.cssText = 'color:var(--text-muted);font-size:14px;margin:0;grid-column:1/-1;'
        favoriteCard.appendChild(empty)
        return
    }

    favoritesArr.forEach(book => {
        const card = createBookCard(book, renderFavorites)
        favoriteCard.appendChild(card)
    })
}

// Filter cached results by author name 
function handleAuthorFilter() {
    const filterText = authorInput.value.trim().toLowerCase()

    // If filter is empty, restore original search results
    if (!filterText) {
        renderBooks(currentBooks.slice(0, 10))
        return
    }

    // Match author names against filter text
    const filtered = currentBooks.filter(book => {
        if (book.author_name) {
            return book.author_name.some(author =>
                author.toLowerCase().includes(filterText)
            )
        }
        return false
    })

    renderBooks(filtered.slice(0, 10))
}

// Handle theme switch button click
themeButton.addEventListener('click', function() {
    toggleTheme()
    updateThemeIcon()
})

// Start the app
init()