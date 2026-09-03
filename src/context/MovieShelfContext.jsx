import { createContext, useContext, useEffect, useState } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import { db, firebaseEnabled } from '../firebase';
const MovieShelfContext = createContext();
export function MovieShelfProvider({children}) { const [movies,setMovies]=useState([]); const [loading,setLoading]=useState(firebaseEnabled); useEffect(()=>{if(!firebaseEnabled){setLoading(false);return;} return onSnapshot(collection(db,'movies'), snap=>{setMovies(snap.docs.map(doc=>({id:doc.id,...doc.data()})).sort((a,b)=>(b.addedAt||'').localeCompare(a.addedAt||'')));setLoading(false)},()=>setLoading(false))},[]); return <MovieShelfContext.Provider value={{movies,loading}}>{children}</MovieShelfContext.Provider> }
export const useMovieShelf=()=>useContext(MovieShelfContext);
