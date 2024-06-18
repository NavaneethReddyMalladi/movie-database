import {Link} from 'react-router-dom'
import './index.css'

const MovieCard = props => {
  const {movieDetails} = props
  const {id, title, posterpath, voteAverge} = movieDetails

  return (
    <li className="movie-card-container col-12 col-sm-6 col-lg-2 mb-3 d-flex flex-xolumn">
      <img className="movie-card-image" alt={title} src={posterpath} />
      <div className="d-flex flex-column align-items-center mt-2">
        <h1 className="movie-title m-0">{title}</h1>
        <p className="movie-rating mb-0 ms-1">Rating: {voteAverge}</p>
      </div>
      <Link to={`/movie${id}`} className="mt-auto align-self-center">
        <button className="btn btn-outline-succes" type="button">
          View Details
        </button>
      </Link>
    </li>
  )
}

export default MovieCard
