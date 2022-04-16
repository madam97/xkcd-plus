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
      dispatch(fetchComics());
    }
  }, [comicsStatus, dispatch]);

  // ---------------------------------------

  return (
    <main>
      <section className="container">
        <Masonry>
          {comics && comics.map(comic => 
            <div key={comic.num}>
              <div className="img">
                <img src={comic.img} alt={comic.alt} title={comic.title} />
              </div>
            </div>
          )}
        </Masonry>
      </section>
    </main>
  )
}