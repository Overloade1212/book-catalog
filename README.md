# Book Catalog

## Task
[Task document](https://drive.google.com/file/d/1RBRcuH-_oAvtjem5Xs0c4NXZ8I38aYyH/view)

## How to run the app
Make sure you have Node.js and npm installed on your machine.

1. Install dependencies:
   npm install

2. Start the development server:
   npm run dev
   Open the local URL that appears in the terminal to use the app.

3. Build for production:
   npm run build
   This generates the optimized dist/ folder with the final HTML, JS bundle, and assets, ready for deployment.

4. Preview the production build locally:
   npm run preview

## Project Structure
- src/components/ — Reusable UI parts, like the book card component
- src/services/ — Handles API requests and saving/loading favorites from localStorage
- src/utils/ — Helper functions, mainly the debounce utility for live search
- src/theme/ — Logic for switching and saving light/dark theme preferences
- src/styles/ — Main CSS file with responsive styles and theme variables
- src/assets/ — Static files like placeholders and icons
- src/main.js — Entry point that connects everything together
- public/ — Files served directly without processing
- dist/ — Output folder containing the final production build

## Live Demo
[Open deployed app](https://test-tsk.netlify.app/)