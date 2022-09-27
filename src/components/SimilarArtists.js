import React from 'react';
import { SingleChoiceField } from './Inputs.js';
import ArtistPanel from './ArtistPanel.js';
import '../styles/SimilarArtists.scss';

export default function SimilarArtists({
  queryArtist,
  selectedSortOption,
  onChange,
  artists,
  sortOptions,
}) {
  return (
    <div className="similarArtists">
      <h1>Similar Artists to {queryArtist.name}</h1>
      <SingleChoiceField
        selectedOption={selectedSortOption}
        onChange={onChange}
        options={sortOptions}
      />
      {queryArtist && <ArtistPanel artists={artists} />}
    </div>
  );
}
