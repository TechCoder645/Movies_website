import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Topnav from "./Topnav";
import Dropdown from "./Dropdown";
import axios from "../../utils/axios"; // Ensure this includes the API key in headers
import Peoplecard from "./Peoplecard";
import Loading from "./Loading";
import InfiniteScroll from "react-infinite-scroll-component";

const People = () => {
  const navigate = useNavigate();
  const [category, setCategory] = useState("popular"); // Default to "popular"
  const [people, setPeople] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const GetPeople = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // TMDb API endpoint for popular or trending people
      const endpoint = category === "popular" ? "person/popular" : "trending/person/day";
      const { data } = await axios.get(endpoint, {
        params: {
          language: "en-US",
          page: page,
        },
      });

      setPeople(prev => [...prev, ...data.results]);
      setPage(prevPage => prevPage + 1);
      setHasMore(data.page < data.total_pages);
    } catch (error) {
      console.error("Error fetching people data:", error);
      setError("Failed to fetch people data. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const refreshHandler = () => {
    setPage(1);
    setPeople([]);
    GetPeople();
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
    setPage(1);
    setPeople([]);
    GetPeople();
  };

  useEffect(() => {
    refreshHandler();
  }, [category]);

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
          People
        </h1>
        <Topnav />
        <Dropdown
          title="Category"
          options={["popular", "trending"]}
          func={handleCategoryChange}
        />
      </div>
      <div>
        {people.length === 0 ? (
          <p style={{ textAlign: "center" }}>
            <b>No data available</b>
          </p>
        ) : (
          <InfiniteScroll
            dataLength={people.length}
            next={GetPeople}
            hasMore={hasMore}
            loader={<Loading />}
            endMessage={
              <p style={{ textAlign: "center" }}>
                <b>Yay! You have seen it all</b>
              </p>
            }
          >
            <Peoplecard data={people} title='people' />
          </InfiniteScroll>
        )}
      </div>
    </div>
  );
};

export default People;