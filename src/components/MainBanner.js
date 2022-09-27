import React from 'react';
import Artist from './Artist.js';
import BannerText from './BannerText.js';
import '../styles/MainBanner.scss';

export default function MainBanner({
  title,
  subtitle,
  textInput,
  onChange,
  queryArtist,
}) {
  const numberWithCommas = (x) =>
    x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  return (
    <div className="mainBanner">
      <BannerText
        title={title}
        subtitle={subtitle}
        textInput={textInput}
        onChange={onChange}
      />
      {queryArtist && (
        <Artist
          name={queryArtist.name}
          imgData={queryArtist.images[1]}
          spotifyLink={queryArtist.external_urls.spotify}
          popularity={queryArtist.popularity}
          followers={numberWithCommas(queryArtist.followers.total)}
          genres={queryArtist.genres}
        />
      )}
    </div>
  );
}
