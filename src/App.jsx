
import { useEffect, useMemo, useState } from "react";
import {
  ArrowRight, Bookmark, Check, ChevronDown, Heart,
  Lightbulb, Moon, Quote, RefreshCw, Search, Share2,
  Sparkles, Sun, Trash2, X, Copy
} from "lucide-react";
import "./index.css";

const quotes = [
  { text: "It always seems impossible until it's done.", author: "Nelson Mandela", category: "Motivation" },
  { text: "The secret of getting ahead is getting started.", author: "Mark Twain", category: "Success" },
  { text: "Believe you can and you're halfway there.", author: "Theodore Roosevelt", category: "Confidence" },
  { text: "Great things are done by a series of small things brought together.", author: "Vincent van Gogh", category: "Success" },
  { text: "In the middle of difficulty lies opportunity.", author: "Albert Einstein", category: "Wisdom" },
  { text: "You are never too old to set another goal or to dream a new dream.", author: "C. S. Lewis", category: "Motivation" },
  { text: "Everything you've ever wanted is sitting on the other side of fear.", author: "George Addair", category: "Courage" },
  { text: "Do what you can, with what you have, where you are.", author: "Theodore Roosevelt", category: "Motivation" },
  { text: "Success is the sum of small efforts, repeated day in and day out.", author: "Robert Collier", category: "Success" },
  { text: "Act as if what you do makes a difference. It does.", author: "William James", category: "Wisdom" },
  { text: "The only way out is through.", author: "Robert Frost", category: "Courage" },
  { text: "Be yourself; everyone else is already taken.", author: "Oscar Wilde", category: "Confidence" },
  { text: "Nothing will work unless you do.", author: "Maya Angelou", category: "Success" },
  { text: "You must do the things you think you cannot do.", author: "Eleanor Roosevelt", category: "Courage" },
  { text: "Happiness depends upon ourselves.", author: "Aristotle", category: "Happiness" },
  { text: "No act of kindness, no matter how small, is ever wasted.", author: "Aesop", category: "Kindness" },
  { text: "The purpose of our lives is to be happy.", author: "Dalai Lama", category: "Happiness" },
  { text: "Turn your wounds into wisdom.", author: "Oprah Winfrey", category: "Wisdom" },
  { text: "A journey of a thousand miles begins with a single step.", author: "Lao Tzu", category: "Motivation" },
  { text: "If opportunity doesn't knock, build a door.", author: "Milton Berle", category: "Success" },
  { text: "It is never too late to be what you might have been.", author: "George Eliot", category: "Courage" },
  { text: "The best way to predict the future is to create it.", author: "Peter Drucker", category: "Success" },
  { text: "Nothing diminishes anxiety faster than action.", author: "Walter Anderson", category: "Courage" },
  { text: "What we think, we become.", author: "Buddha", category: "Wisdom" },
  { text: "Keep your face always toward the sunshine, and shadows will fall behind you.", author: "Walt Whitman", category: "Happiness" },
  { text: "Be the reason someone smiles today.", author: "Roy T. Bennett", category: "Kindness" },
  { text: "Kind words can be short and easy to speak, but their echoes are truly endless.", author: "Mother Teresa", category: "Kindness" },
  { text: "The future depends on what you do today.", author: "Mahatma Gandhi", category: "Motivation" },
  { text: "You have power over your mind, not outside events.", author: "Marcus Aurelius", category: "Wisdom" },
  { text: "Fall seven times, stand up eight.", author: "Japanese Proverb", category: "Courage" },
  { text: "Difficult roads often lead to beautiful destinations.", author: "Zig Ziglar", category: "Motivation" },
  { text: "If you can dream it, you can do it.", author: "Walt Disney", category: "Confidence" },
  { text: "Try to be a rainbow in someone's cloud.", author: "Maya Angelou", category: "Kindness" },
  { text: "The most wasted of days is one without laughter.", author: "E. E. Cummings", category: "Happiness" },
  { text: "Knowing yourself is the beginning of all wisdom.", author: "Aristotle", category: "Wisdom" },
  { text: "Your life does not get better by chance, it gets better by change.", author: "Jim Rohn", category: "Success" },
  { text: "Be gentle with yourself. You're doing the best you can.", author: "Unknown", category: "Happiness" },
  { text: "Small steps every day add up to big results.", author: "Unknown", category: "Motivation" },
  { text: "The brave may not live forever, but the cautious do not live at all.", author: "Richard Branson", category: "Courage" },
  { text: "What you do today can improve all your tomorrows.", author: "Ralph Marston", category: "Success" }
];

const categories = ["All", "Motivation", "Success", "Wisdom", "Confidence", "Courage", "Happiness", "Kindness"];

function readSaved(key, fallback) {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
}

export default function App() {
  const [dark, setDark] = useState(() => readSaved("qv-theme", true));
  const [favorites, setFavorites] = useState(() => readSaved("qv-favorites", []));
  const [current, setCurrent] = useState(0);
  const [category, setCategory] = useState("All");
  const [view, setView] = useState("discover");
  const [search, setSearch] = useState("");
  const [notice, setNotice] = useState("");

  const visibleQuotes = useMemo(() => {
    let list = view === "favorites"
      ? quotes.filter((q) => favorites.includes(q.text))
      : quotes;

    if (category !== "All") {
      list = list.filter((q) => q.category === category);
    }

    if (search.trim()) {
      const term = search.toLowerCase();
      list = list.filter((q) =>
        `${q.text} ${q.author} ${q.category}`.toLowerCase().includes(term)
      );
    }

    return list;
  }, [category, favorites, search, view]);

  const activeQuote = visibleQuotes[current] || visibleQuotes[0] || null;

  useEffect(() => {
    localStorage.setItem("qv-theme", JSON.stringify(dark));
  }, [dark]);

  useEffect(() => {
    localStorage.setItem("qv-favorites", JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    setCurrent(0);
  }, [category, view, search]);

  function showNotice(message) {
    setNotice(message);
    window.setTimeout(() => setNotice(""), 2200);
  }

  function newQuote() {
    if (visibleQuotes.length < 2) {
      showNotice("Try another category for more quotes");
      return;
    }

    let next = current;
    while (next === current) {
      next = Math.floor(Math.random() * visibleQuotes.length);
    }
    setCurrent(next);
  }

  function toggleFavorite(quote) {
    if (favorites.includes(quote.text)) {
      setFavorites((old) => old.filter((item) => item !== quote.text));
      showNotice("Removed from favourites");
    } else {
      setFavorites((old) => [...old, quote.text]);
      showNotice("Saved to your collection");
    }
  }

  async function copyQuote(quote) {
    const text = `“${quote.text}” — ${quote.author}`;
    try {
      await navigator.clipboard.writeText(text);
      showNotice("Quote copied to clipboard!");
    } catch {
      showNotice("Copy is unavailable in this browser");
    }
  }

  async function shareQuote(quote) {
    const text = `“${quote.text}” — ${quote.author}\n\nDiscover inspiration with QuoteVerse.`;
    if (navigator.share) {
      try {
        await navigator.share({ title: "QuoteVerse", text });
      } catch (error) {
        if (error.name !== "AbortError") showNotice("Unable to share right now");
      }
    } else {
      try {
        await navigator.clipboard.writeText(text);
        showNotice("Share text copied!");
      } catch {
        showNotice("Sharing is unavailable in this browser");
      }
    }
  }

  return (
    <main className={dark ? "app dark" : "app light"}>
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />

      <header className="navbar">
        <a className="brand" href="#home" onClick={() => { setView("discover"); setCategory("All"); }}>
          <span className="brand-mark"><Quote size={21} strokeWidth={2.5} /></span>
          <span>quote<span className="brand-accent">verse</span><small>WORDS THAT MOVE YOU</small></span>
        </a>

        <nav className="nav-links">
          <button className={view === "discover" ? "nav-link active" : "nav-link"} onClick={() => setView("discover")}>Discover</button>
          <button className={view === "favorites" ? "nav-link active" : "nav-link"} onClick={() => setView("favorites")}>My collection <span className="nav-count">{favorites.length}</span></button>
        </nav>

        <button className="theme-button" onClick={() => setDark(!dark)} aria-label="Toggle color theme" title="Toggle theme">
          {dark ? <Sun size={19} /> : <Moon size={19} />}
        </button>
      </header>

      <section className="hero" id="home">
        <div className="eyebrow"><Sparkles size={14} /> YOUR DAILY MOMENT OF CLARITY</div>
        <h1>Words have the power<br />to <span>change everything.</span></h1>
        <p className="hero-copy">A little inspiration can shift your whole perspective.<br className="desktop-break" /> Find the words you need, exactly when you need them.</p>
      </section>

      <section className="workspace">
        <div className="section-top">
          <div>
            <p className="section-kicker">{view === "favorites" ? "YOUR PERSONAL LIBRARY" : "A LITTLE WISDOM FOR TODAY"}</p>
            <h2>{view === "favorites" ? "Your collection" : "The inspiration space"} <span className="sparkle">✳</span></h2>
          </div>
          <div className="quote-count"><span className="count-dot" /> {visibleQuotes.length} {visibleQuotes.length === 1 ? "quote" : "quotes"} found</div>
        </div>

        <div className="tools-row">
          <div className="category-list" aria-label="Quote categories">
            {categories.map((item) => (
              <button key={item} className={category === item ? "category-chip selected" : "category-chip"} onClick={() => setCategory(item)}>
                {item}
              </button>
            ))}
          </div>
          <label className="search-box">
            <Search size={16} />
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Find a quote..." aria-label="Search quotes" />
            {search && <button onClick={() => setSearch("")} aria-label="Clear search"><X size={14} /></button>}
          </label>
        </div>

        {activeQuote ? (
          <article className="quote-card" key={`${activeQuote.text}-${view}-${category}`}>
            <div className="card-topline">
              <span className="card-label"><span className="label-icon"><Lightbulb size={14} /></span> A THOUGHT TO KEEP</span>
              <span className="card-index">{String(current + 1).padStart(2, "0")} <span>/ {String(visibleQuotes.length).padStart(2, "0")}</span></span>
            </div>

            <div className="quote-symbol">“</div>
            <blockquote>{activeQuote.text}</blockquote>
            <div className="author-row">
              <span className="author-line" />
              <div><p className="author-name">{activeQuote.author}</p><p className="author-caption">A voice worth remembering</p></div>
            </div>

            <div className="card-bottom">
              <span className="quote-category">{activeQuote.category}</span>
              <div className="quote-actions">
                <button className={favorites.includes(activeQuote.text) ? "icon-action favorited" : "icon-action"} onClick={() => toggleFavorite(activeQuote)} aria-label="Toggle favourite" title="Save to favourites">
                  <Heart size={18} fill={favorites.includes(activeQuote.text) ? "currentColor" : "none"} />
                </button>
                <button className="icon-action" onClick={() => copyQuote(activeQuote)} aria-label="Copy quote" title="Copy quote"><Copy size={17} /></button>
                <button className="icon-action" onClick={() => shareQuote(activeQuote)} aria-label="Share quote" title="Share quote"><Share2 size={17} /></button>
              </div>
            </div>
          </article>
        ) : (
          <div className="empty-state">
            <span className="empty-icon"><Bookmark size={26} /></span>
            <h3>{view === "favorites" ? "Your story starts here" : "No quotes found"}</h3>
            <p>{view === "favorites" ? "Save the words that speak to you, and they will be waiting here." : "Try a different search or choose another category."}</p>
            {view === "favorites" && <button className="primary-button small-button" onClick={() => setView("discover")}>Discover quotes <ArrowRight size={16} /></button>}
            {view === "discover" && <button className="secondary-button" onClick={() => { setSearch(""); setCategory("All"); }}>Clear filters</button>}
          </div>
        )}

        {activeQuote && (
          <div className="card-controls">
            <button className="secondary-button" onClick={() => setCurrent((current - 1 + visibleQuotes.length) % visibleQuotes.length)} disabled={visibleQuotes.length < 2}>
              Previous
            </button>
            <button className="primary-button" onClick={newQuote}>
              <RefreshCw size={16} /> New quote <ArrowRight size={16} />
            </button>
            <button className="secondary-button" onClick={() => setCurrent((current + 1) % visibleQuotes.length)} disabled={visibleQuotes.length < 2}>
              Next <ArrowRight size={15} />
            </button>
          </div>
        )}

        <p className="keyboard-hint"><Sparkles size={13} /> Pause for a moment. Take what you need.</p>
      </section>

      <section className="bottom-note">
        <div className="note-icon"><Heart size={20} /></div>
        <div><h3>Keep the words that stay with you.</h3><p>Your favourite quotes are saved on this device, ready whenever you need a little perspective.</p></div>
        <button className="note-link" onClick={() => setView("favorites")}>My collection <ArrowRight size={16} /></button>
      </section>

      <footer className="footer">
        <a className="footer-brand" href="#home"><Quote size={15} /> QuoteVerse</a>
        <span>Made for the moments that matter.</span>
        <span>© {new Date().getFullYear()} QuoteVerse</span>
      </footer>

      {notice && <div className="toast" role="status"><Check size={17} /> {notice}</div>}
    </main>
  );
}