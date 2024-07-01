import React from "react";
import { FaHeart, FaDownload, FaShare } from "react-icons/fa";
import "react-image-lightbox/style.css";

const FavouritePhotoItem = ({ photo, handleRemoveFavourite, openLightbox }) => {
  const handleShare = (photoUrl) => {
    const shareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(
      `Check out this amazing photo: ${photoUrl}`
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

  if (!photo || !photo.urls || !photo.user) {
    return null; // Or render some placeholder content
  }

  return (
    <article className="photo favourite-photos">
      <div className="photos-center">
        <img
          src={photo.urls.regular}
          alt={photo.alt_description}
          onClick={openLightbox} // Call openLightbox directly
        />
        <div className="photo-info">
          <div className="photo-header">
            <h4>{photo.user.name}</h4>
            <button
              className="favourite-btn active"
              onClick={() => handleRemoveFavourite(photo)}
            >
              <FaHeart />
            </button>
          </div>
          <div className="photo-actions">
            <p>
              <FaHeart className="heart-icon" />
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
              onClick={() => handleDownload(photo.urls.full, photo.id)}
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
      </div>
    </article>
  );
};

export default FavouritePhotoItem;
