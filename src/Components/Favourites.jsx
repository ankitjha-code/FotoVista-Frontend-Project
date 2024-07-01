import React from "react";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
import FavouritePhotoItem from "./FavouritePhotoItem";

const Favourites = ({
  favouritePhotos = [],
  handleRemoveFavourite,
  lightboxIndex,
  isLightboxOpen,
  openLightbox,
  closeLightbox,
}) => {
  return (
    <div>
      <main>
        <section className="photos">
          <div className="photos-center">
            {favouritePhotos.length > 0 ? (
              favouritePhotos.map((photo, index) => (
                <FavouritePhotoItem
                  key={photo.id}
                  photo={photo}
                  handleRemoveFavourite={handleRemoveFavourite}
                  openLightbox={() => openLightbox(index)} // Pass index correctly
                />
              ))
            ) : (
              <p>No Favourites</p>
            )}
          </div>
        </section>
        {isLightboxOpen && favouritePhotos[lightboxIndex] && (
          <Lightbox
            mainSrc={favouritePhotos[lightboxIndex].urls.full}
            onCloseRequest={closeLightbox}
          />
        )}
      </main>
    </div>
  );
};

export default Favourites;
