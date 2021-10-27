import { memo, useEffect, useState } from 'react';
import { Button } from './Button';
import { Content } from './Content';

import { api } from '../services/api';

import '../styles/sidebar.scss';

export interface GenreResponseProps {
  id: number;
  name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
  title: string;
}

function SideBarComponent() {
  const [genres, setGenres] = useState<GenreResponseProps[]>([]);
  const [selectedGenreId, setSelectedGenreId] = useState(1);

  useEffect(() => {
    api.get<GenreResponseProps[]>('genres').then(response => {
      setGenres(response.data);
    });
  }, []);

  function handleClickButton(id: number) {
    setSelectedGenreId(id);
  }

  return (
    <>
      <nav className="sidebar">
          <span>Watch<p>Me</p></span>

          <div className="buttons-container">
            {genres.map(genre => (
              <Button
                key={String(genre.id)}
                title={genre.title}
                iconName={genre.name}
                onClick={() => handleClickButton(genre.id)}
                selected={selectedGenreId === genre.id}
              />
            ))}
          </div>
        </nav>
        
        <Content genreId={selectedGenreId} />
      </>
  )
}

export const SideBar = memo(SideBarComponent, (prevProps, nextProps) => {
  return Object.is(prevProps, nextProps)
})