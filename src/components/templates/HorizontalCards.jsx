import React from "react";
import { Link } from "react-router-dom";


const HorizontalCard = ({ data }) => {
  return (
   
      
      <div className="w-full flex overflow-auto overflow-y-hidden ">
        {data.map((item, i) => (
          <Link 
          to={`/${item.media_type}/details/${item.id}`}
          key={i} className="horizontal-card-item w-[20%] h-[60vh] m-6  flex-shrink-0 ">
            <img
              src={`https://image.tmdb.org/t/p/original${item.poster_path}`}
              alt={item.title || item.name}
              className="w-full h-[50vh] object-cover rounded-lg shadow-[8px_17px_38px_2px_rgba(0,0,0,0.5)] transform transition-transform duration-300 hover:scale-110"
            />
            <div className="horizontal-card-item-info mt-2">
              <h1 className="text-base text-zinc-400 font-semibold whitespace-nowrap overflow-hidden overflow-ellipsis">
                {item.title || item.name}
              </h1>
            </div>
          </Link>
        ))}
      </div>
   
  );
};

export default HorizontalCard;