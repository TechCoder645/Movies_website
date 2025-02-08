import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "../../utils/axios";
import noImage from "../../assets/no-image.png"; // Import the fallback image

const Topnav = () => {
  const [query, setQuery] = useState("");
  const [searches, setSearches] = useState([]);

  const searchItems = async (query) => {
    try {
      const { data } = await axios.get(`/search/multi?query=${query}`);
      setSearches(data.results || []);
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  useEffect(() => {
    if (query.length > 2) {
      searchItems(query);
    } else {
      setSearches([]);
    }
  }, [query]);

  return (
    <div className="w-full h-[10vh] relative flex items-center justify-start pl-[15%] ">
      <i className="ri-search-line text-zinc-400 text-2xl"></i>
      <input
        onChange={(e) => setQuery(e.target.value)}
        value={query}
        className="w-[50%] mx-5 p-5 outline-none border-none bg-transparent text-white"
        type="text"
        placeholder="search anything"
      />
      {query.length > 0 && (
        <i
          onClick={() => setQuery("")}
          className="ri-close-fill text-zinc-400 text-2xl"
        ></i>
      )}

      <div className="z-[100] absolute w-[40%] max-h-[50vh] bg-zinc-100 top-[90%] overflow-auto ml-[6%] top-[100%]">
        {searches.map((item) => (
          <Link
            key={item.id}
            to={`/${item.media_type}/details/${item.id}`}
            className="text-zinc-600 font-semibold hover:text-zinc-900 hover:bg-zinc-300 duration inline-block w-full p-5 flex justify-start items-center border-b-2 border-zinc-200"
          >
            <div className="flex items-center">
              <img
                src={
                  item.poster_path || item.profile_path
                    ? `https://image.tmdb.org/t/p/w200${item.poster_path || item.profile_path}`
                    : noImage
                }
                alt={item.title || item.name}
                className="w-10 h-10 mr-2 shadow "
              />
              <div>
                <span>{item.title || item.name || item.original_name || item.original_title}</span>
                {item.release_date && (
                  <p className="text-sm text-zinc-500">{item.release_date}</p>
                )}
                {item.known_for_department && (
                  <p className="text-sm text-zinc-500">{item.known_for_department}</p>
                )}
              </div>
            
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Topnav;