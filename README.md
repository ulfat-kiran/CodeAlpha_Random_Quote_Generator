
# QuoteVerse — Random Quote Generator

QuoteVerse is a modern, responsive quote generator designed to make discovering daily inspiration simple and enjoyable. It brings together elegant typography, a clean interface, and useful features in one application.

## Live Demo

https://flashcard-quiz-app-mkfr.vercel.app/

## Features

- Discover inspirational quotes from different categories.
- Generate another random quote with one click.
- Browse quotes by Motivation, Success, Wisdom, Confidence, Courage, Happiness, and Kindness.
- Search quotes by text, author, or category.
- Save and remove favourite quotes.
- Keep favourites and theme preferences in browser local storage.
- Copy quotes to the clipboard.
- Share quotes using the browser's native sharing feature when available.
- Switch between dark and light themes.
- Responsive layout for desktop, tablet, and mobile screens.
- Animated interface, toast notifications, and accessible button labels.

## Built With

- React
- Vite
- JavaScript (ES6+)
- CSS3
- Lucide React
- Browser Local Storage API
- Clipboard API
- Web Share API

## Getting Started

### Prerequisites

- Node.js and npm
- Git
- A GitHub account

### Installation

Clone the repository:

```bash
git clone https://github.com/YOUR-USERNAME/CodeAlpha_Random_Quote_Generator.git
```

Open the project directory:

```bash
cd CodeAlpha_Random_Quote_Generator
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open the local URL displayed in your terminal.

## Production Build

Run:

```bash
npm run build
```

To preview the production build locally:

```bash
npm run preview
```

## Project Structure

```text
CodeAlpha_Random_Quote_Generator/
├── public/
├── src/
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── .gitignore
├── index.html
├── package.json
├── package-lock.json
└── README.md
```

## How It Works

The application stores its quote collection in JavaScript and filters quotes according to the selected category and search term. React state manages the current quote, theme, and favourites. Browser local storage preserves saved favourites and the selected theme between visits on the same browser.

## Privacy

QuoteVerse does not require an account or a backend database. Favourites and theme preferences are saved locally in the browser. Clearing browser storage can remove these saved preferences.

## Future Improvements

- Add more curated quotes and categories.
- Introduce daily quote reminders.
- Add user-created quotes and exportable collections.
- Add optional online quote synchronization.

## Internship Project

Developed as part of the CodeAlpha App Development Internship.

## Author

Ulfat Kiran

GitHub: https://github.com/ulfat-kiran

