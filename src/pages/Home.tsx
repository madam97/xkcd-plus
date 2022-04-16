import React, { useCallback, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../hooks/useRedux';
import { selectComics, getComicsStatus, fetchComics } from '../store/comicsSlice';
import Masonry from '../components/Masonry';

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

  return (
    <main>
      {(comicsStatus === 'idle' || comicsStatus === 'loading') && <div className="loader"></div>}

      <section className="container">
        <Masonry lazyLoad={true}>
          {comics.length === 0 && imgPlaceholders}

          {comics.length > 0 && comics.map(comic => 
            <div key={comic.num}>
              <Link to={`/comic/${comic.num}`}>
                <div className="img img-lozad">
                  <img data-src={comic.img} alt={comic.alt} title={comic.title} />
                </div>
              </Link>
            </div>
          )}
        </Masonry>

        <div className="text-center">
          <button className="btn-primary" onClick={reloadComics}>
            Reload
          </button>
        </div>
      </section>
    </main>
  )
}