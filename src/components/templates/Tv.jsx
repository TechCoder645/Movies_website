import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Topnav from "./Topnav";
import Dropdown from "./Dropdown";
import axios from "../../utils/axios"; // Ensure this includes the API key in headers
import Cards from "./Cards";
import Loading from "./Loading";
import InfiniteScroll from "react-infinite-scroll-component";

const Tv = () => {
  const navigate = useNavigate();
  const [category, setCategory] = useState("popular"); // Default to "popular"
  const [duration, setDuration] = useState("day"); // Default to "day"
  const [tvShows, setTvShows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const GetTvShows = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // TMDb API endpoint for popular or now playing TV shows
      const endpoint = category === "popular" ? "tv/popular" : "tv/on_the_air";
      const { data } = await axios.get(endpoint, {
        params: {
          language: "en-US",
          page: page,
        },
      });

      setTvShows(prev => [...prev, ...data.results]);
      setPage(prevPage => prevPage + 1);
      setHasMore(data.page < data.total_pages);
    } catch (error) {
      console.error("Error fetching TV shows data:", error);
      setError("Failed to fetch TV shows data. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const refreshHandler = () => {
    setPage(1);
    setTvShows([]);
    GetTvShows();
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
    setPage(1);
    setTvShows([]);
    GetTvShows();
  };

  const handleDurationChange = (e) => {
    setDuration(e.target.value);
    setPage(1);
    setTvShows([]);
    GetTvShows();
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
          TV Shows
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
        {tvShows.length === 0 ? (
          <p style={{ textAlign: "center" }}>
            <b>No data available</b>
          </p>
        ) : (
          <InfiniteScroll
            dataLength={tvShows.length}
            next={GetTvShows}
            hasMore={hasMore}
            loader={<Loading />}
            endMessage={
              <p style={{ textAlign: "center" }}>
                <b>Yay! You have seen it all</b>
              </p>
            }
          >
            <Cards data={tvShows} title='tv' />
          </InfiniteScroll>
        )}
      </div>
    </div>
  );
};

export default Tv;