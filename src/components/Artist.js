import React from 'react';
import '../styles/Artist.scss';

export default function Artist(props) {
  const [name, imgData, spotifyLink, popularity, followers, genres] = [
    props.name,
    props.imgData,
    props.spotifyLink,
    props.popularity,
    props.followers,
    props.genres,
  ];
  return (
    <div className="artist">
      <div className="imgAndName">
        <img src={imgData.url} width={imgData.width} height={imgData.height} />
        <a
          className="artistLink"
          href={spotifyLink}
          target="_blank"
          rel="noopener noreferrer"
        >
          {' '}
          {name}
        </a>
      </div>
      <a href={spotifyLink} target="_blank" rel="noopener noreferrer">
        Link
      </a>
      <p>Popularity: {popularity}</p>
      <p>Followers: {followers}</p>
      {genres?.length > 0 && (
        <p>
          Genres:{' '}
          {genres.map((genre) => (
            <li>{genre}</li>
          ))}
        </p>
      )}
    </div>
  );
}
