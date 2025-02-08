// filepath: /c:/Users/Shashi/react-major-project/src/App.jsx
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Trending from "./components/templates/Trending";
import Popular from "./components/templates/Popular";
import Movies from "./components/templates/Movies";
import Tv from "./components/templates/Tv";
import People from "./components/templates/People";
import About from "./components/templates/About";
import Contact from "./components/templates/Contact";
import Moviedetails from "./components/templates/Moviedetails";
import Peopledetails from "./components/templates/Peopledetails";
import Tvdetails from "./components/templates/Tvdetails";

function App() {
  return (
    <div className="w-screen h-screen bg-[#1F1E24] flex">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/trending" element={<Trending />} />

        <Route path="/popular" element={<Popular />} />

        <Route path="/movies" element={<Movies />} />
        <Route path="/movie/details/:id" element={<Moviedetails />} />

        <Route path="/tv" element={<Tv />} />
        <Route path="/tv/details/:id" element={<Tvdetails />} />

        <Route path="/people" element={<People />} />
        <Route path="/people/details/:id" element={<Peopledetails />} />

        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </div>
  );
}

export default App;
