import React from 'react';
import { Link } from 'react-router-dom';
import noImage from '../../assets/no-image.png'; // Import the placeholder image
import { FaStar } from 'react-icons/fa'; // Import the star icon from react-icons
const Cards = ({ data,title }) => {
    return (
        <div className='w-full h-full grid grid-cols-2 md:grid-cols-5 gap-10 p-[2%] bg-[#1F1E24]'>
            {data.map((card, index) => (
                <Link key={index} 
                to={`/${card.media_type || title}/details/${card.id}`}
                 className='w-full h-full relative'>
                    <div className='relative overflow-hidden rounded-lg'>
                        <img
                            className='w-full h-[250px] object-cover rounded-lg shadow-[8px_17px_38px_2px_rgba(0,0,0,0.5)] transform transition-transform duration-300 hover:scale-110'
                            src={`https://image.tmdb.org/t/p/w500${card.poster_path}`}
                            alt={card.title || card.name}
                            onError={(e) => { e.target.onerror = null; e.target.src = noImage; }} // Set placeholder image on error
                        />
                    </div>
                    <div className="horizontal-card-item-info mt-2">
                        <h1 className="text-base text-zinc-400 font-semibold whitespace-nowrap overflow-hidden overflow-ellipsis hover:text-zinc-600">
                            {card.title || card.name}
                            
                        </h1>
                        <div className="flex items-center mt-1">
              <FaStar className="text-yellow-500 mr-1" />
              <span className="text-sm text-zinc-400 font-semibold">{(card.vote_average * 10).toFixed()}%</span>
            </div>
          </div>
                </Link>
            ))}
        </div>
    );
}

export default Cards;