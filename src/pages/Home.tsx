import React, { useCallback, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../hooks/useRedux';
import { selectComics, getComicsStatus, fetchComics, getComicsError } from '../store/comicsSlice';
import Masonry from '../components/Masonry';
import Image from '../components/Image';
import ErrorSection from '../components/ErrorSection';

export default function Home() {

  const dispatch = useAppDispatch();
  const comics = useAppSelector(selectComics);
  const comicsStatus = useAppSelector(getComicsStatus);

  // Loads 9 random comics data
  const loadComics = useCallback((): void => {
    if (comicsStatus === 'idle') {
      dispatch(fetchComics());
    }
  }, [comicsStatus, dispatch]);

  useEffect(() => {
    loadComics();
  }, [loadComics]);

  /**
   * Reloads the 9 comics
   * @param e 
   */
  const reloadComics = useCallback((e: React.MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();

    dispatch(fetchComics());
  }, [dispatch]);

  // ---------------------------------------

  // Generate placeholders for images
  const imgPlaceholders: React.ReactNode[] = [];
  for (let i = 0; i < 9; ++i) {
    imgPlaceholders.push((
      <div key={i}>
        <div className="img-placeholder"></div>
      </div>
    ));
  }

  // Generate images
  const images = comics.map(comic => 
    <div key={comic.num}>
      <Link to={`/comic/${comic.num}`}>
        <Image img={{ src: comic.img, alt: comic.alt, title: comic.title }} />
      </Link>
    </div>
  );

  return (
    <main>
      {(comicsStatus === 'idle' || comicsStatus === 'loading') && <div className="loader"></div>}

      {comicsStatus !== 'fail' && 
        <section className="container">
        
          {comics.length === 0 && <Masonry>{imgPlaceholders}</Masonry>}
          {comics.length > 0 && <Masonry listenLazyLoad={true}>{images}</Masonry>}

          <div className="text-center">
            <button className="btn-primary" onClick={reloadComics}>
              Reload
            </button>
          </div>
        </section>
      }

      {comicsStatus === 'fail' &&
        <ErrorSection subtitle="Server is down" msg="Was not able to load comics. Try again later!">
          <button className="btn-primary" onClick={reloadComics}>
            Reload
          </button>
        </ErrorSection>
      }
    </main>
  )
}