import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Topnav from "./Topnav";
import Dropdown from "./Dropdown";
import axios from "../../utils/axios"; // Ensure this includes the API key in headers
import Cards from "./Cards";
import Loading from "./Loading";
import InfiniteScroll from "react-infinite-scroll-component";

const Popular = () => {
  const navigate = useNavigate();
  const [category, setCategory] = useState("movie"); // Default to "movie"
  const [popular, setPopular] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const GetPopular = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // TMDb API endpoint for popular movies or TV shows
      const endpoint = category === 'movie' ? 'movie/popular' : 'tv/popular';
      const { data } = await axios.get(endpoint, {
        params: {
          language: 'en-US',
          page: page,
        },
      });

      // Add media_type to each result
      const resultsWithMediaType = data.results.map(item => ({
        ...item,
        media_type: category  // Add media_type based on current category
      }));

      setPopular(prev => [...prev, ...resultsWithMediaType]);
      setPage(prevPage => prevPage + 1);
      setHasMore(data.page < data.total_pages);
    } catch (error) {
      console.error("Error fetching popular data:", error);
      setError("Failed to fetch popular data. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const refreshHandler = () => {
    setPage(1);
    setPopular([]);
    GetPopular();
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
    setPage(1);
    setPopular([]);
    setHasMore(true);
  };

  useEffect(() => {
    GetPopular();
  }, [category]);

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
          Popular
        </h1>
        <Topnav />
        <div className="ml-4">
          <Dropdown
            title="Category"
            options={["movie", "tv"]}
            func={handleCategoryChange}
            value={category}
          />
        </div>
      </div>
      <div>
        {popular.length === 0 ? (
          <p style={{ textAlign: "center" }}>
            <b>No data available</b>
          </p>
        ) : (
          <InfiniteScroll
            dataLength={popular.length}
            next={GetPopular}
            hasMore={hasMore}
            loader={<Loading />}
            endMessage={
              <p style={{ textAlign: "center" }}>
                <b>Yay! You have seen it all</b>
              </p>
            }
          >
            <Cards data={popular} title={category} />
          </InfiniteScroll>
        )}
      </div>
    </div>
  );
};

export default Popular;