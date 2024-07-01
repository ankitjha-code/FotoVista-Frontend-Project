import "./App.css";
import React, { useState } from "react";
import Photos from "./Components/Photos";
import Favourites from "./Components/Favourites";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [favouritePhotos, setFavouritePhotos] = useState([]);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchQuery(e.target[0].value);
  };

  const handleFavouriteClick = (photo) => {
    setFavouritePhotos((prevFavourites) => {
      if (prevFavourites.some((favPhoto) => favPhoto.id === photo.id)) {
        return prevFavourites.filter((favPhoto) => favPhoto.id !== photo.id);
      } else {
        return [...prevFavourites, photo];
      }
    });
  };

  const openLightbox = (index) => {
    setLightboxIndex(index);
    setIsLightboxOpen(true);
  };

  const closeLightbox = () => {
    setIsLightboxOpen(false);
  };

  return (
    <BrowserRouter>
      <div className="header">
        <nav className="navbar">
          <div className="navbar_logo">FotoVista</div>
          <form action="" className="navbar_search-form" onSubmit={handleSearch}>
            <input type="text" className="form-input" placeholder="Search" />
            <button type="submit" className="submit-btn">
              <FaSearch />
            </button>
          </form>
          <div className="navbar_links">
            <Link to="/">Home</Link>
            <Link to="/favourites">Favourites</Link>
          </div>
        </nav>
        <Routes>
          <Route
            path="/"
            element={
              <Photos
                searchQuery={searchQuery}
                handleFavouriteClick={handleFavouriteClick}
                favouritePhotos={favouritePhotos}
                lightboxIndex={lightboxIndex}
                isLightboxOpen={isLightboxOpen}
                openLightbox={openLightbox}
                closeLightbox={closeLightbox}
              />
            }
          />
          <Route
            path="/favourites"
            element={
              <Favourites
                favouritePhotos={favouritePhotos}
                handleRemoveFavourite={handleFavouriteClick}
                lightboxIndex={lightboxIndex}
                isLightboxOpen={isLightboxOpen}
                openLightbox={openLightbox}
                closeLightbox={closeLightbox}
              />
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
