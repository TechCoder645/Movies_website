import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Topnav from "./Topnav";
import Dropdown from "./Dropdown";
import axios from "../../utils/axios"; // Ensure this includes the API key in headers
import Cards from "./Cards";
import Loading from "./Loading";
import InfiniteScroll from "react-infinite-scroll-component";

const Movies = () => {
  const navigate = useNavigate();
  const [category, setCategory] = useState("popular"); // Default to "popular"
  const [duration, setDuration] = useState("day"); // Default to "day"
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const GetMovies = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // TMDb API endpoint for popular or now playing movies
      const endpoint = category === "popular" ? "movie/popular" : "movie/now_playing";
      const { data } = await axios.get(endpoint, {
        params: {
          language: "en-US",
          page: page,
        },
      });

      setMovies(prev => [...prev, ...data.results]);
      setPage(prevPage => prevPage + 1);
      setHasMore(data.page < data.total_pages);
    } catch (error) {
      console.error("Error fetching movies data:", error);
      setError("Failed to fetch movies data. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const refreshHandler = () => {
    setPage(1);
    setMovies([]);
    GetMovies();
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
    setPage(1);
    setMovies([]);
    GetMovies();
  };

  const handleDurationChange = (e) => {
    setDuration(e.target.value);
    setPage(1);
    setMovies([]);
    GetMovies();
  };

  useEffect(() => {
    refreshHandler();
  }, [category, duration]);

  useEffect(() => {
    if (!hasMore) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [hasMore]);

  if (loading && page === 1) {
    return <Loading />;
  }

  if (error) {
    return <div className="text-red-500 p-4">{error}</div>;
  }

  return (
    <div className="w-screen h-screen">
      <div className="w-full h-[10vh] flex items-center p-[2%]">
        <h1 className="text-2xl text-zinc-400 font-semibold whitespace-nowrap">
          <i
            onClick={() => navigate(-1)}
            className="ri-arrow-left-line hover:text-[#6556CD] mr-5"
          ></i>
          Movies
        </h1>
        <Topnav />
        <Dropdown
          title="Category"
          options={["popular", "latest"]}
          func={handleCategoryChange}
        />
        <div className="w-[4%]"></div>
        <Dropdown
          title="Duration"
          options={["week", "day"]}
          func={handleDurationChange}
        />
      </div>
      <div>
        {movies.length === 0 ? (
          <p style={{ textAlign: "center" }}>
            <b>No data available</b>
          </p>
        ) : (
          <InfiniteScroll
            dataLength={movies.length}
            next={GetMovies}
            hasMore={hasMore}
            loader={<Loading />}
            endMessage={
              <p style={{ textAlign: "center" }}>
                <b>Yay! You have seen it all</b>
              </p>
            }
          >
            <Cards data={movies} title='movie'/>
          </InfiniteScroll>
        )}
      </div>
    </div>
  );
};

export default Movies;