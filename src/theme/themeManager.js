// localStorage key for theme preference
const THEME_KEY = "app_theme";

// Get saved theme, default to light if nothing stored
export function getTheme() {
    const theme = localStorage.getItem(THEME_KEY);
    if (theme === null) {
        return "light";
    } else {
        return theme;
    }
}

// Save to localStorage
function saveTheme(theme) {
    localStorage.setItem(THEME_KEY, theme);
}

// Apply theme 
function applyTheme(theme) {
    const bodyEl = document.body;
    if (theme === "dark") {
        bodyEl.classList.add("dark");
    } else {
        bodyEl.classList.remove("dark");
    }
}

// Switch between light and dark themes
export function toggleTheme() {
    const current = getTheme();
    let newTheme;
    if (current === 'light') {
        newTheme = 'dark';
    } else {
        newTheme = 'light';
    }
    saveTheme(newTheme);
    applyTheme(newTheme);
}

// Load and apply theme on app start
export function initTheme() {
    const theme = getTheme();
    applyTheme(theme);
}