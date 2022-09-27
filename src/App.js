import './App.scss';
import axios from 'axios';
import { React, useState, useEffect } from 'react';
import { Credentials } from './Credentials';
import Header from './components/Header.js';
import MainBanner from './components/MainBanner.js';
import SimilarArtists from './components/SimilarArtists';

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
    artists = artists?.artists;
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

  const sortOptions = ['Relevance', 'Followers', 'Popularity'];

  return (
    <div className="container">
      <Header />
      <MainBanner
        title={'Find similar artists to connect with!'}
        subtitle={'Input an artist’s Spotify ID below to find similar artists'}
        textInput={'Spotify Artist ID'}
        onChange={updateArtistID}
        queryArtist={queryArtist}
      />
      <br />
      <SimilarArtists
        queryArtist={queryArtist}
        selectedSortOption={selectedSortOption}
        onChange={setSort}
        artists={sortDirectory(artists)}
        sortOptions={sortOptions}
      />
    </div>
  );
}

export default App;
