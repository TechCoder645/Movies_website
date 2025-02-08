import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import noImage from '../../assets/no-image.png';
import axios from '../../utils/axios';
import { FaStar, FaFilm, FaTv } from 'react-icons/fa';

const Peoplecard = ({ data, title }) => {
  const baseUrl = "https://image.tmdb.org/t/p/w500";
  const [detailedData, setDetailedData] = useState({});
  const [isHovered, setIsHovered] = useState(null);

  useEffect(() => {
    const fetchDetails = async () => {
      const details = {};
      for (const person of data) {
        try {
          const [personDetails, personCredits] = await Promise.all([
            axios.get(`person/${person.id}`, {
              params: { language: "en-US" }
            }),
            axios.get(`person/${person.id}/combined_credits`, {
              params: { language: "en-US" }
            })
          ]);
          
          details[person.id] = {
            ...personDetails.data,
            credits: personCredits.data
          };
        } catch (error) {
          console.error(`Error fetching details for person ${person.id}:`, error);
        }
      }
      setDetailedData(details);
    };

    fetchDetails();
  }, [data]);

  const getKnownFor = (credits) => {
    if (!credits) return [];
    const sortedProjects = [...(credits.cast || [])].sort((a, b) => b.popularity - a.popularity);
    return sortedProjects.slice(0, 3);
  };

  return (
    <div className="p-4 bg-[#1F1E24]">
      <h2 className="text-3xl font-bold mb-8 text-white text-center"></h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {data.map((item, index) => (
          <Link 
            key={item.id} 
            to={`/${item.media_type || title}/details/${item.id}`}
            className="group"
            onMouseEnter={() => setIsHovered(item.id)}
            onMouseLeave={() => setIsHovered(null)}
          >
            <div className="bg-[#2A2A2A] rounded-xl overflow-hidden shadow-xl transform transition-all duration-300 hover:scale-105 hover:shadow-2xl">
              <div className="relative aspect-[2/3] overflow-hidden">
                <img
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  src={item.profile_path ? `${baseUrl}${item.profile_path}` : noImage}
                  alt={item.name}
                  onError={(e) => { e.target.onerror = null; e.target.src = noImage; }}
                />
                {isHovered === item.id && detailedData[item.id] && (
                  <div className="absolute inset-0 bg-black bg-opacity-75 p-4 transition-opacity duration-300 overflow-y-auto">
                    <div className="text-white space-y-2">
                      <p className="font-medium">
                        {detailedData[item.id].known_for_department || 'Entertainment'}
                      </p>
                      <p className="text-sm">
                        {detailedData[item.id].birthday && `Born: ${new Date(detailedData[item.id].birthday).toLocaleDateString()}`}
                      </p>
                      {detailedData[item.id].place_of_birth && (
                        <p className="text-sm">From: {detailedData[item.id].place_of_birth}</p>
                      )}
                      <div className="mt-2">
                        <p className="text-sm font-semibold mb-1">Known For:</p>
                        {getKnownFor(detailedData[item.id].credits).map((project, idx) => (
                          <div key={idx} className="flex items-center text-xs mb-1">
                            {project.media_type === 'movie' ? <FaFilm className="mr-1" /> : <FaTv className="mr-1" />}
                            <span>{project.title || project.name}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-white mb-1">{item.name}</h3>
                {detailedData[item.id] && (
                  <div className="flex items-center text-yellow-400 text-sm">
                    <FaStar className="mr-1" />
                    <span>{item.popularity.toFixed(1)} Popularity</span>
                  </div>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Peoplecard;