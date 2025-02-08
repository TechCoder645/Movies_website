import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import TrailerModal from './TrailerModal';

const Header = ({data}) => {
    const [isTrailerOpen, setIsTrailerOpen] = useState(false);

    const handleTrailerClick = (e) => {
        e.preventDefault();
        if (data.videos?.key) {
            setIsTrailerOpen(true);
        }
    };

    return (
      <>
        <div className='w-full h-[90vh] flex flex-col justify-end items-start p-[5%]'
        style={{
          background: `linear-gradient(rgba(0,0,0,.2),rgba(0,0,0,.4),rgba(0,0,0,.7),rgba(0,0,0,.9)),url(https://image.tmdb.org/t/p/original${data.backdrop_path|| data.poster_path || data.profile_path})`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat'
        }}>
          <h1 className='text-5xl font-black text-white w-[70%]'>{data.title || data.name || data.original_name ||data.original_title}</h1>
          <p className='w-[70%] text-white mt-3'>{data.overview.slice(0,200)}...<Link to={`/${data.media_type}/details/${data.id}`} className='text-blue-500'>{''}more</Link>
          </p>
          <p className='text-white flex gap-x-3'><i className="ri-megaphone-fill text-yellow-500 text-xl"></i>{data.release_date || "No Information"}
          <i className="ri-movie-2-fill text-yellow-500 text-xl"></i>{data.media_type.toUpperCase()}
          </p>
          <div className="flex gap-4 mt-2">
            {/* <Link to={`/${data.media_type}/details/${data.id}`} className='px-4 py-2 bg-[#6556CD] rounded text-white font-semibold hover:bg-[#4c3fc4] transition-colors'>
              More Info
            </Link> */}
            <button
              onClick={handleTrailerClick}
              className='px-4 py-2 bg-white/20 backdrop-blur-sm rounded text-white font-semibold hover:bg-white/30 transition-colors flex items-center gap-2'
            >
              <i className="ri-play-circle-fill text-xl"></i>
              Watch Trailer
            </button>
          </div>
        </div>

        <TrailerModal
          isOpen={isTrailerOpen}
          onClose={() => setIsTrailerOpen(false)}
          videoId={data.videos?.key}
        />
      </>
    );
};

export default Header;