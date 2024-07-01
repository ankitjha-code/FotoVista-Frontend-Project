import React, { useState, useEffect } from "react";
import { FaHeart, FaDownload, FaShare, FaThumbsUp } from "react-icons/fa";
import Lightbox from "react-image-lightbox";
import InfiniteScroll from "react-infinite-scroll-component";

const Photos = ({
  searchQuery,
  handleFavouriteClick,
  favouritePhotos,
  lightboxIndex,
  isLightboxOpen,
  openLightbox,
  closeLightbox,
}) => {
  const [loading, setLoading] = useState(false);
  const [photos, setPhotos] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchImages = async (page = 1) => {
    setLoading(true);
    const clientID = "?client_id=AhgSozQd2vfKNzPt7rmgpybREQfziVtPoC7eHXtUKak";
    const mainURL = "https://api.unsplash.com/photos/";
    let url = `${mainURL}${clientID}&page=${page}`;
    if (searchQuery) {
      url = `https://api.unsplash.com/search/photos${clientID}&query=${searchQuery}&page=${page}`;
    }
    try {
      const response = await fetch(url);
      const data = await response.json();
      if (data.length === 0 || (data.results && data.results.length === 0)) {
        setHasMore(false);
      }
      setPhotos((prevPhotos) => [...prevPhotos, ...(data.results || data)]);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    setPhotos([]); // Reset photos when search query changes
    setHasMore(true); // Reset hasMore state
    fetchImages();
  }, [searchQuery]);

  const fetchMoreData = () => {
    setPage((prevPage) => {
      const newPage = prevPage + 1;
      fetchImages(newPage);
      return newPage;
    });
  };

  const handleShare = (photoUrl) => {
    const shareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(
      `Checkout this amazing photo ${photoUrl}`
    )}`;
    window.open(shareUrl, "_blank");
  };

  const handleDownload = (photoUrl, photoId) => {
    const link = document.createElement("a");
    link.href = photoUrl;
    link.download = `photo_${photoId}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <main>
      <section className="photos">
        <InfiniteScroll
          dataLength={photos.length}
          next={fetchMoreData}
          hasMore={hasMore}
          loader={<p>Loading...</p>}
          endMessage={<p>No more photos to show.</p>}
        >
          <div className="photos-center">
            {photos.map(
              (photo, index) =>
                photo.urls &&
                photo.user &&
                photo.user.profile_image && (
                  <article
                    key={photo.id}
                    className={`photo ${
                      favouritePhotos.some(
                        (favPhoto) => favPhoto.id === photo.id
                      )
                        ? "favourite-photos"
                        : ""
                    }`}
                  >
                    <img
                      src={photo.urls.regular}
                      alt={photo.alt_description}
                      onClick={() => openLightbox(index)}
                    />
                    <div className="photo-info">
                      <div className="photo-header">
                        <h4>{photo.user.name}</h4>
                        <button
                          className={`favourite-btn ${
                            favouritePhotos.some(
                              (favPhoto) => favPhoto.id === photo.id
                            )
                              ? "active"
                              : ""
                          }`}
                          onClick={() => handleFavouriteClick(photo)}
                        >
                          <FaHeart />
                        </button>
                      </div>
                      <div className="photo-actions">
                        <p>
                          <FaThumbsUp className="heart-icon" />
                          {photo.likes}
                        </p>
                        <button
                          className="share-btn"
                          onClick={() => handleShare(photo.urls.regular)}
                        >
                          <FaShare />
                        </button>
                        <button
                          className="download-btn"
                          onClick={() =>
                            handleDownload(photo.urls.full, photo.id)
                          }
                        >
                          <FaDownload />
                        </button>
                      </div>
                      <a href={photo.user.portfolio_url}>
                        <img
                          src={photo.user.profile_image.medium}
                          className="user-img"
                          alt={photo.user.name}
                        />
                      </a>
                    </div>
                  </article>
                )
            )}
          </div>
        </InfiniteScroll>
      </section>
      {isLightboxOpen && (
        <Lightbox
          mainSrc={photos[lightboxIndex].urls.full}
          onCloseRequest={closeLightbox}
        />
      )}
    </main>
  );
};

export default Photos;
