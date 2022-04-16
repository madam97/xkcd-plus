import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useAppSelector } from '../hooks/useRedux';
import { selectComics } from '../store/comicsSlice';
import IComic from '../interfaces/IComic';
import Image from '../components/Image';

type ComicRouteParams = {
  num?: string
}

export default function Comic() {

  const { num } = useParams<ComicRouteParams>();
  const numInt = num ? parseInt(num) : 0;

  const comics = useAppSelector(selectComics);

  const [comic, setComic] = useState<IComic>();

  useEffect(() => {
    const comic = comics.find(comic => comic.num === numInt);

    if (comic) {
      setComic(comic);
    }
  }, [comics]);

  // ---------------------------------------

  const date = comic ? new Date(comic.date) : new Date();

  return (
    <main>
      {!comic && <div className="loader"></div>}

      {comic && 
        <section className="container text-center">
          <h1>{comic.title}</h1>

          <Image src={comic.img} alt={comic.alt} title={comic.title} inline={true} />

          <p>Comic #{comic.num} from {date.getDay()}.{date.getMonth()}.{date.getFullYear()}.</p>

          {comic.transcript && 
            <>
              <p className="title mt-1">Transcript</p>
              <p>{comic.transcript}</p>
            </>
          }

          <div className="text-center mt-1">
            <Link className="btn-primary" to="/">Back to home</Link>
          </div>
        </section>
      }
    </main>
  )
}