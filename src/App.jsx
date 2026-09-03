import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar'; import Footer from './components/Footer';
import Home from './pages/Home'; import Movies from './pages/Movies'; import MovieDetails from './pages/MovieDetails'; import Favorites from './pages/Favorites'; import About from './pages/About'; import Admin from './pages/Admin'; import Login from './pages/Login';
export default function App(){return <><Navbar/><main><Routes><Route path="/" element={<Home/>}/><Route path="/movies" element={<Movies/>}/><Route path="/movies/:id" element={<MovieDetails/>}/><Route path="/favorites" element={<Favorites/>}/><Route path="/about" element={<About/>}/><Route path="/login" element={<Login/>}/><Route path="/admin" element={<Admin/>}/></Routes></main><Footer/></>}
