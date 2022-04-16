import React, { useEffect, useRef } from 'react';
import { useAppSelector, useAppDispatch } from '../hooks/useRedux';
import { selectComics, getComicsStatus, getComicsError, fetchComics } from '../store/comicsSlice';
import Masonry from '../components/Masonry';

export default function Home() {

  const dispatch = useAppDispatch();

  const comics = useAppSelector(selectComics);
  const comicsStatus = useAppSelector(getComicsStatus);
  const comicsError = useAppSelector(getComicsError);

  useEffect(() => {
    if (comicsStatus === 'idle') {
      setTimeout(() => {
        dispatch(fetchComics());
      }, 2000);
    }
  }, [comicsStatus, dispatch]);

  /**
   * Reloads the 9 comics
   * @param e 
   */
  const reloadComics = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();

    dispatch(fetchComics());
  }

  // ---------------------------------------

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
      <div className="loader"></div>

      <section className="container">
        <Masonry lazyLoad={true}>
          {!comics && imgPlaceholders}

          {comics && comics.map(comic => 
            <div key={comic.num}>
              <div className="img img-lozad">
                <img data-src={comic.img} alt={comic.alt} title={comic.title} />
              </div>
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