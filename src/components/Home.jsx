import React, { useState, useEffect } from "react";
import Sidenav from './templates/Sidenav';
import Topnav from './templates/Topnav';
import axios from "../utils/axios";
import Header from "./templates/Header";
import HorizontalCard from "./templates/HorizontalCards";
import Dropdown from "./templates/Dropdown";
import Loading from './templates/Loading';

const Home = () => {
    document.title = 'Movie | My Website';
    const [wallpapers, setWallpapers] = useState(null);
    const [trending, setTrending] = useState(null);
    const [category, setCategory] = useState('all');
    const [loading, setLoading] = useState(true);

    const GetHeaderWallpaper = async () => {
        try {
            const { data } = await axios.get(`trending/all/day`);
            let randomdata = data.results[Math.floor(Math.random() * data.results.length)];
            
            // Fetch video data for the selected movie/show
            if (randomdata) {
                const mediaType = randomdata.media_type;
                const videosResponse = await axios.get(`/${mediaType}/${randomdata.id}/videos`);
                
                // Find trailer or fallback to first video
                const trailer = videosResponse.data.results?.find(
                    video => video.type === 'Trailer' && video.site === 'YouTube'
                ) || videosResponse.data.results?.find(
                    video => video.site === 'YouTube'
                );

                // Add videos to the wallpaper data
                randomdata.videos = trailer;
            }
            
            setWallpapers(randomdata);
        } catch (error) {
            console.error('Error fetching wallpapers:', error);
        }
    };

    const GetTrending = async () => {
        try {
            const { data } = await axios.get(`trending/${category}/day`);
            setTrending(data.results);
        } catch (error) {
            console.error('Error fetching trending data:', error);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            await GetHeaderWallpaper();
            await GetTrending();
            setLoading(false);
        };

        fetchData();
    }, [category]);

    if (loading) {
        return <Loading />;
    }

    return (
        <>
            <Sidenav />
            <div className='w-[80%] h-full overflow-auto overflow-x-hidden'>
                <Topnav />
                <Header data={wallpapers} />

                <div className="mb-2 flex justify-between mr-10 ml-6 mt-5">
                    <h1 className="text-xl text-zinc-400 font-semibold">Trending</h1>
                    <Dropdown title='Filter' options={['tv', 'movie', 'all']} func={(e) => setCategory(e.target.value)} />
                </div>

                <HorizontalCard data={trending} />
            </div>
        </>
    );
};

export default Home;