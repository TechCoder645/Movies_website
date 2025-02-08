import React, { useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { asyncLoadPerson } from '../../store/actions/peopleAction';
import { removepeople } from '../../store/reducers/peopleSlice';
import Loading from './Loading';

const Peopledetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  
  const { info, loading, error } = useSelector(state => ({
    info: state.people?.info || null,
    loading: state.people?.loading || false,
    error: state.people?.error || null
  }));

  const dispatch = useDispatch();

  useEffect(() => {
    if (id) {
      dispatch(asyncLoadPerson(id));
    }
    return () => {
      dispatch(removepeople());
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
      profile_path,
      name,
      biography,
      birthday,
      place_of_birth,
      known_for_department,
      popularity
    },
    externalid,
    credits
  } = info;

  return (
    <div className="w-screen min-h-screen bg-[#1F1E24] p-[2%] text-white overflow-y-auto"> 
      <nav className="w-full text-zinc-400 mb-8">
        <Link
          onClick={() => navigate(-1)}
          className="mr-5 hover:text-[#6556CD] text-2xl text-zinc-400 font-semibold"
        >
          <i className="ri-arrow-left-line"></i>
        </Link>
        {externalid?.imdb_id && (
          <a href={`https://www.imdb.com/name/${externalid.imdb_id}`} target="_blank" rel="noopener noreferrer" className="mr-5 hover:text-[#6556CD] text-2xl text-zinc-400 font-semibold">
            IMDB
          </a>
        )}
        {externalid?.wikidata_id && (
          <a href={`https://www.wikidata.org/wiki/${externalid.wikidata_id}`} target="_blank" rel="noopener noreferrer" className="mr-5 hover:text-[#6556CD] text-2xl text-zinc-400 font-semibold">
            <i className="ri-earth-fill"></i>
          </a>
        )}
      </nav>

      <div className="flex flex-col md:flex-row gap-8">
        {profile_path && (
          <div className="w-[300px] flex-shrink-0">
            <img
              src={`https://image.tmdb.org/t/p/original${profile_path}`}
              alt={name}
              className="w-full h-auto rounded-lg"
            />
          </div>
        )}

        <div className="flex-grow">
          <h1 className="text-4xl font-bold mb-4">{name}</h1>
          
          <div className="mb-6">
            {birthday && (
              <p className="text-zinc-400 mb-2">
                <span className="font-semibold">Born:</span> {birthday}
              </p>
            )}
            {place_of_birth && (
              <p className="text-zinc-400 mb-2">
                <span className="font-semibold">Place of Birth:</span> {place_of_birth}
              </p>
            )}
            {known_for_department && (
              <p className="text-zinc-400 mb-2">
                <span className="font-semibold">Known For:</span> {known_for_department}
              </p>
            )}
            <p className="text-zinc-400 mb-2">
              <span className="font-semibold">Popularity:</span> {popularity}
            </p>
          </div>

          {biography && (
            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-2">Biography</h2>
              <p className="text-zinc-300 leading-relaxed">{biography}</p>
            </div>
          )}

          {credits?.cast && credits.cast.length > 0 && (
            <div>
              <h2 className="text-2xl font-semibold mb-4">Known For</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {credits.cast.slice(0, 6).map((credit) => (
                  <div key={credit.id} className="cursor-pointer" onClick={() => navigate(`/${credit.media_type}/details/${credit.id}`)}>
                    <img
                      src={`https://image.tmdb.org/t/p/w200${credit.poster_path}`}
                      alt={credit.title || credit.name}
                      className="w-full h-auto rounded-lg hover:opacity-75 transition-opacity"
                    />
                    <p className="text-sm mt-2 text-center">{credit.title || credit.name}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Peopledetails;