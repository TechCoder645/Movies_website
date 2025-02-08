import React from 'react';
import { Link } from 'react-router-dom';
const Sidenav = () => {
    return (
        <div className='w-[20%] h-full  border-r-2 border-zinc-400 p-5'>
            <h1 className='text-2xl text-white font-bold'>
            <i className="ri-tv-fill text-[#6556CD] text-2xl mr-2"></i>
                <span className=' '>Movie</span>
                </h1>
                <nav className='flex flex-col text-zinc-400 text-l gap-2'>
                <h1 className='text-white text-semibold text-xl mt-2'>New Feeds</h1>
                <Link to='/trending' className='hover:bg-[#6556CD] hover:text-white rounded-lg duration-300 p-2'><i className="ri-fire-fill mr-2"></i>Trending</Link>
                <Link to='/popular' className='hover:bg-[#6556CD] hover:text-white rounded-lg duration-300 p-2'><i className="ri-bard-fill mr-2"></i>Popular</Link>
                <Link to='/movies' className='hover:bg-[#6556CD] hover:text-white rounded-lg duration-300 p-2'><i className="ri-movie-2-fill mr-2"></i>Movies</Link>
                <Link to='/tv' className='hover:bg-[#6556CD] hover:text-white rounded-lg duration-300 p-2'><i className="ri-tv-2-fill mr-2"></i>TV Shows</Link>
                <Link to='/people' className='hover:bg-[#6556CD] hover:text-white rounded-lg duration-300 p-2'><i className="ri-team-fill mr-2"></i>People</Link>

                </nav>
                <hr  className='mt-2 mb-2 text-zinc-400'/>
                <nav className='flex flex-col text-zinc-400 text-l gap-2'>
                <h1 className='text-white text-semibold text-xl mt-2 '>Website Information</h1>
                <Link to='/about' className='hover:bg-[#6556CD] hover:text-white rounded-lg duration-300 p-2'><i className="ri-information-fill mr-2"></i>About</Link>
                <Link to='/contact' className='hover:bg-[#6556CD] hover:text-white rounded-lg duration-300 p-2'><i className="ri-phone-fill mr-2"></i>Contact</Link>
               
                </nav>
        </div>
    );
};

export default Sidenav;