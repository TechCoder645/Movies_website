import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { asyncLoadTvShow } from '../../store/actions/tvAction';
import { removeTvShow } from '../../store/reducers/tvSlice';
import Loading from './Loading';
import TrailerModal from './TrailerModal';

const Tvdetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [isTrailerOpen, setIsTrailerOpen] = useState(false);
  
  const { info, loading, error } = useSelector(state => ({
    info: state.tv?.info || null,
    loading: state.tv?.loading || false,
    error: state.tv?.error || null
  }), (prev, next) => {
    return prev.loading === next.loading && 
           prev.error === next.error && 
           prev.info === next.info;
  });

  const dispatch = useDispatch();

  useEffect(() => {
    if (id) {
      dispatch(asyncLoadTvShow(id));
    }
    return () => {
      dispatch(removeTvShow());
    };
  }, [id, dispatch]);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return (
      <div className="w-screen h-screen flex items-center justify-center">
        <p className="text-red-500">Error: {error}</p>
      </div>
    );
  }

  if (!info?.detail) {
    return <Loading />;
  }

  const {
    detail: {
      backdrop_path,
      poster_path,
      name,
      first_air_date,
      episode_run_time,
      vote_average,
      overview,
      genres,
      homepage,
      imdb_id
    },
    videos
  } = info;

  return (
    <>
      <div 
        style={{
          background: `linear-gradient(rgba(0,0,0,.2),rgba(0,0,0,.4),rgba(0,0,0,.7),rgba(0,0,0,.9)),
          url(https://image.tmdb.org/t/p/original${backdrop_path || ''})`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat'
        }}
        className="w-screen min-h-screen px-[10%] py-8 text-white"
      >
        <nav className="w-full text-zinc-400 mb-8">
          <Link
            onClick={() => navigate(-1)}
            className="ri-arrow-left-line hover:text-[#6556CD] mr-5"
          >
            Back
          </Link>
          {homepage && (
            <a href={homepage} target="_blank" rel="noopener noreferrer" className="mr-5 hover:text-[#6556CD]">
              <i className="ri-external-link-fill"></i> Website
            </a>
          )}
          {imdb_id && (
            <a href={`https://www.imdb.com/title/${imdb_id}`} target="_blank" rel="noopener noreferrer" className="hover:text-[#6556CD]">
              IMDB
            </a>
          )}
        </nav>

        <div className="flex flex-col md:flex-row gap-8">
          {poster_path && (
            <div className="w-[300px] flex-shrink-0 relative">
              <img 
                src={`https://image.tmdb.org/t/p/w500${poster_path}`}
                alt={name}
                className="w-full rounded-lg shadow-lg"
              />
              {videos && (
                <button
                  onClick={() => setIsTrailerOpen(true)}
                  className="absolute inset-0 flex items-center justify-center bg-black/40 text-white font-semibold rounded-lg opacity-0 hover:opacity-100 transition-opacity duration-300"
                >
                  <i className="ri-play-circle-fill text-xl"></i>
                  Watch Trailer
                </button>
              )}
            </div>
          )}
          
          <div className="flex-grow">
            <h1 className="text-4xl font-bold mb-4">{name}</h1>
            
            <div className="flex flex-wrap gap-4 mb-6">
              {first_air_date && (
                <span className="text-zinc-400">
                  {new Date(first_air_date).getFullYear()}
                </span>
              )}
              {episode_run_time && episode_run_time.length > 0 && (
                <span className="text-zinc-400">
                  {Math.floor(episode_run_time[0] / 60)}h {episode_run_time[0] % 60}m
                </span>
              )}
              {vote_average && (
                <span className="text-yellow-400">
                  <i className="ri-star-fill mr-1"></i>
                  {vote_average.toFixed(1)}
                </span>
              )}
            </div>

            {genres && genres.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {genres.map(genre => (
                  <span 
                    key={genre.id}
                    className="px-3 py-1 bg-[#6556CD] rounded-full text-sm"
                  >
                    {genre.name}
                  </span>
                ))}
              </div>
            )}

            {overview && (
              <p className="text-zinc-300 leading-relaxed mb-6">
                {overview}
              </p>
            )}
          </div>
        </div>
      </div>

      <TrailerModal
        isOpen={isTrailerOpen}
        onClose={() => setIsTrailerOpen(false)}
        videoId={videos?.key}
      />
    </>
  );
};

export default Tvdetails;