import { createContext, useContext, useEffect, useState } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import { db, firebaseEnabled } from '../firebase';

const MovieShelfContext = createContext();
const toArray = (v) => (Array.isArray(v) ? v.map(String).filter(Boolean) : []);
const num = (v, fallback = 0) => { const n = Number(v); return Number.isFinite(n) ? n : fallback; };
const str = (v, fallback = '') => (v === null || v === undefined) ? fallback : String(v);
const sanitizeMovie = (raw) => {
  const rating = num(raw.rating, 8);
  return {
    id: raw.id,
    title: str(raw.title, 'Untitled'),
    year: num(raw.year),
    director: str(raw.director, 'Unknown'),
    runtime: num(raw.runtime),
    rating,
    poster: str(raw.poster),
    backdrop: str(raw.backdrop),
    trailerUrl: str(raw.trailerUrl),
    tagline: str(raw.tagline),
    myTake: str(raw.myTake),
    whyIRecommend: str(raw.whyIRecommend),
    genres: toArray(raw.genres),
    moods: toArray(raw.moods),
    tags: toArray(raw.tags),
    whoShouldWatch: toArray(raw.whoShouldWatch),
    ratings: raw.ratings && typeof raw.ratings === 'object'
      ? { story: num(raw.ratings.story, rating), characters: num(raw.ratings.characters, rating), cinematography: num(raw.ratings.cinematography, rating), emotion: num(raw.ratings.emotion, rating), rewatchability: num(raw.ratings.rewatchability, rating) }
      : { story: rating, characters: rating, cinematography: rating, emotion: rating, rewatchability: rating },
    favorite: Boolean(raw.favorite),
    featured: Boolean(raw.featured),
    addedAt: str(raw.addedAt, ''),
  };
};

export function MovieShelfProvider({ children }) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(firebaseEnabled);
  const [error, setError] = useState('');
  useEffect(() => {
    if (!firebaseEnabled) { setLoading(false); return; }
    return onSnapshot(
      collection(db, 'movies'),
      (snap) => {
        setMovies(snap.docs.map((doc) => sanitizeMovie({ id: doc.id, ...doc.data() })).sort((a, b) => (b.addedAt || '').localeCompare(a.addedAt || '')));
        setLoading(false);
      },
      (e) => { setLoading(false); setError(`Could not load the shelf: ${e?.message || 'Firestore unreachable.'}`); }
    );
  }, []);
  return <MovieShelfContext.Provider value={{ movies, loading, error }}>{children}</MovieShelfContext.Provider>;
}
export const useMovieShelf = () => useContext(MovieShelfContext);