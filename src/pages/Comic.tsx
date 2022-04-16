import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useAppSelector } from '../hooks/useRedux';
import { COMICS_URL, selectComics } from '../store/comicsSlice';
import IComic from '../interfaces/IComic';
import Image from '../components/Image';
import axios from 'axios';
import moment from 'moment';

type ComicRouteParams = {
  num?: string
}

export default function Comic() {

  const { num } = useParams<ComicRouteParams>();
  const numInt = num ? parseInt(num) : 0;

  const comics = useAppSelector(selectComics);

  const [comic, setComic] = useState<IComic>();

  // Load comic's data
  useEffect(() => {
    let comic = comics.find(comic => comic.num === numInt);

    if (comic) {
      setComic(comic);
    }
    // If comic is not in the stored comics' list, will fetch its data
    else {
      const fetchComic = async () => {
        const res = await axios.get<IComic>(COMICS_URL + '/' + numInt);

        if (res.data) {
          setComic(res.data);
        }
      }

      fetchComic();
    }
  }, [comics, numInt]);

  // ---------------------------------------

  return (
    <main>
      {!comic && <div className="loader"></div>}

      {comic && 
        <section className="container text-center">
          <h1>{comic.title}</h1>

          <Image src={comic.img} alt={comic.alt} title={comic.title} inline={true} />

          <p>
            Comic #{comic.num} 

            {comic.date ? ' from ' + moment(comic.date).format('DD.MM.YYYY') : ''}
          </p>

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