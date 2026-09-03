import MovieCard from './MovieCard'; export default function MovieGrid({movies}){return <div className="movie-grid">{movies.map(movie=><MovieCard movie={movie} key={movie.id}/>)}</div>}
