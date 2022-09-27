import React from 'react';
import '../styles/ArtistCard.scss';

export default function ArtistCard({ name, imgData, genres }) {
  return (
    <div className="artistCard">
      <div className="text">
        <h3>{name}</h3>
        {genres?.length > 0 && (
          <p className="genres">Genres: {genres.join(', ')}</p>
        )}
      </div>
      <img src={imgData.url} width={imgData.width} height={imgData.height} />
    </div>
  );
}
