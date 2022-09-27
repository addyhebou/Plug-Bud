import './App.css';
import axios from 'axios';
import { React, useState, useEffect } from 'react';
import { Credentials } from './Credentials';

function App() {
  const spotify = Credentials();

  const [artists, setArtists] = useState([]);
  const [token, setToken] = useState('');
  const [artistID, setArtistID] = useState('');
  const [queryArtist, setQueryArtist] = useState('');
  const [selectedSortOption, setSelectedSortOption] = useState('Relevance');

  useEffect(() => {
    axios('https://accounts.spotify.com/api/token', {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization:
          'Basic ' + btoa(spotify.ClientId + ':' + spotify.ClientSecret),
      },
      data: 'grant_type=client_credentials',
      method: 'POST',
    }).then((tokenResponse) => {
      setToken(tokenResponse.data.access_token);
      axios(`https://api.spotify.com/v1/artists/${artistID}/related-artists`, {
        method: 'GET',
        headers: { Authorization: 'Bearer ' + tokenResponse.data.access_token },
      }).then((artistResponse) => {
        setArtists(artistResponse.data);
      });
      axios(`https://api.spotify.com/v1/artists/${artistID}`, {
        method: 'GET',
        headers: { Authorization: 'Bearer ' + tokenResponse.data.access_token },
      }).then((artistResponse) => {
        setQueryArtist(artistResponse.data);
      });
    });
  }, [artistID, selectedSortOption]);

  const updateArtistID = (e) => {
    e.preventDefault();
    setArtistID(e.target.value);
  };

  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  const sortArtistsByFollowers = (artists) => {
    return artists
      ? artists.sort((a, b) => a.followers.total - b.followers.total)
      : [];
  };
  const sortArtistsByPopularity = (artists) => {
    return artists ? artists.sort((a, b) => a.popularity - b.popularity) : [];
  };

  const sortDirectory = (artists) => {
    if (selectedSortOption === 'Popularity')
      return sortArtistsByPopularity(artists);
    else if (selectedSortOption === 'Followers')
      return sortArtistsByFollowers(artists);
    return artists ? artists : [];
  };

  const setSort = (e) => {
    e.preventDefault();
    setSelectedSortOption(e.target.value);
    console.log(selectedSortOption);
  };

  return (
    // <form onSubmit={searchArtist}>
    <div className="container">
      <h1>Submit Artist ID Here</h1>
      <input type="text" onChange={updateArtistID} />
      <br />
      {queryArtist ? (
        <div>
          <p>Artist Name: {queryArtist.name}</p>
          <img
            src={queryArtist.images[1].url}
            width={queryArtist.images[1].width}
            height={queryArtist.images[1].height}
          />
          <a
            href={queryArtist.external_urls.spotify}
            target="_blank"
            rel="noopener noreferrer"
          >
            Link
          </a>
          <p>Popularity: {queryArtist.popularity}</p>
          <p>Followers: {numberWithCommas(queryArtist.followers.total)}</p>
          {queryArtist.genres.length > 0 && (
            <p>
              Genres:{' '}
              {queryArtist.genres.map((genre) => (
                <li>{genre}</li>
              ))}
            </p>
          )}
        </div>
      ) : (
        <></>
      )}
      <h1>Similar Artists to {queryArtist.name}</h1>
      {/* <fieldset> */}
      <legend>Sort By:</legend>
      <div>
        <input
          type="radio"
          id="Relevance"
          name="drone"
          value="Relevance"
          checked={selectedSortOption === 'Relevance'}
          onClick={setSort}
        />
        <label for="Relevance">Relevance</label>
      </div>

      <div>
        <input
          type="radio"
          id="Followers"
          name="drone"
          value="Followers"
          checked={selectedSortOption === 'Followers'}
          onClick={setSort}
        />
        <label for="Followers">Followers</label>
      </div>
      <div>
        <input
          type="radio"
          id="Popularity"
          name="drone"
          value="Popularity"
          onClick={setSort}
          checked={selectedSortOption === 'Popularity'}
        />
        <label for="Popularity">Popularity</label>
      </div>
      {/* </fieldset> */}
      {sortDirectory(artists?.artists).map((artist) => {
        return (
          <div>
            <p>Artist Name: {artist.name}</p>
            <img
              src={artist.images[2].url}
              width={artist.images[2].width}
              height={artist.images[2].height}
            />
            <a
              href={artist.external_urls.spotify}
              target="_blank"
              rel="noopener noreferrer"
            >
              Link
            </a>
            <p>Popularity: {artist.popularity}</p>
            <p>Followers: {numberWithCommas(artist.followers.total)}</p>
            {artist.genres.length > 0 && (
              <p>
                Genres:{' '}
                {artist.genres.map((genre) => (
                  <li>{genre}</li>
                ))}
              </p>
            )}
          </div>
        );
      })}
    </div>
    // </form>
  );
}

export default App;
