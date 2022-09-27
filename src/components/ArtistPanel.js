import React from 'react';
import '../styles/ArtistPanel.scss';
import ArtistCard from './ArtistCard.js';

export default function ArtistPanel({ artists }) {
  const numberWithCommas = (x) =>
    x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return (
    <div className="artistPanel">
      {artists.map((artist) => {
        return (
          <ArtistCard
            name={artist.name}
            imgData={artist.images[1]}
            spotifyLink={artist.external_urls.spotify}
            popularity={artist.popularity}
            followers={numberWithCommas(artist.followers.total)}
            genres={artist.genres}
          />
        );
      })}
    </div>
  );
}
